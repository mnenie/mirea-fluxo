<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '~/assets/svgs-vite'
import CommentBox from '~/components/comments/CommentBox.vue'
import CommentsList from '~/components/comments/CommentsList.vue'
import AttributesList from '~/components/review/AttributesList.vue'
import BadgesList from '~/components/review/BadgesList.vue'
import CommentActions from '~/components/review/CommentActions.vue'
import InfoPart from '~/components/review/InfoPart.vue'
import { Badge } from '~/components/ui/badge'
import { SheetHeader } from '~/components/ui/sheet'
import type { Review } from '~/types/review.interface'

const reviewDescription = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quas
  <strong>consectetur</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <br />
  Odit blanditiis ab quaerat, <strong>quisquam eos pariatur neque consequatur possimus</strong> at id nam officia libero repellendus quo deleniti, fuga totam vel accusantium?
`

const review = ref<Review>({
  _id: '0',
  title: 'Привет мир 👋',
  date: new Date(),
  content: reviewDescription,
  status: 'consideration',
  email: 'example@gmail.com',
  stars: 3,
})
</script>

<template>
  <div class="relative h-full flex flex-col">
    <SheetHeader class="border-b border-neutral-100 justify-between">
      <Badge variant="secondary" class="text-neutral-500">
        <span>#{{ review._id }}</span>
        <Link class="ml-1 w-[14px] h-[14px]" />
      </Badge>
      <template #actions>
        <CommentActions />
      </template>
    </SheetHeader>
    <InfoPart :review="review" />
    <AttributesList />
    <BadgesList />
    <CommentsList />
    <CommentBox />
  </div>
</template>
