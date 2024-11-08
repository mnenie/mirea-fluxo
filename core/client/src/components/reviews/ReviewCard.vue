<script setup lang="ts">
const { review } = defineProps(['review'])
</script>

<template>
  <div class="w-full aspect-[2/1] border rounded">
    {{ review }}
  </div>
</template>
