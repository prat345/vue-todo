<template>
  <div>
    <product-list
      v-for="product in products"
      :product="product"
      :key="product.id"
      @delete-item="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductList from './ProductList.vue'

const products = ref([
  { id: 1, name: 'Shoes' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Watch' },
  { id: 4, name: 'Laptop' }
])

const deleteItem = (id: number) => {
  products.value = products.value.filter((product) => product.id !== id)
}
</script>

<style></style>
