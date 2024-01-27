<template>
  <nav class="!m-0 !p-0">
    <ul class="flex justify-center border-b border-stone-300">
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
  </nav>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

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
