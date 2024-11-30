<script setup>
import { provide, ref } from 'vue';

const exsistingUser = ref(JSON.parse(localStorage.getItem('user')));
provide('exsistingUser', exsistingUser)
</script>

<template>
  <router-view></router-view>
</template>
