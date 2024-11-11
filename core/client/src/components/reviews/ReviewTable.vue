<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
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

const router = useRouter()
const route = useRoute()

const reviewStore = useReviewStore()
const { reviewsPage } = storeToRefs(reviewStore)

const sheet = useTemplateRef<InstanceType<typeof Sheet> | null>('sheet')

const isSheetOpen = ref(false)

const isReview = computed(() => route.name === Routes.review)

function toggleModalRoute() {
  if (sheet.value && !sheet.value.open && route.name === Routes.review) {
    router.back()
  }
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onBeforeMount(() => {
  if (isReview.value)
    router.push({ name: Routes.reviews })
})
</script>

<template>
  <div class="overflow-y-auto h-[calc(100dvh-200px)] w-full bg-white shadow-sm rounded-md">
    <Table>
      <TableCaption class="pb-4">
        A list of all reviews.
      </TableCaption>
      <TableHeader>
        <!-- reusable temlate -->
        <DefineTemplate v-slot="{ content, icon, width }">
          <TableHead :class="width">
            <div class="flex justify-start items-center gap-2">
              <component :is="icon" />
              <span class="2xl:text-sm text-sm md:text-[13px]">{{ content }}</span>
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
  </div>
</template>
