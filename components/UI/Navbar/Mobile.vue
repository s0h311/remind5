<template>
  <nav>
    <div class="flex items-center justify-between">
      <button
        aria-label="Menu"
        @click="showSideMenu = true"
      >
        <IconMenu />
      </button>

      <HomeLogo />
    </div>

    <aside
      class="fixed top-0 z-10 h-[100dvh] w-3/5 rounded-r bg-neutral-content p-5 text-neutral duration-300 ease-out"
      :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
    >
      <div class="flex flex-col gap-5">
        <button
          class="mb-5"
          @click="showSideMenu = false"
        >
          <IconX class="ml-auto" />
        </button>

        <TrackedLink
          v-if="additionalLinks && additionalLinks.length > 0"
          v-for="{ path, title, icon } in additionalLinks"
          class="flex items-center gap-2"
          :key="'mobile-link-' + path"
          component-name="Mobile Navbar"
          :tracking-name="title"
          :to="path"
        >
          <component
            v-if="icon"
            :is="icon"
          />

          {{ title }}
        </TrackedLink>

        <div v-if="additionalComponent">
          <component :is="additionalComponent" />
        </div>

        <hr class="border-neutral" />

        <TrackedLink
          v-for="{ path, title } in links"
          class="flex items-center gap-2"
          :key="'mobile-link-' + path"
          component-name="Mobile Navbar"
          :tracking-name="title"
          :to="path"
          @handle-click="showSideMenu = false"
        >
          {{ title }}
        </TrackedLink>
      </div>
    </aside>
  </nav>
</template>

<script setup lang="ts">
import type { Component, Link } from '../types'

defineProps<{
  links: Link[]
  additionalLinks?: Link[]
  additionalComponent?: Component
}>()

const showSideMenu = ref<boolean>(false)
</script>
