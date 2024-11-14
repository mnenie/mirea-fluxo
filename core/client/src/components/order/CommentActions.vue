<script setup lang="ts">
import { Ai, Message } from '~/assets/svgs-vite'
import { Button } from '../ui/button'
</script>

<template>
  <Button size="sm" variant="secondary" class="h-7 text-neutral-700">
    <Message class="mr-2 w-[14px] h-[14px] " />
    <span class="text-xs">Chat</span>
  </Button>
  <Button size="sm" variant="secondary" class="h-7 text-neutral-700">
    <Ai class="mr-1 w-[14px] h-[14px] " />
    <span class="text-xs">Analyze review</span>
  </Button>
  <div class="w-px h-3 bg-neutral-200 mx-2" />
</template>
