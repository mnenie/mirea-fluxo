<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue'
import { useReviewStore } from '~/stores/reviews'
import type { Review } from '~/types/review.interface'
import Badge from '../ui/badge/Badge.vue'
import Button from '../ui/button/Button.vue'
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

const noNewReviews = ref<boolean>(false)

async function onLoadMore() {
  if (noNewReviews.value) {
    return
  }
  reviewStore.fetchReviews()
}

const colorsMap = new Map<Review['status'], string>([
  ['not verified', '#3b82f6'],
  ['consideration', '#fbbf24'],
  ['verified', '#16a34a'],
])

// const statusColor = computed(() => colorsMap.get(props.review.status))

useInfiniteScroll(el, onLoadMore, { distance: 10 })
</script>

<template>
  <div ref="el" class="overflow-y-auto h-full w-full">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            #
          </TableHead>
          <TableHead class="w-[150px]">
            <Button variant="ghost">
              статус
            </Button>
          </TableHead>
          <TableHead>
            Отправитель
          </TableHead>
          <TableHead>
            Заголовок
          </TableHead>
          <TableHead class="w-[150px]">
            <Button variant="ghost">
              Рейтинг
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost">
              Дата
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="review in reviewStore.reviews" :key="review.title">
          <TableCell class="font-medium">
            {{ review._id }}
          </TableCell>
          <TableCell>
            <Badge :style="{ 'background-color': colorsMap.get(review.status) }">
              {{ review.status }}
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
