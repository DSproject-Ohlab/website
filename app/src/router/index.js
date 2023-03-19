import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomeView from '../views/HomeView.vue'

const routes = [
    //routes go here
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;