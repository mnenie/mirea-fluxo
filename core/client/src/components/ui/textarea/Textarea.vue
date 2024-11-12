<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const textarea = useTemplateRef<HTMLTextAreaElement | null>('textarea')
const textareaHeight = ref(38)

const changeHeight = () => {
  const _textarea = textarea.value
    if (_textarea) {
    _textarea.style.height = 'auto'
    _textarea.style.height = `${_textarea.scrollHeight - 18}px`
    textareaHeight.value = _textarea.scrollHeight
  }
}

onMounted(() => {
  changeHeight()
})

const textareaClass = computed(() => {
  return textareaHeight.value >= 120 ? 'overflow-y-scroll' : 'overflow-hidden'
})
</script>

<template>
  <textarea
    ref="textarea"
    v-model="modelValue"
    :class="cn(
      'flex w-full max-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
       props.class,
       textareaClass
    )"
    @input="changeHeight"
  />
</template>

<style scoped>
textarea {
  resize: none;
  transition: height 0.2s ease;
}
</style>
