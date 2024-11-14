<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { ErrorCircle } from '~/assets/svgs-vite'
import Button from '~/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
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
  // TODO: Add user store / composible
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
  <div class="flex flex-col w-full h-full justify-center items-center space-y-10">
    <div class="font-semibold text-2xl">
      Авторизация
    </div>
    <div v-if="authError" class="flex space-x-2 border rounded-xl bg-neutral-50 p-6 text-red-500">
      <div class="p-1">
        <ErrorCircle />
      </div>
      <div>
        Указан неверный логин/пароль.<br>
        Проверьте логин или пароль
      </div>
    </div>
    <form class="w-96" @submit="onSubmit">
      <div class="space-y-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormControl>
              <Input v-model="email" type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormControl>
              <Input v-model="password" type="text" placeholder="Пароль" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button class="mt-6 w-full bg-blue-600" type="submit">
        Войти
      </Button>
    </form>
  </div>
</template>
