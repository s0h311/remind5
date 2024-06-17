import { objectToCamel } from 'ts-case-convert'
import type { Database } from '~/server/supabase/types'
import type { Subscription } from '~/server/types'
import logger from '~/utils/logger'

export async function useSubscription(): Promise<Ref<Subscription | null>> {
  const subscription = useState<Subscription | null>('subscription', () => null)

  if (subscription.value) {
    return subscription
  }

  const user = useSupabaseUser()
  const supabase = useSupabaseClient<Database>()

  if (!user.value) {
    return subscription
  }

  logger.warn('FETCHING', 'useSubscription')

  const { data, error } = await supabase.from('subscription').select().eq('user_id', user.value.id).single()

  if (error) {
    logger.error(error.message, 'useSubscription')
    return subscription
  }

  subscription.value = objectToCamel(data)

  return subscription
}
