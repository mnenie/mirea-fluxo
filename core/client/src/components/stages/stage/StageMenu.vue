<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef, ref, toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { DotMenu } from '~/assets/svgs-vite'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useJsToPdf } from '~/composables/usePdfContract'
import { useRole } from '~/composables/useRole'
import { cn } from '~/lib/utils'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import type { Stage } from '~/types/stages.interface'

const props = defineProps<{
  stage: Stage
  isValidPrice: boolean
}>()

const orderStore = useOrderStore()
const userStore = useAuthStore()

const { isDialogOpen, currentFormId, order, totalOrderPriceByStages } = storeToRefs(orderStore)
const { user } = storeToRefs(userStore)

const { hasPermission } = useRole()

const isContractDisabled = computed(() =>
  (order.value.price < props.stage.price || totalOrderPriceByStages.value! > order.value.price || !props.isValidPrice)
  || !hasPermission(user.value.role, 'create:contract'),
)

function toggleDialog() {
  isDialogOpen.value = true
  currentFormId.value = props.stage._id
}

const { tm, t } = useI18n()

const valuesFromSelect: Record<string, string> = {
  '-': '-',
  'week': '1 неделя',
  'month': '1 месяц',
  'year': '1 год',
}

async function deleteStage() {
  await orderStore.deleteStageById(props.stage._id)
}
const formFl = ref(false)
const dropdownModel = ref(false)
const modelSelect = ref('-')

const totalPriceByReduce = computed(() => orderStore.calculateStagePrice(props.stage.stages) + props.stage.price)

const valueComputed = computed(() => valuesFromSelect[modelSelect.value])

async function generatePDf() {
  return await useJsToPdf(
    toRef(() => props.stage),
    totalOrderPriceByStages as ComputedRef<number>,
    totalPriceByReduce,
    user.value!.email,
    valueComputed,
  )
}

async function downloadPdf() {
  await generatePDf()
  dropdownModel.value = !dropdownModel.value
  formFl.value = !formFl.value
}

console.log(totalPriceByReduce.value)
</script>

<template>
  <DropdownMenu v-model:open="dropdownModel">
    <DropdownMenuTrigger>
      <DotMenu class="w-4 h-4 cursor-pointer text-neutral-500" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" :class="cn(`w-[260px] z-[9999]`)">
      <DropdownMenuItem :disabled="isContractDisabled" @select.prevent="formFl = !formFl">
        <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 0) }}</span>
        <DropdownMenuShortcut>⇧I</DropdownMenuShortcut>
      </DropdownMenuItem>
      <form v-if="formFl" class="flex flex-col my-4" @submit.prevent="downloadPdf">
        <div class="flex items-center mb-4 gap-2">
          <p for="form-check" class="ml-2 text-xs font-medium whitespace-nowrap text-gray-900 dark:text-gray-300">
            {{ t('order.contract.title') }}:
          </p>
          <Select v-model:model-value="modelSelect">
            <SelectTrigger class="w-fit border-none shadow-none bg-neutral-100 py-0 px-2 h-fit rounded-sm text-sm focus:ring-0">
              <SelectValue :placeholder="modelSelect" class="!text-xs text-neutral-500" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="-" class="!text-xs">
                  -
                </SelectItem>
                <SelectItem value="week" class="!text-xs">
                  {{ tm('order.contract.values')[1] }}
                </SelectItem>
                <SelectItem value="month" class="!text-xs">
                  {{ tm('order.contract.values')[2] }}
                </SelectItem>
                <SelectItem value="year" class="!text-xs">
                  {{ tm('order.contract.values')[3] }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          variant="secondary"
          :disabled="isContractDisabled"
          type="submit"
          class="h-7"
        >
          {{ $t('order.actions', 0) }}
        </Button>
      </form>
      <DropdownMenuItem @click.stop="toggleDialog">
        <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 2) }}</span>
        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem @click.stop="deleteStage">
        <span class="2xl:text-xs text-sm font-medium text-red-500">{{ $t('order.delete') }}</span>
        <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
