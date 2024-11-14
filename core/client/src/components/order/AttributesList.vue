<script setup lang="ts">
import { computed, ref } from 'vue'
import { Calendar, Department, Rating as RatingSvg, Smile, StatusTable } from '~/assets/svgs-vite'
import { useSharedStatus } from '~/composables/useStatus'
import type { Order } from '~/types/order.interface'
import type { Review } from '~/types/review.interface'
import Price from '../orders/card/Price.vue'
import ReviewBadgeSelect from '../shared/ReviewBadgeSelect.vue'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Select, SelectValue } from '../ui/select'
import AttributeItem from './AttributeItem.vue'

const modelDepartment = ref<Review['department']>()
const modelStatus = ref<Order['status']>('in process')

const isBtnDisabled = computed(() => modelStatus.value === 'closed')

const { statusColor, textColor } = useSharedStatus()
</script>

<template>
  <div class="px-6 pt-5 flex flex-col space-y-4">
    <AttributeItem title="Responsible">
      <template #icon>
        <Smile class="icon" />
      </template>
      <span v-if="modelStatus === 'not verified'" class="text-sm text-neutral-300">Change status to in process or closed...</span>
      <span v-else class="text-sm text-neutral-500 font-medium">hi@example.com</span>
    </AttributeItem>
    <AttributeItem title="Date">
      <template #icon>
        <Calendar class="icon" />
      </template>
      <span class="text-sm text-neutral-500 font-medium">11.10.2024</span>
    </AttributeItem>
    <AttributeItem title="Status">
      <template #icon>
        <StatusTable class="icon" />
      </template>
      <Select v-model:model-value="modelStatus">
        <ReviewBadgeSelect :values="['in process', 'closed', 'not verified']">
          <Button
            size="sm"
            variant="outline"
            class="h-5 shadow-none border-none text-xs focus-visible:ring-0"
            :class="[statusColor(modelStatus), textColor(modelStatus), `hover:${statusColor(modelStatus)}`, `hover:${textColor(modelStatus)}`]"
          >
            <SelectValue placeholder="Set status" />
          </Button>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
    <AttributeItem title="Price">
      <template #icon>
        <RatingSvg class="icon" />
      </template>
      <div class="flex flex-row items-center gap-2">
        <Price :price="1201020" class="pl-0 pr-0" />
        <span class="text-sm text-neutral-500">company is ready to pay</span>
      </div>
    </AttributeItem>
    <AttributeItem title="Organization">
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
            <SelectValue :class="[!modelDepartment && 'text-neutral-300 font-normal']" placeholder="Choose an organization" />
          </Badge>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
  </div>
</template>
