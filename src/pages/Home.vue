<script setup>
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { inject, reactive, watch, ref, onMounted } from 'vue';


const { onClickAdd} = inject('cart')

const items = ref([])


const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

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
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
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

watch(filters, fetchItems)

onMounted(async () => {
  await fetchItems(), await fetchBookmarks()
})

</script>

<template>
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
</template>
