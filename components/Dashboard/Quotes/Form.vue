<template>
  <div class="w-full tablet:w-1/2">
    <div
      class="join mb-2 w-full"
      @keyup.enter="next"
    >
      <input
        ref="qouteInput"
        v-if="currentStep === 0"
        v-model="fields.text"
        class="input join-item input-info w-full"
        placeholder="Quote"
        autocapitalize="sentences"
        autocomplete="on"
        autofocus="true"
      />

      <input
        ref="bookInput"
        v-if="currentStep === 1"
        v-model="fields.book"
        class="input join-item input-info w-full"
        placeholder="Book (optional)"
        autocapitalize="sentence"
        autocomplete="on"
        autofocus="true"
      />

      <input
        ref="pageNumberInput"
        v-if="currentStep === 2"
        v-model="fields.pageNumber"
        class="input join-item input-info w-full"
        placeholder="Page number (optional)"
        type="number"
        inputmode="numeric"
        autofocus="true"
        min="1"
        onkeyup="this.value=this.value.replace(/[^\d]/,'')"
      />

      <UICta
        class="join-item"
        primary
        @handle-click="next"
      >
        {{ ctaText }}
      </UICta>
    </div>

    <p
      class="text-error"
      v-if="errors.text || errors.book || errors.pageNumber"
    >
      {{ errors.text ?? errors.book ?? errors.pageNumber }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { QuoteInsert } from '~/server/types'

const props = defineProps<{
  editingQuote: QuoteInsert | null
}>()

const emits = defineEmits<{
  addQuote: [QuoteInsert]
}>()

watch(props, (newValue, _) => {
  const editingQuote = newValue.editingQuote

  console.log('editingQuote', editingQuote)

  if (editingQuote) {
    fields.text = editingQuote.text
    fields.book = editingQuote.book
    fields.pageNumber = editingQuote.pageNumber
    focusInput()
    return
  }

  resetFields()
})

const qouteInput = ref<HTMLInputElement>()
const bookInput = ref<HTMLInputElement>()
const pageNumberInput = ref<HTMLInputElement>()

const currentStep = ref<number>(0)
const ctaText = computed(() => (currentStep.value < 2 ? 'Next' : 'Save'))

type InputErrors = Record<keyof QuoteInsert, string | null>

const initialFields: QuoteInsert = {
  text: '',
  book: null,
  pageNumber: null,
}

const initialError: InputErrors = {
  text: null,
  book: null,
  pageNumber: null,
}

const fields = reactive<QuoteInsert>({ ...initialFields })

const errors = reactive<InputErrors>({ ...initialError })

function next(): void {
  if (!validate()) {
    return
  }

  resetErrors()

  if (currentStep.value == 2) {
    currentStep.value = -1

    emits('addQuote', { ...fields })

    resetFields()
  }

  currentStep.value++

  setTimeout(focusInput, 100)
}

function focusInput(): void {
  if (currentStep.value === 0) {
    qouteInput.value?.focus()
  }

  if (currentStep.value === 1) {
    bookInput.value?.focus()
  }

  if (currentStep.value === 2) {
    pageNumberInput.value?.focus()
  }
}

function validate(): boolean {
  if (!fields.text) {
    errors.text = 'Please enter a quote'
    return false
  }

  return true
}

function resetFields(): void {
  fields.text = initialFields.text
  fields.book = initialFields.book
  fields.pageNumber = initialFields.pageNumber
}

function resetErrors(): void {
  errors.text = initialError.text
  errors.book = initialError.book
  errors.pageNumber = initialError.pageNumber
}
</script>

<style scoped>
.join:has(.input:focus) {
  @apply outline outline-2 outline-offset-2 outline-info;
}

.input,
.btn {
  @apply !outline-none;
}
</style>
