<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'


const {cartItems} = inject('cart')

const {onClickAdd} = inject('cart')

</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-scroll w-full gap-4 scrollbar-none">
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @onClickDelete="onClickAdd(item.perentId)"
    />
  </div>
</template>
