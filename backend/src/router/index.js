import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Products from "../views/Products.vue";
import store from "../store/index.js";
import AppLayout from "../components/AppLayout.vue";
import NotFound from "../views/Not Found.vue";

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
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/request-password',
        name:'requestPassword',
        component:RequestPassword
    },
    {
        path:'/reset-password/token',
        name:'ResetPassword',
        component:ResetPassword
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
