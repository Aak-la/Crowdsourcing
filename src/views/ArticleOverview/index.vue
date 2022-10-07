<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <div class="information">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个文章条数" name="first"
          ><div ref="brokenLine" style="width:900px;height:500px"></div
        ></el-tab-pane>
        <el-tab-pane label="文章分类占比" name="second">
          <div ref="thePieChart" style="width:900px;height:700px"></div
        ></el-tab-pane>
        <!-- <el-tab-pane label="coXX" name="third">coXX</el-tab-pane>
        <el-tab-pane label="coXX" name="fourth">coXX</el-tab-pane> -->
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import { brokenLineOption, PieChartOption } from "./echartsOption";
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  mounted() {
    this.getEchartData();
  },
  methods: {
    getEchartData() {
      let brokenLine = this.$echarts.init(this.$refs.brokenLine);
      brokenLine.setOption(brokenLineOption);
      var thePieChart = this.$echarts.init(this.$refs.thePieChart);
      thePieChart.setOption(PieChartOption);
    },
    handleClick(tab, event) {
      /*    console.log(tab, event); */
    },
  },
  components: {
    SiteAside,
    Layout,
  },
};
</script>
<style lang="less">
.el-tabs__active-bar {
  background-color: #9999;
}
.el-tabs__item.is-active {
  color: #202020 !important;
}
.el-tabs__nav-scroll {
  background-color: #ffffff !important ;
  padding-left: 20px;
}

.el-tabs__item:hover {
  color: #999 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-tabs__content {
  display: flex;
  justify-content: center;
}
</style>
<style lang="less" scoped>
.information {
  background-color: #f4f5f5;
  height: 100%;
}
</style>
