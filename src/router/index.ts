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
    },
    // {
    //   path: '/tran/:vid',
    //   name: 'tran',
    //   component: () => import('../views/OppDay.vue'),
    //   meta: {
    //     title: 'Transcription',
    //     requiresAuth: true,
    //     encrypt: true
    //   }
    // }
    // {
    //   path: '/tran/:vid/en/:id?/:type?/:ref?',
    //   name: 'tran',
    //   component: () => import('../views/OppDay.vue'),
    //   meta: {
    //     title: 'Transcription',
    //     requiresAuth: true,
    //     encrypt: true
    //   }
    // },
    {
      path: '/tran/:vid/:id/:type/:ref',
      name: 'tran',
      component: () => import('../views/OppDay.vue'),
      meta: {
        title: 'Transcription',
        requiresAuth: true,
        encrypt: true,
        enKeys: ['id', 'type', 'ref']
        // slicer: '/tran'
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/register' && auth.currentUser) {
//     next('/profile')
//     return
//   }
//   if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
//     next('/register')
//     return
//   }
//   next()
// })

import CryptoJS from 'crypto-js'

// // check if query is encrypted
// router.beforeEach((to, from, next) => {
//   // console.log('before', from, to)
//   if (to.query.en) {
//     const bytes = CryptoJS.AES.decrypt(decodeURIComponent(to.query.en), 'kopkap')
//     const query = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
//     to.query = query
//   }
//   next()
// })

// // check if query is not encrypted
// router.afterEach((to, from) => {
//   // console.log('after', from, to)
//   if (to.meta.encrypt) {
//     const encryptedParams = CryptoJS.AES.encrypt(JSON.stringify(to.query), 'kopkap').toString()
//     const newUrl = `${window.location.origin + to.path}?en=${encodeURIComponent(encryptedParams)}` // Create the new URL
//     window.history.replaceState('', '', newUrl)
//   }
// })

// ------------------------------------------------------

// // Actual url use params, Display url use encrypted query string (query str มีกี่ตัวเดียวได้)
// // 1. all encrypt params must be optional
// // 2. must know encrypt param index

// // check if query is encrypted
// router.beforeEach((to, from, next) => {
//   if (to.query.en) {
//     const bytes = CryptoJS.AES.decrypt(decodeURIComponent(to.query.en), 'kopkap')
//     const query = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
//     to.params = query
//   }
//   next()
// })

// // check if query is not encrypted
// router.afterEach((to, from) => {
//   if (to.meta.encrypt) {
//     const enParams = CryptoJS.AES.encrypt(JSON.stringify(to.params), 'kopkap').toString()
//     const newUrl = `${window.location.origin + to.path.split('/en')[0]}/en?en=${encodeURIComponent(enParams)}` // Create the new URL
//     window.history.replaceState('', '', newUrl)
//   }
// })

// ------------------------------------------------------

const secret = 'kopkap'
// 1.use cryptojs
// 2.name and path in route obj must be the same
// check if query is encrypted
router.beforeEach((to, _from, next) => {
  if (to.query.en !== null && to.query.en !== undefined && +to.query.en === 1) {
    for (const [key, value] of Object.entries(to.params)) {
      if ((to.meta.enKeys as Array<string> | undefined)?.includes(key)) {
        to.params[key] = CryptoJS.AES.decrypt(decodeURIComponent(value as string), secret).toString(
          CryptoJS.enc.Utf8
        )
      }
    }
    // for (const [key, value] of Object.entries(to.params)) {
    //   to.params[key] = atob(decodeURIComponent(value))
    // }
  }
  next()
})

// check if query is not encrypted
router.afterEach((to, _from) => {
  if (to.meta.encrypt) {
    let enParams = new Array<string>()
    for (const [key, value] of Object.entries(to.params)) {
      const en = (to.meta.enKeys as Array<string> | undefined)?.includes(key)
        ? encodeURIComponent(CryptoJS.AES.encrypt(value, secret).toString())
        : value
      enParams.push(en as string)
    }

    // const enParams = Object.values(to.params)
    //   .map((p) => encodeURIComponent(btoa(p).toString()))
    //   .join('/')
    const newUrl = `${window.location.origin + '/' + to.name?.toString()}/${enParams.join('/')}}?en=1` // Create fake URL, add query str to check if url is encrypted
    window.history.replaceState('', '', newUrl)
  }
})

export default router
