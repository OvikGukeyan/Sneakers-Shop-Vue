<script setup>

import Card from './Card.vue'


defineProps({
  items: Array,
})


</script>

<template>
  <div class="grid grid-cols-4 gap-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="true"
      :is-bookmarked="true"
    />
  </div>
</template>
