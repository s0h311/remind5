<template>
  <DashboardQuotesContainer />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
