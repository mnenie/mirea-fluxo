import type { NavigationGuard } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { Routes } from '~/utils/contants'

const cookies = useCookies()

export const authMiddleware: NavigationGuard = (to) => {
  const isAuth = cookies.get('token')
  if (!isAuth && to.meta.requiresAuth && to.name !== Routes.signin) {
    return { name: Routes.signin }
  }
  return true
}
