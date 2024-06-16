<template>
  <UIPricing
    id="pricing"
    title="Pricing"
    :pricing-options="pricingOptions"
    cta-title="Sign Up"
    :handle-fn="handleGoToCheckout"
  />
</template>

<script setup lang="ts">
import type { PricingOption } from '../UI/Pricing.vue'

const pricingOptions: (PricingOption & { priceId: string })[] = [
  {
    title: 'Free',
    newPrice: 'free',
    paymentPeriod: 'lifetime',
    paymentPeriodText: 'forever',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for all'],
    isPremium: false,
    description: `Nothing to describe. It's free.`,
    priceId: 'price_1PQNqGBzByKpK824WA1OuCOV',
  },
  {
    title: 'Supporter',
    newPrice: 1,
    paymentPeriod: 'monthly',
    paymentPeriodText: 'monthly',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for all', 'Supporting the creator'],
    isPremium: true,
    description: `Thank you for your support.`,
    priceId: 'price_1PQNk3BzByKpK8248oDvzkGT',
  },
]

async function handleGoToCheckout(pricingOptionIndex: number): Promise<void> {
  navigateTo('/signup')
  return

  const pricingOption = pricingOptions[pricingOptionIndex]

  const stripeCheckoutUrl: string = await $fetch('/api/stripe/checkout', {
    method: 'post',
    body: {
      priceId: pricingOption.priceId,
      paymentPeriod: pricingOption.paymentPeriod,
    },
  })

  await navigateTo(stripeCheckoutUrl, { external: true })
}
</script>
