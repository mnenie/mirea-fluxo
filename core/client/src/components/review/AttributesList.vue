<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Department, Rating as RatingSvg, Smile, StatusTable } from '~/assets/svgs-vite'
import type { Review } from '~/types/review.interface'
import Rating from '../reviews/card/Rating.vue'
import ReviewBadgeSelect from '../shared/ReviewBadgeSelect.vue'
import { Button } from '../ui/button'
import { Select, SelectValue } from '../ui/select'
import AttributeItem from './AttributeItem.vue'

const modelDepartment = ref<Review['department']>()
const modelStatus = ref<Review['status']>('consideration')
</script>

<template>
  <div class="px-6 pt-5 flex flex-col space-y-4">
    <AttributeItem title="Executor">
      <template #icon>
        <Smile />
      </template>
      <span class="text-sm text-neutral-300">Change status to consideration or verified...</span>
    </AttributeItem>
    <AttributeItem title="Date">
      <template #icon>
        <Calendar />
      </template>
      <span class="text-sm text-neutral-500 font-medium">11.10.2024</span>
    </AttributeItem>
    <AttributeItem title="Status">
      <template #icon>
        <StatusTable />
      </template>
      <Select v-model:model-value="modelStatus">
        <ReviewBadgeSelect :values="['consideration', 'verified', 'not verified']">
          <Button
            size="sm"
            variant="secondary"
            class="h-5 text-amber-600 bg-amber-100 hover:bg-amber-100 shadow-none border-none text-xs focus-visible:ring-0"
          >
            <SelectValue placeholder="Set status" />
          </Button>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
    <AttributeItem title="Rating">
      <template #icon>
        <RatingSvg />
      </template>
      <div class="flex flex-row items-center gap-2">
        <Rating :stars="4" class="pl-0 pr-0" />
        <span class="text-sm text-neutral-500">stars were assigned in the review</span>
      </div>
    </AttributeItem>
    <AttributeItem title="Department">
      <template #icon>
        <Department />
      </template>
      <Select v-model:model-value="modelDepartment">
        <ReviewBadgeSelect :values="['marketing', 'design', 'development', 'sales', 'general']">
          <Button
            variant="ghost"
            size="sm"
            class="h-5 text-neutral-500 hover:text-neutral-500 focus-visible:ring-0"
          >
            <SelectValue :class="[!modelDepartment && 'text-neutral-300 font-normal']" placeholder="Choose a department" />
          </Button>
        </ReviewBadgeSelect>
      </Select>
    </AttributeItem>
  </div>
</template>
