<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'
defineProps({
  items: Array,
})

const onClickDelete = inject('onClickDelete')

</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-scroll w-full gap-4 scrollbar-none">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @onClickDelete="onClickDelete(item.perentId)"
    />
  </div>
</template>
