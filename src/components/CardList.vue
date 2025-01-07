<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isBookmarks: Boolean
})

const emit = defineEmits(['onClickBookmark', 'onClickAdd'])




</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-bookmarked="item.isBookmarked"
      :onClickBookmark="isBookmarks ? null : () =>  emit('onClickBookmark', item.id)"
      :onClickAdd="() => emit('onClickAdd', item)"
    />
  </div>
</template>
