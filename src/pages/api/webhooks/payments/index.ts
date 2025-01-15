import { CalComService } from '@/lib/cal-com.service'
import { MercadoPagoService } from '@/lib/mercado-pago.service'
import type { WEBHOOK_RESPONSE } from '@/types/mercado-pado.webhook'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const mercadoPagoService = new MercadoPagoService()
  const isValid = mercadoPagoService.verifyMercadoPagoSignature(request)

  if (!isValid) {
    return new Response(
      JSON.stringify({
        message: 'Invalid signature',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const { type, data } = (await request.json()) as WEBHOOK_RESPONSE

  switch (type) {
    case 'payment':
      {
        const { id: paymentId } = data
        const paymentStatus =
          await mercadoPagoService.getPaymentStatus(paymentId)
        console.log('Payment status:', paymentStatus)

        if (paymentStatus.status === 'approved') {
          const bookingId = paymentStatus.external_reference
          const calComService = new CalComService()

          if (!bookingId) {
            console.log('No booking ID found')
            return new Response(
              JSON.stringify({
                message: 'No booking ID found',
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              },
            )
          }

          const booking = await calComService.getBooking(bookingId)

          if (!booking) {
            console.log('No booking found')
            return new Response(
              JSON.stringify({
                message: 'No booking found',
              }),
              {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
              },
            )
          }

          if (booking.status !== 'PENDING') {
            console.log('Booking is not pending')
            return new Response(
              JSON.stringify({
                message: 'Booking is not pending',
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              },
            )
          }

          const bookingConfirmed = await calComService.confirmBooking(
            booking.uid,
          )

          if (!bookingConfirmed) {
            console.log('Booking could not be confirmed')
            return new Response(
              JSON.stringify({
                message: 'Booking could not be confirmed',
              }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
              },
            )
          }

          return new Response(
            JSON.stringify({
              message: 'Booking confirmed',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        if (paymentStatus.status === 'pending') {
          // TODO: Implementar lógica para lidar com o pagamento pendente
          console.log('Pagamento pendente')

          return new Response(
            JSON.stringify({
              message: 'Pagamento pendente',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      }
      break
  }

  return new Response(
    JSON.stringify({
      message: 'Webhook recebido com sucesso',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
