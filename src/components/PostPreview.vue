<script setup>
import CommentsList from "./CommentsList.vue";

const props = defineProps({
  isPostDetails: Boolean,
  deletePostHandler: Function,
  selectedPost: Object,
});
// console.log('preview',props.post.id);
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
      <CommentsList :post="selectedPost" />
    </div>
  </div>
</template>
