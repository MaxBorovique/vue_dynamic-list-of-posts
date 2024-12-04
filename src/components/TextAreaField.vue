<script setup>

defineProps({
  title: String,
  placeholder: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue']);

const updateValue = event => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="field" data-cy="BodyField">
  <label class="label" htmlFor="{`comment-${name}`}"> {{ title }} </label>
  <div class="control">
    <textarea
      id="{`comment-${name}`}"
      name="name"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="textarea is-danger"
    ></textarea>
  </div>

  <p class="help is-danger" data-cy="ErrorMessage">error text</p>
</div>
</template>