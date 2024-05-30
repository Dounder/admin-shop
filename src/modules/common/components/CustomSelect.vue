<template>
  <div>
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur', $event)"
      :class="['form-control', { 'border-red-500': error, 'bg-red-100': error }]"
    >
      <option value="">Select...</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="capitalize text-red-400">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  error?: string
  options: Array<{ value: any; label: string }>
}

defineProps<Props>()
defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none transition-all duration-300;
}
</style>
