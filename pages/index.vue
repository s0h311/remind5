<template>
  <div class="grid place-items-center gap-20 tablet:mt-14 tablet:gap-36 desktop:mt-20 desktop:gap-52">
    <HomeHero />
    <HomePainsAndGains />
    <HomePricing />
    <HomeFaq />
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Never forget what you read.',
  description:
    'Remind5.com sends you 5 random book markings via email every day. This way, you will remember what you read.',
})
</script>
