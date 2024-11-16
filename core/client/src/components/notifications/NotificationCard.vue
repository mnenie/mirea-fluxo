<script setup lang="ts">
import { ref } from 'vue'
import { TrashBin } from '~/assets/svgs-vite/base'
import { LetterCheck } from '~/assets/svgs-vite/notification'
import { formatDate } from '~/helpers/formatDateHelper'
import type { Notification } from '~/types/notification.interface'

defineProps<{
  notification: Notification
}>()

const isHovered = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col border-b p-2" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="flex flex-row">
      <div>
        {{ notification.title }}
      </div>
      <div v-if="isHovered" class="flex flex-row ml-auto space-x-2 text-neutral-600">
        <TrashBin />
        <LetterCheck />
      </div>
      <div v-else class="ml-auto">
        {{ formatDate(notification.date) }}
      </div>
    </div>
    <div class="line-clamp-1">
      {{ notification.content }}
    </div>
  </div>
</template>
