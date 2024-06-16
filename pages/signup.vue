<template></template>

<script setup lang="ts">
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
