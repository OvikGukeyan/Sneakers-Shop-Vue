<script setup>
    import Card from './Card.vue'
</script>


<template>
    <div class="p-10">
      <h2 class="text-2xl font-bold mb-8">All Sneakers</h2>
      <div class="grid grid-cols-4 gap-8">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
</template>