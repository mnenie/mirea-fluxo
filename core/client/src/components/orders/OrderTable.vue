<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Department, Heading, Rating as RatingSvg, StatusTable } from '~/assets/svgs-vite'
import { cn } from '~/lib/utils'
import { useOrderStore } from '~/stores/orders'
import { Routes } from '~/utils/contants'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import OrderRow from './table/OrderRow.vue'

const router = useRouter()
const route = useRoute()

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
  <div class="overflow-y-auto h-[calc(100dvh-200px)] w-full bg-white shadow rounded-md">
    <Table>
      <TableCaption class="pb-4">
        A list of all reviews.
      </TableCaption>
      <TableHeader>
        <!-- reusable temlate -->
        <DefineTemplate v-slot="{ content, icon, width }">
          <TableHead :class="cn(width, [content === 'ID' && 'pl-10'])">
            <div class="flex justify-start items-center gap-2">
              <component :is="icon" />
              <span class="2xl:text-sm text-sm md:text-[13px]">{{ content }}</span>
            </div>
          </TableHead>
        </DefineTemplate>

        <TableRow>
          <ReuseTemplate content="ID" />
          <ReuseTemplate content="Status" :icon="StatusTable" />
          <ReuseTemplate content="Department" :icon="Department" />
          <ReuseTemplate content="Heading" :icon="Heading" />
          <ReuseTemplate content="Price" :icon="RatingSvg" width="w-[200px]" />
          <ReuseTemplate content="Calendar" :icon="Calendar" />
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
              @click="router.push(`/orders/${order._id}`), isSheetOpen = true"
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
