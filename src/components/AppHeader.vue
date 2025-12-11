<template>
  <header class="app-header">
    <h1>Cooking Masterclass</h1>

    <div class="cart-summary">
      <p>Cart: {{ counter.count }} items</p>
      <p>Total: R{{ counter.totalPrice.toFixed(2) }}</p>
    </div>
  </header>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js'

const counter = useCounterStore()
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 10px;
}

.cart-summary {
  text-align: right;
  min-width: 150px;
}

/* Responsive header */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    text-align: center;
  }

  .cart-summary {
    text-align: center;
    margin-top: 0.5rem;
  }
}
</style>
