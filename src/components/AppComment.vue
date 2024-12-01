<script setup>
const props = defineProps({
  comments: Array,
})

console.log(props.comments);
</script>
<template>
  <article class="message is-small" v-for="comment in comments" :key="comment.id">
  <div class="message-header">
    <a href="{`mailto:${email}`}"> name </a>
    <button type="button" class="delete is-small" aria-label="delete">
      delete button
    </button>
  </div>
  <div class="message-body">el body</div>
</article>

</template>