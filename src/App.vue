<script setup>
import { onMounted, provide, ref, watch, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])
const isCartOpen = ref(false)

const totalPrice = computed(
  () => Math.round(cartItems.value.reduce((acc, item) => acc + item.price, 0) * 100) / 100,
)
const vat = computed(() => Math.round((totalPrice.value * 15) / 100))

const handleCartClick = () => {
  isCartOpen.value = !isCartOpen.value
}

const addToCart = async (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}



watch(
  cartItems,
  () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  },
  { deep: true },
)

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
  />
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 pb-8">
    <Header :totalPrice="totalPrice" @handleCartClick="handleCartClick" />
    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>
