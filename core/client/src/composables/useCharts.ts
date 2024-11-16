import type { VueUiDonut, VueUiStackbar } from 'vue-data-ui'
import { computed, type ShallowRef } from 'vue'
import { useBreakpoints } from './useBreakpoints'
import { useExpanded } from './useExpanded'

// from Jenda
export function useCharts(chart?: ShallowRef<null | InstanceType<typeof VueUiDonut> | InstanceType<typeof VueUiStackbar>>) {
  const { breakpoints } = useBreakpoints()

  const expanded = useExpanded()
  const { isExpanded } = expanded.getExpanded()

  const isBetweenIntermediateDesktopAnd4K = breakpoints.between('intermediateDesktop', 'desktop4K').value

  const chartWorkloadValue = computed(() => {
    if (isBetweenIntermediateDesktopAnd4K) {
      return isExpanded.value ? 7.7 : 5.8
    }
    return isExpanded.value ? 10 : 8
  })

  const chartOrdersValue = computed(() => {
    if (isBetweenIntermediateDesktopAnd4K) {
      return isExpanded.value ? 10 : 9
    }
    return isExpanded.value ? 13 : 11
  })

  const chartSummaryValue = computed(() => (isBetweenIntermediateDesktopAnd4K ? 14 : 18))

  function generatePng() {
    // @ts-expect-error never type error
    chart!.value.generateImage()
  }
  function generatePdf() {
    // @ts-expect-error never type error
    chart!.value!.generatePdf()
  }
  function generateCvs() {
    // @ts-expect-error never type error
    chart!.value.generateCsv()
  }

  return {
    chartWorkloadValue,
    chartOrdersValue,
    chartSummaryValue,
    generatePng,
    generatePdf,
    generateCvs,
  }
}
