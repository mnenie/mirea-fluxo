<script setup lang="ts">
import { computed } from 'vue'
import Badge from '~/components/ui/badge/Badge.vue'
import { TableCell, TableRow } from '~/components/ui/table/'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import type { Review } from '~/types/review.interface'
import Rating from '../card/Rating.vue'

const props = defineProps<{
  review: Review
}>()

const colorMap: Record<Review['status'], string> = {
  'not verified': 'bg-blue-100',
  'consideration': 'bg-amber-100',
  'verified': 'bg-green-100',
} as const

const textColorMap: Record<Review['status'], string> = {
  'not verified': 'text-blue-600',
  'consideration': 'text-amber-600',
  'verified': 'text-green-900',
} as const

const statusColor = computed(() => (status: Review['status']) => colorMap[status] || '')
const textColor = computed(() => (status: Review['status']) => textColorMap[status] || '')

const departmentCell = computed(() => props.review.department ? props.review.department : '-')
</script>

<template>
  <TableRow>
    <TableCell class="pl-10">
      <span class="line-clamp-1 text-neutral-500">{{ review._id }}</span>
    </TableCell>
    <TableCell>
      <Badge
        variant="outline"
        :class="cn(
          [statusColor(props.review.status),
           textColor(props.review.status),
           'shadow-none border-none',
          ],
        )"
      >
        <span>{{ review.status }}</span>
      </Badge>
    </TableCell>
    <TableCell>
      <Badge
        variant="outline"
        :class="cn(
          'shadow-none border-none',
        )"
      >
        <span>{{ departmentCell }}</span>
      </Badge>
    </TableCell>
    <TableCell>
      {{ review.email }}
    </TableCell>
    <TableCell>
      <span class="line-clamp-1 font-semibold">{{ review.title }}</span>
    </TableCell>
    <TableCell>
      <Rating :stars="review.stars" />
    </TableCell>
    <TableCell>
      <div class="px-2">
        {{ formatDate(review.date) }}
      </div>
    </TableCell>
  </TableRow>
</template>
