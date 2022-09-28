"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
      },
    },
    open: true,
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
