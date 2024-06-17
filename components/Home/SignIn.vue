<template>
  <UISignInWithGoogle @sign-in-click="() => withGoogle({})" />
</template>

<script setup lang="ts">
const { withGoogle } = useSignIn()
</script>
