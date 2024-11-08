<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue'

import ReviewCard from './ReviewCard.vue'

const el = ref<HTMLElement | null>(null)
const reviews = ref(['review1', 'review2', 'review3', 'review4', 'review5', 'review6'])

const noNewReviews = ref<boolean>(false)

async function onLoadMore() {
  if (noNewReviews.value) {
    return
  }
  for (let i = 0; i < 15; i++) {
    reviews.value.push(`review${reviews.value.length + 1}`)
  }
  noNewReviews.value = true
}

useInfiniteScroll(el, onLoadMore, { distance: 10 })
</script>

<template>
  <div ref="el" class="review-grid overflow-y-auto h-full w-full">
    <ReviewCard v-for="review in reviews" :key="review" :review="review" />
  </div>
</template>

<style>
    .review-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* how much height must each element occupy! change that! */
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
