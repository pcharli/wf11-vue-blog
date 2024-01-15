import { createRouter, createWebHistory } from 'vue-router'
//import des views
import Home from '../views/HomeView.vue'
import Contact from '../views/ContactView.vue'
import DetailsPost from '@/views/DetailsPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:idpost', //route avec attribut dynamique
      name: 'details',
      component: DetailsPost
    },
    {
      path: '/blog',
      name: 'aboublogt',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router
