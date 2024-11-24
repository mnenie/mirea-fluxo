<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watchPostEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Link } from '~/assets/svgs-vite'
import AttributesList from '~/components/order/AttributesList.vue'
import BadgesList from '~/components/order/BadgesList.vue'
import InfoPart from '~/components/order/InfoPart.vue'
import OrderActions from '~/components/order/OrderActions.vue'
import RiskList from '~/components/order/RiskList.vue'
import RiskMap from '~/components/order/RiskMap.vue'
import SkeletonContent from '~/components/order/SkeletonContent.vue'
import StageBox from '~/components/stages/StageBox.vue'
import StageList from '~/components/stages/StageList.vue'
import StageModal from '~/components/stages/StageModal.vue'
import { Badge } from '~/components/ui/badge'
import { SheetHeader } from '~/components/ui/sheet'
import { Skeleton } from '~/components/ui/skeleton'
import { Tabs, TabsContent } from '~/components/ui/tabs'
import { useOrderStore } from '~/stores/orders'

const tabValue = ref('stages')

const route = useRoute()

const orderStore = useOrderStore()
const { order, isPending, isMapUploading } = storeToRefs(orderStore)

watchPostEffect(async () => {
  await orderStore.getOrderById(route.params.id as string)
})
</script>

<template>
  <div class="relative h-full !overflow-auto flex flex-col">
    <SheetHeader
      v-if="!isPending"
      class="border-b border-neutral-100 justify-between sticky bg-white opacity-100 z-[9999999] top-0 w-full"
    >
      <Badge variant="secondary" class="text-neutral-500">
        <span>#{{ order._id }}</span>
        <Link class="ml-1 w-[14px] h-[14px]" />
      </Badge>
      <template #actions>
        <OrderActions />
      </template>
    </SheetHeader>
    <div v-else class="flex items-center justify-between w-full px-4 py-2">
      <Skeleton class="w-[240px] h-5" />
    </div>
    <Tabs
      v-if="!isPending"
      v-model:model-value="tabValue"
      default-value="stages"
      class="w-full h-full overflow-auto"
    >
      <InfoPart :order />
      <AttributesList />
      <BadgesList />
      <TabsContent value="stages">
        <StageList />
      </TabsContent>
      <TabsContent value="trk">
        <!-- TODO: display -->
        <RiskMap v-if="order.risks && Array.isArray(order.risks)" :dataset="order.risks" />
        <RiskList :risks="order.risks" :is-map-uploading />
      </TabsContent>
    </Tabs>
    <SkeletonContent v-else />
    <StageModal v-if="tabValue === 'stages' && !isPending">
      <StageBox />
    </StageModal>
    <Skeleton v-else-if="tabValue === 'stages' && isPending" class="sticky bottom-0 h-9 mx-6" />
  </div>
</template>
