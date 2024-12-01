<script setup>
import { getPostComments } from "@/api/comments";
import AppComment from "./AppComment.vue";
import NoComments from "./NoComments.vue";
import WriteCommentBtn from "./WriteCommentBtn.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  post: Object,
});

const comments = ref([]);

const getComments = async () => {
  try {
    comments.value = await getPostComments(props.post.id);
    console.log(props.post);
  } catch (error) {
    console.error('Error fetching comments', error);
  }
};

onMounted(getComments);
</script>

<template>
  <template v-if="comments.length">
    <AppComment :comments="comments"/>
  </template>
  <template v-else>
    <NoComments />
  </template>


  <WriteCommentBtn/>
</template>
