import { SetFeatureFlag } from "@openshift-console/dynamic-plugin-sdk";

export const ODF_MODEL_FLAG = 'ODF_MODEL';
export const OCS_INDEPENDENT_FLAG = 'OCS_INDEPENDENT';
export const OCS_CONVERGED_FLAG = 'OCS_CONVERGED';
export const ODF_MANAGED_FLAG = 'ODF_MANAGED';
export const LSO_FLAG = 'LSO';
export const RGW_FLAG = 'RGW';
export const MCG_STANDALONE = 'MCG_STANDALONE';
// Based on the existence of NooBaaSystem
export const MCG_FLAG = 'MCG';
// Based on the existence of CephCluster
export const CEPH_FLAG = 'CEPH';
// Based on the existence of StorageCluster
export const OCS_FLAG = 'OCS';

export enum FEATURES {
  // Flag names to be prefixed with "OCS_" so as to seperate from console flags
  OCS_MULTUS = 'OCS_MULTUS',
  OCS_ARBITER = 'OCS_ARBITER',
  OCS_KMS = 'OCS_KMS',
  OCS_FLEXIBLE_SCALING = 'OCS_FLEXIBLE_SCALING',
  OCS_TAINT_NODES = 'OCS_TAINT_NODES',
  OCS_THICK_PROVISION = 'OCS_THICK_PROVISION',
  OCS_POOL_MANAGEMENT = 'OCS_POOL_MANAGEMENT',
  OCS_NAMESPACE_STORE = 'OCS_NAMESPACE_STORE',
  ODF_MCG_STANDALONE = 'ODF_MCG_STANDALONE',
  ODF_HPCS_KMS = 'ODF_HPCS_KMS',
  ODF_VAULT_SA_KMS = 'ODF_VAULT_SA_KMS',
  SS_LIST = 'ODF_SS_LIST',
  ADD_CAPACITY = 'ODF_ADD_CAPACITY',
}

export const OCS_FEATURE_FLAGS = {
  // [flag name]: <value of flag in csv annotation>
  [FEATURES.OCS_MULTUS]: 'multus',
  [FEATURES.OCS_ARBITER]: 'arbiter',
  [FEATURES.OCS_KMS]: 'kms',
  [FEATURES.OCS_FLEXIBLE_SCALING]: 'flexible-scaling',
  [FEATURES.OCS_TAINT_NODES]: 'taint-nodes',
  [FEATURES.OCS_THICK_PROVISION]: 'thick-provision',
  [FEATURES.OCS_POOL_MANAGEMENT]: 'pool-management',
  [FEATURES.OCS_NAMESPACE_STORE]: 'namespace-store',
  [FEATURES.ODF_MCG_STANDALONE]: 'mcg-standalone',
  [FEATURES.ODF_HPCS_KMS]: 'hpcs-kms',
  [FEATURES.ODF_VAULT_SA_KMS]: 'vault-sa-kms',
};

export const setODFFlag = (setFlag: SetFeatureFlag) => setFlag(ODF_MODEL_FLAG, true);
