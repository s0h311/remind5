import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { useCache } from '~/server/cache'
import { Database } from '~/server/supabase/types'
import { Subscription } from '~/server/types'
import logger from '~/utils/logger'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)

  const user = await serverSupabaseUser(event)

  if (!user) {
    return setResponseStatus(event, 401)
  }

  const { sessionId } = await readBody(event)

  if (!sessionId) {
    return setResponseStatus(event, 400)
  }

  const cache = useCache()
  const hasItem = await cache.hasItem(sessionId)

  if (!hasItem) {
    return setResponseStatus(event, 403)
  }

  const subscriptionType = (await cache.getItem(sessionId)) as Subscription['type']

  const { data: subscriptionInsertData, error: subscriptionInsertError } = await supabase
    .from('subscription')
    .insert({
      type: subscriptionType,
      payment_period: 'lifetime',
    })
    .select()
    .single()

  if (subscriptionInsertError) {
    throw logger.error(JSON.stringify(subscriptionInsertError), 'Subscription Patch API', true, { userId: user.id })
  }

  await cache.removeItem(sessionId)

  const { error: userUpdateError } = await supabase.auth.updateUser({
    data: {
      subscription_id: subscriptionInsertData.id,
    },
  })

  if (userUpdateError) {
    throw logger.error(JSON.stringify(userUpdateError), 'Subscription Patch API', true, {
      userId: user.id,
      subscriptionId: subscriptionInsertData.id,
    })
  }
})
