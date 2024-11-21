import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://iptip-hack-2024-11-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const cookies = useCookies()

api.interceptors.request.use((config) => {
  const token = cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
