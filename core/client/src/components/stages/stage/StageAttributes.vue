<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Department } from '~/assets/svgs-vite'
import type { Stage } from '~/types/stages.interface'

const props = defineProps<{
  stage: Stage
}>()
const { tm } = useI18n()
const attributes = computed(() => tm('order.attributes'))
</script>

<template>
  <div class="w-full my-4 space-y-2 pl-6">
    <div class="text-neutral-500 flex flex-row items-center gap-10 text-sm">
      <span class="flex gap-2 items-center">
        <Department class="w-[14px] h-[14px]" />
        ООО Сладкая печенька
      </span>
      <span>{{ props.stage.organization }}</span>
    </div>
    <div class="text-neutral-500 flex flex-row items-center gap-10 text-sm">
      <span class="flex gap-3 items-center">
        {{ attributes[5] }}: <span>{{ stage.content }}</span>
      </span>
    </div>
    <!-- TODO -->
    <!-- перенес в StageItem -> StageMenu -->
  </div>
</template>

<style scoped>
.attribute {
  grid-template-columns: 120px 1fr;
  grid-column-gap: 12px;
  align-items: center;
  max-width: max-content;
}
</style>
