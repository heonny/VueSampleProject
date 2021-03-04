import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
