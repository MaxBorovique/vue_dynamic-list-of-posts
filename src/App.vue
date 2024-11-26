<script setup>
import { reactive, ref } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppSidebar from "./components/AppSidebar.vue";
import PostList from "./components/PostList.vue";
import AppLogin from "./components/AppLogin.vue";

const posts = ref([]);
const isCreating = ref(false);
const user = reactive({
  email: null,
  name: 'Maks', 
  authStatus: true,
  userPosts: {
    title: '',
    body: '',
  }
});

const creatingPostHandler = () => {
  isCreating.value = !isCreating.value;
  console.log(isCreating.value);
}

const logoutHandler = () => {
  user.email = '';
  user.authStatus = false;
};

</script>

<template>
  <template v-if="!user.authStatus">
    <AppLogin :user="user" @update-user="(updatedUser) => Object.assign(user, updatedUser)" />
    </template>

  <div v-else>
    <AppHeader :user="user" :logoutHandler="logoutHandler"/>
    <main>
      <PostList :creatingPostHandler="creatingPostHandler" :posts="posts" />
      <AppSidebar :is-creating="isCreating"/>
    </main>
  </div>
</template>


<style>
main {
  display: flex;
  justify-content: center; 
  align-items: center;
}
</style>