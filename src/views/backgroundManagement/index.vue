<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template>
            <div class="modifyTheInformationBar">
                <el-table
                    :data="
                        tableData.filter(
                            (data) =>
                                !search ||
                                data.username
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                    "
                    style="width: 100%"
                >
                    <el-table-column
                        align="center"
                        label="姓名"
                        prop="username"
                        width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="手机号"
                        prop="phone"
                    ></el-table-column>
                    <el-table-column
                        label="邮箱"
                        align="center"
                        prop="email"
                    ></el-table-column>
                    <el-table-column
                        label="角色"
                        align="center"
                        prop="permissions"
                        ><template slot-scope="scope">
                            <span v-if="scope.row.permissions == '1'"
                                >普通管理员</span
                            >
                            <span v-else>超级管理员</span>
                        </template></el-table-column
                    >
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"
                            />
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item
                            label="姓名"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="form.username"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="手机号"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="form.phone"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="邮箱"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="form.email"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="权限"
                            :label-width="formLabelWidth"
                        >
                            <el-radio v-model="form.permissions" label="0"
                                >超级管理员</el-radio
                            >
                            <el-radio v-model="form.permissions" label="1"
                                >普通管理员</el-radio
                            >
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"
                            >取 消</el-button
                        >
                        <el-button type="primary" @click="updateTheUserData"
                            >确 定</el-button
                        >
                    </div>
                </el-dialog>
            </div>
        </template>
    </Layout>
</template>

<script>
import {
    updateTheUserData,
    getAllUserData,
    DeleteTheUserData
} from '@/api/user'
import SiteAside from '@/components/SiteAside'
import Layout from '@/components/Layout'
import theWatermark from '@/components/theWatermark'
export default {
    components: {
        Layout,
        SiteAside,
        theWatermark
    },
    data() {
        return {
            tableData: [],
            search: '',
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                username: '',
                phone: '',
                email: '',
                create_time: '',
                permissions: ''
            },
            formLabelWidth: '120px'
        }
    },
    async created() {
        const { data } = await getAllUserData()
        this.tableData = [...data]
    },

    methods: {
        handleEdit(index, row) {
            this.form = null
            this.dialogFormVisible = true
            this.form = Object.assign({}, row)
            console.log(this.form)
        },
        updateTheUserData() {
            updateTheUserData(this.form).then(() => {
                const index = this.form.id
                const id = this.tableData.findIndex((item) => item.id === index)
                this.tableData.splice(id, 1, this.form)
                this.dialogFormVisible = false
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    DeleteTheUserData(row).then(() => {
                        const index = this.form.id
                        const id = this.tableData.findIndex(
                            (item) => item.id === index
                        )
                        this.tableData.splice(id, 1)
                        this.dialogFormVisible = false
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    }
}
</script>
<style scoped lang="less">
.modifyTheInformationBar {
    min-width: 890px;
    margin-top: 20px;
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    .el-form-item {
        background-color: transparent;
    }
}
</style>
