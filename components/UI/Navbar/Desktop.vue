<template>
  <nav class="grid place-items-center desktop:grid-cols-3">
    <NuxtLink
      class="place-self-start"
      to="/"
    >
      <HomeLogo />
    </NuxtLink>

    <div class="space-x-3 desktop:space-x-7">
      <TrackedLink
        v-for="link in links"
        class="hover:underline"
        :key="'desktop-link-' + link.path"
        component-name="Desktop Navbar"
        :tracking-name="link.title"
        :to="link.path"
      >
        {{ link.title }}
      </TrackedLink>
    </div>

    <div
      v-if="additionalLinks && additionalLinks.length > 0"
      class="space-x-3 justify-self-end"
    >
      <TrackedLink
        v-for="additionalLink in additionalLinks"
        class="flex items-center gap-2 hover:underline"
        :key="'desktop-link-' + additionalLink.path"
        component-name="Desktop Navbar"
        :tracking-name="additionalLink.title"
        :to="additionalLink.path"
      >
        <component
          v-if="additionalLink.icon"
          :is="additionalLink.icon"
        />

        {{ additionalLink.title }}
      </TrackedLink>
    </div>

    <div
      v-if="additionalComponent"
      class="justify-self-end"
    >
      <component :is="additionalComponent" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { Component, Link } from '../types'

defineProps<{
  links: Link[]
  additionalLinks?: Link[]
  additionalComponent?: Component
}>()
</script>

<style scoped>
.navbar {
  grid-template-columns: 1fr 2fr 1fr;
}
</style>
