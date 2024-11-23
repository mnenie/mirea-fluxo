import type { NavigationGuard } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { Routes } from '~/utils/contants'

const cookies = useCookies()

export const signInMiddleware: NavigationGuard = (to) => {
  const isAuth = cookies.get('token')
  if (isAuth && to.name === Routes.signin) {
    return { name: Routes.orders }
  }
  return true
}
