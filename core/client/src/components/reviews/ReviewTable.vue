<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { computed, onBeforeMount, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Heading, Rating as RatingSvg, StatusTable, User } from '~/assets/svgs-vite'
import { useReviewStore } from '~/stores/reviews'
import type { Review } from '~/types/review.interface'
import { Routes } from '~/utils/contants'
import Button from '../ui/button/Button.vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '../ui/pagination/'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table/'
import ReviewRow from './table/ReviewRow.vue'

const itemsPerPage = ref<number>(50)
const currentPage = ref<number>(1)

const reviewStore = useReviewStore()

const reviewsPage = ref<Review[]>([])

function selectReviewPage(page: number, itemsPerPage: number) {
  currentPage.value = page
  reviewsPage.value = reviewStore.getPaginatedReviews(page, itemsPerPage)
}

selectReviewPage(1, itemsPerPage.value)

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
// UPDATE: сделал пагинацию, можно удалять TODO

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onBeforeMount(() => {
  if (isReview.value)
    router.push({ name: Routes.reviews })
})
</script>

<template>
  <div class="overflow-y-auto h-[calc(100dvh-125px)] w-full bg-white shadow-sm rounded-md">
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
            <ReviewRow
              v-for="review in reviewsPage"
              :key="review.title"
              :review="review"
              class="cursor-pointer"
              @click="router.push(`/reviews/${review._id}`), isSheetOpen = true"
            />
          </SheetTrigger>
          <SheetContent class="min-w-[500px] !max-w-full w-1/3">
            <RouterView />
          </SheetContent>
        </Sheet>
      </TableBody>
    </Table>
    <Pagination v-slot="{ page }" :total="reviewStore.reviews.length / 5" :sibling-count="1" show-edges :default-page="1" class="m-2">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="selectReviewPage(1, itemsPerPage)" />
        <PaginationPrev @click="selectReviewPage(currentPage - 1, itemsPerPage)" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="selectReviewPage(item.value, itemsPerPage)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="selectReviewPage(currentPage + 1, itemsPerPage)" />
        <PaginationLast @click="selectReviewPage(reviewStore.reviews.length / 50, itemsPerPage)" />
      </PaginationList>
    </Pagination>
  </div>
</template>
