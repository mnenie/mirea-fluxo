import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { toast } from 'vue-sonner'
import { useRisks } from '~/composables/useRisks'
import AiService from '~/services/ai'
import OrdersService from '~/services/order'
import type { Order } from '~/types/order.interface'
import type { Stage } from '~/types/stages.interface'

export const useOrderStore = defineStore('orders', () => {
  const orders = shallowRef<Order[]>([])
  const ordersFiltered = shallowRef<Order[]>([])
  const order = ref<Order>({} as Order)
  const ordersPage = shallowRef<Order[]>([])
  const isPending = ref<boolean>(false)
  const isDialogOpen = ref<boolean>(false)
  const currentFormId = ref<string>('')

  const totalOrderPriceByStages = computed(() => {
    return order.value && order.value.stages ? calculateStagePrice(order.value.stages) : 0
  })

  function calculateStagePrice(stages: Stage[]): number {
    if (!stages)
      return 0
    return stages.reduce((total: number, stage: Stage) => total + stage.price + calculateStagePrice(stage.stages), 0)
  }

  function getPaginatedOrders(page: number, itemsPerPage: number) {
    const paginatedOrders = <Order[]>[]
    const pageEnd = Math.min(ordersFiltered.value.length, page * itemsPerPage)
    for (let i = (page - 1) * itemsPerPage; i < pageEnd; i++) {
      paginatedOrders.push(ordersFiltered.value[i])
    }
    return paginatedOrders
  }

  const isPendingOrders = ref<boolean>(false)

  async function getOrders(): Promise<void> {
    isPendingOrders.value = true
    try {
      const { data } = await OrdersService.getOrders()
      orders.value = data
      ordersFiltered.value = data
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

  async function createStageById(
    id: string,
    body: Pick<Stage, 'title' | 'content' | 'dateEnd' | 'price' | 'organization'>,
  ):
    Promise<void> {
    isPending.value = true
    try {
      toast.promise(
        (async () => {
          await OrdersService.createStage(id, body)
          await getOrderById(order.value._id)
        })(),
        {
          loading: 'Подождите, этап создается...',
          success: 'Этап успешно создан!',
          error: 'Ошибка при создании этапа',
        },
      )
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
      await OrdersService.patchOrders(id, { risks: normalizedArr })
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

  async function deleteStageById(id: string): Promise<void> {
    try {
      await OrdersService.deleteStage(id)
      await getOrderById(order.value._id)
    }
    catch (err: any) {
      throw new Error(err)
    }
  }

  function sortByDate(order: 'asc' | 'desc') {
    if (order === 'asc') {
      orders.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    else {
      orders.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }

  function sortByPrice(order: 'asc' | 'desc') {
    if (order === 'asc') {
      ordersFiltered.value.sort((a, b) => a.price - b.price)
    }
    else {
      ordersFiltered.value.sort((a, b) => b.price - a.price)
    }
  }

  function applyFilters(showInProcess: boolean, showNotVerified: boolean, showClosed: boolean) {
    const filterMap: Record<Order['status'], boolean> = {
      'not verified': showNotVerified,
      'in process': showInProcess,
      'closed': showClosed,
    } as const
    ordersFiltered.value = orders.value.filter((order: Order) => filterMap[order.status])
  }

  return {
    orders,
    ordersFiltered,
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
    deleteStageById,
    isDialogOpen,
    currentFormId,
    sortByDate,
    sortByPrice,
    applyFilters,
    calculateStagePrice,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
