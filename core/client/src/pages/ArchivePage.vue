<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { Arrow, Filter, Loader, Reload, Sort } from '~/assets/svgs-vite'
import ArchivePagination from '~/components/orders/archive/ArchivePagination.vue'
import OrderArchiveTable from '~/components/orders/archive/OrderArchiveTable.vue'
import { Button } from '~/components/ui/button'
import { useArchiveStore } from '~/stores/archive'

useHead({
  title: '1CManager | Archive',
})

const archiveStore = useArchiveStore()
const { isPendingOrders } = storeToRefs(archiveStore)

onMounted(async () => {
  await archiveStore.getOrders()
})
</script>

<template>
  <div class="relative w-full h-full">
    <div class="flex flex-row items-center justify-between mb-4">
      <div class="flex flex-row items-center gap-2">
        <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
          <Filter class="text-neutral-600 min-w-[13px] min-h-[13px]" />
          <span class="2xl:text-[13px] text-sm text-neutral-800">
            {{ $t('orders.filters', 0) }}
          </span>
          <div class="w-px h-3 bg-neutral-300 mx-1" />
          <Arrow class="text-neutral-600 min-w-[15px] min-h-[15px]" />
        </Button>
        <!-- вот этот по названию -->
        <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
          <Sort class="text-neutral-600 min-w-[14px] min-h-[14px]" />
          <span class="2xl:text-[13px] text-sm text-neutral-800">
            {{ $t('orders.filters', 1) }}
          </span>
        </Button>
      </div>
      <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
        <Reload class="text-neutral-600 min-w-[14px] min-h-[14px]" />
        <span class="2xl:text-[13px] text-sm text-neutral-800">
          {{ $t('orders.filters', 2) }} 👌
        </span>
      </Button>
    </div>
    <OrderArchiveTable v-if="!isPendingOrders" />
    <ArchivePagination v-if="!isPendingOrders" />
    <div v-else class="w-full h-[calc(100vh-300px)] flex items-center justify-center">
      <Loader class="w-10 h-10 text-neutral-500 animate-spin" />
    </div>
  </div>
</template>
