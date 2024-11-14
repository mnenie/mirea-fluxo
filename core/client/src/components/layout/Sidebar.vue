<script setup lang="ts">
import { h, markRaw } from 'vue'
import { Archive, Inbox, Notifications, Rating, Settings } from '~/assets/svgs-vite'
import { Routes } from '~/utils/contants'
import HippieNav from '../filters/HippieNav.vue'
import AICard from './AICard.vue'
import MenuList from './MenuList.vue'
import UpdateList from './UpdateList.vue'

const routes = markRaw([
  { name: Routes.orders, path: '/', label: 'Orders', icon: h(Inbox) },
  { name: Routes.archive, path: '/archive', label: 'Archive', icon: h(Archive) },
  { name: Routes.notifications, path: '/notifications', label: 'Notifications', icon: h(Notifications) },
  { name: Routes.analytics, path: '/analytics', label: 'Analytics', icon: h(Rating) },
  { name: Routes.settings, path: '/settings', label: 'Settings', icon: h(Settings) },
])
</script>

<template>
  <div class="flex flex-col h-full items-center justify-between  bg-white border-r border-neutral-200 px-2 pt-4 pb-2">
    <div class="flex flex-col w-full">
      <HippieNav />
      <MenuList :routes />
      <UpdateList />
    </div>
    <AICard />
  </div>
</template>
