<template>
  <DashboardQuotesContainer />

  <UIConfirmationDialog
    ref="confirmationDialog"
    title="Thank you for supporting us!"
    continue-button-text="Continue"
    @continue-click="initCheckout"
  />
</template>

<script setup lang="ts">
import type { UIConfirmationDialog } from '#build/components'

useSeoMeta({
  title: 'Dashboard',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['sign-up'],
})

const confirmationDialog = ref<InstanceType<typeof UIConfirmationDialog>>()

const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()

onMounted(() => {
  const isSupporter = route.query.is_supporter

  if (isSupporter === 'true') {
    confirmationDialog.value?.showModal()
  }

  const code = route.query.code

  if (code) {
    router.replace({ query: { isSupporter } })
  }
})

async function initCheckout(): Promise<void> {
  const stripeCheckoutUrl: string = await $fetch('/api/stripe/checkout', {
    method: 'post',
    body: {
      priceId: 'price_1PSPTTKDXBGuYX0kpVOpSB6t',
      paymentPeriod: 'lifetime',
      additionalData: {
        userId: user.value!.id,
      },
    },
  })

  await navigateTo(stripeCheckoutUrl, { external: true })
}
</script>
