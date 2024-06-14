import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/supabase/types'

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    setResponseStatus(event, 401)
    return
  }

  const supabase = await serverSupabaseClient<Database>(event)

  const { data, error } = await supabase
    .from('quote')
    .select(
      `
      *,
      auth.user(
        id
      )  
    `
    )
    .order('last_send', {
      nullsFirst: true,
      ascending: true,
    })

  console.log(data)
})
