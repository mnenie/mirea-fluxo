<script setup lang="ts">
import { computed, markRaw, ref } from 'vue'
import { VueUiDonut } from 'vue-data-ui'
import { useI18n } from 'vue-i18n'
import { useCharts } from '~/composables/useCharts'
import type { Chart } from '~/types/chart.interface'
import ChartItemWrapper from './ChartItemWrapper.vue'

const chartDonut = ref(null)

const { t } = useI18n()
const { chartSummaryValue, generateCvs, generatePdf, generatePng } = useCharts(chartDonut)

const nameSize = computed(() => chartSummaryValue.value - 4)

const config = computed(() => ({
  responsive: false,
  padding: 0,
  customPalette: [],
  useCssAnimation: true,
  useBlurOnHover: true,
  userOptions: {
    show: false,
  },
  style: {
    fontFamily: 'inherit',
    chart: {
      useGradient: false,
      backgroundColor: 'transparent',
      color: '#18181b',
      layout: {
        labels: {
          dataLabels: {
            show: true,
            useLabelSlots: false,
            hideUnderValue: 3,
          },
          value: {
            rounding: 0,
            show: true,
            formatter: null,
          },
          percentage: {
            color: '#18181b',
            bold: true,
            fontSize: chartSummaryValue.value,
            rounding: 0,
            formatter: null,
          },
          name: {
            color: '#71717a',
            bold: false,
            fontSize: nameSize.value,
          },
          hollow: {
            show: false,
            total: {
              show: false,
            },
            average: {
              show: false,
            },
          },
        },
        donut: {
          strokeWidth: 64,
          borderWidth: 1,
          useShadow: false,
        },
      },
      comments: {
        show: false,
        showInTooltip: true,
      },
      legend: {
        show: false,
      },
      tooltip: {
        show: false,
      },
    },
  },
}))

const dataset = ref([
  {
    name: t('analytics.charts.summary.dataset', 0),
    values: [10],
    color: '#538BF3',
  },
  {
    name: t('analytics.charts.summary.dataset', 1),
    values: [34],
    color: '#d4d4d8',
  },
])

const chart = markRaw<Chart>({
  section: 'summary',
})
</script>

<template>
  <ChartItemWrapper
    :chart="chart"
    width="600px"
    @generate-csv="generateCvs"
    @generate-pdf="generatePdf"
    @generate-png="generatePng"
  >
    <VueUiDonut ref="chartDonut" :config="config" :dataset="dataset" style="padding-top: 0" />
  </ChartItemWrapper>
</template>
