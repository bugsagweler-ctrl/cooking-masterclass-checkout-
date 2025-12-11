<template>
  <aside class="checkout">
    <h2>Cart</h2>

    <!-- Empty cart message -->
    <div v-if="counter.items.length === 0" class="empty-cart">
      Your cart is empty.
    </div>

    <!-- Cart items -->
    <div v-else>
      <div v-for="item in counter.items" :key="item.id" class="checkout-item">
        <div class="item-info">
          <p>{{ item.title }}</p>
          <p>Price: R{{ item.price }}</p>
          <p v-if="item.availableCount === 0" class="sold-out">Sold Out</p>
        </div>

        <!-- Quantity controls -->
        <div class="quantity-controls">
          <button @click="decrementItem(item)">-</button>
          <span>{{ quantities[item.id] || 1 }}</span>
          <button @click="incrementItem(item)" :disabled="item.availableCount === 0">+</button>
          <button @click="removeItem(item)" class="remove-btn">Remove</button>
        </div>

        <!-- Line total -->
        <p class="line-total">
          Total: R{{ (item.price * (quantities[item.id] || 1)).toFixed(2) }}
        </p>
      </div>

      <hr />

      <!-- Totals -->
      <p>Subtotal: R{{ subtotal.toFixed(2) }}</p>
      <p>Tax (10%): R{{ tax.toFixed(2) }}</p>
      <p><strong>Grand Total: R{{ total.toFixed(2) }}</strong></p>

      <button @click="clearCart" class="clear-btn">Clear Cart</button>
    </div>
  </aside>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useCounterStore } from '@/stores/counter.js'

const counter = useCounterStore()

// Track quantity of each item
const quantities = reactive({})

// Initialize quantities with 1
counter.items.forEach(item => {
  quantities[item.id] = 1
})

// Increment quantity
function incrementItem(item) {
  if (!quantities[item.id]) quantities[item.id] = 1
  quantities[item.id]++
}

// Decrement quantity
function decrementItem(item) {
  if (!quantities[item.id]) quantities[item.id] = 1
  if (quantities[item.id] > 1) quantities[item.id]--
}

// Remove item from cart
function removeItem(item) {
  counter.toggleSave(item)
  delete quantities[item.id]
}

// Clear entire cart
function clearCart() {
  while (counter.items.length > 0) {
    counter.toggleSave(counter.items[0])
  }
  Object.keys(quantities).forEach(key => delete quantities[key])
}

// Compute subtotal
const subtotal = computed(() =>
  counter.items.reduce((sum, item) => {
    const qty = quantities[item.id] || 1
    return sum + item.price * qty
  }, 0)
)

// Compute tax (10%)
const tax = computed(() => subtotal.value * 0.1)

// Compute total
const total = computed(() => subtotal.value + tax.value)
</script>

<style scoped>
.checkout {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
  width: 300px;
  flex-shrink: 0;
}

.checkout h2 {
  margin-top: 0;
}

.checkout-item {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.item-info p {
  margin: 0;
}

.sold-out {
  color: red;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  padding: 0.25rem 0.5rem;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.line-total {
  font-weight: bold;
  margin-top: 0.5rem;
}

.clear-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.empty-cart {
  color: gray;
  font-style: italic;
}

/* Responsive checkout */
@media (max-width: 768px) {
  .checkout {
    width: 100%;
  }
}
</style>
