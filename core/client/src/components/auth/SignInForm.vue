<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { Loader } from '~/assets/svgs-vite'
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
import { Routes } from '~/utils/contants'

const authStore = useAuthStore()
const { isPending } = storeToRefs(authStore)

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
  try {
    await authStore.login(values)
    router.push({ name: Routes.orders })
  }
  catch (err: any) {
    authError.value = true
    throw new Error(err)
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
</script>

<template>
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
    <Button :disabled="isPending" class="mt-8 w-full" type="submit">
      <Loader v-if="isPending" class="w-4 h-4 mr-2 animate-spin" />
      {{ $t('sign_in.btn') }}
    </Button>
  </form>
</template>
