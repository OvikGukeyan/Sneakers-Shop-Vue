<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['handleCartClick'])
</script>

<template>
    <header class="flex justify-between border-b border-slate-200 px-10  py-8 w-full ">
      <div class="flex gap-4 items-center">
        <img class="w-10" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Best sneakers store</p>
        </div>
      </div>

      <ul class="flex items-center gap-10">
        <li @click="emit('handleCartClick')" class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/cart.svg" alt="Cart">
          <b>{{ totalPrice }} € </b>
        </li>

        <li class="flex gap-2 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Bookmarks">
          <span>Bookmarks </span>
        </li>

        <li class="flex gap-2 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="Profile">
          <span>Profile </span>
        </li>
      </ul>
    </header>
</template>
