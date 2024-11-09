<script setup lang="ts">
import { Search } from '~/assets/svgs-vite'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const emits = defineEmits<{
  (e: 'openModal'): void
}>()
</script>

<template>
  <Button
    variant="outline"
    class="w-full justify-between px-2 shadow-none border-none bg-neutral-50 text-neutral-500"
    @click="emits('openModal')"
  >
    <div class="flex items-center">
      <Search class="w-4 h-4 mr-2 text-neutral-500" />
      <span class="2xl:text-[13px] sm:text-sm text-neutral-500">Search</span>
    </div>
    <div class="flex items-center gap-1">
      <Badge variant="outline" class="px-1 py-0 text-xs gap-[1px] text-neutral-600">
        <span class="text-[10px]">Ctrl / ⌘</span>
      </Badge>
      <Badge variant="outline" class="px-1 py-0 text-xs gap-[1px] text-neutral-600">
        <span class="text-[10px]">K</span>
      </Badge>
    </div>
  </Button>
</template>
