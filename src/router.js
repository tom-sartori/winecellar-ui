import { createWebHistory, createRouter } from "vue-router"
import HomeView from "@/views/Home.vue"
import LoginView from "@/views/Login.vue"
import RegisterView from "@/views/Register.vue"
import ProfileView from "@/views/Profile"

import CaveView from "@/views/Cave.vue"
import BouteilleView from "@/views/Bouteille"
import AdminView from "@/views/Admin"



const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/home",
        name: "home",
        component: HomeView,
    },
    {
        path: "/cave",
        name: "cave",
        component: CaveView,
    },
    {
        path: "/bouteille",
        name: "bouteille",
        component: BouteilleView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    // If a user tries to access a restricted page, he will be redirected to the login page.
    if (authRequired && !loggedIn) {
        next('/login')
    }
    else {
        next()
    }
})

export default router
