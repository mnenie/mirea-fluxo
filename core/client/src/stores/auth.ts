import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import UserService from '~/services/user'
import type { User } from '~/types/user.interface'

export const useAuthStore = defineStore('auth', () => {
  const user = shallowRef<User>({} as User)
  const isPending = ref<boolean>(false)
  const router = useRouter()

  const cookies = useCookies()

  const login = async <T extends Record<string, string>>(info: T) => {
    isPending.value = true
    try {
      const { data } = await UserService.login(info)
      cookies.set('token', data.token, { path: '/' })
      user.value = data
    }
    catch (err: any) {
      isPending.value = false
      throw new Error(err)
    }
    finally {
      isPending.value = false
    }
  }

  async function getCurrentUser(): Promise<void> {
    isPending.value = true
    try {
      const { data } = await UserService.getUser()
      user.value = data
    }
    catch (err: any) {
      isPending.value = false
      throw new Error(err)
    }
    finally {
      isPending.value = false
    }
  }

  const logout = () => {
    user.value = {} as User
    cookies.remove('token')
    router.push('/')
  }

  return {
    user,
    isPending,
    login,
    logout,
    getCurrentUser,
  }
})
