import Vue from 'vue'
import VueRouter from 'vue-router'
import main from "../components/MainPage";
import about from "../components/About";
import FileController from "../components/FileController";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/file',
      name: 'file',
      component: FileController
    }
  ]
})

export default router
