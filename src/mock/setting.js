import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "",
    siteTitle: "bearDesign",
    github: "https://github.com/Aak-la",
    qq: "486910173",
    qqQrCode:"",
    weixin: "Eonmatar",
    weixinQrCode:"",
    mail: "486910173@qq.com",
    icp: "贵19294",
    githubName: "Aak-la",
    favicon: "./../assets/me.png",
  },
});
