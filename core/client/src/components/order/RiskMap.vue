<script setup lang="ts">
import { ref, toRef } from 'vue'
import { VueUiHeatmap } from 'vue-data-ui'
import type { Risk } from '~/types/order.interface'
import 'vue-data-ui/style.css'

const props = defineProps<{
  dataset?: Risk[]
}>()

const config = ref({
  style: {
    fontFamily: 'inherit',
    backgroundColor: '#FFFFFFff',
    color: '#1A1A1Aff',
    layout: {
      padding: {
        top: 12,
        right: 12,
        bottom: 0,
        left: 12,
      },
      cells: {
        height: 20,
        value: {
          show: true,
          fontSize: 3,
          bold: true,
          roundingValue: 0,
          color: '#2D353Cff',
          formatter: null,
        },
        colors: {
          hot: '#ff6400',
          cold: '#6376DD',
          underlayer: '#FFFFFF',
        },
        spacing: 0,
        selected: {
          border: 0.9999999999999992,
          color: '#1a1a1a2e',
        },
      },
      dataLabels: { prefix: '', suffix: '', xAxis: { show: true, values: ['W1', 'W2', 'W3', 'W4', 'W5'], color: '#CCCCCC', fontSize: 3, offsetX: 0, offsetY: 0 }, yAxis: { show: false, values: [], fontSize: 3.5, color: '#7a7a7aff', bold: false, offsetX: 0, offsetY: 0 } },
    },
    title: {
      text: '',
    },
    legend: {
      show: false,
    },
    tooltip: {
      show: false,
    },
  },
  userOptions: {
    show: false,
  },
  table: {
    show: false,
  },
})

const refDataset = toRef(() => props.dataset)
</script>

<template>
  <div style="width:100%">
    <VueUiHeatmap :config="config" :dataset="refDataset!" />
  </div>
</template>
