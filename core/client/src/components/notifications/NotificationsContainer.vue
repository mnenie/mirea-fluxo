<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '~/stores/notifications'
import NotificationCard from './NotificationCard.vue'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
</script>

<template>
  <div class="p-2">
    <NotificationCard v-for="notification in notifications" :key="notification._id" :notification="notification" />
  </div>
</template>
