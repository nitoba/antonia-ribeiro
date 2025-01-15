interface ImportMetaEnv {
  readonly USER_EMAIL: string
  readonly EMAIL_PASSWORD: string
  readonly MERCADO_PAGO_ACCESS_TOKEN: string
  readonly CAL_API_KEY: string
  readonly APP_BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
