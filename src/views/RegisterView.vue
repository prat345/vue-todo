<template>
  <main class="login">
    <section class="forms">
      <form action="" @submit.prevent="userStore.register(registerForm)" class="register">
        <h2>register</h2>
        <input type="email" placeholder="email address" v-model="registerForm.email" />
        <input type="password" placeholder="password" v-model="registerForm.password" />
        <button class="button">Sign up</button>
      </form>

      <form action="" @submit.prevent="userStore.login(loginForm)" class="login">
        <h2>login</h2>
        <input type="email" placeholder="email address" v-model="loginForm.email" />
        <input type="password" placeholder="password" v-model="loginForm.password" />
        <button class="button">Sign in</button>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import type { User } from '../stores/user'

const loginForm = ref<Partial<User>>({})
const registerForm = ref<Partial<User>>({})

const userStore = useUserStore()
</script>

<style scoped>
.forms {
  @apply flex min-h-80 flex-wrap;
}

form {
  flex: 1 1 0%;
  padding: 4rem 0;
  @apply flex flex-col items-center justify-center gap-y-6;
}
h2 {
  font-size: 2rem;
  text-transform: uppercase;
}
.button {
  @apply bg-black text-white;
}
.dark .button {
  @apply bg-white text-black;
}
</style>
