<template>
  <aside class="checkout">
    <h2>Shopping Cart</h2>

    <div v-if="cart.cartItems.length === 0" class="empty-cart">
      Your cart is empty.
    </div>

    <div v-else>
      <div v-for="item in cart.cartItems" :key="item.id" class="checkout-item">
        <div class="item-info">
          <p><strong>{{ item.title }}</strong></p>
          <p>Price: R{{ item.price.toFixed(2) }}</p>
          <p v-if="item.availableCount === 0" class="sold-out">Sold Out</p>
        </div>

        <div class="quantity-controls">
          <button @click="cart.updateQuantity(item.id, -1)">-</button>
          <span>{{ item.quantity }}</span>
          <button
            @click="cart.updateQuantity(item.id, 1)"
            :disabled="item.quantity >= item.availableCount"
          >
            +
          </button>
          <button @click="cart.removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>

        <p class="line-total">
          Total: R{{ (item.price * item.quantity).toFixed(2) }}
        </p>
      </div>

      <hr />

      <p class="summary-line">Subtotal: R{{ cart.subtotal.toFixed(2) }}</p>
      <p class="summary-line">Tax (10%): R{{ cart.tax.toFixed(2) }}</p>
      <p class="summary-total"><strong>Grand Total: R{{ cart.grandTotal.toFixed(2) }}</strong></p>

      <button @click="cart.clearCart" class="clear-btn">Clear Cart</button>
    </div>
  </aside>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
const cart = useCartStore()
</script>

<style scoped>
.checkout {
  background-color: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
  backdrop-filter: blur(10px); /* The magic! Creates the frosted glass effect */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for definition */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Subtle shadow */
  color: white; /* Ensure text is visible over the dark background */

  padding: 1.5rem;
  border-radius: 15px; /* Slightly larger border radius looks better with glass */
  width: 320px; /* Slightly wider for better appearance */
  flex-shrink: 0;
}

.checkout h2 {
  margin-top: 0;
  color: #fff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5); /* Lighter separator */
  padding-bottom: 0.5rem;
}

.checkout-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* Semi-transparent line */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.item-info p {
  margin: 0;
}

.sold-out {
  color: #ff6666;
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
  background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent button background */
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.line-total {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #a0f0a0; /* Highlighted total */
}

hr {
  border-color: rgba(255, 255, 255, 0.3);
}

.summary-line {
    margin: 0.25rem 0;
}

.summary-total {
    margin: 0.5rem 0 1rem;
    font-size: 1.1em;
    color: #ffd700; /* Gold/Yellow for Grand Total */
}

.clear-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  background-color: #c0392b; /* Darker red */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.empty-cart {
  color: #ccc;
  font-style: italic;
}

/* Responsive checkout */
@media (max-width: 768px) {
  .checkout {
    width: 100%;
    backdrop-filter: blur(5px);
  }
}
</style>
