<template>
  <header class="app-header">
    <h1>Cooking Masterclass</h1>

    <div class="cart-summary">
      <p>Cart: {{ cart.cartCount }} items</p>
      <p>Total: R{{ cart.grandTotal.toFixed(2) }}</p>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; and background removed and managed by parent in App.vue */
  color: white;
  padding: 1rem 2rem;

  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.app-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #504e44;
}

.cart-summary {
  text-align: right;
  min-width: 150px;
}

.cart-summary p {
  margin: 0;
  font-size: 0.95rem;
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
