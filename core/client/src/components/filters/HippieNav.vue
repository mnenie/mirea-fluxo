<script setup lang="ts">
import { HippieNav } from '@noction/hippie-nav'
import { computed, nextTick, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import SearchBox from './SearchBox.vue'

const props = defineProps<{
  // TODO: remove any
  reviews: any[]
}>()

const hippieNav = useTemplateRef<InstanceType<typeof HippieNav> | null>('hippieNav')

const formattedReviews = computed(() => {
  return props.reviews.map(review => ({
    name: review.title,
    path: `/reviews/${review._id}`,
  }))
})

const router = useRouter()

const options = {
  excludedPaths: [/^\/user\//, '/reviews/:id'],
  indexFields: {
    routes: ['name'],
  },
  displayField: {
    route: 'name',
  },
  resultsLimit: 7,
}

const actions = [
  ...formattedReviews.value.map(review => ({
    action: () => {
      router.push(review.path)
    },
    aliases: [review.name.toLowerCase().replace(/\s+/g, '-')],
    name: review.name,
  })),
]

async function openModal() {
  // problem: @noction/hippie-nav is not expose the close modal function
  await nextTick(() => {
    if (!hippieNav.value)
      return
    hippieNav.value.openModal()
  })
}
</script>

<template>
  <SearchBox @open-modal="openModal" />
  <Teleport to="body">
    <HippieNav ref="hippieNav" :options="options" :actions="actions">
      <template #resultItem="{ data }">
        <div v-if="data" class="item-info">
          <span class="text-sm title">{{ data.name }}</span>
          <span v-if="data.path" class="sub-title">{{ data.path }}</span>
          <span v-else class="sub-title">/{{ data.aliases }}</span>
        </div>
      </template>
    </HippieNav>
  </Teleport>
</template>
