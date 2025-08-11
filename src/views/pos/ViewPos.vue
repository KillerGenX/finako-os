<template>
  <component :is="isMobile ? 'MobileViewPos' : 'DesktopViewPos'" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MobileViewPos from './MobileViewPos.vue'
import DesktopViewPos from './DesktopViewPos.vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth <= 768
})
</script>
