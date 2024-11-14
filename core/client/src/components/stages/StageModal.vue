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

const formSchema = toTypedSchema(z.object({
  stage: z.string({ required_error: `Required field` }).min(2).max(50),
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
  orderStore.postNewStage({
    stage: values.stage,
    price: values.price,
  })
  stage.value = ''
  price.value = null
  isDialogOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add new stage</DialogTitle>
        <DialogDescription>
          You can add a new stage in this order here
        </DialogDescription>
      </DialogHeader>
      <form id="dialogForm" class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="stage">
          <FormItem>
            <FormLabel>Stage</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter new stage" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is the stage of the order
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter the price" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button type="submit" form="dialogForm">
          Add to the list
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
