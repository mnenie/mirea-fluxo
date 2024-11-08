<script setup lang="ts">
import { Ai } from '~/assets/svgs-vite'
import { Badge } from '../ui/badge'
</script>

<template>
  <div
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
        <Badge class="text-[10px]">
          How do I respond?
        </Badge>
        <Badge class="text-[10px]">
          Help with analytics
        </Badge>
      </div>
    </div>
  </div>
</template>
