<template>
  <UINavbarMobile
    class="tablet:hidden"
    :links
    :additional-links
    :additional-component
  />

  <UINavbarDesktop
    class="max-[767px]:hidden desktop:px-[10%]"
    :links
    :additional-links
    :additional-component
  />
</template>

<script setup lang="ts">
import type { Component, Link } from '../types'

defineProps<{
  links: Link[]
  additionalLinks?: Link[]
  additionalComponent?: Component
}>()
</script>
