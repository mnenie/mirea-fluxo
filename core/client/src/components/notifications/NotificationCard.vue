<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TrashBin } from '~/assets/svgs-vite/base'
import { LetterCheck } from '~/assets/svgs-vite/notification'
import { useNotifications } from '~/composables/useNotifications'
import { formatDate } from '~/helpers/formatDateHelper'
import { cn } from '~/lib/utils'
import type { Notification } from '~/types/notification.interface'
import Checkbox from '../ui/checkbox/Checkbox.vue'

const { notification } = defineProps<{ notification: Notification }>()
const { addToSelected, removeFromSelected, checkSelected } = useNotifications()

const isHovered = ref<boolean>(false)
const isExpanded = ref<boolean>(false)
const isMarked = ref<boolean>(false)
const highlightStyle = ref<string>('')
function handleMarked() {
  if (isMarked.value) {
    addToSelected(notification)
    highlightStyle.value = 'border-blue-200 bg-blue-200 shadow-md'
  }
  else {
    removeFromSelected(notification)
    highlightStyle.value = 'hover:shadow'
  }
}

onMounted(() => {
  isMarked.value = checkSelected(notification)
  handleMarked()
})
</script>

<template>
  <div :class="cn(`flex flex-row p-4 border-b ${highlightStyle}`)">
    <div class="flex items-center pr-4">
      <Checkbox v-model:checked="isMarked" @update:checked="handleMarked" />
    </div>
    <div class="flex flex-col w-full" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="isExpanded = !isExpanded">
      <div class="flex flex-row">
        <div class="font-semibold text-lg">
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
      <div v-if="isExpanded">
        <div class="py-2">
          {{ notification.content }}
        </div>
        <div class="text-neutral-400">
          Свернуть
        </div>
      </div>
      <div v-else class="line-clamp-1">
        {{ notification.content }}
      </div>
    </div>
  </div>
</template>
