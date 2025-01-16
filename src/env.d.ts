interface ImportMetaEnv {
  readonly USER_EMAIL: string
  readonly EMAIL_PASSWORD: string
  readonly MERCADO_PAGO_ACCESS_TOKEN: string
  readonly MERCADO_PAGO_WEBHOOK_SECRET: string
  readonly CAL_API_KEY: string
  readonly CAL_EVENT_URL: string
  readonly APP_BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
