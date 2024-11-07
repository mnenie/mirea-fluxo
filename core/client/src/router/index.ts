import type { AppRouterRecord } from './types'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [] satisfies readonly AppRouterRecord[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
