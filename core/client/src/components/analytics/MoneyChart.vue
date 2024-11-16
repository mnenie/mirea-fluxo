<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { computed, markRaw, ref } from 'vue'
import { VueUiKpi, type VueUiKpiConfig } from 'vue-data-ui'
import { useBreakpoints } from '~/composables/useBreakpoints'
import type { Chart } from '~/types/chart.interface'
import ChartItemWrapper from './ChartItemWrapper.vue'

const { width } = useWindowSize()

const { breakpoints } = useBreakpoints()

const chartHeight = computed(() => {
  if (breakpoints.between('intermediateLaptop', 'intermediateDesktop').value) {
    return '120px'
  }
  return '90px'
})
const fontSizeChart = computed(() => (width.value >= 1500 ? 26 : 22))

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

const dataset = ref(2450000)

const chart = markRaw<Chart>({
  section: 'money',
})
</script>

<template>
  <ChartItemWrapper :chart width="600px" :height="chartHeight">
    <VueUiKpi :config="config" :dataset="dataset" />
  </ChartItemWrapper>
</template>
