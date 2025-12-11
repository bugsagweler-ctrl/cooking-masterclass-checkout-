<template>
  <div>
    <AppHeader />
    <div id="app" class="main-content">
      <CourseList />
      <Checkout />
    </div>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import CourseList from './components/CourseList.vue'
import Checkout from './components/Checkout.vue'
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main content: course list + checkout */
.main-content {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

/* Stack on small screens */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
