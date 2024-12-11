<script setup>
import { inject, provide, reactive, ref } from "vue";
import AppInput from "./AppInput.vue";
import TextAreaField from "./TextAreaField.vue";
import { createPost, updatePost } from "@/api/posts";
import { createComment } from "@/api/comments";

const creatingToggle = inject("creatingPostHandler");
const isCreating = inject("isCreating");
const selectedPostId = inject('selectedPostId');

defineProps({
  isEditing: Boolean,
})

const inputInfo = reactive({
  title: "Author Name",
  secondTitle: "Author Email",
  textAreaTitle: "Write Comment Body",
  buttonText: "Add Comment",
  firstPlaceholder: "Name Surname",
  secondPlaceholder: "Your Email",
  lastPlaceholder: "Comment",
});

const formData = reactive({
  userId: "",
  title: "",
  body: "",
  authorEmail: "",
});

const user = ref(JSON.parse(localStorage.getItem("user")));
const detailsOpen = inject("detailsHandler");

const createNewPost = async () => {
  try {
    const payload = {
      userId: user.value.id,
      title: formData.title,
      body: formData.body,
      authorEmail: formData.authorEmail || null,
    };

    const newPost = await createPost(payload);

    formData.body = "";
    formData.title = "";
    formData.authorEmail = "";

    detailsOpen();

    return newPost;
  } catch (error) {
    console.error("Failed to create the post", error);
  }
};

const updateNewPost = async (postId) => {

try {
  const payload = {
    userId: user.value.id,
    title: formData.title,
    body: formData.body,
    authorEmail: formData.authorEmail || null,
  };

  const newPost = await updatePost(postId ,payload);

  formData.body = "";
  formData.title = "";
  formData.authorEmail = "";

  detailsOpen();

  return newPost;
} catch (error) {
  console.error("Failed to create the post", error);
}
};




const createNewComment = async () => {
  try {
    const payload = {
      postId: selectedPostId.value,
      name: formData.title,
      body: formData.body,
      email: formData.authorEmail || null,
    };

    const newComment = await createComment(payload);

    formData.body = "";
    formData.title = "";
    formData.authorEmail = "";

    return newComment;
  } catch (error) {
    console.error("Failed to create the comment", error);
  }
};

const submitToggle = () => {
  if (isCreating.value) {
    createNewPost();
  } else {
    createNewComment();
  }
};

provide('updateNewPost', updateNewPost);

</script>

<template>
  <div class="content">
    <h2 v-if="isCreating">{{ isCreating ? "Create new post" : "" }}</h2>

    <form @submit.prevent="submitToggle">
      <AppInput
        v-model="formData.title"
        :placeholder="isCreating ? 'Post title' : inputInfo.firstPlaceholder"
        :title="isCreating ? 'Title' : inputInfo.firstPlaceholder"
      />

      <AppInput
        v-model="formData.authorEmail"
        :placeholder="inputInfo.secondPlaceholder"
        :title="inputInfo.secondPlaceholder"
        v-if="!isCreating"
      />

      <TextAreaField
        v-model="formData.body"
        :title="isCreating ? 'Write Post Body' : inputInfo.textAreaTitle"
        :placeholder="isCreating ? 'Post Body' : inputInfo.lastPlaceholder"
      />

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">
            {{ isCreating ? "Create" : inputInfo.buttonText }}
          </button>
        </div>
        <div class="control">
          <button
            @click="creatingToggle"
            type="reset"
            class="button is-link is-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
