<script setup lang="ts">
// TODO: add logic with form to components/auth

import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import Button from '~/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const authError = ref<boolean>(false)
const router = useRouter()

const formSchema = toTypedSchema(z.object({
  email: z.string({ required_error: `Обязательное поле` }).email('Недействительный адрес электронной почты'),
  password: z.string({ required_error: `Обязательное поле` }).min(8, 'Пароль должен содержать не менее 8 символов'),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  // placeholder actions
  // TODO: Add user store / composable
  const err = await authStore.login(values.email, values.password)
  if (err) {
    authError.value = true
  }
  else {
    authError.value = false
    router.push('/')
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
</script>

<template>
  <div class="flex flex-col w-full h-full justify-center items-center space-y-6">
    <div class="flex flex-col space-y-2 items-center">
      <h1 class="text-2xl font-semibold tracking-tight dark:text-zinc-100">
        {{ $t('sign_in.title') }}
      </h1>
      <p class="pb-4 text-sm text-[#72717a] dark:text-zinc-200">
        {{ $t('sign_in.description') }}
      </p>
    </div>
    <form class="w-[480px]" @submit="onSubmit">
      <div class="space-y-3">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <Label for="email"> {{ $t('sign_in.form.email') }} </Label>
            <FormControl>
              <Input v-model="email" type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <Label for="password"> {{ $t('sign_in.form.password') }} </Label>
            <FormControl>
              <Input
                v-model="password"
                type="text"
                :placeholder="$t('sign_in.form.password')"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button class="mt-8 w-full" type="submit">
        {{ $t('sign_in.btn') }}
      </Button>
    </form>
  </div>
</template>
