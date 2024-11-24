<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Ai } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

async function generateAllRisks() {
  await orderStore.getRisksByOrderId(order.value._id)
}
</script>

<template>
  <Button size="sm" variant="secondary" class="h-7 text-neutral-700" @click="generateAllRisks">
    <Ai class="mr-1 w-[14px] h-[14px] " />
    <span class="text-xs">{{ $t('order.actions', 1) }}</span>
  </Button>
  <div class="w-px h-3 bg-neutral-200 mx-2" />
</template>
