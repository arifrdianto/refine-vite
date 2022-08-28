/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RBAC_DOMAIN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
