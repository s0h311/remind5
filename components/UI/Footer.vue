<template>
  <footer class="bg-neutral p-7 text-sm text-neutral-content desktop:pb-10 desktop:pt-20">
    <div class="flex flex-col items-start justify-evenly gap-10 tablet:flex-row tablet:gap-0">
      <component
        :is="logo"
        v-bind="logoProps"
      />

      <div class="mb-5 flex flex-row flex-wrap gap-x-20 gap-y-10 desktop:gap-32">
        <ul
          v-if="linksColumn1"
          class="flex flex-col gap-3"
        >
          <p class="text-white">{{ linksColumn1.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn1.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>

        <ul
          v-if="linksColumn2"
          class="flex flex-col gap-3"
        >
          <p class="text-white">{{ linksColumn2.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn2.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>

        <ul
          v-if="linksColumn3"
          class="flex flex-col gap-3"
        >
          <p class="text-white">{{ linksColumn3.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn3.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>
      </div>
    </div>

    <slot />
  </footer>
</template>

<script setup lang="ts">
type Link = {
  title: string
  path: string
  isExtern?: boolean
}

type LinkColumn = {
  title: string
  links: Link[]
}

type Props = {
  linksColumn1?: LinkColumn
  linksColumn2?: LinkColumn
  linksColumn3?: LinkColumn
  logo: unknown
  logoProps: object
}

defineProps<Props>()
</script>
