<script setup>
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import CartItemsList from './CartItemsList.vue'
import { ref, inject } from 'vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vat: Number,
})

const { cartItems } = inject('cart')
const isOrderCreating = ref(false)
const orderId = ref(null)

const { handleCartClick } = inject('cart')

const createOrder = async () => {
  try {
    isOrderCreating.value = true
    const { data } = await axios.post('https://40b6497860f9a336.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: props.totalPrice,
    })
    cartItems.value = []
    console.log(cartItems)
    orderId.value = data.id
    return data
  } catch (error) {
    console.error(error)
  } finally {
    isOrderCreating.value = false
  }
}
</script>

<template>
  <div
    @click="handleCartClick"
    class="fixed top-0 right-0 w-full h-full bg-black z-10 opacity-70"
  ></div>
  <div class="fixed top-0 right-0 w-96 h-full bg-white z-20 p-8">
    <div class="flex flex-col h-full">
      <DrawerHead />

      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          imageUrl="/package-icon.png"
          title="Cart is empty"
          description="Add at least one sneaker to your cart"
        />

        <InfoBlock
          v-if="orderId"
          imageUrl="/order-success-icon.png"
          title="Order created"
          :description="`Your order number #${orderId} has been successfully created`"
        />
      </div>

      <div v-else class="flex flex-col h-full">
        <CartItemsList />
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Total price:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} € </b>
          </div>
          <div class="flex gap-2">
            <span>Tax:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vat }} € </b>
          </div>

          <button
            :disabled="!totalPrice || isOrderCreating"
            @click="createOrder"
            class="bg-lime-500 w-full mt-4 rounded-xl hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition text-white font-bold py-3 px-4"
          >
            {{ isOrderCreating ? 'Creating order...' : 'Create order' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
