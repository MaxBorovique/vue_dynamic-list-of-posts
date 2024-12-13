<script setup>
import TextAreaField from "./TextAreaField.vue";
import Input from "./Input.vue";
import { reactive } from "vue";

defineProps({
  title: String,
  buttonText: String,
});

const emit = defineEmits(["createPost", "updatePost", "close"]);

const formData = reactive({
  title: "",
  body: "",
  titleError: "",
  bodyError: "",
});

const error = reactive({
  title: "",
  body: "",
});

const formAction = () => {
  const { title, body } = formData;


  // TODO add consts and change to if
  error.title = title ? "" : "Title is required";
  error.body = body ? "" : "Body is required";

  if (title || body) {
    emit("createPost", formData);
  }
};
</script>

<template>
  <div class="content">
    <h2>{{ title }}</h2>

    <form @reset="emit('close')" @submit.prevent="formAction($event)">
      <Input :error='error.title' label="Title" name="title" v-model="formData.title" />

      <TextAreaField
        label="Write Post Body"
        name="body"
        :error="error.body"
        v-model="formData.body"
      />

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">
            {{ buttonText }}
          </button>
        </div>
        <div class="control">
          <button type="reset" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>
