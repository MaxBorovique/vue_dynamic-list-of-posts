<script setup>
import { inject } from "vue";
import AppComments from "./AppComments.vue";

defineProps({
  isPostDetails: Boolean,
});

const posts = inject("posts");
</script>

<template>
  <div class="block" v-for="post in posts" :key="post.id">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ post.id }}: {{ post.title }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i class="fas fa-pen-to-square"></i>
        </span>
        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ post.body }}</p>
    <div>
      <AppComments :post="post" />
    </div>
  </div>
</template>
