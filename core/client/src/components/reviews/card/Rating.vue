<script setup lang="ts">
import { RatingStar } from '~/assets/svgs-vite'

defineProps<{
  stars: number
}>()
</script>

<template>
  <div class="flex flex-row">
    <span class="text-xs text-neutral-500">{{ stars }}/5 </span>
    <RatingStar class="w-2 h-2 text-yellow-500" />
  </div>
</template>
