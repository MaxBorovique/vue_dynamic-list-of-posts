<script setup>
import { inject, onMounted, reactive, ref } from "vue";
import PostLoader from "./PostLoader.vue";
import Posts from "./Posts.vue";
import { router } from "../../routes.js";
import { createPost, deletePost, userPosts } from "@/api/posts";
import Sidebar from "./Sidebar.vue";
import PostForm from "./PostForm.vue";
import PostPreview from "./PostPreview.vue";

const posts = ref([]);
const selectedPost = ref({});
const isSidebarOpen = ref(false);
const isError = ref("");
const isLoading = ref(false);
const formState = reactive({
  creating: false,
  editing: false,
  preview: false,
});
const user = inject("existingUser");

const getPosts = async () => {
  if (!user.value) {
    router.push("/login");
    return;
  }
  isLoading.value = true;
  try {
    posts.value = await userPosts(user.value.id);
    isLoading.value = false;
  } catch (error) {
    isError.value = "Failed to fetch posts";
  } finally {
    isLoading.value = false;
  }
};

// HANDLERS
const creatingPostHandler = () => {
  formState.preview = false;
  isSidebarOpen.value = true;
  formState.creating = true;
  formState.editing = false;
};

const sidebarCloser = () => {
  isSidebarOpen.value = false;
  formState.editing = false;
  selectedPost.value = {};
};

const postSelection = (post) => {
  if (selectedPost.value?.id === post.id) {
    sidebarCloser();
    return;
  }
  formState.creating = false;
  formState.preview = true;
  isSidebarOpen.value = true;
  selectedPost.value = post;
};

// LOGIC

const createNewPost = async (data) => {
  try {
    const payload = {
      userId: user.value.id,
      ...data,
    };

    posts.value.push(payload);
    const newPost = await createPost(payload);
    selectedPost.value = newPost;
    formState.creating = false;
    formState.preview = true;
  } catch (error) {
    console.error("Failed to create new post", error);
    isError.value = "Failed to create new post";
  }
};

const deletePostHandler = async (postId) => {
  try {
    posts.value = posts.value.filter((post) => post.id !== postId);
    sidebarCloser();
    await deletePost(postId);
  } catch (error) {
    console.error("Failed deleting comments", error);
  }
};

//

// FIXME (this is those part that was in sidebar)

// const postEditing = async(data) => {
//   if(currentPost.value.title === data.title && currentPost.value.body === data.body) {
//     return;
//   }

//   try {
//     const {id, ...currentPostWithOutId} = currentPost.value;
//     const updatedPost = await updatePost(id, data);
//     const editedPost = posts.value.map(post => {
//       if(post.id !== id) return post;

//       return {
//         ...post,
//         ...currentPostWithOutId
//       }
//     });
//     Object.assign(editedPost, updatedPost);
//     isEditing.value = false;
//   } catch (error) {
//     console.error('Failed to update the post', error)
//   }
// };

// const handleUpdatePost = async(post) => {
// currentPost.value = post;
// isEditing.value = true;
// };

// TODO INPUT LOGIC
// const props = defineProps({
//   isEditing: Boolean,
//   post: Object,
// });

// const user = ref(JSON.parse(localStorage.getItem("user")));
// const detailsOpen = inject("detailsHandler");
// const emit = defineEmits(['update']);

// // const updateNewPost = async (postId) => {

// // try {
// //   const payload = {
// //     userId: user.value.id,
// //     title: formData.title,
// //     body: formData.body,
// //     authorEmail: formData.authorEmail || null,
// //   };

// //   const newPost = await updatePost(postId ,payload);

// //   formData.body = "";
// //   formData.title = "";
// //   formData.authorEmail = "";

// //   detailsOpen();

// //   return newPost;
// // } catch (error) {
// //   console.error("Failed to create the post", error);
// // }
// // };

//
// };

onMounted(async () => {
  await getPosts();
});
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box is-success">
            <div class="block">
              <div class="block is-flex is-justify-content-space-between">
                <p class="title">Posts</p>
                <button
                  @click="creatingPostHandler"
                  type="button"
                  class="button is-link"
                  :class="{ 'is-light': formState.creating }"
                >
                  Add New Post
                </button>
              </div>

              <PostLoader v-if="isLoading" />

              <section
                class="is-flex is-justify-content-center"
                v-else-if="isError"
              >
                <p>{{ isError }}</p>
              </section>

              <Posts
                v-else
                :posts="posts"
                :postSelection="postSelection"
                :selected-post="selectedPost"
              />
            </div>
          </div>
        </div>
        <Transition name="sidebar">
          <Sidebar v-if="isSidebarOpen" :isSidebarOpen="isSidebarOpen">
            <PostForm
              v-if="formState.creating"
              buttonText="Create"
              @createPost="createNewPost($event)"
              @close="sidebarCloser"
              title="Create new post"
            />

            <PostForm
              v-if="formState.editing"
              buttonText="Save"
              title="Post editing"
            />

            <PostPreview
              v-if="formState.preview"
              :deletePostHandler="deletePostHandler"
              :selected-post="selectedPost"
            />
          </Sidebar>
        </Transition>
      </div>
    </div>
  </main>
</template>
<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.5s ease-in-out;
  max-width: 0;
  opacity: 0;
}

.sidebar-enter-to,
.sidebar-leave-from {
  max-width: 50%;
  opacity: 1;
}

@media (max-width: 768px) {
  .sidebar-enter-active,
  .sidebar-leave-active {
    transition: all 0.5s ease-in-out;
    transform: translateX(100%);
  }

  .sidebar-enter-to,
  .sidebar-leave-from {
    transform: translateX(0);
  }
}
</style>