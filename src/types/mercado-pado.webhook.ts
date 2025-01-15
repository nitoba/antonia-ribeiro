export type WEBHOOK_RESPONSE = {
  action: string
  api_version: string
  data: { id: string }
  date_created: string
  id: number
  live_mode: boolean
  type: 'payment'
  user_id: number
}
