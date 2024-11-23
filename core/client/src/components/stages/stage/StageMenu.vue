<script setup lang="ts">
import { DotMenu } from '~/assets/svgs-vite'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <DotMenu class="w-4 h-4 cursor-pointer text-neutral-500" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[200px] z-[9999999]">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 1) }}</span>
          <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span class="2xl:text-xs text-sm font-medium">{{ $t('order.actions', 2) }}</span>
          <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
