<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/store/auth.store'
import { AuthStatus } from './modules/auth/interfaces'
import { useRoute, useRouter } from 'vue-router'
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.checking) return authStore.checkAuthStatus()

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.authenticated)
      return router.replace({ name: 'shop.home' })
  },
  { immediate: true }
)
</script>
