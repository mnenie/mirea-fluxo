import { storeToRefs } from 'pinia'
import { useNotificationStore } from '~/stores/notifications'
import type { Notification } from '~/types/notification.interface'

const notificationStore = useNotificationStore()
const { selectedNotifications } = storeToRefs(notificationStore)

export function useNotifications() {
  /*
  * TODO(@sv022): я думаю надо все же это затащить все в стор дабы не изменять стор переменные отдельно от пьньи
  * разрыв центр. логики
  */
  function addToSelected(notification: Notification) {
    selectedNotifications.value.push(notification)
  }

  function removeFromSelected(notification: Notification) {
    selectedNotifications.value = selectedNotifications.value.filter(n => n !== notification)
  }

  // TODO: link to backend
  function markSelectedAsRead() {
    for (let i = 0; i < notificationStore.notifications.length; i++) {
      if (selectedNotifications.value.find(n => n === notificationStore.notifications[i])) {
        notificationStore.notifications[i].isRead = true
      }
    }
  }

  function selectAll() {
    for (let i = 0; i < notificationStore.notifications.length; i++) {
      addToSelected(notificationStore.notifications[i])
    }
  }

  function checkSelected(notification: Notification) {
    return selectedNotifications.value.includes(notification)
  }
  return {
    addToSelected,
    removeFromSelected,
    markSelectedAsRead,
    selectAll,
    checkSelected,
  }
}
