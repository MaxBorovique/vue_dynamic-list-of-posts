<script setup>
import { inject } from 'vue';
import PostLoader from './PostLoader.vue';

const props = defineProps({
  posts: Array,
  creatingPostHandler: Function,
  detailsHandler: Function,
  isPostDetails: Boolean,
  isLoading: Boolean,
  selectedPostId: Number,
});
const isCreating = inject('isCreating');

console.log(props.selectedPostId);



</script>

<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            @click="creatingPostHandler"
            type="button"
            class="button is-link"
            :class="{ 'is-light': isCreating }"
          >
            Add New Post
          </button>
        </div>

        <PostLoader v-if="isLoading" />
        <section class="is-flex is-justify-content-center" v-if="!posts.length">
          <p>No posts yet.</p>
        </section>

        <table
          v-else
          class="table is-fullwidth is-striped is-hoverable is-narrow"
        >
          <thead>
            <tr class="has-background-link-light">
              <th>ID</th>
              <th>Title</th>
              <th class="has-text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }} </td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button 
                @click="detailsHandler(post.id)" 
                type="button" class="button is-link" 
                :class="{
                  'is-light': selectedPostId !== post.id,
                  }">
                  {{selectedPostId === post.id ? 'Close' : 'Open'}}
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
