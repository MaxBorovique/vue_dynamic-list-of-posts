<script setup>
import { inject, onMounted, provide, ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import PostList from "../components/PostList.vue";
import { router } from "../../routes";
import { userPosts } from "@/api/posts";

const posts = ref([]);
const isCreating = ref(false);

const user = inject("exsistingUser");

const creatingPostHandler = () => {
  isCreating.value = !isCreating.value;
};

const logoutHandler = () => {
  user.email = "";
  user.authStatus = false;
  localStorage.clear("user");
  router.push("/login");
};

const getPosts = async() => {
  try {
    // !! CHANGE FUNCTION ARGUMENTS
    posts.value = await userPosts(4);
  } catch (error) {
    console.error(error);
  }
}

provide("creatingPostHandler", creatingPostHandler);
onMounted(getPosts);
</script>
<template>
  <AppHeader :user="user" :logoutHandler="logoutHandler" />
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostList
          :creatingPostHandler="creatingPostHandler"
          :posts="posts"
          :is-creating="isCreating"
        />

        <AppSidebar :is-creating="isCreating" />
      </div>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  justify-content: center;
}
</style>
