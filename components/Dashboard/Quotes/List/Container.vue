<template>
  <DashboardQuotesListDesktop
    class="max-[767px]:hidden"
    :quotes
    :books
    @share-quote="(q) => $emit('shareQuote', q)"
    @edit-quote="(qi, i) => $emit('editQuote', qi, i)"
    @delete-quote="(q, i) => $emit('deleteQuote', q, i)"
  />

  <DashboardQuotesListMobile
    class="tablet:hidden"
    :quotes
    :books
    @share-quote="(q) => $emit('shareQuote', q)"
    @edit-quote="(qi, i) => $emit('editQuote', qi, i)"
    @delete-quote="(q, i) => $emit('deleteQuote', q, i)"
  />
</template>

<script setup lang="ts">
import type { Book, Quote } from '~/server/types'

const props = defineProps<{
  quotes: Quote[]
  books: Book[]
}>()

defineEmits<{
  editQuote: [Quote, number]
  deleteQuote: [Quote['id'], number]
  shareQuote: [Quote]
}>()

function getBookName(bookId: Book['id'] | null): Book['name'] | null {
  if (!bookId) {
    return null
  }

  return props.books.find((b) => b.id === bookId)!.name
}
</script>
