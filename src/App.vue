<script setup>
import { router } from "../routes";
import { onMounted, ref } from "vue";

const isAuthorized = ref(true);

function authCheck() {

  if (!isAuthorized.value) {
    router.push("Login");
  } else {
    router.push("Dashboard");
  }
}

onMounted(authCheck);
</script>

<template>
  <router-view></router-view>
</template>
