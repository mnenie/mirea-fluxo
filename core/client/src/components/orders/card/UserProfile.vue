<script setup lang="ts">
defineProps<{
  email: string
}>()
</script>

<template>
  <div class="flex flex-row space-x-2">
    <!-- <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar> -->
    <div class="flex items-center">
      <span class="text-xs text-neutral-500">{{ email }}</span>
    </div>
  </div>
</template>
