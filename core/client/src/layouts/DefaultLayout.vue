<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable'

const sidebarSize = ref(14)
const sidebarMaxSize = computed(() => sidebarSize.value + 1)
</script>

<template>
  <div class="relative flex h-dvh w-screen flex-1">
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class=""
    >
      <ResizablePanel
        id="handle-demo-panel-1"
        :default-size="sidebarSize"
        :min-size="3"
        :max-size="sidebarMaxSize"
      >
        <div class="flex h-full items-center justify-center p-6 bg-neutral-50">
          <span class="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle id="handle-demo-handle-1" with-handle />
      <ResizablePanel id="handle-demo-panel-2" :default-size="86">
        <div class="flex flex-col h-full w-full">
          <header class="font-semibold sticky top-0 bg-white left-0 right-0 z-50 flex items-center justify-between px-8 py-[10px] border-b border-neutral-200">
            header
          </header>
          <div class="flex items-center justify-center p-6">
            <slot />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
