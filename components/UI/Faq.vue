<template>
  <div>
    <h2 class="mb-14 text-center">FAQ</h2>

    <div
      class="w-full cursor-pointer rounded-t-lg border bg-neutral-content px-6 py-5 text-lg text-neutral tablet:w-[800px]"
    >
      <div
        class="flex items-center justify-between"
        @click="showAnswer = 0"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, omnis.

        <IconArrow md />
      </div>

      <div
        class="bg-neutral-content text-neutral/70 duration-500 ease-in-out"
        :class="showAnswer === 0 ? 'hidden h-fit' : 'block h-0'"
      >
        illum distinctio nisi repudiandae esse, saepe voluptas nulla pariatur corrupti ea enim sequi iure, libero
        inventore!
      </div>
    </div>
  </div>

  <div class="h-96"></div>
</template>

<script setup lang="ts">
const showAnswer = ref<number>(1)
</script>
