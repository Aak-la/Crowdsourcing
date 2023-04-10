<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>

        <template>
            <div class="goodsContent">
                <el-table
                    v-loading="loading"
                    element-loading-text="数据更新中"
                    :data="
                        tableData.slice(
                            (currentPage - 1) * pagesize,
                            currentPage * pagesize
                        )
                    "
                    border
                    style="width: 100%"
                >
                    <el-table-column
                        fixed
                        prop="id"
                        label="编号"
                        width="50"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品名称"
                        width="120"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="desc"
                        label="商品简介"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.desc == ''
                                    ? '暂无简介'
                                    : scope.row.desc
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="activeAreaValue"
                        label="活动地区"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.activeAreaValue == ''
                                    ? '暂无活动后续通知'
                                    : scope.row.activeAreaValue
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品图片"
                        prop="imageBox"
                        align="center"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <el-image
                                style="width: 100%; height: 110px"
                                :src="scope.row.imageBox"
                                :preview-src-list="[scope.row.imageBox]"
                                :key="scope.row.id"
                            >
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="num"
                        label="商品库存"
                        width="100"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="商品售价"
                        width="120"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        width="120"
                        align="center"
                    >
                        <template scope="scope">
                            <span
                                v-if="scope.row.status == '已下架'"
                                style="color: red"
                                >已下架</span
                            >
                            <span v-else style="color: #37b328">已上架</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="editButton(scope.row)"
                                type="text"
                                size="small"
                                >删除</el-button
                            >
                            <template v-if="scope.row.status == '已下架'">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="shelvesButton(scope.row, scope)"
                                    >上架</el-button
                                >
                            </template>
                            <template v-if="scope.row.status == '已上架'"
                                ><el-button
                                    type="text"
                                    size="small"
                                    @click="shelvesButton(scope.row, scope)"
                                    >下架</el-button
                                ></template
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="goodsPagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[4, 8, 16, 24]"
                    layout="prev, pager, next, jumper"
                    :total="tableData.length"
                >
                </el-pagination></div
        ></template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
import { getGood, deleteGood } from '@/api/good'
export default {
    components: {
        Layout,
        SiteAside
    },
    data() {
        return {
            isCollapse: true,
            tableData: [],
            currentPage: 1,
            pagesize: 4,
            index: 0,
            loading: true,
            timer: null,
            timer1: null
        }
    },
    created() {
        this.initTableData()
    },
    methods: {
        async initTableData() {
            let { res } = await getGood()

            let newRes = []
            res.forEach((item) => {
                let data = JSON.parse(item.data)
                newRes.push({ ...data, id: item.id, imageBox: data.mapList[0] })
            })
            this.tableData = newRes
            console.log(newRes)
            this.loading = false
        },
        handleSizeChange(size) {
            this.pagesize = size
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
        },
        shelvesButton(row, scope) {
            if (this.currentPage > 1) {
                this.index =
                    this.pagesize * (this.currentPage - 1) + scope.$index
            } else {
                this.index = scope.$index
            }
            if (row.status == '已下架') {
                row.status = '已上架'
            } else {
                row.status = '已下架'
            }
            this.tableData.splice(this.index, 1, row)
            this.index = 0
        },
        editButton(row) {
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.loading = true
                    let { state, msg } = await deleteGood(row.id)
                    if ((state = 200)) {
                        this.timer = setTimeout(() => {
                            this.initTableData()
                        }, 1000)
                    } else {
                        this.timer = setTimeout(() => {
                            this.loading = false
                        }, 1000)
                    }
                    this.timer1 = setTimeout(() => {
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                    }, 1050)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    },
    destroyed() {
        clearTimeout(this.timer)
        clearTimeout(this.timer1)
    }
}
</script>
<style lang="less" scoped>
.goodsContent {
    .set-content();
}
.goodsPagination {
    .set-pagination();
}
</style>
