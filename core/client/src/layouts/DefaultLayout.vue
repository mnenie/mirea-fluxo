<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import Header from '~/components/layout/header/Header.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import {
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable'
import { useExpanded } from '~/composables/useExpanded'

const expanded = useLocalStorage('expanded', true)
const transitionFl = ref<boolean>(false)

function toggleSidebar() {
  expanded.value = !expanded.value
  transitionFl.value = true
}

const sidebarSize = computed(() => expanded.value ? '286' : '52')

const { createContext } = useExpanded()

createContext({
  isExpanded: expanded,
  toggleExpanded: toggleSidebar,
})
</script>

<template>
  <div class="relative flex flex-col h-dvh w-screen flex-auto overflow-hidden">
    <Header />
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class="flex-auto flex flex-row overflow-hidden"
    >
      <ResizablePanel
        id="handle-demo-panel-1"
        :style="{ transition: transitionFl && 'all 0.2s ease-out', width: `${sidebarSize}px` }"
        style="flex: none;"
      >
        <Sidebar />
      </ResizablePanel>
      <ResizablePanel id="handle-demo-panel-2">
        <div class="flex items-center justify-center p-4 bg-neutral-50 h-full">
          <slot />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
