import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import "./eventBus";
import "./icons";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts; 
store.dispatch("setting/fetchSetting");
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
