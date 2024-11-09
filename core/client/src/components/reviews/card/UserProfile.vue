<script setup lang="ts">
import Avatar from '~/components/ui/avatar/Avatar.vue'

defineProps<{
  email: string
}>()
</script>

<template>
  <div class="flex flex-row space-x-2">
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div class="flex items-center">
      {{ email }}
    </div>
  </div>
</template>
