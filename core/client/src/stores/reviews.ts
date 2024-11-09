import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Review } from '~/types/review.interface'

export const useReviewStore = defineStore('reviews', () => {
  // TODO(@sv022): shallowRef вместо ref (после получения норм данных с бэка)
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

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReviewStore, import.meta.hot))
