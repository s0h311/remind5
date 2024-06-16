import { serverSupabaseServiceRole } from '#supabase/server'
import { differenceInDays } from 'date-fns'
import { objectToCamel } from 'ts-case-convert'
import { sendMail } from '~/server/mail/mailClient'
import { Database } from '~/server/supabase/types'
import { groupBy } from '~/utils/objectFns'

type EmailQuote = {
  quoteId: number
  quoteText: string
  pageNumber: number | null
  lastSend: Date | null
  bookName: string | null
  email: string
  name: string
}

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    setResponseStatus(event, 401)
    return
  }

  const supabase = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await supabase.rpc('get_quotes').select()

  if (error) {
    console.log(error)
    return
  }

  const rows: EmailQuote[] = getValidQuotes(
    data.map((r) => ({
      quoteId: r.quote_id,
      quoteText: r.quote_text,
      pageNumber: r.page_number,
      lastSend: r.last_send ? new Date(r.last_send) : null,
      bookName: r.book_name,
      email: r.email,
      name: r.name,
    }))
  )

  const groupedByEmail = groupBy(rows, 'email')

  for (const email in groupedByEmail) {
    const row = groupedByEmail[email]

    if (row.length === 0) {
      continue
    }

    const name = row[0].name
    const reminders = row.map((r) => ({
      quoteText: r.quoteText,
    }))

    await sendMail({
      recipient: {
        email,
        name,
      },
      templateId: 10,
      params: {
        name,
        reminders,
      },
    })
  }

  const quoteIds = rows.map((r) => r.quoteId)
  const todaysDate = new Date().toUTCString()

  await supabase
    .from('quote')
    .update({
      last_send: todaysDate,
    })
    .in('id', quoteIds)
})

function getValidQuotes(emailQuotes: EmailQuote[]): EmailQuote[] {
  const todaysDate = new Date()

  const newQuotes = emailQuotes.filter((q) => q.lastSend === null)

  const resQuotes = emailQuotes
    .filter((q) => q.lastSend !== null)
    .filter((q) => differenceInDays(todaysDate, q.lastSend!) >= 5)
    .toSorted((a, b) => differenceInDays(a.lastSend!, b.lastSend!))

  return [...newQuotes, ...resQuotes].slice(0, 5)
}
