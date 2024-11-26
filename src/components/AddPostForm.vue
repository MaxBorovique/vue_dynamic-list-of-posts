<script setup>
import AppInput from './AppInput.vue';
import TextAreaField from './TextAreaField.vue';
</script>

<template>
  <div class="content">
  <h2>title</h2>

  <form>
     <AppInput />
     <TextAreaField />

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Save</button>
      </div>
      <div class="control">
        <button type="reset" class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</div>

</template>