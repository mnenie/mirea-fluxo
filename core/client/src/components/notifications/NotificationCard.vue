<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Trash } from '~/assets/svgs-vite'
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
const highlightStyle = ref<string | null>('')
function handleMarked() {
  if (isMarked.value) {
    addToSelected(notification)
    highlightStyle.value = 'border-blue-200 bg-blue-200 shadow-sm'
  }
  else {
    removeFromSelected(notification)
    highlightStyle.value = null
  }
}

onMounted(() => {
  isMarked.value = checkSelected(notification)
  handleMarked()
})
</script>

<template>
  <div :class="cn(`flex flex-row p-4 px-4 border-b first:rounded-t-md last:rounded-b-md ${highlightStyle}`)">
    <div class="flex items-center pr-4">
      <Checkbox v-model:checked="isMarked" @update:checked="handleMarked" />
    </div>
    <div class="flex flex-col w-full" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="isExpanded = !isExpanded">
      <div class="flex flex-row">
        <div class="font-semibold text-sm">
          {{ notification.title }}
        </div>
        <div v-if="isHovered" class="flex flex-row items-center ml-auto space-x-2 text-neutral-600">
          <Trash class="w-[16px] h-[16px] 2xl:w-[18px] 2xl:h-[18px]" />
          <LetterCheck class="w-[16px] h-[16px] 2xl:w-[18px] 2xl:h-[18px]" />
        </div>
        <div v-else class="ml-auto text-xs text-neutral-500 font-medium">
          {{ formatDate(notification.date) }}
        </div>
      </div>
      <div v-if="isExpanded">
        <div class="py-2 text-sm text-neutral-600">
          {{ notification.content }}
        </div>
        <div class="text-neutral-400 text-sm">
          Свернуть
        </div>
      </div>
      <div v-else class="line-clamp-1 text-sm text-neutral-700">
        {{ notification.content }}
      </div>
    </div>
  </div>
</template>
