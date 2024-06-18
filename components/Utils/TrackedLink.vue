<template>
  <a
    class="cursor-pointer"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  componentName: string
  trackingName: string
  to: string
}>()

const emits = defineEmits<{
  handleClick: []
}>()

const { trackAndNavigate } = useTracking(props.componentName)

function handleClick(): void {
  emits('handleClick')
  trackAndNavigate(props.trackingName, props.to)
}
</script>
