<script setup lang="ts">
import { AiStars, Arrow } from '~/assets/svgs-vite'
import { redirect } from '~/helpers/redirectHelper'
import { Routes } from '~/utils/contants'
import { Button } from '../ui/button'
import WelcomeCards from './WelcomeCards.vue'
</script>

<template>
  <div class="relative mx-auto flex min-h-[52rem] max-w-[1200px] flex-col items-center gap-2 py-8 max-sm:min-h-[28rem] lg:py-24 lg:pb-20 md:py-12 md:pb-8">
    <a href="https://github.com/mnenie/iptip-hack-2024" target="_blank" rel="noreferrer noopener" class="inline-flex items-center rounded-full bg-muted px-4 py-1.5 -mb-2 text-sm font-medium hover:cursor-pointer">
      <AiStars />
      <div data-orientation="vertical" aria-orientation="vertical" role="separator" class="shrink-0 bg-border w-px mx-2 h-4" />
      <span>{{ $t('welcome.badge') }}</span>
      <Arrow class="ml-2 -rotate-90" />
    </a>
    <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1] md:text-6xl">
      {{ $t('welcome.title') }}
    </h1>
    <p class="mt-3 text-center text-lg max-w-[500px] text-neutral-600 sm:text-xl dark:text-gray-200">
      {{ $t('welcome.description') }}
    </p>
    <div class="mt-6 flex gap-4 justify-center">
      <Button @click="$router.push({ name: Routes.orders })">
        {{ $t('welcome.btns', 0) }}
      </Button>
      <Button
        variant="outline"
        @click="redirect('https://github.com/mnenie/iptip-hack-2024')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
          <path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3" />
        </svg>
        <span class="ml-2">GitHub</span>
      </Button>
    </div>
    <WelcomeCards />
  </div>
</template>
