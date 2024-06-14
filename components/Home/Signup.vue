<template>
  <div>
    <UICta
      primary
      :is-loading
      @handle-click="signInWithGoogle"
    >
      Signup
    </UICta>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const isLoading = ref<boolean>(false)

async function signInWithGoogle(): Promise<void> {
  isLoading.value = true

  await supabase.auth.signInWithOAuth({ provider: 'google' })
}
</script>
