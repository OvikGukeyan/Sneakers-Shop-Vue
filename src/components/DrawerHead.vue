<script setup>
import { inject } from 'vue'

const {handleCartClick} = inject('cart')
</script>

<template>
  <div class="flex gap-5 items-center mb-5">
    <img
      @click="handleCartClick"
      class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
      src="/arrow-next.svg"
      alt=""
    />
    <h2 class="text-2xl font-bold">Cart</h2>
  </div>
</template>
