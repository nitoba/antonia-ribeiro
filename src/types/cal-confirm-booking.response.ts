export type CalConfirmBookingResponse = {
  status: string
  data: {
    id: number
    uid: string
    title: string
    description: string
    hosts: Array<{
      id: number
      name: string
      username: string
      timeZone: string
    }>
    status: string
    cancellationReason: string
    reschedulingReason: string
    rescheduledFromUid: string
    start: string
    end: string
    duration: number
    eventTypeId: number
    eventType: {
      id: number
      slug: string
    }
    meetingUrl: string
    location: string
    absentHost: boolean
    createdAt: string
    metadata: Record<string, any>
    attendees: Array<{
      name: string
      email: string
      timeZone: string
      phoneNumber: string
      language: string
    }>
    guests: Array<string>
    bookingFieldsResponses: {
      customField: string
    }
  }
  error: any
}
