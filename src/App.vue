<template>
  <route-map :items="dataResponse.items"></route-map>
  <route-timeline :items="dataResponse.items" :groups="dataResponse.groups"></route-timeline>
</template>
<script setup>
import RouteMap from './components/RouteMap.vue'
import RouteTimeline from './components/RouteTimeline.vue'
import dataResponse from './response.json'
import 'styles'
</script>

<style lang="scss">
html, body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: rgb(var(--neutral-2));
  color: rgb(var(--neutral-1));
}
html, body, #app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
</style>