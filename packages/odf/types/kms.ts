import { SecretKind } from '@odf/shared/types';

export enum ProviderNames {
    VAULT = 'vault',
    HPCS = 'hpcs',
}

export enum VaultAuthMethods {
    TOKEN = 'token',
    KUBERNETES = 'kubernetes',
}

export enum KmsImplementations {
    VAULT = 'vault', // used by rook for token-based vault, also used by ceph-csi for service account of same namespace
    VAULT_TOKENS = 'vaulttokens', // used by ceph-csi for token-based vault
    VAULT_TENANT_SA = 'vaulttenantsa', // used by ceph-csi for tenant service account
    IBM_KEY_PROTECT = 'ibmkeyprotect', // used by both rook & ceph-csi
}

export enum KmsCsiConfigKeysMapping {
  KMS_PROVIDER = 'encryptionKMSType',

  // vault
  VAULT_ADDR = 'vaultAddress',
  VAULT_BACKEND_PATH = 'vaultBackendPath',
  VAULT_CACERT = 'vaultCAFromSecret',
  VAULT_TLS_SERVER_NAME = 'vaultTLSServerName',
  VAULT_CLIENT_CERT = 'vaultClientCertFromSecret',
  VAULT_CLIENT_KEY = 'vaultClientCertKeyFromSecret',
  VAULT_NAMESPACE = 'vaultNamespace',
  VAULT_TOKEN_NAME = 'tenantTokenName',
  VAULT_AUTH_KUBERNETES_ROLE = 'vaultRole',
  VAULT_AUTH_PATH = 'vaultAuthPath',
  VAULT_AUTH_NAMESPACE = 'vaultAuthNamespace',
  VAULT_AUTH_METHOD = 'vaultAuthMethod',
  VAULT_CACERT_FILE = 'vaultCAFileName',
  VAULT_CLIENT_KEY_FILE = 'vaultClientCertKeyFileName',
  VAULT_CLIENT_CERT_FILE = 'vaultClientCertFileName',

  // ibm hpcs
  IBM_SERVICE_INSTANCE_ID = 'ibmServiceInstanceID',
  IBM_KMS_KEY = 'ibmKMSKey',
  IBM_BASE_URL = 'ibmBaseURL',
  IBM_TOKEN_URL = 'ibmTokenURL',

  // ui specific
  KMS_SERVICE_NAME = 'kmsServiceName',
}

export enum KmsEncryptionLevel {
  CLUSTER_WIDE = 'cluster_wide',
  STORAGE_CLASS = 'storage_class',
}

export type KMSConfig = {
    [ProviderNames.VAULT]: VaultConfig;
    [ProviderNames.HPCS]: HpcsConfig;
    provider: ProviderNames;
};

export type VaultConfig = {
    name: {
      value: string;
      valid: boolean;
    };
    address: {
      value: string;
      valid: boolean;
    };
    port: {
      value: string;
      valid: boolean;
    };
    authValue?: {
      value: string;
      valid: boolean;
    };
    authMethod: VaultAuthMethods;
    backend: string;
    caCert: SecretKind;
    caCertFile: string;
    tls: string;
    clientCert: SecretKind;
    clientCertFile: string;
    clientKey: SecretKind;
    clientKeyFile: string;
    providerNamespace: string;
    providerAuthNamespace: string;
    providerAuthPath: string;
    hasHandled: boolean;
};

export type HpcsConfig = {
    name: {
      value: string;
      valid: boolean;
    };
    instanceId: {
      value: string;
      valid: boolean;
    };
    apiKey: {
      value: string;
      valid: boolean;
    };
    rootKey: {
      value: string;
      valid: boolean;
    };
    baseUrl: string;
    tokenUrl: string;
    hasHandled: boolean;
};

export type VaultCommonConfigMap = {
  KMS_PROVIDER: string;
  KMS_SERVICE_NAME: string;
  VAULT_ADDR: string; // address + port
  VAULT_BACKEND_PATH: string;
  VAULT_CACERT?: string;
  VAULT_CACERT_FILE?: string;
  VAULT_TLS_SERVER_NAME?: string;
  VAULT_CLIENT_CERT?: string;
  VAULT_CLIENT_CERT_FILE?: string;
  VAULT_CLIENT_KEY?: string;
  VAULT_CLIENT_KEY_FILE?: string;
  VAULT_NAMESPACE?: string;
  VAULT_AUTH_METHOD?: string;
};

export type VaultTokenConfigMap = {
  VAULT_TOKEN_NAME: string;
} & VaultCommonConfigMap;

export type VaultSAConfigMap = {
  VAULT_AUTH_KUBERNETES_ROLE?: string;
  VAULT_AUTH_PATH?: string;
  VAULT_AUTH_NAMESPACE?: string;
} & VaultCommonConfigMap;

export type VaultConfigMap = VaultTokenConfigMap | VaultSAConfigMap;

export type HpcsConfigMap = {
  KMS_PROVIDER: string;
  KMS_SERVICE_NAME: string;
  IBM_SERVICE_INSTANCE_ID: string;
  IBM_KMS_KEY: string;
  IBM_BASE_URL: string;
  IBM_TOKEN_URL: string;
};

export const VaultAuthMethodMapping: {
  [keys in VaultAuthMethods]: {
    name: string;
    value: VaultAuthMethods;
    supportedEncryptionType: KmsEncryptionLevel[];
  };
} = {
  [VaultAuthMethods.KUBERNETES]: {
    name: 'Kubernetes',
    value: VaultAuthMethods.KUBERNETES,
    supportedEncryptionType: [KmsEncryptionLevel.CLUSTER_WIDE, KmsEncryptionLevel.STORAGE_CLASS],
  },
  [VaultAuthMethods.TOKEN]: {
    name: 'Token',
    value: VaultAuthMethods.TOKEN,
    supportedEncryptionType: [KmsEncryptionLevel.CLUSTER_WIDE, KmsEncryptionLevel.STORAGE_CLASS],
  },
};

export type KMSConfigMap = VaultConfigMap | HpcsConfigMap;

export type KMSConfiguration = VaultConfig | HpcsConfig;
