<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@radix-icons/vue'
import { reactive, ref } from 'vue'
import type { Stage } from '~/types/stages.interface'
import StageAttributes from './StageAttributes.vue'

const props = defineProps<{
  stage: Stage
  layer: number
}>()

const isFolded = ref<boolean>(false)

const identStyle = reactive({
  paddingLeft: `${props.layer * 12 + (props.layer === 0 ? 0 : 12)}px`,
})
</script>

<template>
  <div>
    <div class="flex items-center gap-10 justify-between" :style="identStyle">
      <span v-if="props.stage" class="flex items-center gap-2 text-sm">
        <div>
          <ChevronUpIcon v-if="isFolded" @click="isFolded = !isFolded" />
          <ChevronDownIcon v-else @click="isFolded = !isFolded" />
        </div>
        <span class="text-neutral-800">{{ props.stage.organization }}</span>
        {{ props.stage.title }}
      </span>
      <span v-if="stage" class="text-sm text-neutral-400 font-medium">
        {{ props.stage.price }} {{ $t('order.stages.container.value', 1) }}
      </span>
    </div>
    <div v-if="!isFolded">
      <StageAttributes :stage="stage" />
      <StageItem v-for="substage, idx in props.stage.stages" :key="idx" :stage="substage" :layer="layer + 1" />
    </div>
  </div>
</template>
