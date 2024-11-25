<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, Department, Rating as RatingSvg, Smile, StatusTable } from '~/assets/svgs-vite'
import { useRole } from '~/composables/useRole'
import { useSharedStatus } from '~/composables/useStatus'
import { formatDate } from '~/helpers/formatDateHelper'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import Price from '../orders/card/Price.vue'
import ReviewBadgeSelect from '../shared/ReviewBadgeSelect.vue'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Select, SelectValue } from '../ui/select'
import AttributeItem from './AttributeItem.vue'

const ordersStore = useOrderStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { order } = storeToRefs(ordersStore)

const { tm } = useI18n()
const attributes = computed(() => tm('order.attributes'))

const { hasPermission } = useRole()

const { statusColor, textColor } = useSharedStatus()

const manager = computed(() => order.value.status === 'not verified' ? undefined : user.value._id)
const organizations = computed(() => order.value.stages.map(stage => stage.organization))

async function updateStatus() {
  const data = {
    ...order.value,
    status: order.value.status,
    manager: manager.value,
  }
  await ordersStore.updateOrdersById(order.value._id, data)
}
</script>

<template>
  <div class="px-6 pt-5 flex flex-col space-y-4">
    <AttributeItem :title="attributes[0]">
      <template #icon>
        <Smile class="icon" />
      </template>
      <span v-if="order.status === 'not verified'" class="text-sm text-neutral-300">
        {{ $t('order.values', 0) }}
      </span>
      <span v-else class="text-sm text-neutral-500 font-medium">{{ user.email }}</span>
    </AttributeItem>
    <AttributeItem :title="attributes[1]">
      <template #icon>
        <Calendar class="icon" />
      </template>
      <span class="text-sm text-neutral-500 font-medium">{{ formatDate(order.date) }}</span>
    </AttributeItem>
    <AttributeItem :title="attributes[2]">
      <template #icon>
        <StatusTable class="icon" />
      </template>
      <Select
        v-model:model-value="order.status"
        :disabled="!hasPermission(user.role, 'update:order')"
        @update:model-value="updateStatus"
      >
        <ReviewBadgeSelect :values="['in process', 'closed', 'not verified']">
          <Button
            size="sm"
            variant="outline"
            class="h-5 shadow-none border-none text-xs focus-visible:ring-0"
            :class="[statusColor(order.status), textColor(order.status), `hover:${statusColor(order.status)}`, `hover:${textColor(order.status)}`]"
          >
            <SelectValue placeholder="Set status" />
          </Button>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
    <AttributeItem :title="attributes[3]">
      <template #icon>
        <RatingSvg class="icon" />
      </template>
      <div class="flex flex-row items-center gap-2">
        <Price :price="order.price" class="pl-0 pr-0" />
        <span class="text-sm text-neutral-500">{{ $t('order.values', 1) }}</span>
      </div>
    </AttributeItem>
    <AttributeItem :title="attributes[4]">
      <template #icon>
        <Department class="icon" />
      </template>
      <template v-if="organizations.length > 0">
        <div v-for="org, idx in organizations" :key="idx" class="flex flex-row items-center gap-2">
          <Badge variant="secondary" class="text-xs text-neutral-500 font-medium py-0 px-1">
            {{ org }}
          </Badge>
        </div>
      </template>
      <span v-else class="text-sm text-neutral-400">{{ $t('order.values', 2) }}</span>
    </AttributeItem>
  </div>
</template>
