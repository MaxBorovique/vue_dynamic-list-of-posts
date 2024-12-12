<script setup>
import { getPostComments } from "@/api/comments";
import { onMounted, ref } from "vue";
import Comment from "./Comment.vue";
import NoCommentsMessage from "./NoCommentsMessage.vue";
import Input from "./Input.vue";


const props = defineProps({
  post: Object,
});

const isCommentCreating = ref(false);

const startCreatingComment = () => {
  isCommentCreating.value = true;
}

const comments = ref([]);

const getComments = async () => {
  try {
    comments.value = await getPostComments(props.post.id);
  } catch (error) {
    console.error('Error fetching comments', error);
  }
};

onMounted(getComments);
</script>

<template>
  <template v-if="comments.length">
    <Comment v-if="!isCommentCreating" :comments="comments"/>
  </template>
  <template v-else>
    <NoCommentsMessage />
  </template>

  <AppForm  v-if="isCommentCreating">
    <Input />
  </AppForm>


  <WriteCommentBtn v-if="!isCommentCreating" :startCreatingComment="startCreatingComment"/>
</template>
