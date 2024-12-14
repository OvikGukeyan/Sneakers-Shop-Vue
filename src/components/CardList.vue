<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold mb-8">All Sneakers</h2>
        
    </div>
    <div class="grid grid-cols-4 gap-8">
      <Card
        image-url="/sneakers/sneakers-1.jpg"
        title="Nike Air Max 270"
        :price="25"
        :is-added="true"
        :is-bookmarked="true"
      />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>
