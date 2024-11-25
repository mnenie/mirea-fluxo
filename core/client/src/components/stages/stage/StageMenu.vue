<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef, toRef } from 'vue'
import { DotMenu } from '~/assets/svgs-vite'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { useJsToPdf } from '~/composables/usePdfContract'
import { useRole } from '~/composables/useRole'
import { cn } from '~/lib/utils'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import type { Stage } from '~/types/stages.interface'

const props = defineProps<{
  stage: Stage
}>()

const orderStore = useOrderStore()
const userStore = useAuthStore()

const { isDialogOpen, currentFormId, order, totalOrderPriceByStages } = storeToRefs(orderStore)
const { user } = storeToRefs(userStore)

const { hasPermission } = useRole()

const isContractDisabled = computed(() =>
  (order.value.price < props.stage.price || totalOrderPriceByStages.value! > order.value.price)
  || !hasPermission(user.value.role, 'create:contract'),
)

function toggleDialog() {
  isDialogOpen.value = true
  currentFormId.value = props.stage._id
}

const generatePDf = async () => await useJsToPdf(toRef(() => props.stage), totalOrderPriceByStages as ComputedRef<number>, user.value!.email)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <DotMenu class="w-4 h-4 cursor-pointer text-neutral-500" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" :class="cn(`w-[200px] z-[9999]`)">
      <DropdownMenuItem :disabled="isContractDisabled" @click="generatePDf">
        <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 0) }}</span>
        <DropdownMenuShortcut>⇧I</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem @click.stop="toggleDialog">
        <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 2) }}</span>
        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span class="2xl:text-xs text-sm font-medium text-red-500">{{ $t('order.delete') }}</span>
        <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
