<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '~/components/ui/badge'
import { Routes } from '~/utils/contants'

defineProps<{
  price: number
}>()

const formatPrice = computed(() => (price: number): string => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 1,
  })
  return formatter.format(price)
})
</script>

<template>
  <div class="flex flex-row" :class="$route.name === Routes.order ? '' : 'sm:pl-2 md:pl-10'">
    <Badge variant="outline" class="px-1 py-0 flex items-center gap-1">
      <span class="2xl:text-[11px] text-xs text-neutral-600 text-nowrap">
        {{ formatPrice(price) }}
      </span>
    </Badge>
  </div>
</template>
