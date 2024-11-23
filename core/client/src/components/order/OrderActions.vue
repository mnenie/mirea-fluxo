<script setup lang="ts">
import { Ai } from '~/assets/svgs-vite'
import { Button } from '../ui/button'

// TODO

// const orderStore = useOrderStore()
// const { totalOrderPriceByStages, order } = storeToRefs(orderStore)

// const isDisabled = computed(() => totalOrderPriceByStages.value! > order.value.price)

// const generatePDF = async () => await useJsToPdf(imagePath, order, totalOrderPriceByStages as ComputedRef<number>)
</script>

<template>
  <Button size="sm" variant="secondary" class="h-7 text-neutral-700">
    <Ai class="mr-1 w-[14px] h-[14px] " />
    <span class="text-xs">{{ $t('order.actions', 1) }}</span>
  </Button>
  <div class="w-px h-3 bg-neutral-200 mx-2" />
</template>
