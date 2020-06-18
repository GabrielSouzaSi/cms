import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './routes'
import Multiselect from 'vue-multiselect'
import VuePapaParse from 'vue-papa-parse'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('multiselect', Multiselect)
Vue.use(VuePapaParse)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/css/style.css';
import './plugin/axios'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
