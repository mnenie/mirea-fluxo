<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ReviewTable from '~/components/reviews/ReviewTable.vue'

useHead({
  title: '1CManager | Reviews',
})
</script>

<template>
  <div class="w-full h-full">
    <ReviewTable />
  </div>
</template>
