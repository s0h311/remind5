<template>
  <DashboardQuotesContainer />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: [
    (to, from) => {
      console.log(from)

      const sessionId = to.query.session_id
      const code = to.query.code

      if (sessionId || code) {
        console.log(sessionId)
        // TODO make API call
        return
      }

      const user = useSupabaseUser()

      if (!user.value) {
        return navigateTo('/')
      }
    },
  ],
})
</script>
