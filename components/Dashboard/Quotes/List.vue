<template>
  <div
    ref="rootList"
    class="rounded-lg border px-6 py-5 text-sm"
  >
    <button @click="share">SHARE</button>

    <div class="row mb-5 grid items-center gap-5 font-semibold text-base-content/60">
      <div>Quote</div>
      <div>Book</div>
      <div>Page</div>
      <div>Actions</div>
    </div>

    <div class="max-h-[70svh] overflow-y-auto">
      <div
        class="row grid items-center gap-5 border-t border-neutral-content border-opacity-15 py-2"
        v-for="(quote, index) in quotes"
        :key="quote.id"
      >
        <div class="font-light italic">{{ quote.text }}</div>

        <div
          class="w-fit rounded bg-accent py-1 text-neutral"
          :class="{ 'px-2': getBookName(quote.bookId) }"
        >
          {{ getBookName(quote.bookId) ?? '' }}
        </div>

        <div
          class="w-fit rounded bg-info py-1 text-neutral"
          :class="{ 'px-2': !!quote.pageNumber }"
        >
          {{ quote.pageNumber ?? '' }}
        </div>

        <div class="flex items-center justify-between gap-2">
          <UICta
            small
            outline
            accent
            @handle-click="$emit('editQuote', quote, index)"
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
      </div>
    </div>
  </div>
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
}>()

const { png } = useHtmlToImage()
const rootList = ref<HTMLDivElement>()

async function share(): Promise<void> {
  const dataUrl = await png(rootList.value!)

  const blob = await (await fetch(dataUrl)).blob()

  await navigator.share({
    title: 'Image',
    text: 'text',
    files: [new File([blob], 'image.png')],
  })
}

function getBookName(bookId: Book['id'] | null): Book['name'] | null {
  if (!bookId) return null

  return props.books.find((b) => b.id === bookId)!.name
}
</script>

<style scoped>
.row {
  text-align: start;
  grid-template-columns: 4fr 2fr 0.5fr 1.2fr;
}
</style>
