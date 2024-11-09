<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue'
import { useReviewStore } from '~/stores/reviews'

import ReviewCard from './ReviewCard.vue'

const reviewStore = useReviewStore()

const el = ref<HTMLElement | null>(null)

const noNewReviews = ref<boolean>(false)

async function onLoadMore() {
  if (noNewReviews.value) {
    return
  }
  reviewStore.fetchReviews()
}

useInfiniteScroll(el, onLoadMore, { distance: 10 })
</script>

<template>
  <div ref="el" class="scroll review-grid overflow-y-auto h-full w-full">
    <ReviewCard v-for="review in reviewStore.reviews" :key="review.title" :review="review" />
  </div>
</template>

<style scoped>
    .review-grid {
      overflow: scroll;
      display: grid;
      grid-template-columns: 1fr 1fr;
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
