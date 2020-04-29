import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3333/'

 Vue.use({
     install(Vue){
         Vue.prototype.$http = axios
     }
 })