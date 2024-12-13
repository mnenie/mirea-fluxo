<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type Component, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Archive, Check, Inbox, Notifications, Rating } from '~/assets/svgs-vite'
import LanguageProvider from '~/components/i18n/LanguageProvider.vue'
import { ShimmerButton } from '~/components/ui/shimmer-button'
import { useExpanded } from '~/composables/useExpanded'
import { redirect } from '~/helpers/redirectHelper'
import { Routes } from '~/utils/contants'
import UserProfile from './UserProfile.vue'

const expanded = useExpanded()

const { toggleExpanded: toggleSidebar, isExpanded } = expanded.getExpanded()

const section = new Map<Component, string>([
  [Inbox, Routes.orders],
  [Archive, Routes.archive],
  [Notifications, Routes.notifications],
  [Rating, Routes.analytics],
])

const route = useRoute()
const { tm } = useI18n()

const { width } = useWindowSize()

const icon = computed(() => {
  for (const [icon, routeName] of section.entries()) {
    if (route.name === routeName)
      return icon
    if (route.name === Routes.order) {
      return routeName === Routes.orders ? Inbox : Archive
    }
  }
  return null
})

const localizedRouteName = computed(() => {
  const names = tm('sidebar.items') as string[]
  const idx = Array.from(section.values()).indexOf(route.name as string)
  return route.name !== Routes.order ? names[idx] : tm('sidebar.items')[0]
})
</script>

<template>
  <header class="header relative z-[999] flex h-[56px] bg-white border-b border-neutral-200">
    <UserProfile :is-expanded @toggle-sidebar="toggleSidebar" />
    <div class="px-4 flex items-center justify-between w-full">
      <div class="flex flex-row items-center gap-2">
        <component :is="icon" class="w-[18px] h-[18px] text-neutral-800" />
        <span class="text-[17px] font-semibold text-neutral-800 capitalize">
          {{ localizedRouteName }}
        </span>
      </div>
      <div class="flex flex-row items-center gap-4">
        <div v-if="width > 800" class="z-10 flex items-center justify-center">
          <ShimmerButton
            shimmer-size="2px"
            class="h-9 2xl:h-8 px-4 py-2 rounded-md flex items-center gap-2 bg-white"
            @click="redirect('https://github.com/mnenie/iptip-hack-2024')"
          >
            <span
              class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-neutral-800 dark:from-white dark:to-slate-900/10"
            >
              {{ $t('header.ai') }}
            </span>
          </ShimmerButton>
        </div>
        <div v-if="width > 800" class="h-3 w-px bg-neutral-200" />
        <LanguageProvider />
        <div v-if="width > 800" class="h-3 w-px bg-neutral-200" />
        <div v-if="width > 800" class="h-10 rounded-md flex items-center gap-3">
          <Check v-tooltip.bottom="'Open Source'" class="w-[15px] h-[15px] 2xl:w-4 2xl:h-4 text-neutral-600" />
          <Notifications class="w-[15px] h-[15px] 2xl:w-[17px] 2xl:h-[17px] text-neutral-600 cursor-pointer" />
        </div>
      </div>
    </div>
  </header>
</template>
