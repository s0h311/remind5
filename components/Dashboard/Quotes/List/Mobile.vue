<template>
  <ul class="no-scrollbar mt-5 max-h-[75dvh] overflow-y-auto">
    <li
      class="mb-3 grid gap-5 rounded-lg border px-4 py-5"
      v-for="(quote, index) in quotes"
      :key="quote.id"
    >
      <div class="font-light italic">{{ quote.text }}</div>

      <div
        v-if="quote.bookId || quote.pageNumber"
        class="flex flex-wrap items-center gap-5"
      >
        <div
          v-if="quote.bookId"
          class="w-fit rounded bg-accent px-2 py-1 text-neutral"
        >
          {{ getBookName(quote.bookId) }}
        </div>

        <div class="w-fit rounded bg-info px-2 py-1 text-neutral">
          {{ quote.pageNumber }}
        </div>
      </div>

      <div class="flex items-center gap-5">
        <UICta
          small
          outline
          accent
          @handle-click="$emit('shareQuote', quote)"
        >
          <IconShare xs />
        </UICta>

        <UICta
          small
          outline
          secondary
          @handle-click="$emit('editQuote', quote, index)"
        >
          <IconEdit xs />
        </UICta>

        <UICta
          small
          outline
          error
          @handle-click="$emit('deleteQuote', quote.id, index)"
        >
          <IconDelete xs />
        </UICta>
      </div>
    </li>

    <p v-if="quotes.length === 0">Try adding a quote 👇</p>
  </ul>
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

function getBookName(bookId: Book['id']): Book['name'] | null {
  return props.books.find((b) => b.id === bookId)!.name
}
</script>
