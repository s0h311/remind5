import { objectToCamel } from 'ts-case-convert'
import type { Database } from '~/server/supabase/types'
import type { Book } from '~/server/types'

export default async function useBooks(): Promise<Ref<Book[]>> {
  const books = useState<Book[]>('Books', () => [])
  const fetched = useState<boolean>('BooksFetched', () => false)

  if (fetched.value) {
    return books
  }

  const user = useSupabaseUser()

  if (!user.value) {
    return books
  }

  const supabase = useSupabaseClient<Database>()

  const quotes = await useQuotes()
  const bookIds = quotes.value.filter((q) => q.bookId !== null).map((q) => q.bookId)

  const { data, error } = await supabase.from('book').select().in('id', bookIds)

  if (error) {
    console.error(error)
    return books
  }

  books.value = objectToCamel(data)
  fetched.value = true

  return books
}
