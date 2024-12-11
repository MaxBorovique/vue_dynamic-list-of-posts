<script setup>
import { inject } from "vue";
import AppComments from "./AppComments.vue";
import { computed } from "vue";

defineProps({
  isPostDetails: Boolean,
});

const selectedPostDetails = inject('selectedPostDetails');

const hasPostDetails = computed(() => 
  selectedPostDetails.value && selectedPostDetails.value.id
)

const deletePostHandler = inject('deletePostHandler');
const updateNewPost = inject('updateNewPost');
</script>

<template>
  <div v-if="hasPostDetails" class="block" :key="selectedPostDetails.id">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ selectedPostDetails.id }}: {{ selectedPostDetails.title }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i @click="updateNewPost(selectedPostDetails.id)" class="fas fa-pen-to-square"></i>
        </span>
        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i @click="deletePostHandler(selectedPostDetails.id)" class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ selectedPostDetails.body }}</p>
    <div>
      <AppComments :post="selectedPostDetails" />
    </div>
  </div>
</template>
