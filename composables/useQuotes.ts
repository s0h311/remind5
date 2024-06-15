import { objectToCamel } from 'ts-case-convert'
import type { Database } from '~/server/supabase/types'
import type { Quote } from '~/server/types'

export default async function useQuotes(): Promise<Ref<Quote[]>> {
  const quotes = useState<Quote[]>('quotes', () => [])
  const fetched = useState<boolean>('quotesFetched', () => false)

  if (fetched.value) {
    return quotes
  }

  const user = useSupabaseUser()

  if (!user.value) {
    return quotes
  }

  const supabase = useSupabaseClient<Database>()

  const { data, error } = await supabase
    .from('quote')
    .select()
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return quotes
  }

  quotes.value = objectToCamel(data)
  fetched.value = true

  return quotes
}
