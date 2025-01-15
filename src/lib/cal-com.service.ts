import type { CalConfirmBookingResponse } from '@/types/cal-confirm-booking.response'
import type { CalGetBookingResponse } from '@/types/cal-get-booking.response'

export class CalComService {
  private baseUrl = 'https://api.cal.com/v2'

  async confirmBooking(bookingId: string) {
    const url = `${this.baseUrl}/bookings/${bookingId}/confirm`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
      },
    })

    const data = (await response.json()) as CalConfirmBookingResponse

    if (data.error || data.status !== 'success') {
      console.error('Erro ao confirmar a reserva:', data.error)
      return null
    }

    return data.data
  }

  async getBooking(bookingId: string) {
    const url = `${this.baseUrl}/bookings/${bookingId}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CAL_API_KEY}`,
      },
    })

    const data = (await response.json()) as CalGetBookingResponse

    if (data.error || data.status !== 'success') {
      console.error('Erro ao obter a reserva:', data.error)
      return null
    }

    return data.data
  }
}
