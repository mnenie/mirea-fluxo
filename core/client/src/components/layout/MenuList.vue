<script setup lang="ts" generic="T extends MenuItem">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '../ui/button'

export interface MenuItem {
  name: string
  path: string
  label: string
  icon: any
}

defineProps<{
  routes: T[]
}>()

const route = useRoute()

const isActiveRoute = computed(() => (path: string) => route.path === path)
</script>

<template>
  <div class="text-sm text-neutral-400 font-medium w-full px-2 flex items-center gap-2 mt-5">
    <span class="text-[13px] sm:text-sm">Menu</span>
  </div>
  <div class="flex flex-col space-y-1.5 w-full mt-2">
    <RouterLink
      v-for="{ name, path, label, icon } in routes"
      :key="name"
      :to="path"
      class="text-sm font-semibolds w-full"
    >
      <Button :variant="isActiveRoute(path) ? 'secondary' : 'ghost'" size="sm" class="w-full justify-between px-2">
        <div class="flex items-center">
          <component :is="icon" class="w-4 h-4 mr-2 text-neutral-900" />
          <span class="2xl:text-[13px] md:text-sm">{{ label }}</span>
        </div>
        <Badge v-if="path === '/' || path === '/notifications'" variant="outline" class="px-2 py-0 text-xs bg-blue-500 rounded-lg">
          <!-- TODO -->
          <span class="text-[10px] text-white">{{ path === '/' ? '10' : '3' }}</span>
        </Badge>
      </Button>
    </RouterLink>
  </div>
</template>
