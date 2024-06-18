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
    newPrice: 'FREE',
    hasNoFixedPrice: true,
    paymentPeriod: 'lifetime',
    paymentPeriodText: 'forever',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for all'],
    isPremium: false,
    description: `Nothing to describe. It's free.`,
    priceId: 'free',
  },
  {
    title: 'Supporter',
    newPrice: 'Pay what you want',
    hasNoFixedPrice: true,
    paymentPeriod: 'lifetime',
    paymentPeriodText: 'one time',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for all', 'Supporting the creator'],
    isPremium: true,
    description: `Thank you for your support.`,
    priceId:
      process.env.NODE_ENV === 'development' ? 'price_1PSPTTKDXBGuYX0kpVOpSB6t' : 'price_1PSvm4KDXBGuYX0kizRrtexV',
  },
]

async function handleGoToCheckout(pricingOptionIndex: number): Promise<void> {
  const pricingOption = pricingOptions[pricingOptionIndex]

  if (pricingOption.priceId === 'free') {
    navigateTo('/signup')
    return
  }

  navigateTo('/signup?is_supporter=true')
}
</script>
