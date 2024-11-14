<script setup lang="ts">
import { ref } from 'vue'
import { Send } from '~/assets/svgs-vite'
import { useOrderStore } from '~/stores/orders'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const stage = ref('')

const orderStore = useOrderStore()

function addStage() {
  orderStore.postNewStage(stage.value)
  stage.value = ''
}
</script>

<template>
  <div class="sticky bottom-0 z-[9999999999] bg-white w-full mt-auto px-6 flex flex-col items-center justify-center">
    <div class="flex w-full items-center">
      <form class="relative w-full flex items-center" @submit.prevent="addStage">
        <Input
          v-model:model-value="stage"
          placeholder="Enter your stage"
          class="rounded-md focus-visible:ring-0"
        />
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Button class="h-7 px-2 bg-blue-600 hover:bg-blue-500">
            <Send class="w-[14px] h-[14px] text-white mr-2" />
            <span class="text-sm 2xl:text-[13px]">Publish</span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
