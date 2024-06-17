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
    priceId: 'free',
  },
  {
    title: 'Supporter',
    newPrice: 1,
    paymentPeriod: 'lifetime',
    paymentPeriodText: 'one time',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for all', 'Supporting the creator'],
    isPremium: true,
    description: `Thank you for your support.`,
    priceId: 'price_1PSPTTKDXBGuYX0kpVOpSB6t',
  },
]

async function handleGoToCheckout(pricingOptionIndex: number): Promise<void> {
  const pricingOption = pricingOptions[pricingOptionIndex]

  if (pricingOption.priceId === 'free') {
    navigateTo('/signup')
  }

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
