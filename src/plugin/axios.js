import Vue from 'vue'
import axios from 'axios'

// const url_local ='http://127.0.0.1:3333/' 
// const url_development ='https://api-bv-service.herokuapp.com/'
// const url_production ='http://104.248.225.49/api/'  
// const url_base ='http://104.248.225.49'  

// axios.defaults.baseURL = url_production

 Vue.use({
     install(Vue){
         Vue.prototype.$http = axios.create({
             baseURL: process.env.VUE_APP_ROOT_API
         })
     }
 })

 Vue.use({
    install(Vue){
        Vue.prototype.$oauth = axios.create({
            baseURL: process.env.VUE_APP_URL
        })
    }
})