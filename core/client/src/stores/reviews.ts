import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Review } from '~/types/review.interface'

export const useReviewStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([])

  const fetchReviews = async function () {
    const response = await (await fetch('https://raw.githubusercontent.com/sv022/MockDB/refs/heads/main/ReviewService/reviews.json')).json()
    reviews.value.push(...response)
  }
  return {
    reviews,
    fetchReviews,
  }
})
