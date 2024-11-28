import type { AxiosRequestConfig } from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'

export function setupInterceptors(api: any) {
  const cookies = useCookies()

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = cookies.get('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  })
}
