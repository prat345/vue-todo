<script setup lang="ts">
import TheCarousel from '../components/TheCarousel.vue'
import ProductsCatalog from '../components/ProductsCatalog.vue'
import AntTable from '@/components/AntTable.vue'
</script>

<template>
  <main>
    <the-carousel />
    <!-- <products-catalog /> -->
    <!-- <router-link :to="{ name: 'tran', params: { id: 1, type: 1, ref: 'aega' } }">goto </router-link> -->
    <p class="flex gap-6">
      <!-- <router-link
        :to="{ name: 'tran', params: { vid: 5 }, query: { id: 1, type: 1, ref: 'aega' } }"
        >query</router-link
      > -->
      <router-link :to="{ name: 'tran', params: { vid: 5, id: 1, type: 1, ref: 'aega' } }"
        >params
      </router-link>
    </p>
    <ant-table />
  </main>
</template>
