<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useOrdersPagination } from '~/composables/useOrdersPagination'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '../ui/pagination/'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)

const { selectOrderPage, updateItemsPerPage, itemsPerPage, currentPage } = useOrdersPagination()

const isActiveBtn = computed(() => (count: number) => itemsPerPage.value === count)

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="absolute w-full bottom-0 flex flex-row items-stretch justify-between mt-6">
    <Pagination v-slot="{ page }" :total="orders.length / (itemsPerPage / 10)" :sibling-count="1" show-edges :default-page="1" class="mb-0">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="selectOrderPage(1, itemsPerPage)" />
        <PaginationPrev @click="selectOrderPage(currentPage - 1, itemsPerPage)" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              size="sm"
              class="w-9 h-9 2xl:h-[34px] 2xl:w-[34px] p-0"
              :class="[item.value === page ? 'border border-dashed border-neutral-300' : '']"
              :variant="item.value === page ? 'secondary' : 'outline'"
              @click="selectOrderPage(item.value, itemsPerPage)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="selectOrderPage(currentPage + 1, itemsPerPage)" />
        <PaginationLast @click="selectOrderPage(orders.length / 50, itemsPerPage)" />
      </PaginationList>
    </Pagination>
    <div class="flex flex-row items-center space-x-2">
      <span class="text-sm text-muted-foreground whitespace-nowrap">Отображать на странице: </span>

      <DefineTemplate v-slot="{ count }">
        <Button
          :variant="isActiveBtn(count) ? 'secondary' : 'ghost'"
          class="w-9 2xl:h-[34px] 2xl:w-[34px]"
          size="sm"
          @click="updateItemsPerPage(count)"
        >
          <span class="text-sm text-neutral-500 font-medium">{{ count }}</span>
        </Button>
      </DefineTemplate>

      <ReuseTemplate :count="15" />
      <ReuseTemplate :count="50" />
      <ReuseTemplate :count="100" />
    </div>
  </div>
</template>
