<script setup>
import { onMounted, provide, ref, watch, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Home from './pages/Home.vue'

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

const onClickAdd = async (id) => {
  const findItem = items.value.find((item) => item.id === id)
  try {
    if (findItem.isAdded) {
      await axios.delete(`https://40b6497860f9a336.mokky.dev/cart/${findItem.cartId}`)
      findItem.isAdded = false
      cartItems.value = cartItems.value.filter((item) => item.id !== findItem.cartId)
    } else {
      const { id, ...rest } = findItem
      const cartItem = { ...rest, perentId: id }
      const { data } = await axios.post(`https://40b6497860f9a336.mokky.dev/cart`, cartItem)
      findItem.isAdded = true
      cartItems.value.push(data)
      findItem.cartId = data.id
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchCart = async () => {
  try {
    const { data } = await axios.get('https://40b6497860f9a336.mokky.dev/cart')
    items.value = items.value.map((item) => {
      const added = data.find((obj) => obj.perentId === item.id)
      if (!added) {
        return item
      }
      return {
        ...item,
        isAdded: true,
        cartId: added.id,
      }
    })
    cartItems.value = data
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
    items.value.forEach((item) => {
      item.isAdded = false
    })
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

provide('cart', { handleCartClick, onClickAdd, cartItems })

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
      <router-view/>
    </div>
  </div>
</template>
