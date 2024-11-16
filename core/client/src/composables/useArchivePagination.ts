import { useLocalStorage } from '@vueuse/core'
import { type Ref, ref, watchEffect } from 'vue'
import { useArchiveStore } from '~/stores/archive'

interface ReviewsContext {
  itemsPerPage: Ref<number>
  currentPage: Ref<number>
  selectOrderPage: (page: number, itemsPerPage: number) => void
  updateItemsPerPage: (newItemsPerPage: number) => void
}

const archiveStore = useArchiveStore()

export function useArchivePagination(): ReviewsContext {
  const itemsPerPage = ref<number>(15)
  const currentPage = ref<number>(1)

  function selectOrderPage(page: number, items: number) {
    currentPage.value = page
    archiveStore.updateOrders(page, items)
  }

  function updateItemsPerPage(newItemsPerPage: number) {
    itemsPerPage.value = newItemsPerPage
    selectOrderPage(currentPage.value, itemsPerPage.value)
  }

  useLocalStorage('items-per-page-archive', itemsPerPage)

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
