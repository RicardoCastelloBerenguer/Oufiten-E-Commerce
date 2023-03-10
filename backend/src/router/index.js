import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Products from "../views/Products/Products.vue";
import Orders from "../views/Orders/Orders.vue";
import OrderView from "../views/Orders/OrderView.vue";
import store from "../store/index.js";
import AppLayout from "../components/AppLayout.vue";
import NotFound from "../views/Not Found.vue";
import Users from "../views/Users/Users.vue";
import Customers from "../views/Customers/Customers.vue";
import CustomerView from "../views/Customers/CustomerView.vue";

const routes = [
    {
        path:'/app',
        name:'app',
        component:AppLayout,
        meta:{
            requiresAuth: true
        },
        children:[
            {
                path:'dashboard',
                name:'app.dashboard',
                component:Dashboard
            },
            {
                path:'products',
                name:'app.products',
                component:Products
            },
            {
                path: 'orders',
                name:'app.orders',
                component: Orders
            },
            {
                path: 'orders/:id',
                name:'app.orders.view',
                component: OrderView
            },
            {
                path:'users',
                name:'app.users',
                component:Users
            },
            {
                path:'customers',
                name:'app.customers',
                component:Customers
            },
            {
                path:'customers/:id',
                name:'app.customers.view',
                component:CustomerView
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path:'/request-password',
        name:'requestPassword',
        component:RequestPassword,
        meta: {
            requiresGuest: true
        }
    },
    {
        path:'/reset-password/token',
        name:'ResetPassword',
        component:ResetPassword,
        meta: {
            requiresGuest: true
        }
    },
    {
        path:'/:pathMatch(.*)',
        name:'notFound',
        component:NotFound
    }



];

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to,from,next) => {

    if(to.meta.requiresAuth && !store.state.user.token)
    {
        next({name:'login'})
    }
    else if(to.meta.requiresGuest && store.state.user.token)
    {
        next({name:'app.dashboard'})
    }
    else{
        next();
    }

})

export default router;
