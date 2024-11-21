import type { AxiosResponse } from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'
import { api } from '~/api/instance'
import type { UserAuth } from '~/types/user.interface'

const cookies = useCookies()

export default class UserService {
  static async login<T extends Record<string, string>>(data: T): Promise<AxiosResponse<UserAuth>> {
    return api.post('/auth/login', data)
  }

  static async getUser(): Promise<AxiosResponse<UserAuth>> {
    return api.get('/auth/me')
  }

  static logout() {
    cookies.remove('token')
  }
}
