<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
import { getFormFields } from '~/lib/form'
import { useOrderStore } from '~/stores/orders'
import { Textarea } from '../ui/textarea'

const formSchema = toTypedSchema(
  z.object({
    title: z.string({ required_error: `Обязательное поле` }).min(2).max(50),
    content: z.string({ required_error: `Обязательное поле` }).min(2).max(50),
    date: z.string({ required_error: `Обязательное поле` }),
    price: z.number({ required_error: `Обязательное поле` }),
  }),
)
const isDialogOpen = ref(false)

const orderStore = useOrderStore()

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { value: stage } = useField<string>('stage')
const { value: price } = useField<number | null>('price')

const { t } = useI18n()

const { fields } = getFormFields(t)

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
        <div v-for="field, idx in fields" :key="idx">
          <FormField v-slot="{ componentField }" :name="field.name">
            <FormItem>
              <FormLabel>{{ field.label }}</FormLabel>
              <FormControl>
                <component
                  :is="field.name === 'content' ? Textarea : Input"
                  :type="field.type"
                  :placeholder="field.placeholder"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription v-if="field.description">
                {{ field.description }}
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" form="dialogForm">
          {{ $t('order.stages.dialog.add') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
