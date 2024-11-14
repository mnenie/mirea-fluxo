<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
</script>

<template>
  <div ref="el" class="scroll review-grid overflow-y-auto h-full w-full">
    <!-- <ReviewCard v-for="review in reviewStore.reviews" :key="review.title" :review="review" /> -->
  </div>
</template>

<style scoped>
    .review-grid {
      overflow: scroll;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: auto;
      grid-gap: 1rem;
    }
    .scroll::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scroll {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
</style>
