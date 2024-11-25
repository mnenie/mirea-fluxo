import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import OrdersService from '~/services/order'
import type { Order } from '~/types/order.interface'

export const useArchiveStore = defineStore('archive', () => {
  const ordersArchive = shallowRef<Order[]>([])
  const ordersPage = shallowRef<Order[]>([])
  const isPendingOrders = ref<boolean>(false)

  async function getOrders(): Promise<void> {
    isPendingOrders.value = true
    try {
      const { data } = await OrdersService.getOrders()
      ordersArchive.value = data.filter((order: Order) => order.status === 'closed')
    }
    catch (err: any) {
      throw new Error(err)
    }
    finally {
      isPendingOrders.value = false
    }
  }

  const getPaginatedOrders = function (page: number, itemsPerPage: number) {
    const paginatedOrders = <Order[]>[]
    const pageEnd = Math.min(ordersArchive.value.length, page * itemsPerPage)
    for (let i = (page - 1) * itemsPerPage; i < pageEnd; i++) {
      paginatedOrders.push(ordersArchive.value[i])
    }
    return paginatedOrders
  }

  function updateOrders(page: number, items: number) {
    ordersPage.value = getPaginatedOrders(page, items)
  }

  function sortByDate(order: 'asc' | 'desc') {
    if (order === 'asc') {
      ordersArchive.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    else {
      ordersArchive.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }

  function sortByPrice(order: 'asc' | 'desc') {
    if (order === 'asc') {
      ordersArchive.value.sort((a, b) => a.price - b.price)
    }
    else {
      ordersArchive.value.sort((a, b) => b.price - a.price)
    }
  }

  return {
    ordersArchive,
    ordersPage,
    getPaginatedOrders,
    updateOrders,
    getOrders,
    isPendingOrders,
    sortByDate,
    sortByPrice,
  }
})
