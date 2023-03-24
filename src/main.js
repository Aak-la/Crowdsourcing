import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from './router'
import './eventBus'
import store from './store'
import './icons'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import BaiduMap from 'vue-baidu-map'
import * as echarts from 'echarts'
Vue.prototype.dayjs = dayjs
Vue.prototype.$echarts = echarts
Vue.use(BaiduMap, {
    ak: 'v4pxo1eyju6fSqHifxABLQVRrqmsDaGT'
})
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/4041.gif'),
    loading: require('./assets/default.gif'),
    attempt: 2
})
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
