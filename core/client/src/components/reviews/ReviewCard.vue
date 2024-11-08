<script setup lang="ts">
const { review } = defineProps(['review'])
</script>

<template>
  <div class="w-full border rounded">
    {{ review }}
  </div>
</template>
