import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import logger from '~/utils/logger'
import { Database } from '../supabase/types'

export default defineEventHandler(async (event): Promise<void> => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw logger.error('Unable to delete user, no user found', 'Account Delete API', true)
  }

  const supabase = serverSupabaseServiceRole<Database>(event)

  // DELETE QUOTES
  const { error: deleteQuotesError } = await supabase.from('quote').delete().eq('user_id', user.id)

  if (deleteQuotesError) {
    throw logger.error(deleteQuotesError.message, 'Account Delete API - delete', true, { userId: user.id })
  }

  // DELETE SUBSCRIPTION
  const { error: deleteSubscriptionError } = await supabase.from('subscription').delete().eq('user_id', user.id)

  if (deleteSubscriptionError) {
    throw logger.error(deleteSubscriptionError.message, 'Account Delete API - delete', true, { userId: user.id })
  }

  // DELETE USER
  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id)

  if (deleteUserError) {
    throw logger.error(deleteUserError.message, 'Account Delete API  - delete', true, { userId: user.id })
  }
})
