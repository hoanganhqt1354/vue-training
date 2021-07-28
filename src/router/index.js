import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import SingleMovie from '../components/SingleMovie.vue'
import Login from '../components/Login.vue'
import ListContent from '../components/admin/ListContent.vue'

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
  {
    path: '/manage/content',
    name: 'ListContent',
    component: ListContent
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user');

//   if (loggedIn && to.name === "Login") {
//     return next('/')
//   }
//   else {
//     next()
//   }
// })

export default router
