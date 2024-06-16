import logger from '~/utils/logger'

export type MailAttachment = {
  name: string
  url: string
  content?: string
}

export type MailData = {
  recipient: {
    name: string
    email: string
  }
  params?: Record<string, any>
  templateId: number
  attachments?: MailAttachment[]
}

export async function sendMail({ recipient, params, templateId, attachments }: MailData): Promise<void> {
  if (!shouldSendEmail()) {
    return
  }

  const apiKey = getApiKey()

  const body: Record<string, unknown> = {
    to: [
      {
        name: recipient.name,
        email: recipient.email,
      },
    ],
    templateId,
  }

  if (params) {
    body['params'] = params
  }

  if (attachments) {
    body['attachment'] = attachments
  }

  const { status, statusText } = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'post',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      contentType: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (status > 399) {
    throw logger.error(statusText, 'MailClient - send', true, { body })
  }
}

function getApiKey(): string {
  if (process.env.BREVO_API_KEY === undefined) {
    throw logger.error('brevo api key is missing', 'MailClient - getApiKey', true)
  }

  return process.env.BREVO_API_KEY
}

function shouldSendEmail(): boolean {
  if (process.env.SEND_EMAILS === 'false') {
    logger.warn('Skipping email', 'MailClient - shouldSendEmail')
    return false
  }

  return true
}
