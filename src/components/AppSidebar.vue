<script setup>
import { updatePost } from "@/api/posts";
import { inject, reactive, ref } from "vue";
import AddForm from "./AddForm.vue";
import PostPreview from "./PostPreview.vue";

defineProps({
  isPostDetails: Boolean,
  isEditing: Boolean,
});

const currentPost = inject('selectedPostDetails');
const isCreating = inject("isCreating");
const posts = inject("posts");
const isEditing = ref(false);

const postEditing = async(data) => {
  if(currentPost.value.title === data.title && currentPost.value.body === data.body) {
    return;
  }

  try {
    const {id, ...currentPostWithOutId} = currentPost.value;
    const updatedPost = await updatePost(id, data);
    const editedPost = posts.value.map(post => {
      if(post.id !== id) return post;
      
      return {
        ...post,
        ...currentPostWithOutId
      }
    });
    Object.assign(editedPost, updatedPost);
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to update the post', error)
  }
};

const handleUpdatePost = async(post) => {
currentPost.value = post;
isEditing.value = true;
};
</script>

<template>
  <div
    class="tile is-parent is-8-desktop Sidebar"
    :class="{ 'Sidebar--open': isCreating || isPostDetails }"
  >
    <div class="tile is-child box is-success">
      <div class="content">
        <template v-if="isCreating || isEditing">
          <AddForm
            :post="currentPost"
            :is-editing="isEditing"
            :selected-post="selectedPostDetails"
            @update="postEditing"
            @cancel="cancelEditing"
          />
        </template>
        

        <template v-if="isPostDetails">
          <PostPreview :post="currentPost" @update="handleUpdatePost"  :is-post-details="isPostDetails" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }
}

.Sidebar--open {
  opacity: 1;

  @media (min-width: 769px) {
    max-width: 50%;
  }
}
</style>
