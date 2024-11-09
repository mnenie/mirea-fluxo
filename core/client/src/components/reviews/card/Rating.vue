<script setup lang="ts">
import { RatingStar } from '~/assets/svgs-vite'

defineProps<{
  stars: number
}>()
</script>

<template>
  <div class="flex flex-row text-neutral-600">
    <RatingStar v-for="star in stars" :key="star" fill="#eab308" stroke="#eab308" />
    <RatingStar v-for="star in 5 - stars" :key="star" />
  </div>
</template>
