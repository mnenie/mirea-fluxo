<script setup lang="ts">
import { Send } from '~/assets/svgs-vite'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
</script>

<template>
  <div class="sticky bottom-0 w-full mt-auto px-6 flex flex-col items-center justify-center">
    <div class="flex w-full items-center">
      <form class="relative w-full flex items-center">
        <Textarea
          placeholder="Enter your message"
          class="rounded-md focus-visible:ring-0"
        />
        <div class="absolute right-2 bottom-[5px] flex items-center gap-2">
          <Button class="h-7 px-2 bg-blue-600 hover:bg-blue-500">
            <Send class="w-[14px] h-[14px] text-white mr-2" />
            <span class="text-sm 2xl:text-[13px]">Send</span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
