<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Arrow, Filter, Reload, Sort } from '~/assets/svgs-vite'
import ReviewTable from '~/components/reviews/ReviewTable.vue'
import TablePagination from '~/components/reviews/TablePagination.vue'
import { Button } from '~/components/ui/button'

useHead({
  title: '1CManager | Reviews',
})
</script>

<template>
  <div class="relative w-full h-full">
    <div class="flex flex-row items-center justify-between mb-4">
      <div class="flex flex-row items-center gap-2">
        <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
          <Filter class="text-neutral-600 min-w-[13px] min-h-[13px]" />
          <span class="2xl:text-[13px] text-sm text-neutral-800">Filter by status</span>
          <div class="w-px h-3 bg-neutral-300 mx-1" />
          <Arrow class="text-neutral-600 min-w-[15px] min-h-[15px]" />
        </Button>
        <!-- вот этот по названию -->
        <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
          <Sort class="text-neutral-600 min-w-[14px] min-h-[14px]" />
          <span class="2xl:text-[13px] text-sm text-neutral-800">Sort</span>
        </Button>
      </div>
      <Button size="sm" variant="outline" class="px-2 py-0 flex gap-1.5 items-center">
        <Reload class="text-neutral-600 min-w-[14px] min-h-[14px]" />
        <span class="2xl:text-[13px] text-sm text-neutral-800">Reshuffle 👌</span>
      </Button>
    </div>
    <ReviewTable />
    <TablePagination />
  </div>
</template>
