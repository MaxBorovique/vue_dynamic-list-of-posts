<script setup>
import { provide } from 'vue';
import { ref } from 'vue';

import { router } from "../routes";
import { onMounted } from "vue";

const isAuthorized = ref(false);
const currentUser = ref({});

function authCheck() {

  if (!isAuthorized.value) {
    router.push("Login");
  } else {
    isAuthorized.value = true;
    router.push("Dashboard");
  }
}

onMounted(authCheck);
provide('currentUser', currentUser);
</script>

<template>
  <router-view></router-view>
</template>
