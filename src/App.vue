<script>
import { getPosts } from "../api/api";
import Header from "./components/Header.vue";
import PostList from "./components/PostList.vue";
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    Header,
    PostList,
    SideBar,
  },
  data() {
    return {
      posts: [],
      errorMessage: "",
      isLoading: false,
      isVisible: false,
    };
  },
  methods: {
    handler() {
      isVisible: true;
    }
  },
  mounted() {
    isLoading: true;
    getPosts()
      .then(({ data }) => (this.posts = data))
      .catch(() => {
        this.errorMessage = "Unable to load a Posts";
      });
    isLoading: false;
  },
};
</script>

<template>
  <Header/>
  <PostList :posts="posts" :handler="handler"/>
  <SideBar  :isVisible="isVisible"/> 
</template>
