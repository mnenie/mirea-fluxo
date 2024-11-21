import { useLocalStorage } from '@vueuse/core'
import { type Ref, ref, watchEffect } from 'vue'
import { useOrderStore } from '~/stores/orders'

interface ReviewsContext {
  itemsPerPage: Ref<number>
  currentPage: Ref<number>
  selectOrderPage: (page: number, itemsPerPage: number) => void
  updateItemsPerPage: (newItemsPerPage: number) => void
}

const orderStore = useOrderStore()

export function useOrdersPagination(): ReviewsContext {
  const itemsPerPage = ref<number>(15)
  const currentPage = ref<number>(1)

  function selectOrderPage(page: number, items: number) {
    currentPage.value = page
    orderStore.updateOrders(page, items)
  }

  function updateItemsPerPage(newItemsPerPage: number) {
    itemsPerPage.value = newItemsPerPage
    selectOrderPage(currentPage.value, itemsPerPage.value)
  }

  useLocalStorage('items-per-page', itemsPerPage)

  watchEffect(() => {
    selectOrderPage(currentPage.value, itemsPerPage.value)
  })

  return {
    itemsPerPage,
    currentPage,
    selectOrderPage,
    updateItemsPerPage,
  }
}
