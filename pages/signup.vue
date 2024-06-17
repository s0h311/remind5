<template></template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sign Up to Remind5.com',
})

definePageMeta({
  middleware: [
    async (to, _) => {
      const user = useSupabaseUser()
      const { withGoogle } = useSignIn()

      if (user.value) {
        return navigateTo('/dashboard')
      }

      const isSupporter = to.query.is_supporter
      const redirectPath = isSupporter ? `?is_supporter=${isSupporter}` : ''

      await withGoogle({ redirectPath })
    },
  ],
})
</script>
