<template>
  <section class="container">
    <div class="flex flex-col items-center justify-center">
      <h1>Edit task</h1>
      <div class="container w-1/2">
        <div class="form-control">
          <span>id:</span
          ><span class="col-span-5"
            ><input type="text" :value="task?._id" :disabled="true" class="w-full"
          /></span>
        </div>
        <div class="form-control">
          <span>task:</span
          ><span class="col-span-5"
            ><input
              type="text"
              v-model="newTask"
              @click="isTouched = true"
              :disabled="false"
              class="w-full"
            />
            <p v-if="!isValid.status && isTouched" class="ml-2 text-red-500">
              {{ isValid.message }}
            </p></span
          >
        </div>

        <div class="form-control">
          <span>date:</span
          ><span class="col-span-5"
            ><input type="date" :disabled="false" v-model="date" class="w-full"
          /></span>
        </div>

        <div class="form-control">
          <label for="status">Status</label>
          <div class="col-span-5 flex flex-wrap gap-x-2">
            <input type="radio" v-model="status" name="status" :value="true" />
            <label for="done">Done</label>

            <input type="radio" v-model="status" name="status" :value="false" />
            <label for="undone">Undone</label>
          </div>
        </div>
        <div class="form-control">
          <label for="skills">Skills</label>
          <div class="col-span-5 flex flex-wrap gap-x-2">
            <input type="checkbox" id="react" v-model="skills" value="react" />
            <label for="react">React</label>

            <input type="checkbox" id="vue" v-model="skills" value="vue" />
            <label for="vue">Vue</label>

            <input type="checkbox" id="angular" v-model="skills" value="angular" />
            <label for="angular">Angular</label>

            <input type="checkbox" id="node" v-model="skills" value="node" />
            <label for="node">Node</label>

            <input type="checkbox" id="javascript" v-model="skills" value="javascript" />
            <label for="javascript">JavaScript</label>
          </div>
        </div>

        <button
          @click="editTask(task?._id, task?.task)"
          class="button w-full bg-stone-300 text-center"
          :disabled="!isValid.status"
        >
          update
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

const fetchTask = todoStore.fetchTask
const allTasks = computed(() => todoStore.allTasks)
const task = computed(() => allTasks.value.find((task) => task._id === route.params.id))
const newTask = ref(task.value?.task)
const date = ref(task.value?.date)
const status = ref(task.value?.status)
const skills = ref(task.value?.skills)
const isTouched = ref(false)

const formData = computed(() => ({
  task: newTask.value,
  date: date.value,
  status: status.value,
  skills: skills.value
}))

const isValid = computed(() =>
  newTask.value
    ? task.value?.task === newTask.value
      ? { status: false, message: 'New task must be different from current task' }
      : newTask.value?.length < 3
        ? { status: false, message: 'Must contain at least 3 characters' }
        : { status: true, message: 'pass' }
    : { status: true, message: 'no input' }
)

onMounted(fetchTask)

const editTask = async (_id: string | undefined, task: string | undefined) => {
  try {
    // const newUpdateTask = newTask.value
    const { data } = await axios.put(`http://localhost:5000/todo/update/${_id}`, {
      formData: formData.value
    })
    fetchTask()
    console.log(`edit ${task} to ${data.task}`)
  } catch (err) {
    console.log((err as Error).message)
  }
  router.push({ name: 'todo_list' })
}
</script>

<style scoped>
.form-control {
  @apply mb-3 grid grid-cols-6;
}
</style>
