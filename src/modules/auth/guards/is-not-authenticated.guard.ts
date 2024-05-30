import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../store/auth.store'

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  authStore.authStatus === AuthStatus.authenticated ? next({ name: 'shop.home' }) : next()
}

export default isNotAuthenticatedGuard
