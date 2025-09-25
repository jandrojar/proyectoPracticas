
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import defaultLayout from './layout/AppLayout.vue'

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout ?? 'div'
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
