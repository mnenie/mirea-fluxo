<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
</script>

<template>
  <div class="relative w-full px-6 py-8 h-full flex flex-col">
    <div class="flex flex-col space-y-3">
      <Skeleton class="w-[240px] h-6" />
      <Skeleton class="w-[360px] h-5" />
    </div>
  </div>
</template>
