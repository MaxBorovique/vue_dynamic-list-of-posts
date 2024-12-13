<script setup>
import { deleteComment, getPostComments } from "@/api/comments";
import { onMounted, ref } from "vue";
import Comment from "./Comment.vue";
import NoCommentsMessage from "./NoCommentsMessage.vue";
import Input from "./Input.vue";
import AppLoader from "./AppLoader.vue";


const props = defineProps({
  post: Object,
});

const isCommentCreating = ref(false);
const isLoading = ref(false);
const isError = ref('');

const startCreatingComment = () => {
  isCommentCreating.value = true;
}

const comments = ref([]);

const getComments = async () => {
  try {
    isLoading.value = true;
    comments.value = await getPostComments(props.post.id);
  } catch (error) {
    console.error('Error fetching comments', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteCommentHandler = async(commentId) => {
  comments.value.filter(comment => comment.id !== commentId);
  try {
    await deleteComment(commentId);
  } catch (error) {
    console.error('Failed deleting comments', error)
    isError.value = 'Failed deleting comments';
  }
};

onMounted(getComments);
</script>

<template>
  <AppLoader v-if="isLoading"/>
  <template v-if="comments.length">
    <Comment v-if="!isCommentCreating" :comments="comments" :deleteCommentHandler="deleteCommentHandler"/>
  </template>
  <template v-else>
    <NoCommentsMessage />
    <AppForm  v-if="isCommentCreating">
      <Input />
    </AppForm>
  
  
    <WriteCommentBtn v-if="!isCommentCreating" :startCreatingComment="startCreatingComment"/>
  </template>

</template>
