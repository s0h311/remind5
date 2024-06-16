<template></template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sign Up to Remind5.com',
})

definePageMeta({
  middleware: [
    async () => {
      const user = useSupabaseUser()
      const { withGoogle } = useSignIn()

      if (user.value) {
        return navigateTo('/dashboard')
      }
      await withGoogle()
    },
  ],
})
</script>
