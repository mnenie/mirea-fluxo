<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { computed, onBeforeMount, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Heading, Rating as RatingSvg, StatusTable, User } from '~/assets/svgs-vite'
import { useReviewStore } from '~/stores/reviews'
import { Routes } from '~/utils/contants'
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
            <ReviewRow v-for="review in reviewStore.reviews" :key="review.title" :review="review" class="cursor-pointer" @click="router.push(`/reviews/${review._id}`), isSheetOpen = true" />
          </SheetTrigger>
          <SheetContent class="min-w-[500px] !max-w-full w-1/3">
            <RouterView />
          </SheetContent>
        </Sheet>
      </TableBody>
    </Table>
  </div>
</template>
