<template>
  <div class="flex min-h-80 flex-col items-center justify-center gap-y-4">
    <h1>Welcome</h1>
    <h2 class="mb-8 text-4xl">{{ user.email }}</h2>
    <button class="button bg-stone-300" @click="userStore.logout">log out</button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '../stores/user'
import { computed, onBeforeMount } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)

onBeforeMount(() => {
  console.log(user.value)
})
</script>

<style></style>
