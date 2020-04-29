import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Dashboard'
// import Chart from '@/components/charts/Chart'
import Layout from '@/components/maps/Layout'
// import DataTableEvents from '@/components/events/Datatable'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        // {
        //     path: '/',
        //     component: DataTableEvents
        // },
        {
            path: '/rotas',
            component: Layout
        }
    ]
})