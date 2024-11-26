<script setup lang="ts">
import { computed } from 'vue'
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

const organizationCell = computed(() => props.order.stages?.map(stage => stage.organization))
const visibleBadges = computed(() => organizationCell.value.slice(0, 1))

const { statusColor, textColor } = useSharedStatus()
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
      <template v-if="organizationCell.length !== 0">
        <Badge
          v-for="organization, idx in visibleBadges"
          :key="idx"
          variant="secondary"
          :class="cn(
            'shadow-none',
          )"
        >
          <span>{{ organization }}</span>
        </Badge>
      </template>
      <span v-else class="text-gray-500 px-10">-</span>
      <span v-if="organizationCell.length > 1" class="text-gray-500 ml-1">...</span>
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
  </TableRow>
</template>
