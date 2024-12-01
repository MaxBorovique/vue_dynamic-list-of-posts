<script setup>
defineProps({
  startCreatingComment: Function,
})
</script>

<template>
  <button @click="startCreatingComment" type="button" class="button is-link">Write a comment</button>

</template>