<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Badge from '~/components/ui/badge/Badge.vue'
import { TableCell, TableRow } from '~/components/ui/table/'
import { useSharedStatus } from '~/composables/useStatus'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import type { Order } from '~/types/order.interface'
import Price from '../card/Price.vue'

const props = defineProps<{
  order: Order
}>()

const organizationCell = computed(() => props.order.organization ? props.order.organization : '-')

const { statusColor, textColor } = useSharedStatus()
const { tm } = useI18n()
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
        <span class="text-nowrap">{{ tm(`orders.status.${order.status.replace(' ', '_')}`) }}</span>
      </Badge>
    </TableCell>
    <TableCell>
      <Badge
        variant="outline"
        :class="cn(
          'shadow-none border-none',
        )"
      >
        <span class="text-nowrap">{{ organizationCell }}</span>
      </Badge>
    </TableCell>
    <TableCell>
      <span class="line-clamp-1 font-semibold">{{ order.title }}</span>
    </TableCell>
    <TableCell>
      <Price :price="order.price" />
    </TableCell>
    <TableCell>
      <div class="px-2">
        {{ formatDate(order.date) }}
      </div>
    </TableCell>
    <TableCell>
      <div class="px-2">
        {{ formatDate(order.closeDate!) }}
      </div>
    </TableCell>
  </TableRow>
</template>
