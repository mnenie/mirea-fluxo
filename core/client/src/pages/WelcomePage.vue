<script setup lang="ts">
import HeaderWelcome from '~/components/layout/header/HeaderWelcome.vue'
import MainPart from '~/components/welcome/MainPart.vue'
import PatternBackground from '~/components/welcome/PatternBackground.vue'
</script>

<template>
  <div class="relative h-dvh w-dvw overflow-hidden">
    <HeaderWelcome />
    <PatternBackground>
      <MainPart />
    </PatternBackground>
    <div class="absolute bottom-0 left-0 right-0 z-10 max-w-[1440px] w-full pl-8 pr-8 mx-auto flex flex-col items-center justify-between gap-2 md:h-20 md:flex-row text-sm text-neutral-600">
      <span>© 2024 Open Source</span>
      <span>Released under the MIT License.</span>
    </div>
  </div>
</template>
