import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

interface FormData {
  _id: string
  task: string
  date: string
  status: boolean
  skills: string[]
}

export const useTodoStore = defineStore('todo', () => {
  const allTasks = ref<FormData[]>([])
  const countTasks = ref<number>(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const showModal = ref(false)

  const setShowModal = (value: boolean) => {
    showModal.value = value
  }

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/todo?page=${currentPage.value}&pageSize=${pageSize.value}`
      )
      allTasks.value = data.todos
      countTasks.value = data.countTasks
      console.log(allTasks.value)
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  const addNewTask = async (formData: Partial<FormData>) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/todo/add`, {
        formData: formData
      })
      console.log('added: ', data)
      fetchTask()
      showModal.value = false
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  const setCurrentPage = (num: number) => {
    currentPage.value = num
    console.log(currentPage.value)
  }

  const setPageSize = (num: number) => {
    pageSize.value = num
    if (currentPage.value > countPages.value) {
      currentPage.value = countPages.value
    }
    console.log(pageSize.value, currentPage.value, countPages.value)
  }

  const countPages = computed(() => Math.ceil(countTasks.value / pageSize.value))

  return {
    allTasks,
    countTasks,
    currentPage,
    pageSize,
    countPages,
    showModal,
    setShowModal,
    fetchTask,
    setCurrentPage,
    setPageSize,
    addNewTask
  }
})
