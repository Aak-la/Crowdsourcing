import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import "./eventBus";
import store from "./store";
import "default-passive-events";
import "./icons";
import "./loadTheData";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
Vue.prototype.$echarts = echarts;
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
