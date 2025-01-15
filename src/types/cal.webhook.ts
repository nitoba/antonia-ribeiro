export type WEBHOOK_RESPONSE = {
  triggerEvent: string
  createdAt: string
  payload: {
    bookerUrl: string
    type: string
    title: string
    description: string
    additionalNotes: string
    // customInputs: {}
    startTime: string
    endTime: string
    organizer: {
      id: number
      name: string
      email: string
      username: string
      timeZone: string
      language: {
        locale: string
      }
      timeFormat: string
      utcOffset: number
    }
    responses: {
      name: {
        label: string
        value: string
        isHidden: boolean
      }
      email: {
        label: string
        value: string
        isHidden: boolean
      }
      location: {
        label: string
        value: {
          value: string
          optionValue: string
        }
        isHidden: boolean
      }
      phone: {
        label: string
        value: string
        isHidden: boolean
      }
      title: {
        label: string
        isHidden: boolean
      }
      notes: {
        label: string
        isHidden: boolean
      }
      guests: {
        label: string
        value: Array<any>
        isHidden: boolean
      }
      rescheduleReason: {
        label: string
        isHidden: boolean
      }
    }
    userFieldsResponses: {
      phone: {
        label: string
        value: string
        isHidden: boolean
      }
    }
    attendees: Array<{
      email: string
      name: string
      firstName: string
      lastName: string
      timeZone: string
      language: {
        locale: string
      }
      utcOffset: number
    }>
    location: string
    conferenceCredentialId: number
    destinationCalendar: Array<{
      id: number
      integration: string
      externalId: string
      primaryEmail: string
      userId: any
      eventTypeId: number
      credentialId: number
      domainWideDelegationCredentialId: any
    }>
    hideCalendarNotes: boolean
    hideCalendarEventDetails: boolean
    requiresConfirmation: boolean
    eventTypeId: number
    seatsShowAttendees: boolean
    seatsPerTimeSlot: any
    seatsShowAvailabilityCount: boolean
    schedulingType: any
    iCalUID: string
    iCalSequence: number
    oneTimePassword: string
    uid: string
    eventTitle: string
    eventDescription: string
    price: number
    currency: string
    length: number
    bookingId: number
    // metadata: {}
    status: string
  }
}
