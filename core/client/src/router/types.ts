import type { RouteRecordRaw } from 'vue-router'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    meta?: Record<string, unknown>
    requiresAuth?: boolean
    permission?: string
  }
}

export type AppRouterRecord = Omit<RouteRecordRaw, 'name' | 'children'> & {
  name: string
  children?: AppRouterRecord[]
}
