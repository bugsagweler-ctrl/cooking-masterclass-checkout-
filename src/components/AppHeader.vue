<template>
  <header class="app-header">
    <h1>Cooking Masterclass</h1>

    <div class="wishlist">
      Wishlist: {{ counter.count }}
      <br>
      Total: R{{ counter.totalPrice }}
      <br>
      <span v-if="lastAdded" class="added-msg">
        Added: R{{ lastAdded }}
      </span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter.js'

const counter = useCounterStore()
const lastAdded = ref(null)

// Watch when items change
counter.$subscribe((mutation, state) => {
  if (mutation.events?.key === 'items' || mutation.type === 'patch object') {
    if (state.items.length > 0) {
      const lastItem = state.items[state.items.length - 1]
      lastAdded.value = lastItem.price
      setTimeout(() => (lastAdded.value = null), 2000)
    }
  }
})
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

.wishlist {
  text-align: right;
  flex-shrink: 0;
  min-width: 150px;
}

.added-msg {
  color: green;
  font-weight: bold;
  display: block;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    text-align: center;
  }

  .wishlist {
    text-align: center;
  }
}
</style>
