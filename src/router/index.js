import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
import store from "../store/index";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  titleController.setRouteTitle(to.meta.title);
  if (store.getters.token) {
    next();
  } else {
    if (to.path === "/backgroundManagement") {
      setTimeout(() => {
        next({ path: "/404" });
      }, 1500);
    } else {
      next();
    }
  }
});

export default router;
