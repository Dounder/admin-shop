<template>
  <div>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur', $event)"
      :class="['form-control', { 'border-red-500': error, 'bg-red-100': error }]"
    />
    <span v-if="error" class="capitalize text-red-400">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  error?: string
  type?: 'text' | 'number' | 'password' | 'email' | 'tel'
}

withDefaults(defineProps<Props>(), { type: 'text' })
defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none transition-all duration-300;
}
</style>
