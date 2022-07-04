import "nprogress/nprogress.css";
import { configure } from "nprogress";
import { getPageComponents } from "../utils/index";
configure({ trickleSpeed: 20, showSpinner: false });
export default [
  {
    name: "layout",
    path: "/layout",
    component: getPageComponents(() => import("@/views/Layout.vue")),
    meta: {
      title: "首页",
    },
    children: [
      {
        name: "Home",
        path: "/",
        component: getPageComponents(() => import("@/views/Home")),
        meta: {
          title: "首页",
        },
      },
      {
        name: "About",
        path: "/about",
        component: getPageComponents(() => import("@/views/About")),
        meta: {
          title: "关于我",
        },
      },
      {
        name: "Blog",
        path: "/article",
        component: getPageComponents(() => import("@/views/Blog")),
        meta: {
          title: "文章",
        },
      },
      {
        name: "CategoryBlog",
        path: "/article/cate/:categoryId",
        component: getPageComponents(() => import("@/views/Blog")),
        meta: {
          title: "文章",
        },
      },
      {
        name: "BlogDetail",
        path: "/article/:id",
        component: getPageComponents(() => import("@/views/Blog/Detail")),
        meta: {
          title: "文章详情",
        },
      },
      {
        name: "Project",
        path: "/project",
        component: getPageComponents(() => import("@/views/Project")),
        meta: {
          title: "项目&效果",
        },
      },
      {
        name: "Message",
        path: "/message",
        component: getPageComponents(() => import("@/views/Message")),
        meta: {
          title: "留言板",
        },
      },
    ],
  },

  {
    name: "Failurepage",
    path: "*",
    component: getPageComponents(() => import("@/components/Failurepage")),
    meta: {
      title: "404",
    },
  },
  {
    name: "SignIn",
    path: "/",
    component: getPageComponents(() => import("@/views/SignIn")),
    meta: {
      title: "登录",
    },
  }, 
  {
    name: "Register",
    path: "/register",
    component: getPageComponents(() => import("@/views/Register")),
    meta: {
      title: "注册",
    },
  }, 
];
