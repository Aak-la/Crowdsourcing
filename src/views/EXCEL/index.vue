<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <template
      ><div class="excel-container">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          element-loading-text="拼命加载中"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="Id" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="名字" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column label="电话" width="210" align="center">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="315" align="center">
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="excel-container-btn">
          <el-button
            :loading="downloadLoading"
            style="margin-bottom:20px"
            type="info"
            icon="el-icon-document"
            @click="handleDownload"
          >
            生成表格
          </el-button>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import { getAllUserData } from "@/api/user";
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
export default {
  components: {
    Layout,
    SiteAside,
  },
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: "用户信息表",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getAllUserData().then((res) => {
        this.list = res.data.res;
        this.listLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/excel").then((excel) => {
          const tHeader = ["Id", "名字", "电话", "邮箱", "创建时间"];
          const filterVal = ["id", "username", "phone", "email", "create_time"];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请至少选择一个数据生成表格",
          type: "warning",
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style lang="less" scoped>
.excel-container {
  position: relative;
  padding-top: 20px;
  width: 90%;
  margin: 0 auto;
  height: 100vh;
  .excel-container-btn {
    position: absolute;
    right: 0;
    bottom: 40px;
  }
}
</style>
