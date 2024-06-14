<template>
  <div class="flex xl:flex-row flex-col gap-20 items-start">
    <div>
      <div class="join mb-2" @keyup.enter="next">
        <input
          v-if="currentStep === 0"
          v-model="fields.quote"
          class="input input-info join-item"
          placeholder="Something"
          autocapitalize="on"
          autocomplete="on"
          autofocus="true"
        />

        <input
          ref="bookInput"
          v-if="currentStep === 1"
          v-model="fields.book"
          class="input input-info join-item"
          placeholder="Something"
          autocapitalize="on"
          autocomplete="on"
          autofocus="true"
        />

        <input
          ref="pageNumberInput"
          v-if="currentStep === 2"
          v-model="fields.pageNumber"
          class="input input-info join-item"
          placeholder="Something"
          type="number"
          inputmode="numeric"
          autofocus="true"
        />

        <UICta class="join-item" primary @handle-click="next">
          {{ ctaText }}
        </UICta>
      </div>

      <p
        class="text-error"
        v-if="errors.quote || errors.book || errors.pageNumber"
      >
        {{ errors.quote ?? errors.book ?? errors.pageNumber }}
      </p>
    </div>

    <div class="border rounded-lg w-full max-w-3xl">
      <table class="table">
        <thead>
          <tr>
            <th>Quote</th>
            <th>Book</th>
            <th>Page</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(quote, index) in quotes" :key="'quote-' + index">
            <td>{{ quote.quote }}</td>
            <td>{{ quote.book ?? "" }}</td>
            <td>{{ quote.pageNumber ?? "" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const bookInput = ref<HTMLInputElement>();
const pageNumberInput = ref<HTMLInputElement>();

const currentStep = ref<number>(0);
const ctaText = computed(() => (currentStep.value < 2 ? "Next" : "Save"));

type Entry = {
  quote: string;
  book?: string;
  pageNumber?: number;
};

type EntryErrors = Record<keyof Entry, string | null>;

const initialError: EntryErrors = {
  quote: null,
  book: null,
  pageNumber: null,
};

const fields = reactive<Entry>({
  quote: "",
});

const errors = reactive<EntryErrors>(initialError);

const quotes = ref<Entry[]>([]);

function next(): void {
  if (!validate()) {
    return;
  }

  resetErrors();

  if (currentStep.value == 2) {
    currentStep.value = -1;

    quotes.value.push({ ...fields });

    fields.quote = "";
    fields.book = undefined;
    fields.pageNumber = undefined;
  }

  currentStep.value++;

  setTimeout(() => {
    if (currentStep.value === 1) {
      bookInput.value?.focus();
    }

    if (currentStep.value === 2) {
      pageNumberInput.value?.focus();
    }
  }, 100);
}

function validate(): boolean {
  if (!fields.quote) {
    errors.quote = "Please enter a quote";
    return false;
  }

  return true;
}

function resetErrors(): void {
  errors.quote = initialError.quote;
  errors.book = initialError.book;
  errors.pageNumber = initialError.pageNumber;
}
</script>

<style scoped>
table {
  > * > * {
    @apply border-neutral-content border-opacity-15;
  }
}

.join:has(.input:focus) {
  @apply outline outline-2 outline-info outline-offset-2;
}

.input,
.btn {
  @apply !outline-none;
}
</style>
