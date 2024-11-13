<script setup lang="ts">
import { computed, markRaw, ref, watch } from 'vue'
import { VueUiStackbar } from 'vue-data-ui'
import { useCharts } from '~/composables/useCharts'
import { useExpanded } from '~/composables/useExpanded'
import type { Chart } from '~/types/chart.interface'
import ChartItemWrapper from './ChartItemWrapper.vue'

const expanded = useExpanded()
const { isExpanded } = expanded.getExpanded()

const valuesColor = computed(() => '#52525b')
const gridColor = computed(() => '#f4f4f5')

const chartKey = ref(0)

const graphSize = computed(() => ({
  width: isExpanded.value ? 800 : 880,
  height: isExpanded.value ? 380 : 300,
}))

const chartStackbar = ref(null)

const { chartOrdersValue, generateCvs, generatePdf, generatePng } = useCharts(chartStackbar)

const config = computed<any>(() => ({
  responsive: false,
  customPalette: [],
  useCssAnimation: true,
  orientation: 'vertical',
  table: { show: false },
  userOptions: { show: false },
  style: {
    chart: {
      backgroundColor: 'transparent',
      color: '#538BF3',
      height: graphSize.value.height,
      width: graphSize.value.width,
      padding: { top: 20, right: 36, bottom: 20, left: 36 },
      title: {
        text: '',
        color: '#1A1A1A',
        fontSize: 20,
        bold: true,
        textAlign: 'center',
        subtitle: { color: '#A1A1A1', text: '', fontSize: 16, bold: false },
      },
      legend: { show: false },
      zoom: { show: false },
      tooltip: { show: false },
      highlighter: { color: '#1A1A1A', opacity: '5' },
      bars: {
        gapRatio: '0.5',
        distributed: false,
        borderRadius: 0,
        strokeWidth: 1,
        gradient: { show: false, intensity: '0' },
        totalValues: { show: false },
        dataLabels: { show: false },
      },
      grid: {
        scale: { ticks: '10' },
        x: {
          showHorizontalLines: true,
          axisColor: gridColor.value,
          timeLabels: {
            show: true,
            values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            fontSize: chartOrdersValue.value,
            color: valuesColor.value,
          },
        },
        y: {
          showVerticalLines: false,
          axisColor: gridColor.value,
          axisLabels: { show: true, color: valuesColor.value, fontSize: chartOrdersValue.value },
        },
      },
    },
  },
}))

watch(graphSize, () => {
  chartKey.value += 1
})

const dataset = ref([{ name: 'boards', series: [5, 2, 10, 2, 1, 5, 5, 9, 7, 3, 1, 4], color: '#538BF3' }])

const chart = markRaw<Chart>({
  section: 'orders',
  title: 'Orders in our workspace',
})
</script>

<template>
  <ChartItemWrapper
    :chart="chart"
    width="100%"
    @generate-pdf="generatePdf"
    @generate-png="generatePng"
    @generate-csv="generateCvs"
  >
    <VueUiStackbar ref="chartStackbar" :key="chartKey" :config="config" :dataset="dataset" />
  </ChartItemWrapper>
</template>
