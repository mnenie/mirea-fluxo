import type { NavigationGuard } from 'vue-router'
import { type Permission, useRole } from '~/composables/useRole'
import { useAuthStore } from '~/stores/auth'
import { Routes } from '~/utils/contants'

export const permissionMiddleware: NavigationGuard = (to) => {
  const authStore = useAuthStore()
  const { hasPermission } = useRole()

  if (to.meta.permission && !hasPermission(authStore.user.role, to.meta.permission as Permission)) {
    return { name: Routes.orders }
  }
  return true
}
