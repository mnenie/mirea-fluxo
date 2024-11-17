<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { Link } from '~/assets/svgs-vite'
import AttributesList from '~/components/order/AttributesList.vue'
import BadgesList from '~/components/order/BadgesList.vue'
import InfoPart from '~/components/order/InfoPart.vue'
import OrderActions from '~/components/order/OrderActions.vue'
import RiskList from '~/components/order/RiskList.vue'
import RiskMap from '~/components/order/RiskMap.vue'
import StageBox from '~/components/stages/StageBox.vue'
import StageList from '~/components/stages/StageList.vue'
import StageModal from '~/components/stages/StageModal.vue'
import { Badge } from '~/components/ui/badge'
import { SheetHeader } from '~/components/ui/sheet'
import { Tabs, TabsContent } from '~/components/ui/tabs'
import type { Order } from '~/types/order.interface'

const orderDescription = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quas
  <strong>consectetur</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <br />
  Odit blanditiis ab quaerat, <strong>quisquam eos pariatur neque consequatur possimus</strong> at id nam officia libero repellendus quo deleniti, fuga totam vel accusantium?
`

const risks = shallowRef([
  { name: 'Риск какой то там', values: [1, 0, 0, 0, 0] },
  { name: 'Риск какой то там 2', values: [4, 0, 2, 0, 1] },
  { name: 'Риск какой то там 3', values: [2, 0, 0, 3, 0] },
])

const order = ref<Order>({
  _id: '0',
  title: 'Привет мир 👋',
  date: new Date(),
  content: orderDescription,
  status: 'in process',
  price: 10000,
  organization: 'Google',
  stages: [],
  risks: risks.value,
})

const tabValue = ref('stages')
</script>

<template>
  <div class="relative h-full overflow-auto flex flex-col">
    <SheetHeader
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
    <Tabs v-model:model-value="tabValue" default-value="stages" class="w-full h-full">
      <InfoPart :order />
      <AttributesList />
      <BadgesList />
      <TabsContent value="stages">
        <StageList />
      </TabsContent>
      <TabsContent value="trk">
        <!-- TODO: display -->
        <RiskMap :dataset="order.risks" />
        <RiskList :risks="order.risks" />
      </TabsContent>
    </Tabs>
    <StageModal v-if="tabValue === 'stages'">
      <StageBox />
    </StageModal>
  </div>
</template>
