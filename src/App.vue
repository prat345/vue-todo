<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

import { onBeforeMount } from 'vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.fetchUser()
})
</script>

<template>
  <div>
    <header>
      <nav-bar />
    </header>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
