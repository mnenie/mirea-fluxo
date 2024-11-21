import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import OrdersService from '~/services/orders'
import type { Order } from '~/types/order.interface'

export const useOrderStore = defineStore('orders', () => {
  const orders = shallowRef<Order[]>([])
  const order = ref<Order>({} as Order)
  const ordersPage = shallowRef<Order[]>([])

  const totalOrderPriceByStages = computed(() => {
    if (order.value && order.value.stages) {
      return order.value.stages.reduce((acc, stage) => acc + stage.price, 0)
    }
  })

  async function getOrders(): Promise<void> {
    try {
      const { data } = await OrdersService.getOrders()
      orders.value = data
    }
    catch (err: any) {
      throw new Error(err)
    }
  }

  async function getOrderById(id: string): Promise<void> {
    try {
      const { data } = await OrdersService.getOrder(id)
      order.value = data
    }
    catch (err: any) {
      throw new Error(err)
    }
  }

  async function updateOrdersById(id: string, body: Partial<Order>): Promise<void> {
    try {
      const { data } = await OrdersService.patchOrders(id, body)
      order.value = data
    }
    catch (err: any) {
      throw new Error(err)
    }
  }

  // TODO: types with Pick
  async function createStageById(id: string, body: any): Promise<void> {
    try {
      const { data } = await OrdersService.createStage(id, body)
      order.value.stages.push({ ...body! })
      order.value = data
    }
    catch (err: any) {
      throw new Error(err)
    }
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

  // TODO
  function postNewStage(stage: any) {
    order.value.stages.push(stage)
  }

  return {
    orders,
    ordersPage,
    order,
    totalOrderPriceByStages,
    updateOrders,
    getOrders,
    getOrderById,
    postNewStage,
    updateOrdersById,
    getPaginatedOrders,
    createStageById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
