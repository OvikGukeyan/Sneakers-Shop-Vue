<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const cartItems = ref([])
const isCartOpen = ref(false)

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
}

const handleCartClick = () => {
  isCartOpen.value = !isCartOpen.value
}

const onClickBookmark = async (id) => {
  const findItem = items.value.find((item) => item.id === id)
  try {
    if (findItem.isBookmarked) {
      await axios.delete(`https://40b6497860f9a336.mokky.dev/bookmarks/${findItem.bookmarkId}`)
      findItem.isBookmarked = false
    } else {
      await axios.post(`https://40b6497860f9a336.mokky.dev/bookmarks`, {
        perentId: id,
      })
      findItem.isBookmarked = true
    }
  } catch (error) {
    console.error(error)
  }
}

const onClickAdd = async (id) => {
  const findItem = items.value.find((item) => item.id === id)
  try {
    if (findItem.isAdded) {
      await axios.delete(`https://40b6497860f9a336.mokky.dev/cart/${findItem.cartId}`)
      findItem.isAdded = false
      cartItems.value = cartItems.value.filter((item) => item.id !== findItem.cartId)
    } else {
      const { id, ...rest } = findItem
      const cartItem = { ...rest, perentId: id }
      const { data } = await axios.post(`https://40b6497860f9a336.mokky.dev/cart`, cartItem)
      findItem.isAdded = true
      cartItems.value.push(data)
      findItem.cartId = data.id
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('https://40b6497860f9a336.mokky.dev/items', {
      params: params,
    })
    items.value = data.map((obj) => ({
      ...obj,
      isAdded: false,
      isBookmarked: false,
    }))
  } catch (error) {
    console.error(error)
  }
}

const fetchBookmarks = async () => {
  try {
    const { data } = await axios.get('https://40b6497860f9a336.mokky.dev/bookmarks')
    items.value = items.value.map((item) => {
      const bookmarked = data.find((obj) => obj.perentId === item.id)
      if (!bookmarked) {
        return item
      }
      return {
        ...item,
        isBookmarked: true,
        bookmarkId: bookmarked.id,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const fetchCart = async () => {
  try {
    const { data } = await axios.get('https://40b6497860f9a336.mokky.dev/cart')
    items.value = items.value.map((item) => {
      const added = data.find((obj) => obj.perentId === item.id)
      if (!added) {
        return item
      }
      return {
        ...item,
        isAdded: true,
        cartId: added.id,
      }
    })
    cartItems.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchItems(), await fetchBookmarks(), await fetchCart()
})

watch(filters, fetchItems)

provide('handleCartClick', handleCartClick)
provide('onClickDelete', onClickAdd)
</script>

<template>
  <Drawer :items="cartItems" v-if="isCartOpen" />
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 pb-8">
    <Header @handleCartClick="handleCartClick" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-8">All Sneakers</h2>
        <div class="flex gap-5">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border border-slate-200 rounded-md outline-none"
          >
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="title">By Name</option>
          </select>
          <div class="relative">
            <img class="absolute top-3 left-3" src="/search.svg" alt="search" />
            <input
              @input="onChangeSearch"
              type="text"
              placeholder="Search..."
              class="border border-slate-200 py-2 pl-10 pr-4 rounded-md outline-none focus:border-slate-400"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList @onClickAdd="onClickAdd" @onClickBookmark="onClickBookmark" :items="items" />
      </div>
    </div>
  </div>
</template>
