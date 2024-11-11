import { useLocalStorage } from '@vueuse/core'
import { type Ref, ref, watchEffect } from 'vue'
import { useReviewStore } from '~/stores/reviews'

interface ReviewsContext {
  itemsPerPage: Ref<number>
  currentPage: Ref<number>
  selectReviewPage: (page: number, itemsPerPage: number) => void
  updateItemsPerPage: (newItemsPerPage: number) => void
}

const reviewStore = useReviewStore()

export function useReviewsPagination(): ReviewsContext {
  const itemsPerPage = ref<number>(15)
  const currentPage = ref<number>(1)

  function selectReviewPage(page: number, items: number) {
    currentPage.value = page
    reviewStore.updateReviews(page, items)
  }

  function updateItemsPerPage(newItemsPerPage: number) {
    itemsPerPage.value = newItemsPerPage
    selectReviewPage(currentPage.value, itemsPerPage.value)
  }

  useLocalStorage('items-per-page', itemsPerPage)

  watchEffect(() => {
    selectReviewPage(currentPage.value, itemsPerPage.value)
  })

  return {
    itemsPerPage,
    currentPage,
    selectReviewPage,
    updateItemsPerPage,
  }
}
