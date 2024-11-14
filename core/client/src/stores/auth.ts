import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '~/types/user.interface'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({} as User)
  const isPending = ref<boolean>(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    isPending.value = true
    try {
      if (password !== '11111111') {
        throw new Error('Invalid password!')
      }
      // TODO: link to backend
      user.value = {
        _id: '0',
        email,
        role: 'manager',
        photoUrl: `https://api.dicebear.com/9.x/glass/svg?seed=${Math.floor(Math.random() * 1000)}}`,
      }
    }
    catch (err) {
      isPending.value = false
      return err
    }
    finally {
      isPending.value = false
    }
  }

  const logout = () => {
    user.value = {} as User
    router.push('/')
  }

  return {
    user,
    login,
    logout,
  }
})
