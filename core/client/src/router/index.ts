import type { AppRouterRecord } from './types'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '~/layouts/AuthLayout.vue'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import { Routes } from '~/utils/contants'

// TODO (@mnenie): fix requiresAuth and add middlewares

const routes = [
  {
    name: Routes.reviews,
    path: '/',
    component: () => import('~/pages/OrdersPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
    },
    children: [
      {
        name: Routes.review,
        path: 'reviews/:id',
        component: () => import('~/pages/ReviewSheetPage.vue'),
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
    name: Routes.settings,
    path: '/settings',
    component: () => import('~/pages/SettingsPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
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
  {
    name: Routes.signup,
    path: '/user/sign-up',
    component: () => import('~/pages/SignUpPage.vue'),
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
