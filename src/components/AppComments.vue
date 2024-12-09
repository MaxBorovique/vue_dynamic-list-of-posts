<script setup>
import { getPostComments } from "@/api/comments";
import AppComment from "./AppComment.vue";
import NoComments from "./NoComments.vue";
import WriteCommentBtn from "./WriteCommentBtn.vue";
import AppForm from './AddForm.vue';
import { onMounted, ref } from "vue";
import AppInput from "./AppInput.vue";

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
    <AppComment v-if="!isCommentCreating" :comments="comments"/>
  </template>
  <template v-else>
    <NoComments />
  </template>

  <AppForm  v-if="isCommentCreating">
    <AppInput />
  </AppForm>


  <WriteCommentBtn v-if="!isCommentCreating" :startCreatingComment="startCreatingComment"/>
</template>
