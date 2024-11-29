<script setup lang="ts">
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
    <TableCell class="pl-6">
      <span class="line-clamp-1 text-neutral-500">{{ order._id }}</span>
    </TableCell>
    <TableCell>
      <Badge
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
    </TableCell>
    <TableCell>
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
        class="text-gray-500 ml-1 text-xs shadow-none px-1"
      >
        +{{ organizationCell.length - 1 }}
      </Badge>
    </TableCell>
    <TableCell>
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
