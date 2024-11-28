<script setup>
import AppRegistration from "@/components/AppRegistration.vue";



</script>

<template>
  <section class="container is-flex is-justify-content-center">
    <form  class="box mt-5">
      <h1 class="title is-3">You need to register</h1>

      <div class="field">
        <label class="label" htmlFor="user-email"> Email </label>

        <div class="control has-icons-left">
          <input
            type="email"
            id="user-email"
            name="email"
            class="input"
            placeholder="Enter your email"
            required
            v-model="authEmail"
          />

          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </div>

        <p class="help is-danger">error message</p>

        <div>
          <AppRegistration />
        </div>
      </div>

      <div class="field">
        <button type="submit" class="button is-primary">
          {{ true ? "Register" : "Login" }}
        </button>
      </div>
    </form>
  </section>
</template>
