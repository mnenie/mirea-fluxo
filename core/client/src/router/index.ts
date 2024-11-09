import type { AppRouterRecord } from './types'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import { Routes } from '~/utils/contants'

const routes = [
  {
    name: Routes.reviews,
    path: '/',
    component: () => import('~/pages/ReviewsPage.vue'),
    meta: {
      requiresAuth: false,
      layout: DefaultLayout,
    },
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
] satisfies readonly AppRouterRecord[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
