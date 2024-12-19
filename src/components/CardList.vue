<script setup>
import axios from 'axios';
import Card from './Card.vue'

defineProps({
  items: Array,
})

const emits = defineEmits(['onClickBookmark', 'onClickAdd'])




</script>

<template>
  <div class="grid grid-cols-4 gap-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-bookmarked="item.isBookmarked"
      :onClickBookmark="() => emits('onClickBookmark', item.id)"
      :onClickAdd="() => emits('onClickAdd', item.id)"
    />
  </div>
</template>
