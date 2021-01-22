import Vue from 'vue'
import Router from 'vue-router'
import login from '../auth/auth'
import Home from '@/views/Dashboard'
import Login from '@/views/Login'
// import Chart from '@/components/charts/Chart'
import Event from '@/components/events/Event'
import Category from '@/components/category/Category'
import Users from '@/components/users/Users'
import Layout from '@/components/maps/Layout'
import Chart from '@/components/chart/Chart'

Vue.use(Router)

function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (login.checkUser(localStorage.getItem('storageUserBv')))
        isAuthenticated = true;
    else
        isAuthenticated = false;

    if (isAuthenticated) {
        next(); // allow to enter route
    }
    else {
        next('/login'); // go to '/login';
    }
}

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     component: DataTableEvents
        // },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Home,
            beforeEnter: guardMyroute,
            meta: {
                requiresAuth: true,
                title: 'Home Page - Example App'
            },
            children: [
                {
                    path: '',
                    beforeEnter: guardMyroute,
                    components: {
                        cms: Event
                    }
                },
                {
                    path: 'users',
                    beforeEnter: guardMyroute,
                    components: {
                        cms: Users
                    }
                },
                {
                    path: 'rotas',
                    beforeEnter: guardMyroute,
                    components: {
                        cms: Layout
                    }
                },
                {
                    path: 'category',
                    beforeEnter: guardMyroute,
                    components: {
                        cms: Category
                    }
                },
                {
                    path: 'charts',
                    beforeEnter: guardMyroute,
                    components: {
                        cms: Chart
                    }
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (login.checkUser()) {
//             console.log('ok1');

//             next()
//         } else {
//             next('/login')
//         }
//     } else {
//         console.log('ok2');
//         next()
//     }

// })

export default router