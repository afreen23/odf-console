import { DeviceSet, K8sResourceKind, NodeKind, ResourceConstraints, StorageClassResourceKind, StorageClusterKind, Taint } from "@odf/shared/types";
import { humanizeCpuCores, convertToBaseValue } from "@odf/shared/utils";
import { MatchExpression } from "@openshift-console/dynamic-plugin-sdk-internal/lib/extensions/console-types";
import * as _ from "lodash";
import { getNodeCPUCapacity, getNodeAllocatableMemory, hasNoTaints } from "../components/utils";
import { HOSTNAME_LABEL_KEY, LABEL_OPERATOR, MINIMUM_NODES, ocsTaint, OCS_PROVISIONERS, RACK_LABEL, ZONE_LABELS } from "../constants";

export const checkArbiterCluster = (storageCluster: StorageClusterKind): boolean =>
    storageCluster?.spec?.arbiter?.enable;

export const checkFlexibleScaling = (storageCluster: StorageClusterKind): boolean =>
    storageCluster?.spec?.flexibleScaling;

export const getRequestedPVCSize = (pvc): string =>
    pvc?.spec?.resources?.requests?.storage;

const getPVStorageClass = (pv) => pv?.spec?.storageClassName;

export const getSCAvailablePVs = (pvsData, sc: string) =>
    pvsData.filter((pv) => getPVStorageClass(pv) === sc && pv.status.phase === "Available");

export const getCurrentDeviceSetIndex = (deviceSets: DeviceSet[], selectedSCName: string): number =>
    deviceSets.findIndex((ds) => ds.dataPVCTemplate.spec.storageClassName === selectedSCName);

export const createDeviceSet = (
    scName: string,
    osdSize: string,
    portable: boolean,
    replica: number,
    count: number,
    resources?: ResourceConstraints,
): DeviceSet => ({
    name: `ocs-deviceset-${scName}`,
    count,
    portable,
    replica,
    resources: resources ?? {},
    placement: {},
    dataPVCTemplate: {
        spec: {
            storageClassName: scName,
            accessModes: ['ReadWriteOnce'],
            volumeMode: 'Block',
            resources: {
                requests: {
                    storage: osdSize,
                },
            },
        },
    },
});

export const getDeviceSetCount = (pvCount: number, replica: number): number =>
    Math.floor(pvCount / replica) || 1;

export const filterSC = (sc: StorageClassResourceKind) =>
    !OCS_PROVISIONERS.some((ocsProvisioner: string) => sc?.provisioner?.includes(ocsProvisioner));

const getAssociatedNodes = (pvs: K8sResourceKind[]): string[] => {
    const nodes = pvs.reduce((res, pv) => {
        const matchExpressions: MatchExpression[] =
            pv?.spec?.nodeAffinity?.required?.nodeSelectorTerms?.[0]?.matchExpressions || [];
        matchExpressions.forEach(({ key, operator, values }) => {
            if (key === HOSTNAME_LABEL_KEY && operator === LABEL_OPERATOR) {
                values.forEach((value) => res.add(value));
            }
        });
        return res;
    }, new Set<string>());

    return Array.from(nodes);
};


const getSelectedNodes = (
    scName: string,
    pvData: K8sResourceKind[],
    nodesData: NodeKind[],
): NodeKind[] => {
    const pvs: K8sResourceKind[] = getSCAvailablePVs(pvData, scName);
    const scNodeNames = getAssociatedNodes(pvs);
    const tableData: NodeKind[] = nodesData.filter(
        (node: NodeKind) =>
            scNodeNames.includes(node.metadata.name) ||
            scNodeNames.includes(node.metadata.labels?.['kubernetes.io/hostname']),
    );
    return tableData;
};

const getZone = (node: NodeKind) =>
    node.metadata.labels?.[ZONE_LABELS[0]] || node.metadata.labels?.[ZONE_LABELS[1]];

const hasOCSTaint = (node: NodeKind) => {
    const taints: Taint[] = node.spec?.taints || [];
    return taints.some((taint: Taint) => _.isEqual(taint, ocsTaint));
};


const getNodeInfo = (nodes: NodeKind[]) =>
    nodes.reduce(
        (data, node) => {
            const cpus = humanizeCpuCores(Number(getNodeCPUCapacity(node))).value;
            const memoryRaw = getNodeAllocatableMemory(node);
            const memory = convertToBaseValue(memoryRaw);
            const zone = getZone(node);
            data.cpu += cpus;
            data.memory += memory;
            if (zone && (hasOCSTaint(node) || hasNoTaints(node))) data.zones.add(zone);
            return data;
        },
        {
            cpu: 0,
            memory: 0,
            zones: new Set<string>(),
        },
    );

const countNodesPerZone = (nodes: NodeKind[]) =>
    nodes.reduce((acc, curr) => {
        const zone = getZone(curr);
        acc.hasOwnProperty(zone) ? (acc[zone] += 1) : (acc[zone] = 1);
        return acc;
    }, {});

export const isArbiterSC = (
    scName: string,
    pvData: K8sResourceKind[],
    nodesData: NodeKind[],
): boolean => {
    const tableData: NodeKind[] = getSelectedNodes(scName, pvData, nodesData);
    const uniqZones: Set<string> = new Set(nodesData.map(getZone));
    const uniqSelectedNodesZones: Set<string> = getNodeInfo(tableData).zones;
    if (_.compact([...uniqZones]).length < 3) return false;
    if (uniqSelectedNodesZones.size !== 2) return false;
    const zonePerNode = countNodesPerZone(tableData);
    return Object.keys(zonePerNode).every((zone) => zonePerNode[zone] >= 2);
};

const getRack = (node: NodeKind) => node.metadata.labels?.[RACK_LABEL];

const getTopologyInfo = (nodes: NodeKind[]) =>
    nodes.reduce(
        (data, node) => {
            const zone = getZone(node);
            const rack = getRack(node);
            if (zone && (hasOCSTaint(node) || hasNoTaints(node))) data.zones.add(zone);
            if (rack && (hasOCSTaint(node) || hasNoTaints(node))) data.racks.add(rack);
            return data;
        },
        {
            zones: new Set<string>(),
            racks: new Set<string>(),
        },
    );

export const isValidTopology = (
    scName: string,
    pvData: K8sResourceKind[],
    nodesData: NodeKind[],
): boolean => {
    const tableData: NodeKind[] = getSelectedNodes(scName, pvData, nodesData);

    /** For AWS scenario, checking if PVs are in 3 different zones or not
     *  For Baremetal/Vsphere scenario, checking if PVs are in 3 different racks or not
     */
    const { zones, racks } = getTopologyInfo(tableData);
    return zones.size >= MINIMUM_NODES || racks.size >= MINIMUM_NODES;
};