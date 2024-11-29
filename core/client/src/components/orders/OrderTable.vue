<script setup lang="ts">
import { createReusableTemplate, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Department, Heading, Rating as RatingSvg, StatusTable } from '~/assets/svgs-vite'
import { cn } from '~/lib/utils'
import { useOrderStore } from '~/stores/orders'
import { Routes } from '~/utils/contants'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import OrderRow from './table/OrderRow.vue'

const router = useRouter()
const route = useRoute()
const { tm } = useI18n()

const { width: windowWidth } = useWindowSize()

const orderStore = useOrderStore()
const { ordersPage } = storeToRefs(orderStore)

const sheet = useTemplateRef<InstanceType<typeof Sheet> | null>('sheet')

const isSheetOpen = ref(false)

const isOrder = computed(() => route.name === Routes.order)

function toggleModalRoute() {
  if (sheet.value && !sheet.value.open && route.name === Routes.order) {
    router.back()
  }
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onBeforeMount(() => {
  if (isOrder.value)
    router.push({ name: Routes.orders })
})
</script>

<template>
  <div class="overflow-y-auto h-[calc(100dvh-200px)] max-[800px]:h-[calc(100dvh-160px)] w-full bg-white shadow rounded-md">
    <Table>
      <TableHeader>
        <!-- reusable temlate -->
        <DefineTemplate v-slot="{ plural, icon, width }">
          <TableHead
            :class="cn(width, [(plural === 0 && 'sm:pl-0 md:pl-6')],
                       [plural === 3 && 'max-[800px]:pl-8'],
                       [plural === 5 && 'pr-8'],
                       [plural === 4 && 'sm:pl-4 md:pl-10'])"
          >
            <div class="flex justify-start items-center gap-2">
              <component :is="icon" />
              <span class="2xl:text-sm text-sm md:text-[13px]">{{ tm('orders.table')[plural] }}</span>
            </div>
          </TableHead>
        </DefineTemplate>

        <TableRow>
          <ReuseTemplate v-if="windowWidth > 800" :plural="0" width="w-[260px] min-[1700px]:w-[280px]" />
          <ReuseTemplate :plural="1" :icon="StatusTable" width="w-[140px] min-[1700px]:w-[160px]" />
          <ReuseTemplate v-if="windowWidth > 800" :plural="2" :icon="Department" width="w-[180px] min-[1700px]:w-[200px]" />
          <ReuseTemplate :plural="3" :icon="Heading" />
          <ReuseTemplate :plural="4" :icon="RatingSvg" width="w-[170px]" />
          <ReuseTemplate :plural="5" :icon="Calendar" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <Sheet ref="sheet" v-model:open="isSheetOpen" @update:open="toggleModalRoute">
          <SheetTrigger as-child>
            <OrderRow
              v-for="order in ordersPage"
              :key="order._id"
              :order="order"
              class="cursor-pointer"
              @click="isSheetOpen = true, router.push(`/orders/${order._id}`)"
            />
          </SheetTrigger>
          <SheetContent class="min-w-[560px] !max-w-full w-1/4">
            <RouterView />
          </SheetContent>
        </Sheet>
      </TableBody>
    </Table>
  </div>
</template>
