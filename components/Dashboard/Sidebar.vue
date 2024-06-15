<template>
  <UISidebar
    :links="links"
    :bottom-links="bottomLinks"
    :bottom-btns="bottomBtns"
  >
    <HomeLogo />
  </UISidebar>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const links = [{ title: 'Quotes', path: '/dashboard' }]

const bottomLinks = [{ title: 'Account', path: '/dashboard/account' }]

const bottomBtns = [{ title: 'Sign out', handleFn: handleSignout }]

async function handleSignout(): Promise<void> {
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>
