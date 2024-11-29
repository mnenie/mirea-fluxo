<script setup lang="ts">
import { Device, Github } from '~/assets/svgs-vite'
import { Button } from '~/components/ui/button'
import { redirect } from '~/helpers/redirectHelper'
</script>

<template>
  <div class="flex h-dvh w-full flex-col items-center justify-center px-3 text-center">
    <Device
      class="mb-1 h-[180px] w-[180px] -mt-16 text-neutral-800"
    />
    <h2 class="text-2xl font-semibold tracking-tight mb-2">
      Сервис недоступен на вашем типе девайса
    </h2>
    <p class="mb-4 text-sm text-neutral-600">
      Пожалуйста, попробуйте зайти на сервис с другого устройства. Для этого типа девайса сервис находится в режиме разработки
    </p>
    <div class="flex items-center gap-4">
      <Button variant="outline" @click="redirect('https://github.com/mnenie/Notium')">
        <Github class="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button variant="secondary" @click="redirect('https://t.me/youngjuicycashrussia')">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" class="mr-2 h-4 w-4">
        Telegram
      </Button>
    </div>
  </div>
</template>
