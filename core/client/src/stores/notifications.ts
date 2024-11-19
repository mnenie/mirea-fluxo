import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '~/types/notification.interface'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const selectedNotifications = ref<Notification[]>([])

  for (let i = 0; i < 5; i++) {
    notifications.value.push({ _id: `${i}`, title: 'Hello world!', content: 'content', date: new Date(), isRead: false })
  }

  function addToSelected(notification: Notification) {
    selectedNotifications.value.push(notification)
  }

  function removeFromSelected(notification: Notification) {
    selectedNotifications.value = selectedNotifications.value.filter(n => n !== notification)
  }

  // TODO: link to backend
  function markSelectedAsRead() {
    for (let i = 0; i < notifications.value.length; i++) {
      if (selectedNotifications.value.find(n => n === notifications.value[i])) {
        notifications.value[i].isRead = true
      }
    }
  }

  function selectAll() {
    for (let i = 0; i < notifications.value.length; i++) {
      addToSelected(notifications.value[i])
    }
  }

  function checkSelected(notification: Notification) {
    return selectedNotifications.value.includes(notification)
  }

  return {
    notifications,
    selectedNotifications,
    removeFromSelected,
    markSelectedAsRead,
    selectAll,
    addToSelected,
    checkSelected,
  }
})
