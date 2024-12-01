<script setup>
import { inject, ref } from "vue";
import AppComments from "./AppComments.vue";
import { deletePost } from "@/api/posts";

defineProps({
  isPostDetails: Boolean,
});


const posts = inject("posts");
console.log('posts', posts.value);
const newPostList = ref([...posts.value])
const deletePostHandler = async(postId) => {
  newPostList.value = newPostList.value.filter(post => post.id !== postId);
  try {
    await deletePost(postId);
  } catch (error) {
    console.error('Failed deleting comments', error)
  }
};
</script>

<template>
  <div class="block" v-for="post in newPostList" :key="post.id">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ post.id }}: {{ post.title }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i class="fas fa-pen-to-square"></i>
        </span>
        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i @click="deletePostHandler(post.id)" class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ post.body }}</p>
    <div>
      <AppComments :post="post" />
    </div>
  </div>
</template>
