<template>
  <div class="flex h-full flex-col items-center">
    <DashboardQuotesListContainer
      :quotes
      :books
      @edit-quote="editQoute"
      @delete-quote="deleteQuote"
      @share-quote="shareQuote"
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

    bookId = insertBookData.id
  }

  const currentQuote = quotes.value.find((q) => q.bookId === tempBookId)!
  currentQuote.bookId = bookId

  const { data, error } = await supabase
    .from('quote')
    .insert({
      user_id: user.value!.id,
      text: quote.text,
      book_id: bookId,
      page_number: quote.pageNumber,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
  } else {
    currentQuote.id = data.id
  }
}

function editQoute(quote: Quote, index: number): void {
  editingQuote.value = { quote, index }
}

async function updateQoute(quote: QuoteInsert): Promise<void> {
  const tempBookId = new Date().getTime()

  quotes.value.splice(editingQuote.value!.index, 1, {
    id: editingQuote.value!.quote.id,
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

    bookId = insertBookData.id
  }

  const currentQuote = quotes.value.find((q) => q.bookId === tempBookId)!
  currentQuote.bookId = bookId

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

const { png } = useHtmlToImage()

async function shareQuote(quote: Quote): Promise<void> {
  const div = document.createElement('div')
  div.className = 'px-7 py-6 flex flex-col justify-between w-[400px] h-[400px] bg-primary-content'

  const remind5Div = document.createElement('div')
  div.appendChild(remind5Div)
  remind5Div.innerText = 'Remind5.com'
  remind5Div.className = 'text-xs bg-neutral-content text-primary-content px-2 py-1 rounded w-fit'

  const quoteDiv = document.createElement('div')
  div.appendChild(quoteDiv)
  quoteDiv.innerText = quote.text
  quoteDiv.className = 'italic font-light text-center'

  let bookName = ''
  if (quote.bookId) {
    const book = books.value.find((b) => b.id === quote.bookId)
    const bookDiv = document.createElement('div')
    div.appendChild(bookDiv)
    bookName = book!.name
    bookDiv.innerText = bookName
    bookDiv.className = 'ml-auto text-xs'
  }

  document.body.appendChild(div)
  const dataUrl = await png(div)

  const blob = await (await fetch(dataUrl)).blob()
  const fileName = `${new Date().getTime()}.png`
  const file = new File([blob], fileName)

  try {
    await navigator.share({
      files: [file],
    })
  } catch {
    const url = new URL('https://twitter.com/intent/tweet')
    let text = quote.text

    if (bookName) {
      text += '\r\n\r\n' + bookName
    }

    url.searchParams.set('text', text)
    window.open(url, '_blank')
  }

  div.remove()
}
</script>
