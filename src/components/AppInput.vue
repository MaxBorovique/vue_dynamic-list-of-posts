<script setup>
defineProps({
modelValue: String,
placeholder: String,
title: String,
})

const emit = defineEmits(['update:modelValue']);

const updateValue = event => {
  emit('update:modelValue', event.target.value)
}

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
      class="input is-danger"
    />
  </div>
</div>
</template>