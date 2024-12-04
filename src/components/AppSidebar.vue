<script setup>
import { inject } from "vue";
import AddForm from "./AddForm.vue";
import PostPreview from "./PostPreview.vue";

defineProps({
  isPostDetails: Boolean,
});

const isCreating = inject('isCreating');

</script>

<template>
  <div
    class="tile is-parent is-8-desktop Sidebar"
    :class="{ 'Sidebar--open': isCreating || isPostDetails}"
  >
    <div class="tile is-child box is-success">
        <div class="content">
          <template v-if="isCreating">
            <AddForm/>
          </template>

          <template v-if="isPostDetails">
            <PostPreview />
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
