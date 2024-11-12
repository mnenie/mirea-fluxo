<script setup lang="ts">
import { SelectContent, SelectItem, SelectTrigger } from '../ui/select'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  values: string[]
}>()
</script>

<template>
  <SelectTrigger v-bind="$attrs" class="border-none shadow-none focus:ring-0 focus:outline-none ring-0 ring-offset-0" as-child>
    <slot />
  </SelectTrigger>
  <SelectContent class="w-[120px]">
    <SelectItem v-for="value, idx in values" :key="idx" :value class="capitalize">
      {{ value }}
    </SelectItem>
  </SelectContent>
</template>
