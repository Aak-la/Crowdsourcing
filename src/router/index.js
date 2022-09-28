import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
import "../store/index";
import { Message } from "element-ui";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});
/* //获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
}; */
let token = localStorage.getItem("token");
router.beforeEach(async (to, from, next) => {
  titleController.setRouteTitle(to.meta.title);
  if (token) {
    next();
  } else {
    if (to.path === "/about") {
      setTimeout(() => {
        next({ path: "/" });
      }, 1500);
    } else {
      next();
    }
  }
});

export default router;
