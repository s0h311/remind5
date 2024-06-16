<template>
  <UIFooter
    :links-column1="otherProdcutsLinks"
    :links-column2="contactLinks"
    :links-column3="legalLinks"
    :logo="HomeLogo"
    :logoProps="{ light: true }"
  />
</template>

<script setup lang="ts">
import HomeLogo from './Logo.vue'

const otherProdcutsLinks = {
  title: 'Other products',
  links: [
    {
      title: 'Feed Monky',
      path: 'https://feedmonky.com',
      isExtern: true,
    },
  ],
}

const contactLinks = {
  title: 'Contact',
  links: [
    {
      title: 'Help',
      path: '/contact',
    },
    {
      title: 'Feedback',
      path: '/contact',
    },
  ],
}

const legalLinks = {
  title: 'Legal',
  links: [
    {
      title: 'Imprint',
      path: '/legal/imprint',
    },
    {
      title: 'Privacy',
      path: '/legal/privacy',
    },
    {
      title: 'Terms',
      path: '/legal/terms',
    },
  ],
}
</script>
