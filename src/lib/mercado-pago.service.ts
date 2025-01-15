import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import type { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'
import { createHmac } from 'node:crypto'
type CreatePaymentIntent = {
  amount: number
  description: string
  payerEmail: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
}

type PaymentSuccessParams = {
  collection_id: string
  collection_status: 'approved' | 'pending' | 'rejected'
  payment_id: string
  status: 'approved' | 'pending' | 'rejected'
  external_reference: string | null
  payment_type: string
  merchant_order_id: string
  preference_id: string
  site_id: string
  processing_mode: string
  merchant_account_id: string | null
}

export class MercadoPagoService {
  private client = new MercadoPagoConfig({
    accessToken: import.meta.env.MERCADO_PAGO_ACCESS_TOKEN,
    options: { timeout: 5000 },
  })

  async createPaymentIntent({
    amount,
    description,
    payerEmail,
    metadata,
  }: CreatePaymentIntent) {
    const itemId = crypto.randomUUID()
    console.log(import.meta.env.MERCADO_PAGO_ACCESS_TOKEN)
    const preference = {
      items: [
        {
          id: itemId,
          title: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: amount,
          category_id: 'services',
        },
      ],
      payer: {
        email: payerEmail,
      },
      back_urls: {
        success: `${import.meta.env.APP_BASE_URL}/payment/success`,
        failure: `${import.meta.env.APP_BASE_URL}/payment/failure`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'bolbradesco',
          },
          {
            id: 'pec',
          },
        ],
        installments: 4, // Número de parcelas
      },
      external_reference: metadata?.externalReference ?? '',
      metadata,
    } satisfies PreferenceRequest

    try {
      const payment = new Preference(this.client)
      const response = await payment.create({ body: preference })
      return response.init_point
    } catch (error) {
      console.error('Error creating preference:', error)
      throw error
    }
  }

  async getPaymentStatus(paymentId: string) {
    const payment = new Payment(this.client)
    const paymentData = await payment.get({ id: paymentId })
    if (
      paymentData.status === 'approved' || // Pagamento por cartão OU
      paymentData.date_approved !== null // Pagamento por Pix
    ) {
      console.log('Pagamento aprovado', { paymentData })

      return {
        status: 'approved',
        payment_id: paymentId,
        external_reference: paymentData.external_reference,
      }
    }

    console.log('Pagamento pendente', { paymentData })

    return {
      status: 'pending',
      payment_id: paymentId,
      external_reference: paymentData.external_reference,
    }

    // TODO: Implementar lógica para lidar com o pagamento pendente
  }

  static extractPaymentParams(url: string): PaymentSuccessParams {
    const urlParams = new URLSearchParams(new URL(url).search)

    return {
      collection_id: urlParams.get('collection_id') || '',
      collection_status: urlParams.get(
        'collection_status',
      ) as PaymentSuccessParams['collection_status'],
      payment_id: urlParams.get('payment_id') || '',
      status: urlParams.get('status') as PaymentSuccessParams['status'],
      external_reference: urlParams.get('external_reference'),
      payment_type: urlParams.get('payment_type') || '',
      merchant_order_id: urlParams.get('merchant_order_id') || '',
      preference_id: urlParams.get('preference_id') || '',
      site_id: urlParams.get('site_id') || '',
      processing_mode: urlParams.get('processing_mode') || '',
      merchant_account_id: urlParams.get('merchant_account_id'),
    }
  }

  verifyMercadoPagoSignature(request: Request) {
    const xSignature = request.headers.get('x-signature')
    const xRequestId = request.headers.get('x-request-id')
    if (!xSignature || !xRequestId) {
      console.log('Missing x-signature or x-request-id header')
      return false
    }

    const signatureParts = xSignature.split(',')
    let ts = ''
    let v1 = ''
    signatureParts.forEach((part) => {
      const [key, value] = part.split('=')
      if (key.trim() === 'ts') {
        ts = value.trim()
      } else if (key.trim() === 'v1') {
        v1 = value.trim()
      }
    })

    if (!ts || !v1) {
      console.log('Missing ts or v1 in x-signature header')
      return false
    }

    const url = new URL(request.url)
    const dataId = url.searchParams.get('data.id')

    let manifest = ''
    if (dataId) {
      manifest += `id:${dataId};`
    }
    if (xRequestId) {
      manifest += `request-id:${xRequestId};`
    }
    manifest += `ts:${ts};`

    const secret = import.meta.env.MERCADO_PAGO_WEBHOOK_SECRET
    const hmac = createHmac('sha256', secret)
    hmac.update(manifest)
    const generatedHash = hmac.digest('hex')

    if (generatedHash !== v1) {
      console.log('Invalid signature')
      return false
    }

    return true
  }
}
