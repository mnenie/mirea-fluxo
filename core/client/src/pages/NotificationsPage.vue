<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { LetterCheck, Sort } from '~/assets/svgs-vite'
import NotificationsContainer from '~/components/notifications/NotificationsContainer.vue'
import Button from '~/components/ui/button/Button.vue'
import Checkbox from '~/components/ui/checkbox/Checkbox.vue'
import { useNotificationStore } from '~/stores/notifications'

const notificationStore = useNotificationStore()
const { selectedNotifications } = storeToRefs(notificationStore)

useHead({
  title: '1CManager | Notifications',
})
const isMarked = ref<boolean>(false)

function handleCheckAll() {
  isMarked.value = !isMarked.value
  if (isMarked.value) {
    notificationStore.selectAll()
  }
  else {
    selectedNotifications.value = []
  }
}
</script>

<template>
  <div class="w-full h-full">
    <div class="flex flex-row items-center space-x-4 ml-4">
      <!-- TODO: fix check all -->
      <Checkbox :disabled="true" @update:checked="handleCheckAll" />
      <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
        <Sort class="text-neutral-600 min-w-[14px] min-h-[14px]" />
        <span class="2xl:text-[13px] text-sm text-neutral-800">
          {{ $t('orders.filters', 1) }}
        </span>
      </Button>
      <!-- TODO: add tooltip -->
      <Button v-if="selectedNotifications.length > 0" size="sm" class="text-neutral-600" variant="outline" @click="notificationStore.markSelectedAsRead">
        <LetterCheck class="w-[17px] h-[17px] 2xl:w-[18px] 2xl:h-[18px]" />
      </Button>
    </div>
    <NotificationsContainer />
  </div>
</template>
