<script setup lang="ts">
import { computed, h, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { Archive, Inbox, Notifications, Rating } from '~/assets/svgs-vite'
import { Routes } from '~/utils/contants'
import HippieNav from '../filters/HippieNav.vue'
import AICard from './AICard.vue'
import MenuList from './MenuList.vue'
import UpdateList from './UpdateList.vue'

const routes = markRaw([
  { name: Routes.orders, path: '/orders', icon: h(Inbox) },
  { name: Routes.archive, path: '/archive', icon: h(Archive) },
  { name: Routes.notifications, path: '/notifications', icon: h(Notifications) },
  { name: Routes.analytics, path: '/analytics', icon: h(Rating) },
])

const { tm } = useI18n()

const localizedRoutes = computed(() => {
  const nameArr = tm('sidebar.items') as string[]
  return routes.map((route, index) => ({
    ...route,
    label: nameArr[index],
  }))
})
</script>

<template>
  <div class="flex flex-col h-full items-center justify-between  bg-white border-r border-neutral-200 px-2 pt-4 pb-2">
    <div class="flex flex-col w-full">
      <HippieNav />
      <MenuList :routes="localizedRoutes" />
      <UpdateList />
    </div>
    <AICard />
  </div>
</template>
