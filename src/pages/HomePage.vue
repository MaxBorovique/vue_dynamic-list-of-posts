  <script setup>
  import { inject, provide, ref } from "vue";
  import AppHeader from "../components/AppHeader.vue";
  import AppSidebar from "../components/AppSidebar.vue";
  import PostList from "../components/PostList.vue";
import { router } from "../../routes";
  
  const posts = ref([]);
  const isCreating = ref(false);

  const user = inject('exsistingUser');
  
  const creatingPostHandler = () => {
    isCreating.value = !isCreating.value;
  };
  
  const logoutHandler = () => {
    user.email = "";
    user.authStatus = false;
    localStorage.clear('user');
    router.push('/login');
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