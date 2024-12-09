<script setup>
import { ref } from 'vue';


defineProps({
  title: String,
  placeholder: String,
  modelValue: String,
});

const isError = ref('');

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
      class="textarea"
      :class="{'is-danger': isError}"
    ></textarea>
  </div>

  <p class="help" :class="{'is-danger': isError}" data-cy="ErrorMessage">{{ isError }}</p>
</div>
</template>