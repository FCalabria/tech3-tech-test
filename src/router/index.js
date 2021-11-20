import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail:itemId',
    name: 'Detail',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (detail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
