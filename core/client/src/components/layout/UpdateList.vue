<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { AiStars } from '~/assets/svgs-vite'
import { useExpanded } from '~/composables/useExpanded'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const expanded = useExpanded()
const { t } = useI18n()

const { isExpanded } = expanded.getExpanded()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div
    class="text-sm text-neutral-400 font-medium w-full px-2 flex items-center gap-2 mb-2"
    :class="[isExpanded ? 'mt-6' : 'mt-7']"
  >
    <span class="2xl:text-[13px] text-sm text-ellipsis w-full overflow-hidden whitespace-nowrap">
      {{ t('sidebar.ai') }}
    </span>
  </div>
  <Button disabled variant="ghost" size="sm" class="relative w-full justify-between px-2">
    <div
      class="flex items-center w-full"
      :class="[isExpanded ? '' : 'justify-center']"
    >
      <component
        :is="AiStars"
        class="min-w-[15px] min-h-[15px] text-neutral-900"
        :class="[isExpanded ? 'mr-2' : 'mr-0']"
      />
      <span v-show="isExpanded" class="text-sm md:text-[13px] 2xl:text-sm">
        {{ t('sidebar.ai_new.title') }}
      </span>
    </div>

    <DefineTemplate v-slot="{ content, variant }">
      <Badge :variant class="px-2 py-0 text-xs">
        <span class="text-[10px]">{{ content }}</span>
      </Badge>
    </DefineTemplate>

    <ReuseTemplate v-if="isExpanded" :content="t('sidebar.ai_new.badge')" variant="secondary" />
    <ReuseTemplate v-else content="ai" variant="outline" class="absolute -right-1 top-1 transform -translate-y-1/2 px-1 bg-white" />
  </Button>
</template>
