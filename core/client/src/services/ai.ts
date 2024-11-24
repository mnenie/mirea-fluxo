import type { AxiosResponse } from 'axios'
import { api } from '~/api'

export default class AiService {
  static async generateRHM(orderId: string): Promise<AxiosResponse<string>> {
    return api.post(`/risks/${orderId}`)
  }
}
