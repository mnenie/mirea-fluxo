<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { Loader, Reload } from '~/assets/svgs-vite'
import OrderFilters from '~/components/orders/filter/OrderFilters.vue'
import OrderTable from '~/components/orders/OrderTable.vue'
import TablePagination from '~/components/orders/TablePagination.vue'
import { Button } from '~/components/ui/button'
import { useOrderStore } from '~/stores/orders'

useHead({
  title: 'Fluxo | Orders',
})

const ordersStore = useOrderStore()
const { isPendingOrders } = storeToRefs(ordersStore)

const { width } = useWindowSize()

const eventSource = ref<EventSource | null>(null)

onMounted(async () => {
  await ordersStore.getOrders()
  eventSource.value = ordersStore.getSseOrders()
})

onUnmounted(() => {
  if (eventSource.value) {
    eventSource.value.close()
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="width > 800" class="flex flex-row items-center justify-between mb-4">
      <OrderFilters />
      <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
        <Reload class="text-neutral-600 min-w-[14px] min-h-[14px]" />
        <span class="2xl:text-[13px] text-sm text-neutral-800">
          {{ $t('orders.filters', 2) }} 👌
        </span>
      </Button>
    </div>
    <OrderTable v-if="!isPendingOrders" />
    <TablePagination v-if="!isPendingOrders" />
    <div v-else class="w-full h-[calc(100vh-300px)] flex items-center justify-center">
      <Loader class="w-10 h-10 text-neutral-500 animate-spin" />
    </div>
  </div>
</template>
