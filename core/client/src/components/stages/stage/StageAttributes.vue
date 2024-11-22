<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, FileContract, Plus, Rating as RatingSvg } from '~/assets/svgs-vite'
import Button from '~/components/ui/button/Button.vue'
import type { Stage } from '~/types/stages.interface'

const props = defineProps<{
  stage: Stage
}>()
const { tm } = useI18n()
const attributes = computed(() => tm('order.attributes'))
</script>

<template>
  <div class="w-full my-4 space-y-2">
    <div class="text-neutral-500 flex flex-row items-center gap-10 text-sm">
      <span class="flex w-32 gap-2 items-center">
        <Calendar class="icon" />
        {{ attributes[1] }}
      </span>
      <span>{{ props.stage.date }}</span>
    </div>
    <div class="text-neutral-500 flex flex-row items-center gap-10 text-sm">
      <span class="flex w-32 gap-2 items-center">
        <RatingSvg />
        {{ attributes[4] }}
      </span>
      <span>{{ props.stage.organization }}</span>
    </div>
    <!-- TODO -->
    <div class="flex w-full items-center justify-between">
      <Button
        :disabled="true"
        size="sm"
        variant="secondary"
        class="h-7 text-neutral-700 px-[-28px]"
      >
        <FileContract class="mr-2 w-[14px] h-[14px] " />
        <span class="text-xs">{{ $t('order.actions', 1) }}</span>
      </Button>
      <Plus class=" text-neutral-700" width="14" height="14" />
    </div>
  </div>
</template>
