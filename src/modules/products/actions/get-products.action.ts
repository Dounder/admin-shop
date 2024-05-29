import { tesloApi } from '@/api/teslo.api'
import type { Product } from '../interfaces'
import { getProductImageAction } from './get-product-image.action'

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const params = new URLSearchParams({ offset: String((page - 1) * limit), limit: String(limit) })

    const { data } = await tesloApi.get<Product[]>('/products', { params })

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction)
    }))
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching products')
  }
}
