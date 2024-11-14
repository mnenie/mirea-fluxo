<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Ai, FileContract } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'

const orderStore = useOrderStore()
const { totalOrderPriceByStages, order } = storeToRefs(orderStore)

const isDisabled = computed(() => totalOrderPriceByStages.value > order.value.price)
</script>

<template>
  <Button :disabled="isDisabled" size="sm" variant="secondary" class="h-7 text-neutral-700">
    <FileContract class="mr-2 w-[14px] h-[14px] " />
    <span class="text-xs">{{ $t('order.actions', 1) }}</span>
  </Button>
  <Button size="sm" variant="secondary" class="h-7 text-neutral-700">
    <Ai class="mr-1 w-[14px] h-[14px] " />
    <span class="text-xs">{{ $t('order.actions', 0) }}</span>
  </Button>
  <div class="w-px h-3 bg-neutral-200 mx-2" />
</template>
