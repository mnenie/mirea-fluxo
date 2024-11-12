<script setup lang="ts">
import { User } from '~/assets/svgs-vite'
import type { Review } from '~/types/review.interface'
import { SheetDescription, SheetTitle } from '../ui/sheet'

defineProps <{
  review: Pick<Review, 'title' | 'content' | 'email'>
}>()
</script>

<template>
  <div class="px-6 py-6">
    <div class="flex flex-row items-center justify-between w-full">
      <SheetTitle class="text-xl font-semibold text-foreground">
        {{ review.title }}
      </SheetTitle>
    </div>
    <div class="flex flex-row items-center gap-2 text-neutral-400 mt-3">
      <User class="w-[15px] h-[15px]" />
      <span class="text-sm  line-clamp-1">{{ review.email }}</span>
    </div>
    <SheetDescription class="mt-4 line-clamp-5">
      <div class="text-sm text-neutral-500" v-html="review.content" />
    </SheetDescription>
  </div>
</template>
