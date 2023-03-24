import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { titleController } from '@/utils'
import store from '../store/index'
import 'nprogress/nprogress.css'
import { configure, done, start } from 'nprogress'
configure({ trickleSpeed: 20, showSpinner: false })

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: 'history'
})
const originalPush = VueRouter.prototype.push

router.beforeEach(async (to, from, next) => {
    start()
    titleController.setRouteTitle(to.meta.title)
    if (to.meta.isAuthenticated) {
        if (store.getters.token !== null) {
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    done()
})

export default router
