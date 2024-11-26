<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SelectContent, SelectItem, SelectTrigger } from '../ui/select'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  values: string[]
}>()

const { tm } = useI18n()
</script>

<template>
  <SelectTrigger v-bind="$attrs" class="border-none shadow-none bg-none focus:ring-0 focus:outline-none ring-0 ring-offset-0" as-child>
    <slot />
  </SelectTrigger>
  <SelectContent class="w-[150px]">
    <SelectItem v-for="value, idx in values" :key="idx" :value class="capitalize">
      {{ tm(`orders.status.${value.replace(' ', '_')}`) }}
    </SelectItem>
  </SelectContent>
</template>
