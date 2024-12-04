<script setup>
import { inject, onMounted, provide, ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import PostList from "../components/PostList.vue";
import { router } from "../../routes";
import { userPosts } from "@/api/posts";

const posts = ref([]);
const isLoading = ref(true);
const isCreating = ref(false);
const isPostDetails = ref(false);

const user = inject("exsistingUser");

const creatingPostHandler = () => {
  isCreating.value = !isCreating.value;
  isPostDetails.value = false;
};

const logoutHandler = () => {
  user.name = '';
  user.email = '';
  localStorage.clear("user");
  router.push("/login");
};

const getPosts = async() => {
  try {
    posts.value = await userPosts(user.value.id);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const detailsHandler = () => {
  isPostDetails.value = !isPostDetails.value;
  isCreating.value = false;
}

provide("creatingPostHandler", creatingPostHandler);
provide("isCreating", isCreating);
provide('posts', posts);
onMounted(getPosts);
</script>
<template>
  <AppHeader :user="user" :logoutHandler="logoutHandler" />
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostList
          :is-loading="isLoading"
          :is-post-details="isPostDetails"
          :details-handler="detailsHandler"
          :creating-post-handler="creatingPostHandler"
          :posts="posts"
        />

        <AppSidebar :is-post-details="isPostDetails" />
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
