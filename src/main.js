import 'bulma/css/bulma.min.css'
import './assets/main.css'

import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//définition des filtres
app.config.globalProperties.$filters = {
  //formater une date dans la langue locale
  dateFr(value) {
    return new Date(value).toLocaleDateString()
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
