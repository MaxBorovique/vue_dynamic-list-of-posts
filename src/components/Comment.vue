<script setup>
import { deleteComment } from '@/api/comments';
import { ref } from 'vue';

const props = defineProps({
  comments: Array,
});

const newCommentsList = ref([...props.comments])
const deleteCommentHandler = async(commentId) => {
  newCommentsList.value = newCommentsList.value.filter(comment => comment.id !== commentId);
  try {
    await deleteComment(commentId);
  } catch (error) {
    console.error('Failed deleting comments', error)
  }
};
</script>
<template>
  <article class="message is-small" v-for="comment in newCommentsList" :key="comment.id">
  <div class="message-header">
    <a href="{`mailto:${comment.email}`}"> {{  comment.name }} </a>
    <button @click="deleteCommentHandler(comment.id)" type="button" class="delete is-small" aria-label="delete">
      delete button
    </button>
  </div>
  <div class="message-body">{{ comment.body }}</div>
</article>

</template>