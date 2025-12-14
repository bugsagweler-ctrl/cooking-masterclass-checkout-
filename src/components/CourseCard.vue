<template>
  <div :class="['course-card', { soldOut: course.availableCount === 0 }]">

    <img :src="course.image" :alt="course.title" class="course-img" />

    <h2>{{ course.title }}</h2>
    <p>Chef: {{ course.chef }}</p>
    <p>Level: {{ course.level }}</p>
    <p class="price-text">Price: R{{ course.price.toFixed(2) }}</p>

    <p v-if="course.availableCount > 0" class="available-text">
      Seats left: {{ course.availableCount }}
    </p>
    <p v-else class="sold-out-text">Sold Out</p>

    <button
      @click="handleAddToCart"
      :disabled="isSoldOut || isInCart"
      :class="{ inCart: isInCart }"
    >
      {{ isSoldOut ? 'Sold Out' : isInCart ? 'In Cart' : 'Add to Cart' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart.js'

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()

// Check if the item is sold out
const isSoldOut = computed(() => props.course.availableCount === 0)

// Check if the item is already in the cart
const isInCart = computed(() => cart.isInCart(props.course))

function handleAddToCart() {
  if (!isSoldOut.value) {
    cart.addToCart(props.course)
  }
}
</script>

<style scoped>
.course-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  color: aliceblue;
  background-color: #363622;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
}

.course-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.75rem;
  flex-shrink: 0;
}

.price-text {
  font-weight: bold;
  color: #a0f0a0; /* Highlight price */
}

.soldOut {
  opacity: 0.6;
}

.sold-out-text {
  color: red;
  font-weight: bold;
}

.available-text {
  color: green;
  font-weight: bold;
}

button {
  margin-top: auto;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:disabled {
  cursor: not-allowed;
  background-color: #555 !important;
  color: #ccc;
}

/* Style for when the item is in the cart */
button.inCart {
  background-color: #2ecc71; /* Green color to indicate it's in the cart */
  color: white;
}
</style>
