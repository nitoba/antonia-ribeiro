import { MercadoPagoConfig, Preference } from 'mercadopago'
import type { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'

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
    const preference = {
      items: [
        {
          id: itemId,
          title: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: amount,
        },
      ],
      payer: {
        email: payerEmail,
      },
      back_urls: {
        success: `${import.meta.env.APP_BASE_URL}/payment/success`,
        failure: `${import.meta.env.APP_BASE_URL}/payment/failure`,
      },
      auto_return: 'all',
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
    const payment = new Preference(this.client)
    const response = await payment.get({ preferenceId: paymentId })
    return response
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
}
