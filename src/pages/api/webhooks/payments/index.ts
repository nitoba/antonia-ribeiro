import type { WEBHOOK_RESPONSE } from '@/types/mercado-pado.webhook'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json()) as WEBHOOK_RESPONSE

  console.log(body)

  //   const calComService = new CalComService()

  //   const event = await calComService.confirmBooking()

  return new Response(
    JSON.stringify({
      message: 'Webhook recebido com sucesso',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
