<template>
  <div>
    <h2 class="mb-14 text-center">{{ title }}</h2>

    <ul class="rounded-lg border">
      <li
        v-for="(item, index) in items"
        :key="'item' + index"
        class="w-full text-neutral tablet:w-[800px]"
      >
        <div
          class="flex cursor-pointer select-none items-center justify-between border-neutral bg-neutral-content px-6 py-3 text-lg font-semibold"
          :class="{
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === items.length - 1,
            'border-b': index < items.length - 1,
          }"
          @click="toggle(index)"
        >
          <p class="max-w-[80%]">{{ item.title }}</p>

          <IconArrow
            class="duration-300 ease-in-out"
            :class="{ 'rotate-180': showAnswer === index }"
            md
          />
        </div>

        <div
          class="panel px-6 tracking-wide text-neutral-content"
          :class="showAnswer === index ? 'max-h-[300px] tablet:max-h-[200px]' : 'max-h-0'"
        >
          <br />
          {{ item.content }}
          <br />
          <br />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  items: {
    title: string
    content: string
  }[]
}>()

const showAnswer = ref<number>(-1)

function toggle(itemIndex: number): void {
  if (showAnswer.value === itemIndex) {
    showAnswer.value = -1
    return
  }

  showAnswer.value = itemIndex
}
</script>

<style scoped>
.panel {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
</style>
