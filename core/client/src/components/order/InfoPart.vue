<script setup lang="ts">
import type { Order } from '~/types/order.interface'
import { SheetDescription, SheetTitle } from '../ui/sheet'

defineProps <{
  order: Pick<Order, 'title' | 'content'>
}>()
</script>

<template>
  <div class="px-6 py-6">
    <div class="flex flex-row items-center justify-between w-full">
      <SheetTitle class="text-xl font-semibold text-foreground">
        {{ order.title }}
      </SheetTitle>
    </div>
    <SheetDescription class="mt-4 line-clamp-5">
      <div class="text-sm text-neutral-500" v-html="order.content" />
    </SheetDescription>
  </div>
</template>
