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
}

provide("creatingPostHandler", creatingPostHandler);
provide('posts', posts);
onMounted(getPosts);
</script>
<template>
  <AppHeader :user="user" :logoutHandler="logoutHandler" />
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostList
          :isLoading="isLoading"
          :is-post-details="isPostDetails"
          :details-handler="detailsHandler"
          :creating-post-handler="creatingPostHandler"
          :posts="posts"
          :is-creating="isCreating"
        />

        <AppSidebar :isPostDetails="isPostDetails" :is-creating="isCreating" />
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
