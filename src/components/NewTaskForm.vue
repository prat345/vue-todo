<template>
  <transition name="fade">
    <div v-if="showModal" class="overlay">
      <div class="modal">
        <span
          @click="todoStore.setShowModal(false)"
          class="absolute right-0 top-0 cursor-pointer px-2 text-2xl hover:text-red-600"
        >
          x
        </span>
        <h1 class="mb-6">New Task</h1>
        <form action="">
          <div class="form-control">
            <label for="task">Task</label>
            <input v-model="newTask" type="text" name="task" />
          </div>
          <div class="form-control">
            <label for="date">Date</label>
            <input type="Date" v-model="date" name="date" />
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
          <button class="button w-full bg-slate-300" @click.prevent="handleSubmit">add</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useTodoStore } from '../stores/todo'
import { ref, computed } from 'vue'

const todoStore = useTodoStore()
const newTask = ref<string>('')
const date = ref<string>('')
const status = ref<boolean>(false)
const skills = ref<string[]>([])
const showModal = computed(() => todoStore.showModal)

const formData = computed(() => ({
  task: newTask.value,
  date: date.value,
  status: status.value,
  skills: skills.value
}))

const handleSubmit = async () => {
  console.log(formData.value)
  todoStore.addNewTask(formData.value)
  newTask.value = ''
  date.value = ''
  status.value = false
  skills.value = []
}
</script>

<style scoped>
.overlay {
  @apply absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center;
  background-color: rgb(0, 0, 0, 0.7);
}
.modal {
  @apply relative flex w-1/2 flex-col items-center justify-center rounded-lg bg-white p-10;
  min-height: 300px;
}

.form-control {
  @apply mb-5 grid grid-cols-6;
}
.form-control > label {
  @apply col-span-1;
}
.form-control > input {
  @apply col-span-5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
