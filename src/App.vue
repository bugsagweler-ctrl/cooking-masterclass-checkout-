<template>
  <div id="app">
    <AppHeader />
    <div class="main-content">
      <CourseList />
      <CheckoutSidebar />
    </div>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import CourseList from './components/CourseList.vue'
import CheckoutSidebar from './components/CheckoutSidebar.vue'
</script>

<style>
.main-content {
  display: flex;
  gap: 2rem;
}

/* Make responsive: stack on small screens */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
