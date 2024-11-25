<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import PostList from './components/PostList.vue';

const posts = ref([]);

</script>
<template>
  <AppHeader />
  <PostList :posts="posts"/>
  <AppSidebar />

</template>

<style>
</style>