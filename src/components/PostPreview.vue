<script setup>
import AppComments from "./CommentsList.vue";

const props = defineProps({
  post: Object,
  isPostDetails: Boolean,
  deletePostHandler: Function,
  selectedPost: Object,
});


console.log('sel-post', props.selectedPost);
const emit = defineEmits(['update']);

const postEditing = () => {
  emit('update', props.post);
};

</script>

<template>
  <div class="block">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ props.selectedPost.id }}: {{ props.selectedPost.title }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i @click="postEditing" class="fas fa-pen-to-square"></i>
        </span>
        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i @click="deletePostHandler(props.selectedPost.id)" class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ props.selectedPost.body }}</p>
    <div>
      <AppComments :post="post" />
    </div>
  </div>
</template>
