<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import MoneyChart from '~/components/analytics/MoneyChart.vue'
import OrdersChart from '~/components/analytics/OrdersChart.vue'
import SummaryChart from '~/components/analytics/SummaryChart.vue'
import WorkloadChart from '~/components/analytics/WorkloadChart.vue'
import { Badge } from '~/components/ui/badge'
import { useBreakpoints } from '~/composables/useBreakpoints'

useHead({
  title: 'Fluxo | Analytics',
})

const { breakpoints } = useBreakpoints()

const containerWith = computed(() => {
  if (breakpoints.greaterOrEqual('intermediateDesktop').value)
    return '600px'
  if (breakpoints.between('intermediateLaptop', 'intermediateDesktop').value)
    return '500px'
  if (breakpoints.between('laptop', 'intermediateLaptop').value)
    return '400px'
  return undefined
})

const badges = ['1CManager', '1C:Enterprise', '1C:Platform']
</script>

<template>
  <div :class="$style.container" class="w-full h-full">
    <div :class="$style.section_about">
      <p class="text-sm">
        {{ $t('analytics.description') }} 👀
      </p>
    </div>
    <div :class="$style.section_badges">
      <Badge v-for="(badge, idx) in badges" :key="idx" variant="outline" class="bg-white">
        {{ badge }}
      </Badge>
    </div>
    <div :class="$style.charts">
      <div :class="$style.charts_container" :style="{ maxWidth: containerWith }">
        <SummaryChart />
        <MoneyChart />
      </div>
      <div :class="$style.charts_container">
        <WorkloadChart />
        <OrdersChart />
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}

.section_badges {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
  }

.section_about {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
}

.charts {
  display: flex;
  padding: 0 10px 0 0;
  gap: 20px;
}

.charts_container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 20px;
  }
</style>
