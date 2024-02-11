<script setup lang="ts">
import { toRefs } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: new Object()
  }
})
const emit = defineEmits(['delete-item'])
const handleDeleteItem = (id: number) => {
  emit('delete-item', id)
}
</script>

<template>
  <section>
    <div class="my-2 flex w-full justify-center gap-x-6 border p-4">
      <span>{{ props.product.id }}</span>
      <span>{{ props.product.name }}</span>
      <button @click="handleDeleteItem(props.product.id)">delete</button>
    </div>
  </section>
</template>

<style></style>
