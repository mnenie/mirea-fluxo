<script setup lang="ts">
import { computed } from 'vue'
import Badge from '~/components/ui/badge/Badge.vue'
import { TableCell, TableRow } from '~/components/ui/table/'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import type { Order } from '~/types/order.interface'
import Rating from '../card/Rating.vue'

const props = defineProps<{
  order: Order
}>()

const colorMap: Record<Order['status'], string> = {
  'not verified': 'bg-blue-100',
  'in process': 'bg-amber-100',
  'closed': 'bg-green-100',
} as const

const textColorMap: Record<Order['status'], string> = {
  'not verified': 'text-blue-600',
  'in process': 'text-amber-600',
  'closed': 'text-green-900',
} as const

const statusColor = computed(() => (status: Order['status']) => colorMap[status] || '')
const textColor = computed(() => (status: Order['status']) => textColorMap[status] || '')

const organizationCell = computed(() => props.order.organization ? props.order.organization : '-')
</script>

<template>
  <TableRow>
    <TableCell class="pl-10">
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
        <span>{{ order.status }}</span>
      </Badge>
    </TableCell>
    <TableCell>
      <Badge
        variant="outline"
        :class="cn(
          'shadow-none border-none',
        )"
      >
        <span>{{ organizationCell }}</span>
      </Badge>
    </TableCell>
    <!-- <TableCell>
      sender
    </TableCell> -->
    <TableCell>
      <span class="line-clamp-1 font-semibold">{{ order.title }}</span>
    </TableCell>
    <TableCell>
      <Rating :price="order.price" />
    </TableCell>
    <TableCell>
      <div class="px-2">
        {{ formatDate(order.date) }}
      </div>
    </TableCell>
  </TableRow>
</template>
