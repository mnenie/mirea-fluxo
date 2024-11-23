<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Menu, Pane } from '~/assets/svgs-vite'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
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
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
import { useAuthStore } from '~/stores/auth'

defineProps<{
  isExpanded?: boolean
}>()

const emits = defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const authStore = useAuthStore()
const { user, isPending } = storeToRefs(authStore)
</script>

<template>
  <div class="max-w-[286px] w-full px-2 h-full flex items-center border-r border-neutral-200">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="w-9 h-9 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center mr-2 cursor-pointer">
          <AvatarImage v-if="user.photoUrl" :src="user.photoUrl" alt="@radix-vue" />
          <AvatarFallback v-if="user.email">
            {{ user.email.split('').slice(0, 2).join('') }}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class="w-[200px]">
        <DropdownMenuLabel class="2xl:text-[13px] sm:text-sm">
          {{ user.email }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span class="2xl:text-xs text-sm font-medium">{{ $t('header.welcome') }}</span>
            <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem @click="authStore.logout">
            <span class="2xl:text-xs text-sm font-medium">{{ $t('header.logout') }}</span>
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="flex flex-col h-full items-start pt-2 w-full">
      <div class="flex flex-col">
        <Badge variant="secondary" class="py-[0px] px-1.5 w-fit">
          <span class="sm:text-[10px] 2xl:text-[11px] text-neutral-600">{{ $t('header.badge') }}</span>
        </Badge>
        <span v-if="!isPending" class="text-sm md:text-[13px] 2xl:text-sm font-semibold text-neutral-800 px-1.5">
          {{ user.email }}
        </span>
        <Skeleton v-else class="w-[100px] h-3 mt-1.5 mx-1.5 rounded-md" />
      </div>
    </div>
    <Pane v-if="isExpanded" class="text-neutral-500 cursor-pointer" @click="emits('toggleSidebar')" />
    <Menu v-else class="text-neutral-500 cursor-pointer" @click="emits('toggleSidebar')" />
  </div>
</template>
