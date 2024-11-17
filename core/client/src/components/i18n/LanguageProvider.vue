<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { cn } from '~/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

const locales = reactive([
  { value: 'en-US', name: 'EN' },
  { value: 'ru-RU', name: 'RU' },
])

const language = ref('')

const i18nLanguage = computed(() => locales.find(item => item.value === language.value)?.name || language.value)

const { setLanguage } = useLanguage(locales, language)
</script>

<template>
  <Select
    v-model:model-value="language"
    :class="cn(buttonVariants({ variant: 'outline' }), 'appearance-none bg-transparent font-normal')"
    @update:model-value="setLanguage($event)"
  >
    <SelectTrigger class="w-fit border-none shadow-none bg-none focus:ring-0 focus:outline-none ring-0 ring-offset-0" as-child>
      <Button variant="ghost" class="border-none px-0 py-0 items-center shadow-none bg-none focus:ring-0 focus:outline-none ring-0 ring-offset-0 focus-visible:ring-0 hover:bg-white text-neutral-600">
        {{ i18nLanguage }}
      </Button>
    </SelectTrigger>
    <SelectContent class="w-fit min-w-2" align="center">
      <SelectItem
        v-for="item in locales"
        :key="item.value"
        :value="item.value"
      >
        {{ item.name }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
