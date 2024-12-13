  <script setup>
import Input from './Input.vue';
import TextAreaField from './TextAreaField.vue';

  
  </script>
<template>
  <div class="content">

    <form>
      <Input 
      placeholder="Name Surname"
      label="Author Name"
      modelValue=""
      name="name"
      error=""
      type="text"


      />
      <Input 
      placeholder="Your email"
      label="Author Email"
      modelValue=""
      name="email"
      error=""
      type="email"


      />
      <TextAreaField 
      placeholder="Comment"
      label="Write Comment Body"
      modelValue=""
      name="body"
      error=""


      />

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">
            Add comment
          </button>
        </div>
        <div class="control">
          <button type="reset" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>