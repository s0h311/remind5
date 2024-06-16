<template>
  <UINavbarDecider
    :links="[
      {
        title: 'Pricing',
        path: '/#pricing',
      },
      {
        title: 'FAQ',
        path: '/#faq',
      },
    ]"
    :additional-component="!user ? SignIn : undefined"
    :additional-links="user ? additionalLinks : undefined"
  />
</template>

<script setup lang="ts">
import SignIn from './SignIn.vue'
import LoginIcon from '../Icon/Login.vue'
import type { Link } from '../UI/types'

const user = useSupabaseUser()

const additionalLinks: Link[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LoginIcon,
  },
]
</script>
