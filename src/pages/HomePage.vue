<script setup>
import { inject, onMounted, provide, ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import PostList from "../components/PostList.vue";
import { router } from "../../routes";
import { deletePost, getOnePost, userPosts } from "@/api/posts";

const posts = ref([]);
const isLoading = ref(true);
const isCreating = ref(false);
const isPostDetails = ref(false);
const selectedPostId = ref(null);
const selectedPostDetails = ref(null);


const user = inject("existingUser");

const getPosts = async () => {
  if (!user.value) {
    router.push("/login");
    return;
  }
  try {
    posts.value = await userPosts(user.value.id);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
};

const logoutHandler = () => {
  user.name = "";
  user.email = "";
  localStorage.clear("user");
  router.push("/login");
};

const creatingPostHandler = () => {
  isCreating.value = !isCreating.value;
  isPostDetails.value = false;
};


const detailsHandler = async (id) => {
  if (selectedPostId.value === id) {
    selectedPostId.value = null;
    selectedPostDetails.value = null;
    isPostDetails.value = false;
    return;
  }

  try {
    selectedPostId.value = id;
    selectedPostDetails.value = await getOnePost(id);
    isPostDetails.value = true;
    isCreating.value = false;
  } catch (error) {
    console.error("Failed to get User Posts", error);
  }
};

const deletePostHandler = async (postId) => {
  try {
    await deletePost(postId);
    posts.value = posts.value.filter((post) => post.id !== postId);
    selectedPostDetails.value = null;
    selectedPostId.value = null;
    isPostDetails.value = false;
  } catch (error) {
    console.error("Failed deleting comments", error);
  }
};


provide("creatingPostHandler", creatingPostHandler);
provide("detailsHandler", detailsHandler);
provide("deletePostHandler", deletePostHandler);
provide("selectedPostDetails", selectedPostDetails);
provide("selectedPostId", selectedPostId);
provide("isCreating", isCreating);
provide("posts", posts);

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
          :selected-post-id="selectedPostId"
          :creating-post-handler="creatingPostHandler"
          :posts="posts"
        />

        <AppSidebar :detailsHandler="detailsHandler" :is-post-details="isPostDetails" />
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
