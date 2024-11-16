<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="grid grid-cols-2 attribute items-center gap-10 relative">
    <div class="text-neutral-500 flex flex-row items-center gap-2 text-sm">
      <slot name="icon" />
      <span>{{ title }}</span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.attribute{
  grid-template-columns: 120px 1fr;
  grid-column-gap: 12px;
  align-items: center;
  max-width: max-content;
}

:slotted(.icon) {
  @apply w-[14px] h-[14px]
}
</style>
