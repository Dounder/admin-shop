import { tesloApi } from '@/api/teslo.api'
import type { Product } from '../interfaces'
import { getProductImageAction } from './get-product-image.action'

export const getProductByIdAction = async (id: string) => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${id}`)

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    }
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch product with id: ${id}`)
  }
}
