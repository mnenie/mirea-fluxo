<script setup lang="ts">
import type { Risk } from '~/types/order.interface'

defineProps<{
  risks?: Risk[]
}>()
</script>

<template>
  <div class="w-full px-6 pt-6">
    <h3 class="text-sm text-neutral-500 font-medium mb-6">
      {{ $t('order.rhm') }}
    </h3>
    <div class="flex flex-col gap-4">
      <span v-for="risk, idx in risks" :key="idx" class="text-sm text-neutral-500">
        <span class="font-medium">#{{ +idx + 1 }}</span>
        {{ risk.name }}
      </span>
    </div>
  </div>
</template>
