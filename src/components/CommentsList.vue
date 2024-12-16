<script setup>
import { deleteComment, getPostComments } from "@/api/comments";
import { ref, watch } from "vue";
import Comment from "./Comment.vue";
import NoCommentsMessage from "./NoCommentsMessage.vue";
import WriteCommentBtn from "./WriteCommentBtn.vue";
import PostLoader from "./PostLoader.vue";
import CommentForm from "./CommentForm.vue";

const props = defineProps({
  post: Object,
});
console.log("Comments LIST", props.post);
const isCommentCreating = ref(false);
const isLoading = ref(false);
const isError = ref("");

const startCreatingComment = () => {
  isCommentCreating.value = true;
};

const comments = ref([]);
console.log("comments", comments.value.filter(comment => comment.id === 24205));

const getComments = async () => {
  try {
    isLoading.value = true;
    comments.value = await getPostComments(props.post.id);
  } catch (error) {
    console.error("Error fetching comments", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteCommentHandler = async (commentId) => {
  comments.value = comments.value.filter((comment) => comment.id !== commentId);
  try {
    await deleteComment(commentId);
  } catch (error) {
    console.error("Failed deleting comments", error);
    isError.value = "Failed deleting comments";
  }
};

watch(getComments);
</script>

<template>
  <template v-if="comments.length">
    <PostLoader v-if="isLoading" />
    <template v-else>
      <Comment
        v-if="!isCommentCreating"
        :comments="comments"
        :deleteCommentHandler="deleteCommentHandler"
      />
      <CommentForm v-else />
    </template>
  </template>
  <template v-else>
    <div class="block">
      <NoCommentsMessage />
    </div>
  </template>
  <WriteCommentBtn
    v-if="!isCommentCreating"
    :startCreatingComment="startCreatingComment"
  />
</template>
