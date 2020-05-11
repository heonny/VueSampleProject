import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "../components/MainPage";
import About from "../components/About";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

export default router
