<script setup lang="ts">
import { Ai, FileContract, Inbox, Notifications, Rating } from '~/assets/svgs-vite'

const cards = [
  { key: 'orders', icon: Inbox },
  { key: 'analytics', icon: Rating },
  { key: 'ai', icon: Ai },
  { key: 'map', icon: Rating },
  { key: 'notifications', icon: Notifications },
  { key: 'contract', icon: FileContract },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-6 sm:grid-cols-3 mt-16">
    <div v-for="{ key, icon: component }, idx in cards" :key="idx" class="flex flex-col gap-y-1.5 p-4 rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm  w-full">
      <component :is="component" class="mb-1" />
      <h3 class="text-2xl font-semibold leading-none tracking-tight mb-2">
        {{ $t(`welcome.${key}.title`) }}
      </h3>
      <p class="text-sm text-zinc-500">
        {{ $t(`welcome.${key}.description`) }}
      </p>
    </div>
  </div>
</template>
