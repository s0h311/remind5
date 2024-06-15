<template>
  <button
    class="btn ring-neutral-content active:ring-2"
    :class="[
      {
        'btn-wide': wide,
        'btn-md': medium,
        'btn-sm': small,
        'btn-outline': outline,
        'btn-disabled': disabled,
      },
      color,
    ]"
    :type="type ? type : 'button'"
    @click="emits('handleClick')"
  >
    <span
      v-if="isLoading"
      class="loading loading-spinner"
    />
    <p
      v-else
      class="flex items-center gap-1"
    >
      <slot />
    </p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  primary?: boolean
  secondary?: boolean
  accent?: boolean
  neutral?: boolean
  outline?: boolean
  error?: boolean
  wide?: boolean
  isLoading?: boolean
  medium?: boolean
  small?: boolean
  type?: 'submit' | 'button'
  disabled?: boolean
}>()

const emits = defineEmits<{
  handleClick: []
}>()

const color = computed(() =>
  props.primary
    ? 'btn-primary'
    : props.secondary
      ? 'btn-secondary'
      : props.accent
        ? 'btn-accent'
        : props.error
          ? 'btn-error'
          : 'btn-neutral'
)
</script>
