  <script setup>
  import { provide, reactive, ref } from "vue";
  import AppHeader from "../components/AppHeader.vue";
  import AppSidebar from "../components/AppSidebar.vue";
  import PostList from "../components/PostList.vue";
  
  const posts = ref([]);
  const isCreating = ref(false);
  const user = reactive({
    email: null,
    name: null,
    authStatus: true,
    userPosts: {
      title: null,
      body: null,
    },
  });
  
  const creatingPostHandler = () => {
    isCreating.value = !isCreating.value;
    console.log(isCreating.value);
  };
  
  const logoutHandler = () => {
    user.email = "";
    user.authStatus = false;
  };
  
  provide("creatingPostHandler", creatingPostHandler);
  </script>
<template>

  <AppHeader :user="user" :logoutHandler="logoutHandler" />
  <main>
    <PostList
      :creatingPostHandler="creatingPostHandler"
      :posts="posts"
      :is-creating="isCreating"
    />
    <AppSidebar :is-creating="isCreating" />
  </main>
</template>




<style>
main {
  display: flex;
  justify-content: center;
}
</style>