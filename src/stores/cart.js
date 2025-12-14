import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { courses as initialCourses } from '@/data/courses.js'


const TAX_RATE = 0.1
export const useCartStore = defineStore('cart', () => {
  const courses = ref(initialCourses.map(c => ({ ...c })))

  // Cart Items: Contains the course details plus the quantity selected by the user.
  const cartItems = ref([])

  // Load cart from localStorage (Optional but Recommended)
  const savedCart = localStorage.getItem('cooking-masterclass-cart')
  if (savedCart) {
    try {
      // NOTE: We rely on the stored cart items structure being the full course object + quantity
      cartItems.value = JSON.parse(savedCart)
    } catch (e) {
      console.error("Could not parse cart from localStorage:", e)
    }
  }

  // --------------------------------
  // ACTIONS
  // --------------------------------

  function saveCart() {
    localStorage.setItem('cooking-masterclass-cart', JSON.stringify(cartItems.value))
  }

  /**
   * Adds a course to the cart or increments its quantity.
   * @param {Object} course The course object from the catalogue.
   */
  function addToCart(course) {
    // 1. Check if the course is sold out globally
    if (course.availableCount === 0) return

    const existingItem = cartItems.value.find(item => item.id === course.id)

    if (existingItem) {
      // 2. Item exists: Check stock limit before incrementing
      if (existingItem.quantity < course.availableCount) {
        existingItem.quantity++
      }
    } else {
      // 3. New item: Add to cart with quantity 1
      const cartItem = {
        ...course, // Copy all course details (id, title, price, availableCount)
        quantity: 1
      }
      cartItems.value.push(cartItem)
    }
    saveCart()
  }

  /**
   * Updates the quantity of a cart item by a positive or negative delta.
   * @param {number} itemId The ID of the item to update.
   * @param {number} delta The change in quantity (e.g., 1 or -1).
   */
  function updateQuantity(itemId, delta) {
    const itemIndex = cartItems.value.findIndex(item => item.id === itemId)
    if (itemIndex === -1) return

    const item = cartItems.value[itemIndex]
    // The course is the source of truth for available stock limit
    const course = courses.value.find(c => c.id === itemId)

    const newQuantity = item.quantity + delta

    if (newQuantity <= 0) {
      // Remove item if quantity drops to 0 or below (Requirement: Remove from cart)
      cartItems.value.splice(itemIndex, 1)
    } else if (course && newQuantity <= course.availableCount) {
      // Only increment if stock allows (Requirement: Cannot exceed available count)
      item.quantity = newQuantity
    }

    saveCart()
  }

  /**
   * Removes an item completely from the cart.
   */
  function removeFromCart(itemId) {
    const itemIndex = cartItems.value.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
      cartItems.value.splice(itemIndex, 1)
      saveCart()
    }
  }

  /**
   * Clears all items from the cart. (Stretch Goal)
   */
  function clearCart() {
    cartItems.value = []
    saveCart()
  }

  // --------------------------------
  // GETTERS (Computed Properties)
  // --------------------------------

  /** Total number of items (seats) in the cart. */
  const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  /** Subtotal before tax. (Requirement: Subtotal) */
  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  /** Simple Tax calculation (10%). (Requirement: Simple tax) */
  const tax = computed(() => subtotal.value * TAX_RATE)

  /** Grand Total (Subtotal + Tax). (Requirement: Grand total) */
  const grandTotal = computed(() => subtotal.value + tax.value)

  /** Check if a course is currently in the cart. */
  const isInCart = computed(() => {
     return (course) => cartItems.value.some(item => item.id === course.id)
  })


  return {
    // State
    courses, // Catalogue
    cartItems, // The Cart

    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,

    // Getters (for display and calculation)
    cartCount,
    subtotal,
    tax,
    grandTotal,
    isInCart
  }
})
