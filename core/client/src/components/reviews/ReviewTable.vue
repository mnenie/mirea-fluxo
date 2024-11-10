<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Calendar, Heading, Rating as RatingSvg, StatusTable, User } from '~/assets/svgs-vite'
import { cn } from '~/lib/utils'
import { useReviewStore } from '~/stores/reviews'
import type { Review } from '~/types/review.interface'
import Badge from '../ui/badge/Badge.vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table/'
import Rating from './card/Rating.vue'

const reviewStore = useReviewStore()

const el = ref<HTMLElement | null>(null)

// const noNewReviews = ref<boolean>(false)

// async function onLoadMore() {
//   if (noNewReviews.value) {
//     return
//   }
//   reviewStore.fetchReviews()
// }

// TODO: reactivity / obj link issue (возможно, создам репродюс чтобы решить и оптимизировать)

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

// TODO (@sv022): надо поправить сайт из за того что бесконечно подругжается грузится на 587мБ ))
// я думаю мб пагинацию ? https://www.shadcn-vue.com/docs/components/pagination.html
// useInfiniteScroll(el, onLoadMore, { distance: 10 })

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div ref="el" class="overflow-y-auto h-full w-full bg-white shadow-sm rounded-md">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <!-- reusable temlate -->
        <DefineTemplate v-slot="{ content, icon, width }">
          <TableHead :class="width">
            <div class="flex justify-start items-center gap-2">
              <component :is="icon" />
              {{ content }}
            </div>
          </TableHead>
        </DefineTemplate>

        <TableRow>
          <ReuseTemplate content="ID" width="w-1/12" />
          <ReuseTemplate content="Status" :icon="StatusTable" />
          <ReuseTemplate
            content="
            Sender"
            :icon="User"
          />
          <ReuseTemplate content="Heading" :icon="Heading" />
          <ReuseTemplate content="Rating" :icon="RatingSvg" />
          <ReuseTemplate content="Calendar" :icon="Calendar" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="review in reviewStore.reviews" :key="review.title" class="cursor-pointer">
          <TableCell class="font-medium">
            {{ review._id }}
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              :class="cn([statusColor(review.status), textColor(review.status), 'shadow-none border-none'])"
            >
              <span>{{ review.status }}</span>
            </Badge>
          </TableCell>
          <TableCell>
            {{ review.email }}
          </TableCell>
          <TableCell class="line-clamp-1 font-semibold">
            {{ review.title }}
          </TableCell>
          <TableCell>
            <Rating :stars="review.stars" />
          </TableCell>
          <TableCell>
            {{ review.date }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
