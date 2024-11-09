<script setup lang="ts">
import { computed } from 'vue'
import type { Review } from '~/types/review.interface'
import Badge from '../ui/badge/Badge.vue'
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
</script>

<template>
  <div class="flex flex-col bg-white items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer">
    <div class="space-y-2">
      <div class="flex flex-row items-center justify-between">
        <div class="flex items-center space-x-2">
          <Badge variant="outline" class="text-gray-600 px-1 py-0">
            #{{ 1 }}
          </Badge>
          <div class="relative">
            <Badge variant="outline" class="px-1 py-0" :style="{ color: statusColor }">
              <span class="text-xs">{{ review.status }}</span>
            </Badge>
          </div>
        </div>
        <span class="ml-auto text-xs text-muted-foreground">1 day ago</span>
      </div>
      <div class="space-y-2">
        <div class="text-base font-semibold">
          {{ review.title }}
        </div>
        <div class="text-sm line-clamp-2 text-muted-foreground">
          {{ review.content }}
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between w-full mt-4">
      <UserProfile :email="review.email" />

      <div class="flex flex-row items-center gap-2">
        <Rating :stars="review.stars" />
      </div>
    </div>
  </div>
</template>
