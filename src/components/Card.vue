<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  isBookmarked: Boolean,
  onClickAdd: Function,
  onClickBookmark: Function,
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickBookmark"
      @click="onClickBookmark"
      class="absolute top-8 left-8"
      :src="isBookmarked ? '/like-2.svg' : '/like-1.svg'"
      alt="Heart"
    />
    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400"> Price: </span>
        <b> {{ price }} € </b>
      </div>
      <img @click="onClickAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus" />
    </div>
  </div>
</template>
