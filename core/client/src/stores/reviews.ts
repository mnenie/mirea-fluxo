import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Review } from '~/types/review.interface'

export const useReviewStore = defineStore('reviews', () => {
  // TODO(@sv022): shallowRef вместо ref (после получения норм данных с бэка)
  const reviews = ref<Review[]>([])

  // temporary for testing reviews pagination - remove later
  for (let index = 0; index < 147; index++) {
    reviews.value.push({ _id: `${index}`, title: 'Hello world', content: 'content', email: '17bMw@example.com', date: new Date(), status: 'not verified', stars: 5 })
  }

  const fetchReviews = async function () {
    const response = await (await fetch('https://raw.githubusercontent.com/sv022/MockDB/refs/heads/main/ReviewService/reviews.json')).json()
    reviews.value.push(...response)
  }

  const getPaginatedReviews = function (page: number, itemsPerPage: number) {
    const paginatedReviews = <Review[]>[]
    const pageEnd = Math.min(reviews.value.length, page * itemsPerPage)
    for (let i = (page - 1) * itemsPerPage; i < pageEnd; i++) {
      paginatedReviews.push(reviews.value[i])
    }
    return paginatedReviews
  }

  return {
    reviews,
    fetchReviews,
    getPaginatedReviews,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReviewStore, import.meta.hot))
