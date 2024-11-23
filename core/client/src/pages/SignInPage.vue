<script setup lang="ts">
import SignInForm from '~/components/auth/SignInForm.vue'
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
    <SignInForm />
  </div>
</template>
