<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String,
})
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img height="100" width="100" :src="imageUrl" alt="image" />
    <h1 class="mt-4 text-2xl font-medium">{{ title }}</h1>
    <p class="mt-2 text-slate-400">{{ description }}</p>
  </div>
</template>
