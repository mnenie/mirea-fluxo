import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import type { Order } from '~/types/order.interface'

const orderDescription = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quas
  <strong>consectetur</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <br />
  Odit blanditiis ab quaerat, <strong>quisquam eos pariatur neque consequatur possimus</strong> at id nam officia libero repellendus quo deleniti, fuga totam vel accusantium?`

export const useOrderStore = defineStore('orders', () => {
  const orders = shallowRef<Order[]>([])
  const order = ref<Order>({
    _id: '0',
    title: 'Hello world',
    content: orderDescription,
    date: new Date(),
    status: 'in process',
    price: 123000,
    organization: '1C Software',
    stages: [],
  } as Order)
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

  const totalOrderPriceByStages = computed(() =>
    order.value.stages.reduce((acc, stage) => acc + stage.price, 0))

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
    fetchOrders,
    postNewStage,
    getPaginatedOrders,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
