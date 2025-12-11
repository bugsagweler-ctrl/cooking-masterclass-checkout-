<template>
  <div id="app">
    <AppHeader />
    <CourseList />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import CourseList from './components/CourseList.vue'
</script>

<style>
body {
  font-family: sans-serif;
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1400px; /* Increase max width */
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
}

/* Add container query support */
@container (min-width: 1200px) {
  #app {
    padding: 2rem;
  }
}
</style>
