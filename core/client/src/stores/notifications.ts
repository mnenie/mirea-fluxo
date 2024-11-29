import { defineStore } from 'pinia'
import { ref } from 'vue'
import OrdersService from '~/services/order'
import type { Notification } from '~/types/notification.interface'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const selectedNotifications = ref<Notification[]>([])

  const isPendingOrders = ref<boolean>(false)

  async function getOrders(): Promise<void> {
    isPendingOrders.value = true
    try {
      const { data } = await OrdersService.getOrders()
      for (let i = 0; i < 10; i++) {
        notifications.value.push({ _id: `${i}`, title: data[i].title, content: `Был создан заказ ${data[i].title}`, date: data[i].date, isRead: false })
      }
    }
    catch (err: any) {
      throw new Error(err)
    }
    finally {
      isPendingOrders.value = false
    }
  }

  getOrders()

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
