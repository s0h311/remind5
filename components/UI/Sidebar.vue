<template>
  <aside class="flex h-[100dvh] w-fit flex-col gap-5 border-r p-10">
    <div class="mb-5">
      <slot />
    </div>

    <NuxtLink
      v-for="{ title, path } in links"
      :key="path"
      class="rounded-lg px-3 py-2"
      :class="route.path === path ? 'text-natural-content bg-neutral' : 'hover:bg-neutral-content hover:text-neutral'"
      :to="path"
    >
      {{ title }}
    </NuxtLink>

    <div
      v-if="(bottomLinks && bottomLinks.length > 0) || (bottomBtns && bottomBtns.length > 0)"
      class="mt-auto grid justify-items-start gap-2 text-sm"
    >
      <NuxtLink
        v-for="{ title, path } in bottomLinks"
        :key="path"
        class="rounded-lg px-3 py-2"
        :class="route.path === path ? 'text-natural-content bg-neutral' : 'hover:bg-neutral-content hover:text-neutral'"
        :to="path"
      >
        {{ title }}
      </NuxtLink>

      <button
        v-for="(btn, btnIndex) in bottomBtns"
        :key="'btn' + btnIndex"
        class="rounded-lg px-3 py-2 hover:bg-neutral-content hover:text-neutral"
        @click="btn.handleFn"
      >
        {{ btn.title }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Btn, Link } from './types'

defineProps<{
  links: Link[]
  bottomLinks?: Link[]
  bottomBtns?: Btn[]
}>()

const route = useRoute()
</script>
