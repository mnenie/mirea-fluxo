<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { defineAsyncComponent } from 'vue'
import { Toaster } from '~/components/ui/sonner'

const NotAvailable = defineAsyncComponent(() =>
  import('./components/device/NotAvailable.vue'))

const { width } = useWindowSize()
</script>

<template>
  <component :is="$route.meta.layout" v-if="width > 800">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </component>
  <component :is="NotAvailable" v-else />
  <Toaster />
</template>
