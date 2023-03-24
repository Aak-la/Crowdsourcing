<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template
            ><div class="classify">
                <div class="classify-content">
                    <div class="classify-editBtn">
                        <el-button type="primary" @click="dialogVisible = true"
                            ><i class="el-icon-plus"></i
                            >&nbsp;添加分类</el-button
                        >
                    </div>  
                    <el-table
                        :data="
                            tableData.slice(
                                (currentPage - 1) * pagesize,
                                currentPage * pagesize
                            )
                        "
                        border
                        style="width: 100%"
                        ref="multipleTable"
                    >
                        <el-table-column
                            fixed
                            prop="value"
                            label="分类"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="classifyNumber"
                            label="类别权重"
                            sortable
                            :sort-orders="['ascending', 'descending']"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="创建时间"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="200"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="downwardGoods(scope.row)"
                                    >删除分类</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog">
                    <el-dialog
                        title="添加分类"
                        :visible.sync="dialogVisible"
                        width="30%"
                    >
                        <el-form
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            ref="ruleForm"
                            label-width="100px"
                            class="demo-ruleForm"
                        >
                            <el-form-item
                                label="目标分类"
                                prop="classify"
                                required
                            >
                                <el-input
                                    v-model="ruleForm.classify"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="类别权重"
                                prop="classifyNumber"
                                required
                            >
                                <el-input
                                    v-model="ruleForm.classifyNumber"
                                    autocomplete="off"
                                    type="number"
                                    placeholder="请填写数字"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogClose">取 消</el-button>
                            <el-button @click="resetForm('ruleForm')"
                                >重置</el-button
                            >
                            <el-button type="primary" @click="submitDialog"
                                >确 定</el-button
                            >
                        </span>
                    </el-dialog>
                </div>

                <div class="classify-pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        :page-sizes="[9, 18, 27, 36]"
                        layout="prev, pager, next, jumper"
                        :total="tableData.length"
                    >
                    </el-pagination>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
import { addClassify, getClassify, deleteClassify } from '@/api/classify.js'

export default {
    components: {
        Layout,
        SiteAside
    },
    data() {
        var validateClassifyNumber = (rule, value, callback) => {
            if (value === '') {
                this.SubmitData = true
                callback(new Error('请输入类别权重'))
            } else {
                this.classifyNumberLock = true
                setTimeout(() => {
                    if (this.ruleForm.classifyNumber !== '') {
                        this.$refs.ruleForm.validateField('classifyNumber')
                    }
                }, 1000)
                callback()
            }
        }
        return {
            isIndeterminate: false,
            checkAll: false,
            dialogVisible: false,
            tableData: [],
            currentPage: 1,
            pagesize: 9,
            ruleForm: {
                classify: '',
                classifyNumber: ''
            },
            rules: {
                classify: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                classifyNumber: [
                    {
                        validator: validateClassifyNumber,
                        trigger: ['blur', 'change'],
                        message: '不能为空'
                    }
                ]
            },
            classifyLock: false,
            classifyNumberLock: false
        }
    },
    created() {
        this.initTableData()
    },
    methods: {
        async initTableData() {
            let { res } = await getClassify()
            this.tableData = res
        },
        deleteChangClassify() {
            if (
                this.$refs.multipleTable.selection.length <
                this.tableData.length
            ) {
                this.checkAll = true
            } else {
                this.checkAll = false
            }
            this.$refs.multipleTable.toggleAllSelection()
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.dialogVisible = false
                    let data = this.ruleForm
                    let time = this.dayjs().format('YYYY-MM-DD')
                    let res = await addClassify({
                        value: data.classify,
                        label: data.classify,
                        time: time,
                        classifyNumber: data.classifyNumber
                    })
                    if (res.state === 200) {
                        this.$refs[formName].resetFields()
                        this.initTableData()
                        this.$forceUpdate()
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        dialogClose() {
            this.resetForm('ruleForm')
            this.dialogVisible = false
        },
        submitDialog() {
            this.submitForm('ruleForm')
            if (this.classifyNumberLock && this.classifyLock) {
                this.dialogVisible = false
            }
        },
        handleClick() {},
        async downwardGoods(row) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let res = await deleteClassify(row.id)
                    if (res.state === 200) {
                        this.initTableData()
                        this.$forceUpdate()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '删除失败!'
                        })
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        handleSizeChange(size) {
            this.pagesize = size
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
        }
    }
}
</script>

<style lang="less" scoped>
.classify {
    .classify-content {
        .set-content();
    }
    .classify-editBtn {
        padding: 10px;
        box-sizing: border-box;
    }
    .classify-pagination {
        .set-pagination();
    }
    .dialog {
        .set-numberInput();
    }
    /* 取消input的上下箭头 */
}
</style>