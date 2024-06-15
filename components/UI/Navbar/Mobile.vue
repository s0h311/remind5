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
      class="fixed top-0 z-10 h-screen w-3/5 rounded-r bg-neutral p-5 text-base-200 duration-300 ease-out"
      :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
    >
      <div class="flex flex-col gap-5">
        <button
          class="mb-5"
          @click="showSideMenu = false"
        >
          <IconX class="ml-auto" />
        </button>

        <a
          v-if="additionalLinks"
          v-for="{ path, title, icon } in additionalLinks"
          class="flex items-center gap-2"
          :key="path"
          @click="trackAndNavigate(title, path)"
        >
          <component
            v-if="icon"
            :is="icon"
          />

          {{ title }}
        </a>

        <div v-if="additionalComponent">
          <component :is="additionalComponent" />
        </div>

        <hr />

        <a
          v-for="{ path, title } in links"
          class="cursor-pointer"
          :key="path"
          @click="
            () => {
              showSideMenu = false
              trackAndNavigate(title, path)
            }
          "
        >
          {{ title }}
        </a>
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

const { trackAndNavigate } = useTracking('Mobile Navbar')
</script>
