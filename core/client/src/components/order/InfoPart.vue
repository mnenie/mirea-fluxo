<script setup lang="ts">
import type { Order } from '~/types/order.interface'
import { SheetDescription, SheetTitle } from '../ui/sheet'
import { TabsList, TabsTrigger } from '../ui/tabs'

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
      <TabsList>
        <TabsTrigger value="stages">
          {{ $t('order.tabs', 1) }}
        </TabsTrigger>
        <TabsTrigger value="trk">
          {{ $t('order.tabs', 0) }}
        </TabsTrigger>
      </TabsList>
    </div>
    <SheetDescription class="mt-4 line-clamp-5">
      <div class="text-sm text-neutral-500" v-html="order.content" />
    </SheetDescription>
  </div>
</template>
