<template>
  <div class="border-b border-stone-300">
    <nav class="container mx-auto flex py-0">
      <ul class="flex justify-center">
        <li>
          <RouterLink to="/" :class="['nav-item', isActive('/')]">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/todo" :class="['nav-item', isActive('/todo')]">Todo</RouterLink>
        </li>
        <li>
          <RouterLink to="/register" :class="['nav-item', isActive('/register')]"
            >Register</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/profile" :class="['nav-item', isActive('/profile')]">Profile</RouterLink>
        </li>
      </ul>
      <div class="ml-auto flex items-center justify-center gap-x-2">
        <label for=""> {{ isDark ? 'Night' : 'Day' }}</label>
        <input-switch @click="toggleDark" v-model="isDark" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

const isDark = ref(useDark())
const toggleDark = useToggle(isDark.value)

const route = useRoute()

const isActive = (currentPath: string) => {
  // console.log(route.path, currentPath)
  return route.path === currentPath ? 'active' : ''
}
</script>

<style scoped>
.active {
  @apply border-b-4 border-gray-500 font-medium;
}
.nav-item {
  @apply block p-5 hover:border-b-4 hover:border-gray-300;
}
</style>
