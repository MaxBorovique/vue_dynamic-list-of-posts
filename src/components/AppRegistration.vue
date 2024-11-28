<script setup>
import { ref } from 'vue';

const authName = ref('');

</script>
<template>
  <div class="field">
  <label class="label" htmlFor="user-name"> Your Name </label>


      <div class="control has-icons-left">
    <input
      type="text"
      id="user-name"
      name="name"
      class="input"
      placeholder="Enter your name"
      required
      minlength="{4}"
      v-model="authName"
    />

    <span class="icon is-small is-left">
      <i class="fas fa-user" />
    </span>
  </div>

  <p class="help is-danger">error message</p>
</div>
</template>