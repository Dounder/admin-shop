import ShopLayout from '@/modules/shop/layout/ShopLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'shop.home',
          component: () => import('@/modules/shop/views/ShopView.vue')
        }
      ]
    }
  ]
})

export default router
