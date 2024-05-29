<template>
  <div class="flex justify-center py-10 space-x-3 bg-gray-100">
    <button
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-full p-5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all hover:shadow-xl hover:transform hover:scale-105 duration-300 disabled:cursor-not-allowed"
      :disabled="firstPage"
    >
      <ArrowLeftIcon />
    </button>
    <button
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-full p-5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all hover:shadow-xl hover:transform hover:scale-105 duration-300 disabled:cursor-not-allowed"
      :disabled="hasMoreData"
    >
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'

interface Props {
  page: number
  firstPage: boolean
  hasMoreData: boolean
}

defineProps<Props>()
</script>
