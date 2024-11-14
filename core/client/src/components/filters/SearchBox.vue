<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { Search } from '~/assets/svgs-vite'
import { useExpanded } from '~/composables/useExpanded'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const emits = defineEmits<{
  (e: 'openModal'): void
}>()

const expanded = useExpanded()

const { isExpanded } = expanded.getExpanded()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <Button
    variant="outline"
    size="sm"
    class="relative w-full justify-between px-2 text-neutral-500"
    :class="[isExpanded ? 'shadow-sm' : 'shadow-none']"
    @click="emits('openModal')"
  >
    <div
      class="flex items-center w-full"
      :class="[isExpanded ? '' : 'justify-center']"
    >
      <Search
        class=" text-neutral-500"
        :class="[isExpanded ? 'min-w-[16px] min-h-[16px] mr-2' : 'w-[17px] h-[17px] mr-0']"
      />
      <span v-show="isExpanded" class="2xl:text-sm text-sm md:text-[13px] text-neutral-500">
        {{ $t('sidebar.search') }}
      </span>
    </div>

    <DefineTemplate v-slot="{ content }">
      <Badge variant="outline" class="px-1 py-0 text-xs gap-[1px] text-neutral-600 bg-neutral-50">
        <span class="text-[10px]">
          {{ content }}
        </span>
      </Badge>
    </DefineTemplate>

    <div v-if="isExpanded" class="flex items-center gap-1">
      <ReuseTemplate content="Ctrl / ⌘" />
      <ReuseTemplate content="K" />
    </div>
    <ReuseTemplate v-else content="⌘K" class="absolute -right-1 top-1 transform -translate-y-1/2 bg-white" />
  </Button>
</template>
