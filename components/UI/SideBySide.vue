<template>
  <div class="grid place-items-center gap-16 tablet:grid-cols-2 tablet:gap-20 desktop:px-[5%]">
    <div class="grid place-items-center gap-10 text-center">
      <h1
        class="text-gradient from-neutral-content to-gray-400 leading-tight"
        v-html="title"
      />

      <h3 v-html="text" />

      <a
        id="hero-cta"
        v-if="cta"
        class="btn btn-primary w-fit"
        @click="trackAndNavigate(cta.title, cta.path)"
      >
        {{ cta.title }}
      </a>
    </div>

    <div
      class="flex flex-col items-center gap-5 rounded-2xl border bg-gradient-to-br from-neutral-content to-gray-400 p-10 tablet:flex-row"
    >
      <NuxtImg
        class="tablet:w-2/3 xl:w-full"
        src="iphone-email.png"
        height="400"
        width="auto"
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
type Props = {
  title: string
  text: string
  gains?: string[]
  cta?: {
    title: string
    path: string
  }
  customContent?: unknown[]
}

defineProps<Props>()

const { trackAndNavigate } = useTracking('Hero')
</script>
