import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const usePagination = () => {
  const route = useRoute()
  const page = ref(Number(route.query.page) || 1)

  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage) || 1

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  )

  // watchEffect(() => {
  //   queryClient.prefetchQuery({
  //     queryKey: ['products', { page: page.value + 1 }],
  //     queryFn: () => getProductsAction(page.value + 1),
  //   })

  //   if (page.value > 1) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['products', { page: page.value - 1 }],
  //       queryFn: () => getProductsAction(page.value - 1),
  //     })
  //   }
  // })

  return {
    //* Props
    page,

    //! Getters
    //? Methods
  }
}
