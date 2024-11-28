import type { AxiosResponse } from 'axios'
import { api } from '~/api'
import type { Order } from '~/types/order.interface'
import type { Stage } from '~/types/stages.interface'

export default class OrdersService {
  static async getOrders(): Promise<AxiosResponse<Order[]>> {
    return api.get('/orders')
  }

  static async patchOrders(id: string, data: Partial<Order>): Promise<AxiosResponse<Order>> {
    return api.patch(`/orders/${id}`, data)
  }

  static async createStage(
    id: string,
    data: Pick<Stage, 'title' | 'content' | 'dateEnd' | 'price' | 'organization'>,
  ):
    Promise<AxiosResponse<Order>> {
    return api.put(`/stages/${id}`, data)
  }

  static async getOrder(id: string): Promise<AxiosResponse<Order>> {
    return api.get(`/orders/${id}`)
  }

  static async deleteStage(id: string): Promise<AxiosResponse<void>> {
    return api.delete(`/stages/${id}`)
  }
}
