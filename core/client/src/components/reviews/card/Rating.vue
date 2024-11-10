<script setup lang="ts">
import { RatingStar } from '~/assets/svgs-vite'

defineProps<{
  stars: number
}>()
</script>

<template>
  <div class="flex flex-row px-4">
    <span class="2xl:text-[11px] text-xs text-neutral-500">{{ stars }}/5 </span>
    <RatingStar class="w-2 h-2 text-blue-600" />
  </div>
</template>
