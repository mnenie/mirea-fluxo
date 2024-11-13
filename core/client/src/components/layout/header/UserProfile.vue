<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Menu, Pane } from '~/assets/svgs-vite'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import Button from '~/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useAuthStore } from '~/stores/auth'

defineProps<{
  isExpanded?: boolean
}>()

const emits = defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const authStore = useAuthStore()
const router = useRouter()
</script>

<template>
  <div class="max-w-[286px] w-full px-2 h-full flex items-center border-r border-neutral-200">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="w-9 h-9 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center mr-2 cursor-pointer">
          <AvatarImage :src="authStore.user.photoUrl" alt="@radix-vue" />
          <AvatarFallback>1A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class="w-[200px]">
        <DropdownMenuLabel v-if="authStore.user.email" class="2xl:text-[13px] sm:text-sm">
          {{ authStore.user.email }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span class="2xl:text-xs text-sm font-medium">Go to Welcome</span>
            <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem @click="authStore.logout">
            <span class="2xl:text-xs text-sm font-medium">Logout</span>
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="flex flex-col h-full items-start pt-2 w-full">
      <div class="flex flex-col">
        <Badge variant="secondary" class="py-[0px] px-1.5">
          <span class="sm:text-[10px] 2xl:text-[11px] text-neutral-600">commercial</span>
        </Badge>
        <span v-if="false" class="text-sm md:text-[13px] 2xl:text-sm font-semibold text-neutral-800 px-1.5">
          {{ authStore.user.email }}
        </span>
      </div>
      <span v-if="false" class="flex items-center">
        <Button @click="router.push(`/user/sign-in`)">
          Войти
        </Button>
      </span>
    </div>
    <Pane v-if="isExpanded" class="text-neutral-500 cursor-pointer" @click="emits('toggleSidebar')" />
    <Menu v-else class="text-neutral-500 cursor-pointer" @click="emits('toggleSidebar')" />
  </div>
</template>
