<script setup>
import CartItem from './CartItem.vue'
</script>

<template>
    <div class="flex flex-col flex-1 overflow-y-scroll w-full gap-4 scrollbar-none">
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />
      <CartItem image-url="/sneakers/sneakers-1.jpg" title="Nike Air Max 270" :price="25" />


    </div>
</template>
