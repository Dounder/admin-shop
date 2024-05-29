export const getProductImageAction = (imageName: string) => {
  if (imageName.includes('http')) return imageName

  return `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`
}
