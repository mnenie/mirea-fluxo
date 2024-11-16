<script setup lang="ts">
import { ChartMenu, Csv, Pdf, Png } from '~/assets/svgs-vite'
import type { Chart } from '~/types/chart.interface'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  chart: Chart
  width: string
  height?: string
}>()

const emits = defineEmits<{
  (e: 'generateCsv'): void
  (e: 'generatePng'): void
  (e: 'generatePdf'): void
}>()
</script>

<template>
  <div class="container" :style="{ maxWidth: width, height }">
    <div class="flex items-center justify-evenly mb-4 w-full">
      <div class="flex items-center gap-3 w-full">
        <p class="text-sm font-medium">
          {{ $t(`analytics.charts.${chart.section}.title`) }}
        </p>
        <Badge variant="secondary" class="text-neutral-600">
          {{ $t(`analytics.charts.${chart.section}.badge`) }}
        </Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChartMenu
            v-if="chart.section === 'orders'"
            class="min-w-[16px] min-h-[16px] text-neutral-600 cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-0 w-fit shadow-none bg-transparent border-none">
          <DropdownMenuItem @click="emits('generatePdf')">
            <Pdf class="min-w-[16px] min-h-[16px] text-neutral-600 cursor-pointer" />
          </DropdownMenuItem>
          <DropdownMenuItem @click="emits('generatePng')">
            <Png class="min-w-[16px] min-h-[16px] text-neutral-600 cursor-pointer" />
          </DropdownMenuItem>
          <DropdownMenuItem @click="emits('generateCsv')">
            <Csv class="min-w-[16px] min-h-[16px] text-neutral-600 cursor-pointer" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="flex items-center justify-center w-full h-full">
      <slot />
    </div>
    <span v-if="chart.section === 'money'" class="text-xs text-neutral-400">
      {{ $t(`analytics.charts.${chart.section}.description`) }}
    </span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  border: 1px solid var(--zinc-200);
  padding: 10px;
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
