<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { AiStars, Check, Notifications, Pane } from '~/assets/svgs-vite'
import Sidebar from '~/components/layout/Sidebar.vue'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import {
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable'

const sidebarSize = ref<number>(15)
const sidebarMaxSize = computed<number>(() => sidebarSize.value + 1)

const transitionFl = ref<boolean>(false)

function toggleSidebar() {
  sidebarSize.value = sidebarSize.value === 2 ? 15 : 2
  transitionFl.value = true
}

useLocalStorage('sidebar-size', sidebarSize)
</script>

<template>
  <div class="relative flex flex-col h-dvh w-screen flex-auto overflow-hidden">
    <header class="header relative z-[999] flex h-[56px] bg-white border-b border-neutral-200">
      <div class="max-w-[286px] w-full px-2 h-full flex items-center border-r border-neutral-200">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div class="min-w-9 min-h-9 bg-blue-500 border border-blue-300 rounded-lg flex items-center justify-center mr-2 cursor-pointer hover:border-blue-100">
              <p class="text-sm text-neutral-100 text-center font-semibold">
                1A
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div class="flex flex-col h-full items-start pt-2 w-full">
          <Badge variant="secondary" class="py-[0px] px-1.5">
            <span class="text-[11px] text-neutral-600">commercial</span>
          </Badge>
          <span class="text-xs font-semibold text-neutral-800">
            1alexpeshkov@gmail.com
          </span>
        </div>
        <Pane class="text-neutral-500 cursor-pointer" @click="toggleSidebar" />
      </div>
      <div class="px-4 flex items-center justify-between w-full">
        <div class="flex flex-row items-center gap-2">
          <!-- <Inbox class="w-[18px] h-[18px] text-neutral-800" /> -->
          <span class="text-[17px] font-semibold text-neutral-800">
            Reviews
          </span>
        </div>
        <div class="flex flex-row items-center gap-4">
          <Button variant="secondary" size="sm">
            <Check class="w-4 h-4 mr-2 text-blue-500" />
            Open Source
          </Button>
          <div class="h-10 rounded-md flex items-center gap-3">
            <AiStars class="w-5 h-5 text-blue-500" />
            <Notifications class="w-[17px] h-[17px] text-neutral-800" />
          </div>
        </div>
      </div>
    </header>
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class="flex-auto flex flex-row overflow-hidden"
    >
      <ResizablePanel
        id="handle-demo-panel-1"
        :default-size="sidebarSize"
        :min-size="3"
        :max-size="sidebarMaxSize"
        :style="{ transition: transitionFl && 'all 0.2s ease-out' }"
      >
        <Sidebar />
      </ResizablePanel>
      <!-- <ResizableHandle id="handle-demo-handle-1" with-handle /> -->
      <ResizablePanel id="handle-demo-panel-2" :default-size="86">
        <div class="flex items-center justify-center p-6 bg-neutral-50 h-full">
          <slot />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
