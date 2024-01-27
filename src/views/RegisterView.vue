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
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 0 4rem;
  @apply flex flex-col items-center justify-center gap-y-6;
}

form.register {
  color: #fff;
  background-color: #000;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type='submit']) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type='submit']) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.register input:not([type='submit']) {
  color: #fff;
  border-bottom: 2px solid #fff;
}

form.login input:not([type='submit']) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login button {
  background-color: #000;
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

form.register button {
  background-color: #fff;
  color: #000;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
