import Vue from 'vue'
import VueRouter from 'vue-router'
import main from "../components/MainPage";
import about from "../components/About";
import FileController from "../components/FileManager/FileController";
import UserPage from "../components/User/UserPage";

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
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage
    }
  ]
})

export default router
