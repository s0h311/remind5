<template>ACCOUNT</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Account Settings',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
