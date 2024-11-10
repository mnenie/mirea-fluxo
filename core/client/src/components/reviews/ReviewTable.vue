<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { computed, onBeforeMount, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Heading, Rating as RatingSvg, StatusTable, User } from '~/assets/svgs-vite'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import { useReviewStore } from '~/stores/reviews'
import type { Review } from '~/types/review.interface'
import { Routes } from '~/utils/contants'
import Badge from '../ui/badge/Badge.vue'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
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

const router = useRouter()
const route = useRoute()

const sheet = useTemplateRef<InstanceType<typeof Sheet> | null>('sheet')

const isSheetOpen = ref(false)

const isReview = computed(() => route.name === Routes.review)

function toggleModalRoute() {
  if (sheet.value && !sheet.value.open && route.name === Routes.review) {
    router.back()
  }
}

// TODO (@sv022): надо поправить сайт из за того что бесконечно подругжается грузится на 587мБ ))
// я думаю мб пагинацию ? https://www.shadcn-vue.com/docs/components/pagination.html
// useInfiniteScroll(el, onLoadMore, { distance: 10 })

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onBeforeMount(() => {
  if (isReview.value)
    router.push({ name: Routes.reviews })
})
</script>

<template>
  <div ref="el" class="overflow-y-auto h-full w-full bg-white shadow-sm rounded-md">
    <Table>
      <TableCaption class="pb-4">
        A list of your recent invoices.
      </TableCaption>
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
          <ReuseTemplate content="ID" width="w-[200px]" />
          <ReuseTemplate content="Status" :icon="StatusTable" />
          <ReuseTemplate
            content="
            Sender"
            :icon="User"
          />
          <ReuseTemplate content="Heading" :icon="Heading" />
          <ReuseTemplate content="Rating" :icon="RatingSvg" />
          <ReuseTemplate content="Calendar" :icon="Calendar" width="w-[200px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <Sheet ref="sheet" v-model:open="isSheetOpen" @update:open="toggleModalRoute">
          <SheetTrigger as-child>
            <TableRow
              v-for="review in reviewStore.reviews"
              :key="review.title"
              class="cursor-pointer"
              @click="router.push(`/reviews/${review._id}`), isSheetOpen = true"
            >
              <TableCell>
                <span class="line-clamp-1 text-neutral-500">{{ review._id }}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  :class="cn(
                    [statusColor(review.status),
                     textColor(review.status),
                     'shadow-none border-none',
                    ],
                  )"
                >
                  <span>{{ review.status }}</span>
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
          </SheetTrigger>
          <SheetContent class="min-w-[500px] !max-w-full w-1/3">
            <RouterView />
          </SheetContent>
        </Sheet>
      </TableBody>
    </Table>
  </div>
</template>
