<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
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
import { cn } from '~/lib/utils'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import Calendar from '../ui/calendar/Calendar.vue'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'

const { t } = useI18n()
const orderStore = useOrderStore()
const { isDialogOpen, currentFormId } = storeToRefs(orderStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const dateEnd = ref<DateValue>()

const requiredErrorMsg = t('order.stages.dialog.fields.error.required')
const invalidLengthErrorMsg = t('order.stages.dialog.fields.error.invalidLength')
const invalidTypeErrorMsg = t('order.stages.dialog.fields.error.invalidType')

const formSchema = toTypedSchema(
  z.object({
    title: z.string({ required_error: requiredErrorMsg }).min(2, invalidLengthErrorMsg).max(50, invalidLengthErrorMsg),
    content: z.string({ required_error: requiredErrorMsg }).min(2, invalidLengthErrorMsg).max(50, invalidLengthErrorMsg),
    price: z.number({ required_error: requiredErrorMsg, invalid_type_error: invalidTypeErrorMsg }),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { value: stage } = useField<string>('stage')
const { value: price } = useField<number | null>('price')

const { fields } = getFormFields(t)

const onSubmit = handleSubmit(async (values) => {
  const data = {
    title: values.title,
    price: values.price,
    content: values.content,
    dateEnd: dateEnd.value!.toDate(getLocalTimeZone()),
    organization: user.value!.organization!,
  }
  await orderStore.createStageById(currentFormId.value, data)
  stage.value = ''
  price.value = null
  dateEnd.value = undefined
  isDialogOpen.value = false
})

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
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
        <div class="space-y-2">
          <div class="text-sm">
            {{ $t('order.stages.dialog.fields.stage.date.label') }}
          </div>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="cn(
                  'w-full justify-start text-left font-normal',
                  'text-muted-foreground',
                )"
              >
                {{ dateEnd ? df.format(dateEnd.toDate(getLocalTimeZone())) : $t('order.stages.dialog.fields.stage.date.placeholder') }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="z-[9999] -translate-x-11">
              <Calendar v-model="dateEnd" initial-focus />
            </PopoverContent>
          </Popover>
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
