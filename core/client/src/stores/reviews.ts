import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Review } from '~/types/review.interface'

export const useReviewStore = defineStore('reviews', () => {
  // TODO(@sv022): shallowRef вместо ref (после получения норм данных с бэка)
  const reviews = ref<Review[]>([
    { _id: '089798789', title: 'Hello world', content: 'content', email: '17bMw@example.com', date: new Date(), status: 'not verified', stars: 5 },
    { _id: '1223809183', title: 'Привет я хз че я тут делаю', content: 'content', email: 'dasdsa@example.com', date: new Date(), status: 'verified', stars: 5 },
  ])

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
