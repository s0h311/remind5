<template>
  <UISignInWithGoogle @sign-in-click="signInWithGoogle" />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://remind5.vercel.app',
    },
  })

  if (error) {
    console.error(error)
  }
}
</script>
