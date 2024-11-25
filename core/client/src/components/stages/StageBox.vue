<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { History } from '~/assets/svgs-vite'
import { useRole } from '~/composables/useRole'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const { hasPermission } = useRole()
</script>

<template>
  <div
    class="sticky bottom-0 z-[999] bg-white w-full mt-auto px-6 flex flex-col items-center justify-center"
    :class="hasPermission(user.role, 'create:stages') ? '' : 'pointer-events-none cursor-not-allowed opacity-50'"
  >
    <div class="flex flex-col w-full items-center">
      <Button
        variant="secondary"
        class="w-full backdrop:blur-sm text-neutral-600 justify-between"
      >
        {{ $t('order.stages.add') }}
        <div v-if="order.stages && order.stages.length !== 0" class="text-sm text-neutral-400 flex items-center gap-1">
          <History class="w-[14px] h-[14px]" />
          {{ order.stages.length }}
        </div>
      </Button>
    </div>
  </div>
</template>
