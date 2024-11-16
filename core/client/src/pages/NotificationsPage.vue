<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Sort } from '~/assets/svgs-vite'
import NotificationsContainer from '~/components/notifications/NotificationsContainer.vue'
import Button from '~/components/ui/button/Button.vue'

useHead({
  title: '1CManager | Notifications',
})
</script>

<template>
  <div class="w-full h-full">
    <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
      <Sort class="text-neutral-600 min-w-[14px] min-h-[14px]" />
      <span class="2xl:text-[13px] text-sm text-neutral-800">
        {{ $t('orders.filters', 1) }}
      </span>
    </Button>
    <NotificationsContainer />
  </div>
</template>
