<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useOrderStore } from '~/stores/orders'
import { Textarea } from '../ui/textarea'

const formSchema = toTypedSchema(z.object({
  title: z.string({ required_error: `Required field` }).min(2).max(50),
  content: z.string({ required_error: `Required field` }).min(2).max(50),
  date: z.string({ required_error: `Required field` }),
  price: z.number({ required_error: `Required field` }),
}))
const isDialogOpen = ref(false)

const orderStore = useOrderStore()

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { value: stage } = useField<string>('stage')
const { value: price } = useField<number | null>('price')

const onSubmit = handleSubmit(async (values) => {
  const data = {
    title: values.title,
    price: values.price,
    content: values.content,
    dateEnd: values.date,
  }
  await orderStore.createStageById(orderStore.order._id, data)
  stage.value = ''
  price.value = null
  isDialogOpen.value = false
})
</script>

<template>
  <!-- TODO: component logic(@mnenie) -->
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ $t('order.stages.dialog.title') }}</DialogTitle>
        <DialogDescription>
          {{ $t('order.stages.dialog.description') }}
        </DialogDescription>
      </DialogHeader>
      <form id="dialogForm" class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>{{ $t('order.stages.dialog.fields.stage.label') }}</FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="$t('order.stages.dialog.fields.stage.placeholder')"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              {{ $t('order.stages.dialog.fields.stage.description') }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="content">
          <FormItem>
            <FormLabel>{{ $t('order.stages.dialog.fields.stage.label') }}</FormLabel>
            <FormControl>
              <Textarea
                type="text"
                :placeholder="$t('order.stages.dialog.fields.stage.placeholder')"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              {{ $t('order.stages.dialog.fields.stage.description') }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel> {{ $t('order.stages.dialog.fields.price.label') }}</FormLabel>
            <FormControl>
              <Input
                type="number"
                :placeholder="$t('order.stages.dialog.fields.price.placeholder')"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="date">
          <FormItem>
            <FormLabel>{{ $t('order.stages.dialog.fields.stage.label') }}</FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="$t('order.stages.dialog.fields.stage.placeholder')"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              {{ $t('order.stages.dialog.fields.stage.description') }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button type="submit" form="dialogForm">
          {{ $t('order.stages.dialog.add') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
