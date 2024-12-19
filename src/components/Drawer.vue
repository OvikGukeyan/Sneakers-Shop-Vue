<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemsList from './CartItemsList.vue'
import { inject } from 'vue'

defineProps({
  items: Array,
})

const handleCartClick = inject('handleCartClick')
</script>

<template>
  <div
    @click="handleCartClick"
    class="fixed top-0 right-0 w-full h-full bg-black z-10 opacity-70"
  ></div>
  <div class="fixed top-0 right-0 w-96 h-full bg-white z-20 p-8">
    <div class="flex flex-col h-full">
      <DrawerHead/>
      <CartItemsList :items="items" />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Total price:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>22 € </b>
        </div>
        <div class="flex gap-2">
          <span>Tax:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>5 € </b>
        </div>

        <button
          class="bg-lime-500 w-full mt-4 rounded-xl hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition text-white font-bold py-3 px-4"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
