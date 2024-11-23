<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, markRaw } from 'vue'
import { VueUiKpi, type VueUiKpiConfig } from 'vue-data-ui'
import { useBreakpoints } from '~/composables/useBreakpoints'
import { useOrderStore } from '~/stores/orders'
import type { Chart } from '~/types/chart.interface'
import ChartItemWrapper from './ChartItemWrapper.vue'

const { width } = useWindowSize()

const { breakpoints } = useBreakpoints()

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)

const chartHeight = computed(() => {
  if (breakpoints.between('intermediateLaptop', 'intermediateDesktop').value) {
    return '120px'
  }
  return '90px'
})
const fontSizeChart = computed(() => (width.value >= 1500 ? 26 : 22))

const totlatPrice = computed(() => orders.value.reduce((acc, order) => acc + order.price, 0))

const config = computed<VueUiKpiConfig>(() => ({
  animationFrames: 40,
  animationValueStart: 0,
  prefix: '~',
  useAnimation: true,
  valueBold: true,
  valueFontSize: fontSizeChart.value,
  valueRounding: 0,
  formatter: null,
  valueColor: '#2563eb',
}))

const chart = markRaw<Chart>({
  section: 'money',
})
</script>

<template>
  <ChartItemWrapper :chart width="600px" :height="chartHeight">
    <VueUiKpi :config="config" :dataset="totlatPrice" />
  </ChartItemWrapper>
</template>
