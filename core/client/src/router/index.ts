import type { AppRouterRecord } from './types'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '~/layouts/AuthLayout.vue'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import EmptyLayout from '~/layouts/EmptyLayout.vue'
import { Routes } from '~/utils/contants'
import { authMiddleware } from './middleware/auth'
import { signInMiddleware } from './middleware/sign-in'

const routes = [
  {
    name: Routes.orders,
    path: '/orders',
    component: () => import('~/pages/OrdersPage.vue'),
    meta: {
      requiresAuth: true,
      layout: DefaultLayout,
    },
    children: [
      {
        name: Routes.order,
        path: '/orders/:id',
        component: () => import('~/pages/OrderSheetPage.vue'),
      },
    ],

  },
  {
    name: Routes.notifications,
    path: '/notifications',
    component: () => import('~/pages/NotificationsPage.vue'),
    meta: {
      requiresAuth: true,
      layout: DefaultLayout,
    },
  },
  {
    name: Routes.analytics,
    path: '/analytics',
    component: () => import('~/pages/AnalyticsPage.vue'),
    meta: {
      requiresAuth: true,
      layout: DefaultLayout,
    },
  },
  {
    name: Routes.welcome,
    path: '/',
    component: () => import('~/pages/WelcomePage.vue'),
    meta: {
      requiresAuth: false,
      layout: EmptyLayout,
    },
  },
  {
    name: Routes.archive,
    path: '/archive',
    component: () => import('~/pages/ArchivePage.vue'),
    meta: {
      requiresAuth: true,
      layout: DefaultLayout,
    },
  },
  {
    name: Routes.signin,
    path: '/user/sign-in',
    component: () => import('~/pages/SignInPage.vue'),
    meta: {
      requiresAuth: false,
      layout: AuthLayout,
    },
  },
] satisfies readonly AppRouterRecord[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authMiddleware)
router.beforeEach(signInMiddleware)

export default router
