<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, Department, Rating as RatingSvg, Smile, StatusTable } from '~/assets/svgs-vite'
import { useSharedStatus } from '~/composables/useStatus'
import { formatDate } from '~/helpers/formatDateHelper'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import type { Order } from '~/types/order.interface'
import Price from '../orders/card/Price.vue'
import ReviewBadgeSelect from '../shared/ReviewBadgeSelect.vue'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Select, SelectValue } from '../ui/select'
import AttributeItem from './AttributeItem.vue'

const modelDepartment = ref<Order['organization']>()

const ordersStore = useOrderStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { order } = storeToRefs(ordersStore)

const { tm } = useI18n()
const attributes = computed(() => tm('order.attributes'))

const isBtnDisabled = computed(() => order.value.status === 'closed')

const { statusColor, textColor } = useSharedStatus()

const manager = computed(() => order.value.status === 'not verified' ? undefined : user.value._id)

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
      <Select v-model:model-value="order.status" @update:model-value="updateStatus">
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
      <Select v-model:model-value="modelDepartment" :disabled="isBtnDisabled">
        <ReviewBadgeSelect :values="['marketing', 'design', 'development', 'sales', 'general']">
          <Badge
            variant="outline"
            :disabled="isBtnDisabled"
            size="sm"
            class="h-5 px-0 cursor-pointer text-neutral-500 hover:text-neutral-500 font-medium hover:bg-white focus-visible:ring-0"
            :class="{ 'cursor-not-allowed': isBtnDisabled }"
          >
            <SelectValue
              :class="[!modelDepartment && 'text-neutral-300 font-normal']"
              :placeholder="$t('order.values', 3)"
            />
          </Badge>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
  </div>
</template>
