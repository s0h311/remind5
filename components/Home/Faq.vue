<template>
  <UIAccordation
    id="faq"
    title="Frequently Asked Questions"
    :items
  />
</template>

<script setup lang="ts">
const items = [
  {
    title: 'How does it work?',
    content:
      'First add the phrases and quotes that are important to you. This way you will receive 5 random quotes to your email. This method is called spaced repition, it helps you remember valuable things longer.',
  },
  {
    title: 'Can I change the frequency and the number of quotes?',
    content: "Currently this is not possible. But I'm working on it, it will be possible very soon.",
  },
  {
    title: 'How do I sign up?',
    content:
      'If you have a Google account, you just need to sign in. If you want me to add more sign up methods. Let us know: support@reffect.org',
  },
  {
    title: 'Can I make feature requests?',
    content: 'Yes. Your feedback is valuable. Just write us an email: support@reffect.org. We will get work on it ASAP',
  },
  {
    title: 'Is Remind5 free?',
    content: 'Yes it is completely free :) You can become a supporter for $1 monthly.',
  },
]
</script>
