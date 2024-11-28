<script setup>
const props = defineProps({
  creatingPostHandler: Function,
  isCreating: Boolean,
})

console.log(props.isCreating);
</script>

<template>
  <div class="tile is-parent">
  <div class="tile is-child box is-success">
    <div class="block">
      <div class="block is-flex is-justify-content-space-between">
        <p class="title">Posts</p>
        <button @click="creatingPostHandler" type="button" class="button is-link" :class="{'is-light': isCreating}">Add New Post</button>
      </div>

      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr class="has-background-link-light">
            <th>ID</th>
            <th>Title</th>
            <th class="has-text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>title</td>
            <td class="has-text-right is-vcentered">
              <button type="button" class="button is-link">Open</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>