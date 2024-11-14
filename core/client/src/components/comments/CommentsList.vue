<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NoComments } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
</script>

<template>
  <div v-if="order.stages.length === 0" class="px-6 mt-36 text-base text-neutral-400 flex flex-col gap-2 items-center justify-center">
    <NoComments class="w-[50px] h-[50px]" />
    <span class="text-sm">No messages yet</span>
  </div>
  <div v-else class="px-6 mt-12 pb-10 flex flex-col gap-6 h-full">
    <div v-for="stage, idx in order.stages" :key="idx">
      {{ stage }}
    </div>
  </div>
</template>
