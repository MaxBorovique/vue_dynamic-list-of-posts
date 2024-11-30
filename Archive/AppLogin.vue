<script setup>
import { getUsers } from "@/api/users";
import { onMounted, ref } from "vue";
import AppRegistration from "./AppRegistration.vue";

const props = defineProps({
  user: Object,
});

const emit = defineEmits(["update-user"]);
const authEmail = ref("");

function createAccount(newEmail) {
  emit("update-user", { ...props.user, email: newEmail });
}

const userList = ref([]);

const fetchUsers = async () => {
  try {
    const users = await getUsers();
    userList.value = users;
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchUsers);
</script>

<template>
  <section class="container is-flex is-justify-content-center">
    <form @submit.prevent="createAccount(authEmail)" class="box mt-5">
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

        <div v-if="user.email">
          <AppRegistration />
        </div>
      </div>

      <div class="field">
        <button type="submit" class="button is-primary">
          {{ user.email ? "Register" : "Login" }}
        </button>
      </div>
    </form>
  </section>
</template>
