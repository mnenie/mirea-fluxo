import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type { Order } from '~/types/order.interface'

export const useOrderStore = defineStore('orders', () => {
  const orders = shallowRef<Order[]>([])
  const ordersPage = shallowRef<Order[]>([])

  // temporary for testing orders pagination - remove later
  for (let index = 0; index < 147; index++) {
    orders.value.push({
      _id: `${index}`,
      title: 'Hello world',
      content: 'content',
      date: new Date(),
      status: 'not verified',
      price: 1000000,
      organization: 'organization',
      stages: [],
    })
  }

  const fetchOrders = async function () {
    const response = await (await fetch('https://raw.githubusercontent.com/sv022/MockDB/refs/heads/main/ReviewService/reviews.json')).json()
    orders.value = response
  }

  const getPaginatedOrders = function (page: number, itemsPerPage: number) {
    const paginatedOrders = <Order[]>[]
    const pageEnd = Math.min(orders.value.length, page * itemsPerPage)
    for (let i = (page - 1) * itemsPerPage; i < pageEnd; i++) {
      paginatedOrders.push(orders.value[i])
    }
    return paginatedOrders
  }

  function updateOrders(page: number, items: number) {
    ordersPage.value = getPaginatedOrders(page, items)
  }

  return {
    orders,
    ordersPage,
    updateOrders,
    fetchOrders,
    getPaginatedOrders,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
