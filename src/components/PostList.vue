<script>
export default {
  name: "PostList",
  props: {
    posts: Array,
    handler: Function,
  }
};
</script>
<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button type="button" class="button is-link" @click="handler">Add New Post</button>
        </div>

        <table class="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead v-if="posts.length > 0">
            <tr  class="has-background-link-light">
              <th>ID</th>
              <th>Title</th>
              <th class="has-text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button type="button" class="button is-link">Open</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- todo: коли будуть пости тут потрібно буде налаштувати умовний рендеринг -->
        <div v-if="posts.length === 0" class="block">
          <p class="title is-4">No posts yet</p>
        </div>

      </div>
    </div>
  </div>
</template>
