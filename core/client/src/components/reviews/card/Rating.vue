<script setup lang="ts">
import { Badge } from '~/components/ui/badge'

defineProps<{
  stars: number
}>()
</script>

<template>
  <div class="flex flex-row px-4">
    <Badge variant="outline" class="px-1 py-0 flex items-center gap-1">
      <span class="2xl:text-[11px] text-xs text-neutral-600">{{ stars }} / 5</span>
    </Badge>
  </div>
</template>
