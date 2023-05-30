import { createRouter, createWebHistory, createWebHashHistory } from "@ionic/vue-router";
import HomeView from '../views/HomeView.vue'
import MindMap from "../views/MindMap.vue";

const routes = [
    //routes go here
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/mindmap',
        name: 'MindMap',
        component: MindMap,
    }
]

const router = createRouter({
    base: '/',
    history: createWebHashHistory(),
    routes,
})



export default router;