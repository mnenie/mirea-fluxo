<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Department, Heading, Rating as RatingSvg, StatusTable } from '~/assets/svgs-vite'
import { cn } from '~/lib/utils'
import { useArchiveStore } from '~/stores/archive'
import { Routes } from '~/utils/contants'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import ArchiveRow from './ArchiveRow.vue'

const router = useRouter()
const route = useRoute()
const { tm } = useI18n()

const archiveStore = useArchiveStore()
const { ordersPage } = storeToRefs(archiveStore)

const isOrder = computed(() => route.name === Routes.order)

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onBeforeMount(() => {
  if (isOrder.value)
    router.push({ name: Routes.orders })
})
</script>

<template>
  <div class="overflow-y-auto h-[calc(100dvh-200px)] w-full bg-white shadow rounded-md">
    <Table>
      <TableHeader>
        <!-- reusable temlate -->
        <DefineTemplate v-slot="{ plural, icon, width }">
          <TableHead :class="cn(width, [plural === 0 && 'pl-10'])">
            <div class="flex justify-start items-center gap-2">
              <component :is="icon" />
              <span class="2xl:text-sm text-sm md:text-[13px]">{{ tm('orders.table')[plural] }}</span>
            </div>
          </TableHead>
        </DefineTemplate>

        <TableRow>
          <ReuseTemplate :plural="0" />
          <ReuseTemplate :plural="1" :icon="StatusTable" />
          <ReuseTemplate :plural="2" :icon="Department" />
          <ReuseTemplate :plural="3" :icon="Heading" />
          <ReuseTemplate :plural="4" :icon="RatingSvg" width="w-[200px]" />
          <ReuseTemplate :plural="5" :icon="Calendar" />
          <ReuseTemplate :plural="6" :icon="Calendar" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <ArchiveRow
          v-for="order in ordersPage"
          :key="order._id"
          :order="order"
          class="cursor-pointer"
        />
      </TableBody>
    </Table>
  </div>
</template>
