import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/Layout.vue'
import Login from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {

    path: '/',
    name: 'Layout',
    component: Layout,
    // redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/Home")
      }
    ]

  },

  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/Register")
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
