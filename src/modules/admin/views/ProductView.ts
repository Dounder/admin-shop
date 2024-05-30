import { useQuery } from '@tanstack/vue-query'
import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'

import { getProductByIdAction } from '@/modules/products/actions'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import CustomTextarea from '@/modules/common/components/CustomTextarea.vue'
import CustomSelect from '@/modules/common/components/CustomSelect.vue'

const validationSchema = yup.object({
  title: yup.string().required().min(2),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
})

export default defineComponent({
  components: { CustomInput, CustomTextarea, CustomSelect },
  props: { id: { type: String, required: true } },
  setup: (props) => {
    const router = useRouter()

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', { id: props.id }],
      queryFn: () => getProductByIdAction(props.id),
      retry: false,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
    })

    const [title, titleAttrs] = defineField('title')
    const [slug, slugAttrs] = defineField('slug')
    const [description, descriptionAttrs] = defineField('description')
    const [price, priceAttrs] = defineField('price')
    const [stock, stockAttrs] = defineField('stock')
    const [gender, genderAttrs] = defineField('gender')

    const { fields: images } = useFieldArray<string>('images')
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes')

    const onSubmit = handleSubmit(async (values) => {
      console.log(values)
    })

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value)
      const hasSize = currentSizes.includes(size)

      hasSize ? removeSize(currentSizes.indexOf(size)) : pushSize(size)
    }

    watchEffect(() => {
      if (isError.value && !isLoading.value) router.replace({ name: 'products' })
    })

    watch(
      product,
      () => {
        if (!product) return

        resetForm({ values: product.value })
      },
      { deep: true, immediate: true }
    )

    return {
      //* Props
      meta,
      values,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      errors,

      images,
      sizes,

      //! Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //? Methods
      onSubmit,
      toggleSize,
      hasSize: (size: string) => sizes.value.map((s) => s.value).includes(size),
    }
  },
})
