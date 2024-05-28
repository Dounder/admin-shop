<template>
  <top-menu />

  <router-view />

  <custom-footer />
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue'
import CustomFooter from '../components/CustomFooter.vue'
</script>
