<script setup lang="ts">
import { Bird } from '~/assets/svgs-vite'
import { Button } from '~/components/ui/button'
import { redirect } from '~/helpers/redirectHelper'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-10 max-w-[1440px] w-full pl-8 pr-8 h-14 mx-auto flex items-center justify-between gap-2 text-sm text-neutral-600">
    <div class="flex flex-row items-center gap-2 cursor-pointer" @click="redirect('https://github.com/mnenie/iptip-hack-2024')">
      <Bird />
      <p class="font-semibold text-xl text-neutral-900">
        Fluxo
      </p>
    </div>
    <div class="flex flex-row items-center gap-2">
      <Button
        variant="ghost"
        @click="redirect('https://github.com/mnenie/iptip-hack-2024/blob/master/README.md')"
      >
        {{ $t('welcome.btns', 1) }}
      </Button>
      <Button variant="ghost">
        {{ $t('welcome.btns', 2) }}
      </Button>
    </div>
  </header>
</template>
