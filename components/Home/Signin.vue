<template>
  <UISignInWithGoogle
    v-if="user"
    @sign-in-click="signInWithGoogle"
  />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isLoading = ref<boolean>(false)

async function signInWithGoogle(): Promise<void> {
  isLoading.value = true

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/',
    },
  })

  if (error) {
    console.error(error)
  }
}
</script>
