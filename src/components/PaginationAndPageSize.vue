<template>
  <section>
    <div class="flex justify-between">
      <select name="page-size" id="" @change="handleSetPageSize">
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="7">7</option>
      </select>

      <ul class="pagination flex gap-x-2">
        <li>
          <button @click="handleSetCurrentPage(1)" :disabled="currentPage === 1">
            {{ '<<' }}
          </button>
        </li>
        <li>
          <button @click="handleSetCurrentPage(currentPage - 1)" :disabled="currentPage === 1">
            {{ '<' }}
          </button>
        </li>
        <li v-for="num in pageArr" :key="num">
          <button @click="handleSetCurrentPage(num)" :class="currentPage === num ? 'active' : ''">
            {{ num }}
          </button>
        </li>
        <button
          @click="handleSetCurrentPage(currentPage + 1)"
          :disabled="currentPage === countPages"
        >
          {{ '>' }}
        </button>
        <button @click="handleSetCurrentPage(pageArr.pop())" :disabled="currentPage === countPages">
          {{ '>>' }}
        </button>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'
import { computed } from 'vue'
import { getPagination } from '../utils/pagination'

const router = useRouter()
const todoStore = useTodoStore()

const fetchTask = todoStore.fetchTask

const currentPage = computed(() => todoStore.currentPage)
const countPages = computed(() => todoStore.countPages)
const pageArr = computed<(number | string)[]>(() => {
  return getPagination(currentPage.value, countPages.value)
})

const handleSetCurrentPage = (num: number | string | undefined) => {
  let nextPage: number
  if (typeof num !== 'number') {
    nextPage = Math.ceil((countPages.value - currentPage.value) / 2) + currentPage.value
  } else {
    nextPage = num
  }
  router.push({ query: { page: nextPage } })
  todoStore.setCurrentPage(nextPage)
  fetchTask()
}

const handleSetPageSize = (e: Event) => {
  const target = e.target as HTMLSelectElement
  todoStore.setPageSize(+target.value)
  fetchTask()
}
</script>

<style scoped>
ul.pagination > li button {
  @apply flex h-8 w-8 cursor-pointer items-center justify-center rounded-full;
}
ul.pagination > li button.active {
  @apply bg-black text-white;
}
button:disabled {
  @apply text-stone-300;
}
</style>
