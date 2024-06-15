<template>
  <div class="flex h-full flex-col items-center">
    <DashboardQuotesList
      class="w-4/5"
      :quotes
      :books
      @editQuote="editQoute"
      @deleteQuote="deleteQuote"
    />

    <DashboardQuotesForm
      class="mt-auto"
      :quotes
      :editing-quote="getEditingQuote"
      @add-quote="addQoute"
    />
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/server/supabase/types'
import type { Book, Quote, QuoteInsert } from '~/server/types'

const quotes = await useQuotes()
const books = await useBooks()

const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()

const editingQuote = useEditingQuote()

const getEditingQuote = computed(() => {
  const quote = editingQuote.value
  if (!quote) {
    return null
  }

  const bookName = books.value.find((b) => b.id === quote.quote.bookId)?.name ?? null

  return {
    text: quote.quote.text,
    book: bookName,
    pageNumber: quote.quote.pageNumber,
  }
})

async function addQoute(quote: QuoteInsert): Promise<void> {
  if (editingQuote.value) {
    await updateQoute(quote)
    return
  }

  const tempBookId = new Date().getTime()

  quotes.value.push({
    text: quote.text,
    bookId: tempBookId,
    pageNumber: quote.pageNumber,
  } as Quote)

  let bookId = null

  if (quote.book) {
    books.value.push({
      id: tempBookId,
      name: quote.book,
    } as Book)

    const { data: insertBookData, error: insertBookError } = await supabase
      .from('book')
      .insert({
        name: quote.book,
      })
      .select()
      .single()

    if (insertBookError) {
      console.error(insertBookError)
      return
    }

    const currentBook = books.value.find((b) => b.id === tempBookId)!
    currentBook.id = insertBookData.id
    currentBook.createdAt = insertBookData.created_at

    const currentQuote = quotes.value.find((q) => q.bookId === tempBookId)!
    currentQuote.bookId = insertBookData.id

    bookId = insertBookData.id
  }

  const { error } = await supabase.from('quote').insert({
    user_id: user.value!.id,
    text: quote.text,
    book_id: bookId,
    page_number: quote.pageNumber,
  })

  if (error) {
    console.error(error)
  }
}

function editQoute(quote: Quote, index: number): void {
  editingQuote.value = { quote, index }
}

async function updateQoute(quote: QuoteInsert): Promise<void> {
  const tempBookId = new Date().getTime()

  quotes.value.splice(editingQuote.value!.index, 1, {
    text: quote.text,
    bookId: tempBookId,
    pageNumber: quote.pageNumber,
  } as Quote)

  let bookId = null

  if (quote.book) {
    books.value.push({
      id: tempBookId,
      name: quote.book,
    } as Book)

    const { data: insertBookData, error: insertBookError } = await supabase
      .from('book')
      .insert({
        name: quote.book,
      })
      .select()
      .single()

    if (insertBookError) {
      console.error(insertBookError)
      return
    }

    const currentBook = books.value.find((b) => b.id === tempBookId)!
    currentBook.id = insertBookData.id
    currentBook.createdAt = insertBookData.created_at

    const currentQuote = quotes.value.find((q) => q.bookId === tempBookId)!
    currentQuote.bookId = insertBookData.id

    bookId = insertBookData.id
  }

  const { error } = await supabase
    .from('quote')
    .update({
      text: quote.text,
      book_id: bookId,
      page_number: quote.pageNumber,
    })
    .eq('id', editingQuote.value!.quote.id)

  if (error) {
    console.error(error)
  }

  editingQuote.value = null
}

async function deleteQuote(quoteId: Quote['id'], index: number): Promise<void> {
  quotes.value.splice(index, 1)

  const { error } = await supabase.from('quote').delete().eq('id', quoteId)

  if (error) {
    console.error(error)
  }
}
</script>
