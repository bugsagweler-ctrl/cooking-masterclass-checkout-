<template>
  <div class="course-list">
    <CourseCard
      v-for="course in cartStore.courses"
      :key="course.id"
      :course="course"
    />
  </div>
</template>

<script setup>
import CourseCard from './CourseCard.vue'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()

</script>

<style scoped>
.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 350px)); /* Set max width */
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  justify-content: center; /* Center the grid */
}

/* Add responsive breakpoints */
@media (min-width: 768px) {
  .course-list {
    grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
    gap: 2rem;
  }
}

@media (min-width: 1200px) {
  .course-list {
    grid-template-columns: repeat(auto-fit, minmax(320px, 380px));
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>
