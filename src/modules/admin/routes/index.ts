import isAdminGuard from '@/modules/auth/guards/is-admin.guard'
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'
import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  redirect: { name: 'dashboard' },
  component: () => import('@/modules/admin/layout/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'products',
      name: 'products',
      component: () => import('@/modules/admin/views/ProductsView.vue'),
    },
    {
      path: 'products/:id',
      name: 'product',
      props: true,
      component: () => import('@/modules/admin/views/ProductView.vue'),
    },
  ],
}
