import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '~/types/notification.interface'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const selectedNotifications = ref<Notification[]>([])

  for (let i = 0; i < 5; i++) {
    notifications.value.push({ _id: `${i}`, title: 'Hello world!', content: 'content', date: new Date(), isRead: false })
  }

  return {
    notifications,
    selectedNotifications,
  }
})
