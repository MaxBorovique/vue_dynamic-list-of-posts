<script setup>
import { inject } from "vue";
import AppComments from "./CommentsList.vue";

const props = defineProps({
  post: Object,
  isPostDetails: Boolean,
});

const emit = defineEmits(['update']);

const postEditing = () => {
  emit('update', props.post);
};

const deletePostHandler = inject('deletePostHandler');
</script>

<template>
  <div class="block">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#id: title</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i @click="postEditing" class="fas fa-pen-to-square"></i>
        </span>
        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i @click="deletePostHandler(22)" class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">body</p>
    <div>
      <AppComments :post="USEVALUE" />
    </div>
  </div>
</template>
