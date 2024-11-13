<script setup lang="ts">
import type { Chart } from '~/types/chart.interface'
import { Badge } from '../ui/badge'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  chart: Chart
  width: string
  height?: string
}>()
</script>

<template>
  <div class="container" :style="{ maxWidth: width, height }">
    <div class="flex items-center justify-evenly mb-4 w-full">
      <div class="flex items-center gap-3 w-full">
        <p class="text-sm font-medium">
          {{ chart.title }}
        </p>
        <Badge variant="secondary" class="text-neutral-600">
          {{ chart.section }}
        </Badge>
      </div>
    </div>
    <div class="flex items-center justify-center w-full h-full">
      <slot />
    </div>
    <span v-if="chart.section === 'money'" class="text-xs text-neutral-400">
      {{ chart.description }}
    </span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  border: 1px solid var(--zinc-200);
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  flex-direction: column;
  align-items: center;
  height: fit-content;
  gap: 10px;
  width: 100%;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -moz-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
