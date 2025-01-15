import { EmailService } from '@/lib/mail/mail.service'
import { paymentRequestTemplateEmail } from '@/lib/mail/templates/payment-request.template'
import { MercadoPagoService } from '@/lib/mercado-pago.service'
import type { WEBHOOK_RESPONSE } from '@/types/cal.webhook'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json()) as WEBHOOK_RESPONSE

  const { triggerEvent, payload } = body

  if (triggerEvent === 'BOOKING_REQUESTED') {
    try {
      const emailService = new EmailService()
      const mercadoPagoService = new MercadoPagoService()
      const costumerName = payload.attendees[0].name
      const appointmentDate = payload.startTime
      const customerEmail = payload.attendees[0].email
      const bookingId = payload.uid

      const paymentLink = await mercadoPagoService.createPaymentIntent({
        amount: 150,
        description: 'Consulta Online com a psicologa - Antonia Ribeiro',
        payerEmail: customerEmail,
        metadata: {
          externalReference: bookingId,
          appointmentDate,
          costumerName,
          customerEmail,
        },
      })

      if (!paymentLink) {
        return new Response(
          JSON.stringify({
            message: 'Erro ao criar o pagamento',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      const subject = '📅 Confirme sua consulta: Um momento só para você'

      const template = paymentRequestTemplateEmail({
        costumerName,
        appointmentDate,
        paymentLink,
      })

      await emailService.sendMail(customerEmail, subject, template)

      return new Response(
        JSON.stringify({ message: 'Email enviado com sucesso!' }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Erro ao enviar o email:', error)
      return new Response(
        JSON.stringify({
          message: 'Erro ao enviar o email',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  }

  return new Response(
    JSON.stringify({
      message: 'Evento não encontrado',
    }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
