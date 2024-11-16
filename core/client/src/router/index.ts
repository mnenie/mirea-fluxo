import type { AppRouterRecord } from './types'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '~/layouts/AuthLayout.vue'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import EmptyLayout from '~/layouts/EmptyLayout.vue'
import { Routes } from '~/utils/contants'

// TODO (@mnenie): fix requiresAuth and add middlewares

const routes = [
  {
    name: Routes.orders,
    path: '/',
    component: () => import('~/pages/OrdersPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
    },
    children: [
      {
        name: Routes.order,
        path: 'orders/:id',
        component: () => import('~/pages/OrderSheetPage.vue'),
      },
    ],

  },
  {
    name: Routes.notifications,
    path: '/notifications',
    component: () => import('~/pages/NotificationsPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
    },
  },
  {
    name: Routes.analytics,
    path: '/analytics',
    component: () => import('~/pages/AnalyticsPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
    },
  },
  {
    name: Routes.welcome,
    path: '/welcome',
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
      requiresAuth: false,
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

export default router
