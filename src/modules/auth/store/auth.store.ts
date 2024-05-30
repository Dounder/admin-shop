import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { checkAuthAction, loginAction, registerAction } from '../actions'
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

  const register = async (name: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(name, email, password)

      if (!registerResponse.ok) {
        logout()
        return { ok: false, error: registerResponse.message }
      }

      user.value = registerResponse.user
      token.value = registerResponse.token
      authStatus.value = AuthStatus.authenticated

      return { ok: true, message: '' }
    } catch (error) {
      logout()
      return { ok: false, error: 'An error occurred while trying to register' }
    }
  }

  const logout = () => {
    authStatus.value = AuthStatus.unauthenticated
    user.value = undefined
    token.value = ''

    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await checkAuthAction()

      if (!response.ok) return logout()

      user.value = response.user
      token.value = response.token
      authStatus.value = AuthStatus.authenticated

      return true
    } catch (error) {
      return logout()
    }
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
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    //! Actions
    login,
    logout,
    register,
    checkAuthStatus,
  }
})
