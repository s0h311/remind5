<template>
  <div class="grid place-items-center gap-16 tablet:grid-cols-2 tablet:gap-20 desktop:px-[5%]">
    <div class="grid place-items-center gap-10 text-center">
      <h1
        class="text-gradient from-neutral-content to-gray-400 leading-tight"
        v-html="title"
      />

      <h3 v-html="text" />

      <TrackedLink
        v-if="cta"
        class="btn btn-primary w-fit"
        component-name="Hero"
        :tracking-name="cta.title"
        :to="cta.path"
      >
        {{ cta.title }}
      </TrackedLink>
    </div>

    <div
      class="flex flex-col items-center gap-5 rounded-2xl border bg-gradient-to-br from-neutral-content to-gray-400 p-10 tablet:flex-row"
    >
      <NuxtImg
        class="tablet:max-h-2/3 max-h-full object-contain xl:max-h-full"
        src="iphone-email.png"
        height="450"
        width="220"
      />

      <p class="text-5xl text-neutral tablet:text-3xl xl:text-5xl">
        Your <br />
        markings. <br />
        In <br />
        your <br />
        inbox. <br />
        Everyday.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  text: string
  gains?: string[]
  cta?: {
    title: string
    path: string
  }
  customContent?: unknown[]
}>()
</script>
