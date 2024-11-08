<script setup lang="ts">
import { AiStars } from '~/assets/svgs-vite'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
</script>

<template>
  <div class="text-sm text-neutral-400 font-medium w-full px-2 flex items-center gap-2 mb-2 mt-6">
    <span class="text-[13px]">AI Analytics</span>
  </div>
  <Button disabled variant="ghost" size="sm" class="w-full justify-between px-2">
    <div class="flex items-center">
      <component :is="AiStars" class="w-4 h-4 mr-2 text-neutral-900" />
      <span class="text-[13px]">AI analyzes</span>
    </div>
    <Badge variant="secondary" class="px-2 py-0 text-xs">
      <span class="text-[10px]">soon</span>
    </Badge>
  </Button>
</template>
