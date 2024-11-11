<script setup lang="ts">
import { type Component, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Archive, Check, Inbox, Notifications, Settings } from '~/assets/svgs-vite'
import { ShimmerButton } from '~/components/ui/shimmer-button'
import { useExpanded } from '~/composables/useExpanded'
import { redirect } from '~/helpers/redirectHelper'
import { Routes } from '~/utils/contants'
import UserProfile from './UserProfile.vue'

const expanded = useExpanded()

const { toggleExpanded: toggleSidebar, isExpanded } = expanded.getExpanded()

const section = new Map<Component, string>([
  [Inbox, Routes.reviews],
  [Notifications, Routes.notifications],
  [Archive, Routes.archive],
  [Settings, Routes.settings],
])

const route = useRoute()

const icon = computed(() => {
  for (const [icon, routeName] of section.entries()) {
    if (route.name === routeName)
      return icon
  }
  return null
})
</script>

<template>
  <header class="header relative z-[999] flex h-[56px] bg-white border-b border-neutral-200">
    <UserProfile :is-expanded @toggle-sidebar="toggleSidebar" />
    <div class="px-4 flex items-center justify-between w-full">
      <div class="flex flex-row items-center gap-2">
        <component :is="icon" class="w-[18px] h-[18px] text-neutral-800" />
        <span class="text-[17px] font-semibold text-neutral-800 capitalize">
          {{ route.name }}
        </span>
      </div>
      <div class="flex flex-row items-center gap-4">
        <div class="z-10 flex items-center justify-center">
          <ShimmerButton
            shimmer-size="2px"
            class="h-9 2xl:h-8 px-4 py-2 rounded-md flex items-center gap-2 bg-white"
            @click="redirect('https://github.com/mnenie/iptip-hack-2024')"
          >
            <span
              class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-neutral-800 dark:from-white dark:to-slate-900/10"
            >
              Build-in AI
            </span>
          </ShimmerButton>
        </div>
        <div class="h-10 rounded-md flex items-center gap-3">
          <Check v-tooltip.bottom="'Open Source'" class="w-[15px] h-[15px] 2xl:w-4 2xl:h-4 text-neutral-600" />
          <Notifications class="w-[15px] h-[15px] 2xl:w-[17px] 2xl:h-[17px] text-neutral-600 cursor-pointer" />
        </div>
      </div>
    </div>
  </header>
</template>
