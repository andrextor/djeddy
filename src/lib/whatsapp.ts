export const buildWhatsAppUrl = (number: string, message: string): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`

/** Asks up front for what Eddy needs to quote, so the chat starts with the facts. */
export const buildQuoteMessage = (eventType = ''): string =>
  [
    'Hola Eddy, quiero cotizar un evento.',
    `Tipo: ${eventType}`,
    'Fecha: ',
    'Ciudad: ',
    'Invitados: ',
  ].join('\n')
