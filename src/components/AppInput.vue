<script setup>
import { ref } from "vue";

defineProps({
  modelValue: String,
  placeholder: String,
  title: String,
});

const isError = ref("");

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="field" data-cy="NameField">
    <label class="label" :for="`comment-author-name-${modelValue}`">
      {{ title }}
    </label>
    <div class="control has-icons-left has-icons-right">
      <input
        :isError="isError"
        :value="modelValue"
        @input="updateValue"
        type="text"
        :name="name"
        :id="`comment-author-name-${name}`"
        :placeholder="placeholder"
        class="input is-danger"
      />
      <span className="icon is-small is-left">
        <i className="fas fa-user"></i>
      </span>

      <span
        className="icon is-small is-right has-text-danger"
        data-cy="ErrorIcon"
      >
        <i className="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p className="help is-danger" data-cy="ErrorMessage">error text</p>
  </div>
</template>
