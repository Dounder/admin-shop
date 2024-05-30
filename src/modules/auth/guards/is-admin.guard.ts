import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/auth.store'

const isAdminGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  authStore.isAdmin ? next() : next({ name: 'shop.home' })
}

export default isAdminGuard
