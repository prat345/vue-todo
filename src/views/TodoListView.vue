<template>
  <section class="container">
    <new-task-form />

    <section>
      <h1 class="text-center">Todo list</h1>
      <div class="form-control flex justify-between">
        <div class="flex items-center gap-x-2 pl-4">
          <input @click="toggleSelectAll" class="bg-stone-200" type="checkbox" />
          <span>{{ selectedTasks.length }}/{{ countTasks }}</span>
        </div>
        <div class="flex items-center gap-x-2">
          <button
            @click="todoStore.setShowModal(true)"
            class="button flex !h-8 !w-8 items-center justify-center !rounded-full border border-black"
          >
            <span><font-awesome-icon :icon="['fas', 'plus']" /></span>
          </button>

          <button @click="deleteSelectedTask" class="button bg-black text-white">
            delete selected
          </button>
        </div>
      </div>
      <ul>
        <li v-for="(task, idx) in allTasks" :key="idx" class="task-list">
          <span
            ><input
              type="checkbox"
              :value="task._id"
              v-model="selectedTasks"
              :checked="selectedTasks.includes(task._id)"
              class="col-span-1"
          /></span>
          <span class="col-span-2 text-lg">{{ task.task }}</span>
          <span class="col-span-2">{{ task.date }}</span>
          <span class="col-span-2 text-center"
            ><span :class="['pills', task.status ? 'success' : 'danger']">{{
              task.status ? 'Finished' : 'On going'
            }}</span></span
          >
          <span class="col-span-3"
            ><ul class="flex flex-wrap justify-center gap-x-2 gap-y-1">
              <li
                v-for="(skill, idx) in task.skills"
                :key="idx"
                class="pills bg-stone-200 text-stone-500"
              >
                {{ skill }}
              </li>
            </ul></span
          >
          <div class="col-span-2 flex gap-x-2">
            <span
              ><button @click="editTask(task._id, task.task)" class="button bg-slate-300">
                edit
              </button></span
            >
            <span
              ><button @click="deleteTask(task._id)" class="button bg-red-500 text-white">
                delete
              </button></span
            >
          </div>
        </li>
      </ul>
    </section>

    <pagination-and-page-size />
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useTodoStore } from '../stores/todo'

import PaginationAndPageSize from '../components/PaginationAndPageSize.vue'
import NewTaskForm from '../components/NewTaskForm.vue'

// const allTasks = ref([])

const selectedTasks = ref([])
const isSelectAll = ref(false)

const router = useRouter()
const todoStore = useTodoStore()

const fetchTask = todoStore.fetchTask
const allTasks = computed(() => todoStore.allTasks)
const countTasks = computed(() => todoStore.countTasks)

onMounted(fetchTask)

const deleteTask = async (_id: string) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/todo/delete/${_id}`)
    fetchTask()
    console.log('deleted: ', data.task)
  } catch (err) {
    console.log(err.message)
  }
}

const editTask = async (_id: string, task: string) => {
  router.push({ name: 'task_view', params: { id: _id } })
}

const deleteSelectedTask = async () => {
  try {
    const { data } = await axios.post(`http://localhost:5000/todo/delete_selected/`, {
      selectedTasks: selectedTasks.value
    })
    fetchTask()
    selectedTasks.value = []
    console.log(`deleted ${data.result} tasks`)
  } catch (err) {
    console.log(err.message)
  }
}

const toggleSelectAll = () => {
  // selectedTasks.value = allTasks.value.map((task) => task._id)
  isSelectAll.value = !isSelectAll.value
  selectedAllTask()
}
const selectedAllTask = () => {
  selectedTasks.value = isSelectAll.value ? allTasks.value.map((task) => task._id) : []
  console.log(selectedTasks)
}
</script>

<style scoped>
.form-control {
  @apply mb-3;
}
li.task-list {
  @apply mb-4 grid grid-cols-12 items-center bg-white px-4 py-6 shadow-md;
}
.pills {
  @apply rounded-lg px-2 text-sm;
}
.pills.success {
  @apply border border-green-700 bg-green-200 text-green-700;
}
.pills.danger {
  @apply border border-red-700 bg-red-200 text-red-700;
}
</style>
