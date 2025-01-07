<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const bookmarks = ref([])

const { removeFromCart, addToCart } = inject('cart')
const onPlusClick = (item) => {
  if (item.isAdded) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}
onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://40b6497860f9a336.mokky.dev/bookmarks?_relations=items',
    )

    bookmarks.value = data.map((bookmark) => bookmark.item)
    console.log(bookmarks.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <h1>Bookmarks</h1>

  <div class="mt-10">
    <CardList @onClickAdd="onPlusClick" :items="bookmarks" isBookmarks />
  </div>
</template>
