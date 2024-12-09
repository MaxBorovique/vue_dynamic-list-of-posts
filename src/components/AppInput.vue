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
        :value="modelValue"
        @input="updateValue"
        type="text"
        :name="name"
        :id="`comment-author-name-${name}`"
        :placeholder="placeholder"
        class="input"
        :class="is-danger"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>

      <span
        v-if="isError"
        class="icon is-small is-right has-text-danger"
        data-cy="ErrorIcon"
      >
        <i className="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="isError" class="help" :class="{'is-danger': isError}" data-cy="{{ isError }}">error text</p>
  </div>
</template>
