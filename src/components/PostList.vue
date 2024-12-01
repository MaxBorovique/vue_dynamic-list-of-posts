<script setup>
defineProps({
  posts: Array,
  creatingPostHandler: Function,
  isCreating: Boolean,
  detailsHandler: Function,
  isPostDetails: Boolean,
});



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
          <tbody v-for="post in posts" :key="post.id">
            <tr>
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button @click="detailsHandler" type="button" class="button is-link">{{isPostDetails ? 'Close' : 'Open'}}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
