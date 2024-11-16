import { createSharedComposable } from '@vueuse/core'
import { computed } from 'vue'
import type { Order } from '~/types/order.interface'

export const useSharedStatus = createSharedComposable(useStatus)

function useStatus() {
  const colorMap: Record<Order['status'], string> = {
    'not verified': 'bg-blue-100',
    'in process': 'bg-amber-100',
    'closed': 'bg-green-100',
  } as const

  const textColorMap: Record<Order['status'], string> = {
    'not verified': 'text-blue-600',
    'in process': 'text-amber-600',
    'closed': 'text-green-900',
  } as const

  const statusColor = computed(() => (status: Order['status']) => colorMap[status] || '')
  const textColor = computed(() => (status: Order['status']) => textColorMap[status] || '')

  return {
    statusColor,
    textColor,
  }
}
