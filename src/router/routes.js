import "nprogress/nprogress.css";
import { configure } from "nprogress";
import { getPageComponents } from "../utils/index";
configure({ trickleSpeed: 20, showSpinner: false });
export default [
  {
    name: "Home",
    path: "/",
    component: getPageComponents(() => import("@/views/Home")),
    meta: {
      title: "首页",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "EXCEL",
    path: "/EXCEL",
    component: getPageComponents(() => import("@/views/EXCEL")),
    meta: {
      title: "表格",
      isAuthenticated: false,
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "Blog",
    path: "/article",
    component: getPageComponents(() => import("@/views/Blog")),
    meta: {
      title: "文章",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "CategoryBlog",
    path: "/article/:categoryId",
    component: getPageComponents(() => import("@/views/Blog")),
    meta: {
      title: "文章",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "BlogDetail",
    path: "/article/:id",
    component: getPageComponents(() => import("@/views/Blog/Detail")),
    meta: {
      title: "文章详情",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "Project",
    path: "/project",
    component: getPageComponents(() => import("@/views/Project")),
    meta: {
      title: "项目简介",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "Message",
    path: "/message",
    component: getPageComponents(() => import("@/views/Message")),
    meta: {
      title: "上传文件",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "ArticleOverview",
    path: "/overview",
    component: getPageComponents(() => import("@/views/ArticleOverview")),
    meta: {
      title: "文章总览",
    },
  },
  {
    name: "EditText",
    path: "/EditText",
    component: getPageComponents(() => import("@/views/EditText")),
    meta: {
      title: "富文本编辑",
      activeMenuName: "basinMgr",
    },
  },

  {
    name: "backgroundManagement",
    path: "/backgroundManagement",
    component: getPageComponents(() => import("@/views/backgroundManagement")),
    meta: {
      title: "后台管理",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "FailurePage",
    path: "*",
    component: getPageComponents(() => import("@/components/FailurePage")),
    meta: {
      title: "404",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "SignIn",
    path: "/SignIn",
    component: getPageComponents(() => import("@/views/SignIn")),
    meta: {
      title: "登录",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "Register",
    path: "/register",
    component: getPageComponents(() => import("@/views/Register")),
    meta: {
      title: "注册",
      activeMenuName: "basinMgr",
    },
  },
  {
    name: "404",
    path: "/404",
    component: getPageComponents(() => import("@/views/404")),
    meta: {
      title: "404",
      activeMenuName: "basinMgr",
    },
  },
];
