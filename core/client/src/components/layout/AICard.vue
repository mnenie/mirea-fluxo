<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { computed } from 'vue'
import { Ai, Logout } from '~/assets/svgs-vite'
import { useExpanded } from '~/composables/useExpanded'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const expanded = useExpanded()
const { isExpanded } = expanded.getExpanded()

const debounced = refDebounced(isExpanded, 130)

const showCard = computed((): boolean => {
  return isExpanded.value ? debounced.value : false
})
</script>

<template>
  <div
    v-if="showCard"
    class="relative flex w-full flex-col items-start overflow-hidden rounded-lg border bg-neutral-50 md:shadow-sm p-2"
  >
    <div class="flex flex-col">
      <div class="flex gap-2 items-center mb-2">
        <Ai class="min-w-5 min-h-5" />
        <div class="flex flex-col">
          <p class="text-sm text-neutral-900 font-semibold">
            Ask AI anything about reviews
          </p>
          <span class="text-xs text-neutral-500">Get answers to your questions about reviews</span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <Badge variant="outline" class="text-[10px] bg-white">
          How do I respond?
        </Badge>
        <Badge variant="outline" class="text-[10px] bg-white">
          Help with analytics
        </Badge>
      </div>
    </div>
  </div>
  <Button v-else variant="ghost" size="sm">
    <Logout class="text-neutral-600 min-w-[16px] min-h-[16px]" />
  </Button>
</template>
