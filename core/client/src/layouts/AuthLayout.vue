<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Arrow } from '~/assets/svgs-vite'

const router = useRouter()
</script>

<template>
  <div class="main-container relative w-full min-h-dvh h-full grid mx-auto my-0 overflow-hidden">
    <div
      class="flex items-center justify-center absolute left-10 top-10 cursor-pointer text-neutral-500"
      @click="router.push(`/`)"
    >
      <Arrow class="w-[18px] h-[18px] rotate-90" />
    </div>
    <div class="header flex py-4 justify-center items-center">
      <img src="https://cdn.icon-icons.com/icons2/2148/PNG/512/c_icon_132654.png" alt="logo" class="w-16 h-16">
    </div>
    <div class="main flex flex-col items-center pb-10">
      <slot />
    </div>
    <div class="footer flex justify-center items-center pb-6 gap-6 flex-col">
      <div class="text-sm text-neutral-500 max-w-[400px] text-center">
        By proceeding you acknowledge that you have read, understood and agree to our
        <a rel="noreferrer noopener" target="_blank" href="https://attio.com/legal/terms-and-conditions" class="underline">Terms and Conditions.</a>
      </div>
      <div class="text-xs text-neutral-500 flex items-center gap-4">
        <span>© 2024 1C Open Source</span>
        <a rel="noreferrer noopener" target="_blank" href="https://github.com/mnenie/iptip-hack-2024" class="underline">Repository</a>
        <a rel="noreferrer noopener" target="_blank" href="https://1c.ru/" class="underline">About Us</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  grid-template:
    "header"
    "main" 1fr
    "footer" / 1fr;
}
.header{
  grid-area: header;
}

.main{
  grid-area: main;
}
</style>
