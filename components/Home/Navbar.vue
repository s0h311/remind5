<template>
  <UINavbarDecider
    :links
    :additional-component
    :additional-links
  />
</template>

<script setup lang="ts">
import SignIn from './SignIn.vue'
import LoginIcon from '../Icon/Login.vue'
import type { Component, Link } from '../UI/types'

const user = useSupabaseUser()

const additionalComponent = computed<Component | undefined>(() => {
  if (user.value) return undefined

  return SignIn
})

const links: Link[] = [
  {
    title: 'Pricing',
    path: '/#pricing',
  },
  {
    title: 'FAQ',
    path: '/#faq',
  },
]

const additionalLinks = computed<Link[]>(() => {
  if (!user.value) return []

  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: LoginIcon,
    },
  ]
})
</script>
