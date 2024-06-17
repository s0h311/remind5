<template>
  <dialog
    ref="confirmationDialogRef"
    class="w-[30%] space-y-5 rounded-lg bg-neutral-content p-4"
  >
    <h2 class="text-neutral">{{ title }}</h2>

    <p
      v-if="text"
      class="text-sm"
    >
      {{ text }}
    </p>

    <div class="flex justify-end gap-5">
      <UICta
        :error="!revert"
        :primary="revert"
        @handle-click="closeModal"
      >
        {{ cancelButtonText ?? 'Cancel' }}
      </UICta>

      <UICta
        :error="revert"
        :primary="!revert"
        :is-loading="isLoading"
        @handle-click="handleContinueClick"
      >
        {{ continueButtonText }}
      </UICta>
    </div>
  </dialog>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  text?: string
  cancelButtonText?: string
  continueButtonText: string
  revert?: boolean
}>()

const emits = defineEmits<{
  continueClick: []
}>()

defineExpose({
  closeModal,
  showModal,
})

const confirmationDialogRef = ref<HTMLDialogElement>()
const isLoading = ref<boolean>(false)

function handleContinueClick(): void {
  isLoading.value = true
  emits('continueClick')
}

function closeModal(): void {
  isLoading.value = false
  confirmationDialogRef.value?.close()
}

function showModal(): void {
  confirmationDialogRef.value?.showModal()
}
</script>
