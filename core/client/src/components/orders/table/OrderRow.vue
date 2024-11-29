<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Badge from '~/components/ui/badge/Badge.vue'
import { TableCell, TableRow } from '~/components/ui/table/'
import { useSharedStatus } from '~/composables/useStatus'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import { useOrderStore } from '~/stores/orders'
import type { Order } from '~/types/order.interface'
import Price from '../card/Price.vue'

const props = defineProps<{
  order: Order
}>()

const orderStore = useOrderStore()

const { width } = useWindowSize()

const organizationCell = computed(() => {
  const organizations = orderStore.collectOrganizations(props.order.stages)
  return Array.from(new Set(organizations))
})
const visibleBadges = computed(() => organizationCell.value.slice(0, 1))

const { statusColor, textColor } = useSharedStatus()
const { tm } = useI18n()
</script>

<template>
  <TableRow>
    <TableCell v-if="width > 800" class="md:pl-6 sm:pl-0">
      <span class="id sm:max-w-[6rem] md:max-w-full text-neutral-500">{{ order._id }}</span>
    </TableCell>
    <TableCell>
      <Badge
        v-if="width > 800"
        variant="outline"
        :class="cn(
          [statusColor(props.order.status),
           textColor(props.order.status),
           'shadow-none border-none',
          ],
        )"
      >
        <span class=" text-nowrap">{{ tm(`orders.status.${order.status.replace(' ', '_')}`) }}</span>
      </Badge>
      <Badge
        v-else
        variant="outline"
        :class="cn(
          [statusColor(props.order.status),
           textColor(props.order.status),
           'shadow-none border-none max-[800px]:p-2 max-[800px]:ml-4',
          ],
        )"
      />
    </TableCell>
    <TableCell v-if="width > 800">
      <div class="flex flex-row items-center gap-1">
        <template v-if="organizationCell.length !== 0">
          <Badge
            v-for="organization, idx in visibleBadges"
            :key="idx"
            variant="secondary"
            :class="cn(
              'shadow-none',
            )"
          >
            <span class="text-nowrap">{{ organization }}</span>
          </Badge>
        </template>
        <span v-else class="text-gray-500 px-10">-</span>
        <Badge
          v-if="organizationCell.length > 1"
          variant="secondary"
          class="text-gray-500 text-xs shadow-none px-1"
        >
          +{{ organizationCell.length - 1 }}
        </Badge>
      </div>
    </TableCell>
    <TableCell class="max-[800px]:pl-8">
      <span class="line-clamp-1 font-semibold">{{ order.title }}</span>
    </TableCell>
    <TableCell>
      <Price :price="order.price" />
    </TableCell>
    <TableCell>
      <div>
        {{ formatDate(order.dateEnd) }}
      </div>
    </TableCell>
  </TableRow>
</template>

<style scoped>
.id {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
