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
            {{ $t('sidebar.card.title') }}
          </p>
          <span class="text-xs text-neutral-500">
            {{ $t('sidebar.card.description') }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <Badge variant="outline" class="text-[10px] bg-white">
          {{ $t('sidebar.card.badges', 0) }}
        </Badge>
        <Badge variant="outline" class="text-[10px] bg-white">
          {{ $t('sidebar.card.badges', 1) }}
        </Badge>
      </div>
    </div>
  </div>
  <Button v-else variant="ghost" size="sm">
    <Logout class="text-neutral-600 min-w-[16px] min-h-[16px]" />
  </Button>
</template>
