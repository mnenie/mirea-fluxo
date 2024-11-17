<script setup lang="ts" generic="T extends MenuItem">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useExpanded } from '~/composables/useExpanded'
import { cn } from '~/lib/utils'
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

const expanded = useExpanded()

const { isExpanded } = expanded.getExpanded()
</script>

<template>
  <div
    class="text-sm text-neutral-400 font-medium w-full flex items-center gap-2 mt-5"
    :class="[isExpanded ? 'px-2' : 'px-0']"
  >
    <span :class="[isExpanded ? '2xl:text-[13px] text-sm' : '2xl:text-[12px] text-xs']">
      {{ $t('sidebar.menu') }}
    </span>
  </div>
  <div class="flex flex-col space-y-1.5 w-full mt-2">
    <RouterLink
      v-for="{ name, path, label, icon } in routes"
      :key="name"
      v-tooltip.right="{
        content: label,
        triggers: ['hover'],
        disabled: isExpanded,
      }"
      :to="path"
      class="text-sm font-semibolds w-full"
    >
      <Button
        :variant="isActiveRoute(path) ? 'secondary' : 'ghost'"
        size="sm"
        class="w-full px-2"
        :class="cn([isExpanded ? 'justify-between' : 'justify-center'], [isActiveRoute(path) ? '' : 'text-neutral-600'])"
      >
        <div class="flex items-center">
          <component
            :is="icon"
            class="text-neutral-900 min-w-[15px] min-h-[15px]"
            :class="cn([isExpanded ? 'mr-2' : 'mr-0'], [isActiveRoute(path) ? '' : 'text-neutral-600'])"
          />
          <span v-if="isExpanded" class="2xl:text-sm text-sm md:text-[13px]">{{ label }}</span>
        </div>
        <Badge v-if="(path === '/orders' || path === '/notifications') && isExpanded" variant="outline" class="px-1.5 py-0 text-xs bg-blue-600 rounded-md">
          <!-- TODO -->
          <span class="text-[10px] text-white">{{ path === '/orders' ? '10' : '3' }}</span>
        </Badge>
      </Button>
    </RouterLink>
  </div>
</template>
