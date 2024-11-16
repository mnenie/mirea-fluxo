import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type { Order } from '~/types/order.interface'

export const useArchiveStore = defineStore('archive', () => {
  const ordersArchive = shallowRef<Order[]>([])
  const ordersPage = shallowRef<Order[]>([])

  for (let index = 0; index < 52; index++) {
    ordersArchive.value.push({
      _id: `${index}`,
      title: 'Hello world',
      content: 'content',
      date: new Date(),
      closeDate: new Date(),
      status: 'closed',
      price: 1000000,
      organization: 'organization',
      stages: [],
    })
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

  return {
    ordersArchive,
    ordersPage,
    getPaginatedOrders,
    updateOrders,
  }
})
