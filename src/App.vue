<script setup>
import MainHeader from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
</script>

<template>
  <Drawer />
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 pb-8">
    <MainHeader />
    <CardList />
  </div>
</template>

