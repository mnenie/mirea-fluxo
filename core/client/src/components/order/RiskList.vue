<script setup lang="ts">
import { Loader, Map } from '~/assets/svgs-vite'
import type { Risk } from '~/types/order.interface'

defineProps<{
  risks?: Risk[]
  isMapUploading?: boolean
}>()
</script>

<template>
  <div v-if="risks && Array.isArray(risks)" class="w-full px-6 pt-6">
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
  <div v-else>
    <div
      class="px-6 mt-40 text-base text-neutral-400 flex flex-col gap-2 items-center justify-center"
      :class="[isMapUploading ? 'animate-pulse' : '']"
    >
      <Map class="w-[70px] h-[70px]" />
      <div class="flex items-center gap-2">
        <Loader v-if="isMapUploading" class="w-4 h-4 text-neutral-500 animate-spin" />
        <span class="text-sm">{{ $t('order.stages.no_map') }}</span>
      </div>
    </div>
  </div>
</template>
