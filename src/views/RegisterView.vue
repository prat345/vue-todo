<script lang="ts" setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useUserStore } from '../stores/user'
import type { User } from '../stores/user'
import RegisterForm from '../components/RegisterForm.vue'

// const loginForm = ref<Partial<User>>({})
// const registerForm = ref<Partial<User>>({})

const userStore = useUserStore()
const registerComponent = ref()
const formData = ref<Partial<User>>({})
// onBeforeMount(() => {
//   if (registerComponent.value) {
//     formData.value = registerComponent.value.getFormData()
//   }
// })

// watchEffect(() => {
//   if (registerComponent.value) {
//     formData.value = registerComponent.value.getFormData()
//   }
// })

const getFormData = (value: any) => {
  formData.value = value
}

const handleLogin = () => {
  userStore.login(formData.value)
}
</script>

<template>
  <main class="login flex min-h-screen flex-col items-center justify-center gap-12">
    <!--  <section class="forms">
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
    </section>-->
    <RegisterForm
      ref="registerComponent"
      v-model:email="formData.email"
      v-model:password="formData.password"
    />
    <div>
      <h1>Parent</h1>
      <div>
        <div class="mb-3">
          <input type="text" v-model="formData.email" />
        </div>
        <div class="mb-3">
          <input type="text" v-model="formData.password" />
        </div>
      </div>
    </div>
    <button @click="handleLogin" class="button">log in</button>
  </main>
</template>

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
