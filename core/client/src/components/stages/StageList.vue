<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { NoComments } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'
import { Badge } from '../ui/badge'
import StageItem from './stage/StageItem.vue'

const orderStore = useOrderStore()
const { order, totalOrderPriceByStages } = storeToRefs(orderStore)

const layer: number = 0

const notNeededPrice = computed(() => order.value && order.value.price && totalOrderPriceByStages.value! > order.value.price)
</script>

<template>
  <div v-if="!order.stages || !order || order.stages.length === 0" class="px-6 mt-36 text-base text-neutral-400 flex flex-col gap-2 items-center justify-center">
    <NoComments class="w-[50px] h-[50px]" />
    <span class="text-sm">{{ $t('order.stages.no_stages') }}</span>
  </div>
  <div v-else class="px-6 mt-12 pb-10 flex flex-col gap-6 h-full">
    <div class="flex items-center justify-between">
      <p class="text-sm text-neutral-500 font-semibold">
        {{ $t('order.stages.container.section', 1) }}
      </p>
      <div class="text-sm text-neutral-500 font-semibold flex items-center gap-2">
        {{ $t('order.stages.container.section', 0) }}
        <Badge
          variant="outline"
          class="px-1 py-0 flex items-center gap-1"
          :class="notNeededPrice ? 'text-red-600' : ''"
        >
          <span class="text-xs">
            {{ totalOrderPriceByStages }} {{ $t('order.stages.container.value', 1) }}
          </span>
        </Badge>
      </div>
    </div>
    <StageItem v-for="stage, idx in order.stages" :key="idx" :stage="stage" :layer="layer" />
  </div>
</template>
