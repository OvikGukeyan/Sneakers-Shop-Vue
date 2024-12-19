<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
})
const emit = defineEmits(['onClickDelete'])
</script>

<template>
  <div class="flex items-center gap-4 border border-slate-200 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />
    <div class="w-full justify-between">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <div class="flex gap-4">
          <span class="text-slate-400"> Price: </span>
          <b> {{ price }} € </b>
        </div>
        <img @click="emit('onClickDelete')" class="opacity-30 cursor-pointer hover:opacity-100 transition" src="/close.svg" alt="" />
      </div>
    </div>
  </div>
</template>
