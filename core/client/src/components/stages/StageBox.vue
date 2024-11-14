<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { History } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
</script>

<template>
  <div class="sticky bottom-0 z-[9999999999] bg-white w-full mt-auto px-6 flex flex-col items-center justify-center">
    <div class="flex flex-col w-full items-center">
      <Button variant="secondary" class="w-full backdrop:blur-sm text-neutral-600 justify-between">
        {{ $t('order.stages.add') }}
        <div class="text-sm text-neutral-400 flex items-center gap-1">
          <History class="w-[14px] h-[14px]" />
          {{ order.stages.length }}
        </div>
      </Button>
    </div>
  </div>
</template>
