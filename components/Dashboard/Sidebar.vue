<template>
  <UISidebar
    class="max-[767px]:hidden"
    :links="links"
    :bottom-btns="bottomBtns"
  >
    <HomeLogo />
  </UISidebar>

  <UIMobileSidebar
    class="tablet:hidden"
    :links="links"
    :bottom-btns="bottomBtns"
  >
    <HomeLogo />
  </UIMobileSidebar>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const links = [
  { title: 'Quotes', path: '/dashboard' },
  { title: 'Account', path: '/dashboard/account' },
]

const bottomBtns = [{ title: 'Sign out', handleFn: handleSignout }]

async function handleSignout(): Promise<void> {
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>
