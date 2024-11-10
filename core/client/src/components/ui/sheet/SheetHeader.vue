<script setup lang="ts">
import { DialogClose } from 'radix-vue';
import type { HTMLAttributes } from 'vue'
import { Cross2Icon } from '@radix-icons/vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn('flex items-center justify-between gap-y-2 text-center sm:text-left', props.class)
    "
  >
    <slot />
    <DialogClose
        class="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
      <Cross2Icon class="w-5 h-5" />
    </DialogClose>
  </div>
</template>
