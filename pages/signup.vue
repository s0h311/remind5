<template></template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sign Up to Remind5.com',
})

definePageMeta({
  middleware: [
    async (to, from) => {
      const user = useSupabaseUser()
      const { withGoogle } = useSignIn()

      if (user.value) {
        return navigateTo('/dashboard')
      }

      const sessionId = to.query.session_id
      const redirectPath = sessionId ? `?session_id=${sessionId}` : ''

      await withGoogle({ redirectPath })
    },
  ],
})
</script>
