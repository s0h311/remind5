<template>
  <div class="flex h-[100dvh] flex-col">
    <div class="mb-20 grid gap-20 px-5 pt-4 tablet:gap-10 tablet:px-[7%] desktop:px-[10dvw]">
      <HomeNavbar />

      <main>
        <slot />
      </main>
    </div>

    <HomeFooter class="mt-auto" />
  </div>
</template>
