import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '../views/TodoListView.vue'
import TaskView from '../views/TaskView.vue'
import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'home' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { title: 'register' }
    },
    {
      path: '/todo',
      name: 'todo_list',
      component: TodoListView,
      meta: { title: 'todo_list' }
    },
    {
      path: '/todo/:id',
      name: 'task_view',
      component: TaskView,
      meta: { title: 'task_view' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { title: 'profle', requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/register' && auth.currentUser) {
    next('/profile')
    return
  }
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    next('/register')
    return
  }
  next()
})

export default router
