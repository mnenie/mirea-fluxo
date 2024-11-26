<script setup lang="ts">
import { computed, ref } from 'vue'
import { Arrow } from '~/assets/svgs-vite'
import { Badge } from '~/components/ui/badge'
import { formatDate } from '~/helpers/formatDateHelper'
import type { Stage } from '~/types/stages.interface'
import StageAttributes from './StageAttributes.vue'
import StageMenu from './StageMenu.vue'

const props = defineProps<{
  stage: Stage
  layer: number
}>()

const isFolded = ref<boolean>(true)

const identStyle = computed(() => {
  return {
    paddingLeft: `${props.layer * 12 + (props.layer === 0 ? 0 : 12)}px`,
  }
})

const contentPl = computed(() => {
  return {
    paddingLeft: `${(props.layer * 12 + 20) + (props.layer === 0 ? 0 : 12)}px`,
  }
})

const isValidDate = computed(() => formatDate(props.stage.dateEnd)! < formatDate(new Date())!)
</script>

<template>
  <div>
    <div class="flex items-center gap-10 justify-between" :style="identStyle">
      <div v-if="stage" class="flex items-center gap-2 text-sm">
        <div>
          <Arrow v-if="isFolded" class="-rotate-90" @click="isFolded = !isFolded" />
          <Arrow v-else @click="isFolded = !isFolded" />
        </div>
        <div class="flex items-center gap-3">
          <span>{{ stage.title }}</span>
        </div>
      </div>
      <div v-if="stage" class="flex items-center gap-1.5">
        <Badge variant="secondary" class="px-1 py-px">
          <span
            :class="isValidDate ? '' : 'text-red-500'"
            class="text-xs text-neutral-400 font-medium"
          >
            до {{ formatDate(stage.dateEnd) }}
          </span>
        </Badge>
        <Badge variant="secondary" class="px-1 py-px">
          <span class="text-xs text-neutral-400 font-medium">
            {{ stage.price }} {{ $t('order.stages.container.value', 1) }}
          </span>
        </Badge>
        <StageMenu :stage />
      </div>
    </div>
    <div v-if="!isFolded">
      <StageAttributes :stage :style="contentPl" />
      <div class="space-y-2">
        <StageItem v-for="substage in stage.stages" :key="substage._id" :stage="substage" :layer="layer + 1" />
      </div>
    </div>
  </div>
</template>
