// import './assets/main.css'
import '../index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'

library.add(faPlus)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'home'
  }
  // Continue with the navigation
  next()
})