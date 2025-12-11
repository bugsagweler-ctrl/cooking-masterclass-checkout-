// src/stores/counter.js
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { courses as initialCourses } from '@/data/courses.js'

export const useCounterStore = defineStore('counter', () => {
  // --------------------------------
  // COURSES DATA (deep copy)
  // --------------------------------
  const courses = reactive(
    initialCourses.map(c => ({ ...c }))
  )

  function decrement(course) {
    const found = courses.find(x => x.id === course.id)
    if (found && found.availableCount > 0) {
      found.availableCount--
    }
  }

  function increment(course) {
    const found = courses.find(x => x.id === course.id)
    if (found) {
      found.availableCount++
    }
  }

  // --------------------------------
  // WISHLIST (from older project)
  // --------------------------------
  const items = reactive([])

  function toggleSave(course) {
    const exists = items.find(c => c.id === course.id)

    if (exists) {
      // Remove from wishlist
      const index = items.findIndex(c => c.id === course.id)
      items.splice(index, 1)

      // Restore stock count
      increment(course)

    } else {
      // Add to wishlist *if in stock*
      const found = courses.find(x => x.id === course.id)
      if (found && found.availableCount > 0) {
        items.push(course)
        decrement(course)
      }
    }
  }

  // --------------------------------
  // GETTERS
  // --------------------------------
  const count = computed(() => items.length)

  const isSaved = computed(() => {
    return (course) => items.some(c => c.id === course.id)
  })

  const totalPrice = computed(() =>
    items.reduce((sum, item) => sum + item.price, 0)
  )

  return {
    // courses
    courses,
    decrement,
    increment,

    // wishlist
    items,
    toggleSave,
    count,
    isSaved,
    totalPrice
  }
})
