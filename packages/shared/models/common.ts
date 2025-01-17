import { K8sKind } from '@openshift-console/dynamic-plugin-sdk/lib/api/common-types';

export const PersistentVolumeModel: K8sKind = {
  label: 'PersistentVolume',
  // t('plugin__odf-console~PersistentVolume')
  labelKey: 'plugin__odf-console~PersistentVolume',
  apiVersion: 'v1',
  plural: 'persistentvolumes',
  abbr: 'PV',
  kind: 'PersistentVolume',
  id: 'persistentvolume',
  labelPlural: 'PersistentVolumes',
  // t('plugin__odf-console~PersistentVolumes')
  labelPluralKey: 'plugin__odf-console~PersistentVolumes',
};

export const PersistentVolumeClaimModel: K8sKind = {
  label: 'PersistentVolumeClaim',
  // t('plugin__odf-console~PersistentVolumeClaim')
  labelKey: 'plugin__odf-console~PersistentVolumeClaim',
  apiVersion: 'v1',
  plural: 'persistentvolumeclaims',
  abbr: 'PVC',
  namespaced: true,
  kind: 'PersistentVolumeClaim',
  id: 'persistentvolumeclaim',
  labelPlural: 'PersistentVolumeClaims',
  // t('plugin__odf-console~PersistentVolumeClaims')
  labelPluralKey: 'plugin__odf-console~PersistentVolumeClaims',
};

export const NodeModel: K8sKind = {
  apiVersion: 'v1',
  label: 'Node',
  // t('plugin__odf-console~Node')
  labelKey: 'plugin__odf-console~Node',
  plural: 'nodes',
  abbr: 'N',
  kind: 'Node',
  id: 'node',
  labelPlural: 'Nodes',
  // t('plugin__odf-console~Nodes')
  labelPluralKey: 'plugin__odf-console~Nodes',
};

export const NamespaceModel: K8sKind = {
  apiVersion: 'v1',
  label: 'Namespace',
  // t('plugin__odf-console~Namespace')
  labelKey: 'plugin__odf-console~Namespace',
  plural: 'namespaces',
  abbr: 'NS',
  kind: 'Namespace',
  id: 'namespace',
  labelPlural: 'Namespaces',
  // t('plugin__odf-console~Namespaces')
  labelPluralKey: 'plugin__odf-console~Namespaces',
};

export const ConfigMapModel: K8sKind = {
  apiVersion: 'v1',
  label: 'ConfigMap',
  // t('plugin__odf-console~ConfigMap')
  labelKey: 'plugin__odf-console~ConfigMap',
  plural: 'configmaps',
  abbr: 'CM',
  namespaced: true,
  kind: 'ConfigMap',
  id: 'configmap',
  labelPlural: 'ConfigMaps',
  // t('plugin__odf-console~ConfigMaps')
  labelPluralKey: 'plugin__odf-console~ConfigMaps',
};

export const SecretModel: K8sKind = {
  apiVersion: 'v1',
  label: 'Secret',
  // t('plugin__odf-console~Secret')
  labelKey: 'plugin__odf-console~Secret',
  plural: 'secrets',
  abbr: 'S',
  namespaced: true,
  kind: 'Secret',
  id: 'secret',
  labelPlural: 'Secrets',
  // t('plugin__odf-console~Secrets')
  labelPluralKey: 'plugin__odf-console~Secrets',
};

export const StorageClassModel: K8sKind = {
  label: 'StorageClass',
  // t('plugin__odf-console~StorageClass')
  labelKey: 'plugin__odf-console~StorageClass',
  labelPlural: 'StorageClasses',
  // t('plugin__odf-console~StorageClasses')
  labelPluralKey: 'plugin__odf-console~StorageClasses',
  apiVersion: 'v1',
  apiGroup: 'storage.k8s.io',
  plural: 'storageclasses',
  abbr: 'SC',
  namespaced: false,
  kind: 'StorageClass',
  id: 'storageclass',
};

export const PodModel: K8sKind = {
  apiVersion: 'v1',
  label: 'Pod',
  // t('plugin__odf-console~Pod')
  labelKey: 'plugin__odf-console~Pod',
  plural: 'pods',
  abbr: 'P',
  namespaced: true,
  kind: 'Pod',
  id: 'pod',
  labelPlural: 'Pods',
  // t('plugin__odf-console~Pods')
  labelPluralKey: 'plugin__odf-console~Pods',
};

export const CustomResourceDefinitionModel: K8sKind = {
  label: 'CustomResourceDefinition',
  // t('plugin__odf-console~CustomResourceDefinition')
  labelKey: 'plugin__odf-console~CustomResourceDefinition',
  apiGroup: 'apiextensions.k8s.io',
  apiVersion: 'v1',
  abbr: 'CRD',
  namespaced: false,
  plural: 'customresourcedefinitions',
  kind: 'CustomResourceDefinition',
  id: 'customresourcedefinition',
  labelPlural: 'CustomResourceDefinitions',
  // t('plugin__odf-console~CustomResourceDefinitions')
  labelPluralKey: 'plugin__odf-console~CustomResourceDefinitions',
};
