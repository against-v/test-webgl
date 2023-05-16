<script setup lang="ts">
import GraphCanvas from './components/GraphCanvas/GraphCanvas.vue'
</script>

<template>
  <main class="container">
    <GraphCanvas />
  </main>
</template>

<style scoped>
.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
