import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import SingleMovie from '../components/SingleMovie.vue'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'SingleMovie',
    component: SingleMovie
  },
  {
    path: '/user/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
