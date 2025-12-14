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
/* Global Resets and Base Styles */
html, body, #app {
    height: 100%;
    margin: 0;
    font-family: Arial, sans-serif;
}

.main-content {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    min-height: calc(100vh - 80px);
    background-image: url(public/images/background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    justify-content: center;
}

@media (min-width: 1200px) {
    .main-content {
        /* This sets the maximum comfortable width for the content area */
        max-width: 1600px;
        margin: 0 auto; /* Center the entire main content block */
        padding: 2rem; /* Increased padding on larger screens */
    }
}
@media (min-width: 769px) and (max-width: 1199px) {
    .main-content {
        /* Allow the content to take up most of the screen width */
        padding: 1.5rem;
    }
}

@media (max-width: 768px) {
    .main-content {
        flex-direction: column; /* Stacks the CourseList and Sidebar */
        padding: 1rem;
    }
}
</style>
