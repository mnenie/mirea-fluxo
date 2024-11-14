<script setup lang="ts">
import Badge from '../ui/badge/Badge.vue'
</script>

<template>
  <div class="px-6 mt-12 text-sm text-neutral-400 flex flex-row items-center gap-2">
    <span class="text-sm mr-2">{{ $t('order.ai.title') }}</span>
    <Badge v-for="badge, idx in $tm('order.ai.badges')" :key="idx" variant="outline" class="px-1.5 py-0">
      <span class="text-xs">{{ badge }}</span>
    </Badge>
  </div>
</template>
