<script setup lang="ts">
import { ref } from 'vue'
import type { Review } from '~/types/review.interface'
import Badge from '../ui/badge/Badge.vue'
import ActionsTab from './card/ActionsTab.vue'
import Rating from './card/Rating.vue'
import UserProfile from './card/UserProfile.vue'

const props = defineProps<{
  review: Review
}>()

const statusColor = ref<string>('')

function checkStatus(status: string) {
  if (status === 'not verified') {
    statusColor.value = '#dc2626'
    return 'Отклонено'
  }
  else if (status === 'consideration') {
    statusColor.value = '#2563eb'

    return 'На рассмотрении'
  }
  else {
    statusColor.value = '#16a34a'
    return 'Одобрено'
  }
}

const status = ref<string>(checkStatus(props.review.status))
</script>

<template>
  <div class="flex flex-col w-full border rounded p-6">
    <div class="space-y-2">
      <div class="space-x-2">
        <Badge variant="secondary" class="text-gray-600 text-base">
          #{{ 1 }}
        </Badge>
        <Badge :style="{ 'background-color': statusColor }">
          {{ status }}
        </Badge>
      </div>
      <div class="space-y-2">
        <div class="text-[24px]">
          {{ review.title }}
        </div>
        <div>
          <Rating :stars="review.stars" />
        </div>
        <div class="text-lg line-clamp-2">
          {{ review.content }}
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-auto items-center justify-between">
      <UserProfile :email="review.email" />
      <ActionsTab />
    </div>
  </div>
</template>
