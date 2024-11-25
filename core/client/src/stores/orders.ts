import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { useRisks } from '~/composables/useRisks'
import AiService from '~/services/ai'
import OrdersService from '~/services/order'
import type { Order } from '~/types/order.interface'
import type { Stage } from '~/types/stages.interface'

export const useOrderStore = defineStore('orders', () => {
  const orders = shallowRef<Order[]>([])
  const order = ref<Order>({} as Order)
  const ordersPage = shallowRef<Order[]>([])
  const isPending = ref<boolean>(false)
  const isDialogOpen = ref<boolean>(false)
  const currentFormId = ref<string>('')

  const totalOrderPriceByStages = computed(() => {
    if (order.value && order.value.stages) {
      return order.value.stages.reduce((acc, stage) => acc + stage.price, 0)
    }
  })

  function getPaginatedOrders(page: number, itemsPerPage: number) {
    const paginatedOrders = <Order[]>[]
    const pageEnd = Math.min(orders.value.length, page * itemsPerPage)
    for (let i = (page - 1) * itemsPerPage; i < pageEnd; i++) {
      paginatedOrders.push(orders.value[i])
    }
    return paginatedOrders
  }

  const isPendingOrders = ref<boolean>(false)

  async function getOrders(): Promise<void> {
    isPendingOrders.value = true
    try {
      const { data } = await OrdersService.getOrders()
      orders.value = data.filter((order: Order) => order.status !== 'closed')
    }
    catch (err: any) {
      throw new Error(err)
    }
    finally {
      isPendingOrders.value = false
    }
  }

  async function getOrderById(id: string): Promise<void> {
    isPending.value = true
    try {
      const { data } = await OrdersService.getOrder(id)
      order.value = data
      currentFormId.value = order.value._id
    }
    catch (err: any) {
      isPending.value = false
      throw new Error(err)
    }
    finally {
      isPending.value = false
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
  async function createStageById(
    id: string,
    body: Pick<Stage, 'title' | 'content' | 'dateEnd' | 'price' | 'organization'>,
  ):
    Promise<void> {
    isPending.value = true
    try {
      await OrdersService.createStage(id, body)
      await getOrderById(order.value._id)
    }
    catch (err: any) {
      throw new Error(err)
    }
    finally {
      isPending.value = false
    }
  }

  const isMapUploading = ref<boolean>(false)

  async function getRisksByOrderId(id: string): Promise<void> {
    isMapUploading.value = true
    try {
      const response = await AiService.generateRHM(id)
      const { normalizedArr } = await useRisks(response.data)
      // await OrdersService.patchOrders(id, { risks: normalizedArr })
      order.value.risks = normalizedArr
    }
    catch (err: any) {
      throw new Error(err)
    }
    finally {
      isMapUploading.value = false
    }
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
    isPending,
    isPendingOrders,
    isMapUploading,
    updateOrders,
    getOrders,
    getOrderById,
    postNewStage,
    updateOrdersById,
    getRisksByOrderId,
    getPaginatedOrders,
    createStageById,
    isDialogOpen,
    currentFormId,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
