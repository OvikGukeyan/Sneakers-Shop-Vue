<script setup>
import { onMounted, provide, ref, watch, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])
const isCartOpen = ref(false)
const isOrderCreating = ref(false)

const totalPrice = computed(
  () => Math.round(cartItems.value.reduce((acc, item) => acc + item.price, 0) * 100) / 100,
)
const vat = computed(() => Math.round((totalPrice.value * 15) / 100))

const handleCartClick = () => {
  isCartOpen.value = !isCartOpen.value
}

const addToCart = async (item) => {
  try {
    cartItems.value.push(item)
    item.isAdded = true
  } catch (error) {
    console.error(error)
  }
}

const removeFromCart = async (item) => {
  try {
    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.id)
    item.isAdded = false
  } catch (error) {
    console.error(error)
  }
}

const createOrder = async () => {
  try {
    isOrderCreating.value = true
    const { data } = await axios.post('https://40b6497860f9a336.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    })
    cartItems.value = []
    
    isCartOpen.value = false
    cartItems.value = []
    alert(`Order was created successfully with id ${data.id}`)
    return data
  } catch (error) {
    console.error(error)
  } finally {
    isOrderCreating.value = false
  }
}

watch(cartItems, () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}, { deep: true })

provide('cart', { handleCartClick, cartItems, addToCart, removeFromCart })

onMounted(async () => {
  const localCart = localStorage.getItem('cartItems')
  cartItems.value = localCart ? JSON.parse(localCart) : []
})
</script>

<template>
  <Drawer
    v-if="isCartOpen"
    :totalPrice="totalPrice"
    :vat="vat"
    @createOrder="createOrder"
    :isOrderCreating="isOrderCreating"
  />
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 pb-8">
    <Header :totalPrice="totalPrice" @handleCartClick="handleCartClick" />
    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>
