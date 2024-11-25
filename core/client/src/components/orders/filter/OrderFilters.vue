<script setup lang="ts">
import { ref } from 'vue'
import { Arrow, Filter, Sort } from '~/assets/svgs-vite'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useOrdersPagination } from '~/composables/useOrdersPagination'
import { useOrderStore } from '~/stores/orders'

const ordersStore = useOrderStore()
const { selectOrderPage, itemsPerPage, currentPage } = useOrdersPagination()
const dateSortOrder = ref<'asc' | 'desc'>('asc')
const priceSortOrder = ref<'asc' | 'desc'>('asc')

function sortByDate() {
  ordersStore.sortByDate(dateSortOrder.value)
  selectOrderPage(currentPage.value, itemsPerPage.value)
  if (dateSortOrder.value === 'asc') {
    dateSortOrder.value = 'desc'
  }
  else {
    dateSortOrder.value = 'asc'
  }
}

function sortByPrice() {
  ordersStore.sortByPrice(priceSortOrder.value)
  selectOrderPage(currentPage.value, itemsPerPage.value)
  if (priceSortOrder.value === 'asc') {
    priceSortOrder.value = 'desc'
  }
  else {
    priceSortOrder.value = 'asc'
  }
}
</script>

<template>
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
          <Sort class="text-neutral-600 min-w-[14px] min-h-[14px]" />
          <span class="2xl:text-[13px] text-sm text-neutral-800">
            {{ $t('orders.filters', 1) }}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem @click="sortByPrice">
          <div class="flex items-center gap-2">
            <Arrow :class="priceSortOrder === 'asc' ? '' : `rotate-180`" />
            По цене
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem @click="sortByDate">
          <div class="flex items-center gap-2">
            <Arrow :class="dateSortOrder === 'asc' ? '' : `rotate-180`" />
            По дате создания
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
