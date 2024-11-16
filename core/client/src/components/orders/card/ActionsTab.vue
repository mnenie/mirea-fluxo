<script setup lang="ts">
import { ReviewChat } from '~/assets/svgs-vite'
</script>

<template>
  <div class="flex flex-row space-x-2 text-neutral-600 relative">
    <ReviewChat class="w-[15px] h-[15px]" />
    <div class="absolute -top-1 -right-0.5 flex items-center justify-center w-2.5 h-2.5 bg-neutral-900 rounded-full">
      <span class="text-[6px] text-white">{{ 2 }}</span>
    </div>
  </div>
</template>
