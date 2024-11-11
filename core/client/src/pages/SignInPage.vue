<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import Button from '~/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  // placeholder actions
  // TODO: Add user store / composible
  const test = values
  test.email = ''
  test.password = ''
})
</script>

<template>
  <div class="flex flex-col w-[25dvw] items-center space-y-10">
    <div class="font-semibold text-2xl">
      Авторизация
    </div>
    <form class="w-96" @submit="onSubmit">
      <div class="space-y-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormControl>
              <Input type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormControl>
              <Input type="text" placeholder="Пароль" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button class="mt-8" type="submit">
        Войти
      </Button>
    </form>
  </div>
</template>
