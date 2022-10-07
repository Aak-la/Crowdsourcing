import store from "../../store/index";
let ES6 = store.getters.classificationTotal["ES6"].length;
let JS = store.getters.classificationTotal["JS"].length;
let This = store.getters.classificationTotal["this"].length;
let Webpack = store.getters.classificationTotal["Webpack"].length;
let network = store.getters.classificationTotal["网络"].length;
let module = store.getters.classificationTotal["模块化"].length;
let getGroup = (data) => {
  let groups = {};
  data.forEach((c) => {
    let value = c.category;
    groups[value] = groups[value] || [];
    groups[value].push(c);
  });
  return groups;
};
let getGroupsBlog = getGroup(store.getters.blog);
let ES6Blog = getGroupsBlog["ES6"].length;
let JSBlog = getGroupsBlog["JS"].length;
let ThisBlog = getGroupsBlog["this"].length;
let WebpackBlog = getGroupsBlog["Webpack"].length;
let networkBlog = getGroupsBlog["网络"].length;
let moduleBlog = getGroupsBlog["模块化"].length;
const brokenLine = {
  xAxis: {
    type: "category",
    data: ["ES6", "JS", "This", "Webpack", "网络", "模块化"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [ES6Blog, JSBlog, ThisBlog, WebpackBlog, networkBlog, moduleBlog],
      type: "line",
      smooth: true,
    },
  ],
};
const PieChart = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "文章分类",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: JS, name: "JS" },
        { value: Webpack, name: "Webpack" },
        { value: network, name: "网络" },
        { value: ES6, name: "ES6" },
        { value: module, name: "模块化" },
        { value: This, name: "this" },
      ],
    },
  ],
};
function freezeObj(obj) {
  if (Object.isFrozen(obj)) return obj;

  Object.keys(obj).forEach((key) => {
    typeof obj[key] === "object" && freezeObj(obj[key]);
  });

  return Object.freeze(obj);
}

let brokenLineOption = freezeObj(brokenLine);
let PieChartOption = freezeObj(PieChart);

export { brokenLineOption, PieChartOption };
