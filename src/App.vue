<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://40b6497860f9a336.mokky.dev/items')
    items.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 pb-8">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-8">All Sneakers</h2>
        <div class="flex gap-5">
          <select class="py-2 px-3 border border-slate-200 rounded-md outline-none">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option>By Name</option>
          </select>
          <div class="relative">
            <img class="absolute top-3 left-3" src="/search.svg" alt="search" />
            <input
              placeholder="Search..."
              class="border border-slate-200 py-2 pl-10 pr-4 rounded-md outline-none focus:border-slate-400"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" />
      </div>
    </div>
  </div>
</template>
