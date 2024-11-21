import type { AxiosResponse } from 'axios'
import { api } from '~/api'
import type { Order } from '~/types/order.interface'

export default class OrdersService {
  static async getOrders(): Promise<AxiosResponse<Order[]>> {
    return api.get('/orders')
  }

  static async patchOrders(id: string, data: Partial<Order>): Promise<AxiosResponse<Order>> {
    return api.patch(`/orders/${id}`, data)
  }

  // TODO: types with Pick(@mnenie)
  static async createStage(id: string, data: any): Promise<AxiosResponse<Order>> {
    return api.put(`/stages/${id}`, data)
  }

  static async getOrder(id: string): Promise<AxiosResponse<Order>> {
    return api.get(`/orders/${id}`)
  }
}
