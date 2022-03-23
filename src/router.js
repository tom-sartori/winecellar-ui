import { createWebHistory, createRouter } from "vue-router"
import HomeItem from "./components/Home.vue"
import LoginItem from "./components/Login.vue"
import RegisterItem from "./components/Register.vue"

import MurItem from "./components/Mur.vue"
import CaveView from "./views/Cave.vue"

// lazy-loaded
const Profile = () => import("./components/Profile")
const BoardAdmin = () => import("./components/BoardAdmin")
const BoardUser = () => import("./components/BoardUser")


const routes = [
    {
        path: "/",
        name: "home",
        component: HomeItem,
    },
    {
        path: "/mur",
        name: "mur",
        component: MurItem,
    },
    {
        path: "/cave",
        name: "cave",
        component: CaveView,
    },
    {
        path: "/home",
        component: HomeItem,
    },
    {
        path: "/login",
        component: LoginItem,
    },
    {
        path: "/register",
        component: RegisterItem,
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
    },
    {
        path: "/admin",
        name: "admin",
        // lazy-loaded
        component: BoardAdmin,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/mur']
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
