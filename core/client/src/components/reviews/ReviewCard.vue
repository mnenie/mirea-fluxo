<script setup lang="ts">
import { computed, onBeforeMount, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Badge as BadgeSvg } from '~/assets/svgs-vite'
import type { Review } from '~/types/review.interface'
import { Routes } from '~/utils/contants'
import Badge from '../ui/badge/Badge.vue'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Rating from './card/Rating.vue'
import UserProfile from './card/UserProfile.vue'

const props = defineProps<{
  review: Review
}>()

const colorsMap = new Map<Review['status'], string>([
  ['not verified', '#3b82f6'],
  ['consideration', '#fbbf24'],
  ['verified', '#16a34a'],
])

const statusColor = computed(() => colorsMap.get(props.review.status))

const router = useRouter()
const route = useRoute()

const sheet = useTemplateRef<InstanceType<typeof Sheet> | null>('sheet')

const isReview = computed(() => route.name === Routes.review)

function toggleModalRoute() {
  if (sheet.value && !sheet.value.open) {
    router.back()
  }
}
onBeforeMount(() => {
  if (isReview.value) {
    router.back()
  }
})
</script>

<template>
  <Sheet ref="sheet" @update:open="toggleModalRoute">
    <SheetTrigger as-child>
      <button
        class="flex flex-col bg-white items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer"
        @click="$router.push(`/reviews/${1}`)"
      >
        <div class="space-y-2">
          <div class="flex flex-row items-center justify-between">
            <div class="flex items-center space-x-2">
              <!-- <Badge variant="outline" class="text-gray-600 px-1 py-0">
            #{{ 1 }}
          </Badge> -->
              <div class="relative flex items-center gap-2">
                <Badge variant="outline" class="px-1 py-0 flex items-center gap-1">
                  <span class="text-xs">{{ review.status }}</span>
                  <BadgeSvg class="w-2 h-2" :style="{ color: statusColor }" />
                </Badge>
                <!-- <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: statusColor }" /> -->
              </div>
            </div>
            <span class="ml-auto text-xs text-muted-foreground">1 day ago</span>
          </div>
          <div class="space-y-2">
            <div class="sm:text-base 2xl:text-sm font-semibold">
              {{ review.title }}
            </div>
            <div class="sm:text-sm 2xl:text-[13px] line-clamp-2 text-muted-foreground">
              {{ review.content }}
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between w-full mt-3">
          <UserProfile :email="review.email" />
          <div class="flex flex-row items-center gap-2">
            <Rating :stars="review.stars" />
          </div>
        </div>
      </button>
    </SheetTrigger>
    <SheetContent class="min-w-[500px] !max-w-full w-1/3">
      <RouterView />
    </SheetContent>
  </Sheet>
</template>
