import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (email: string, password: string) => {
    //? Actions
    try {
      const loginResponse = await loginAction(email, password)

      if (!loginResponse.ok) return false

      user.value = loginResponse.user
      token.value = loginResponse.token
      authStatus.value = AuthStatus.authenticated

      return true
    } catch (error) {
      return logout()
    }
  }

  const logout = () => {
    authStatus.value = AuthStatus.unauthenticated
    user.value = undefined
    token.value = ''

    return false
  }

  return {
    //? Props
    user,
    token,
    authStatus,

    //* Getters
    isChecking: computed(() => authStatus.value === AuthStatus.checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.authenticated),
    username: computed(() => user.value?.fullName),

    //! Actions
    login,
  }
})
