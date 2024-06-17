<template>
  <button
    class="absolute left-5 top-5 tablet:hidden"
    aria-label="Menu"
    @click="showSideMenu = true"
  >
    <IconMenu />
  </button>

  <aside
    class="fixed top-0 z-10 h-[100dvh] w-3/5 rounded-r bg-neutral-content p-5 text-neutral duration-300 ease-out"
    :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
  >
    <div class="flex h-full flex-col gap-5">
      <button @click="showSideMenu = false">
        <IconX
          class="ml-auto"
          md
        />
      </button>

      <NuxtLink
        class="mb-5"
        to="/"
      >
        <slot />
      </NuxtLink>

      <a
        v-for="{ path, title } in links"
        class="cursor-pointer"
        :key="'mobile-sidebar-link-' + path"
        @click="
          () => {
            showSideMenu = false
            trackAndNavigate(title, path)
          }
        "
      >
        {{ title }}
      </a>

      <div
        v-if="bottomBtns && bottomBtns.length > 0"
        class="mt-auto grid justify-items-start gap-5 text-sm"
      >
        <button
          v-for="(btn, btnIndex) in bottomBtns"
          :key="'mobile-btn' + btnIndex"
          @click="btn.handleFn"
        >
          {{ btn.title }}
        </button>
      </div>
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

const showSideMenu = ref<boolean>(false)

const { trackAndNavigate } = useTracking('Mobile Navbar')

const route = useRoute()
</script>
