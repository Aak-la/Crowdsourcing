<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template
            ><div class="addTheGoods">
                <div class="goodsFrom">
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        :rules="formRules"
                    >
                        <el-form-item label="商品分类" prop="goodsClassValue">
                            <el-select
                                v-model="form.goodsClassValue"
                                placeholder="请选择"
                                style="width: 420px"
                            >
                                <el-option
                                    v-for="item in goodsClass"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="商品名字"
                            required
                            prop="name"
                            style="width: 500px"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="进货价格"
                            required
                            prop="price"
                            style="width: 500px"
                        >
                            <el-input v-model.number="form.price"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="商品售价"
                            required
                            prop="sellPrice"
                            style="width: 500px"
                        >
                            <el-input
                                v-model.number="form.sellPrice"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商品库存" required prop="num">
                            <el-input-number
                                style="width: 420px"
                                v-model.number="form.num"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item
                            style="width: 500px"
                            label="商品标签"
                            required
                            prop="goodsLabel"
                        >
                            <el-input v-model="form.goodsLabel"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片" prop="fileLists">
                            <el-upload
                                class="upload-demo"
                                :action="actionURL"
                                :manual="true"
                                :auto-upload="false"
                                ref="upload"
                                :http-request="uploadFile"
                                :before-upload="beforeUpload"
                                :file-list="fileList"
                                list-type="picture"
                                :on-change="fileChange"
                                :on-remove="fileRemove"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                            >
                                <el-button
                                    slot="trigger"
                                    size="small"
                                    type="primary"
                                    >选取图片</el-button
                                >&nbsp;
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img
                                    width="100%"
                                    :src="dialogImageUrl"
                                    alt
                                /> </el-dialog
                        ></el-form-item>

                        <el-form-item
                            label="商品描述"
                            prop="desc"
                            style="width: 500px"
                        >
                            <el-input
                                type="textarea"
                                v-model="form.desc"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商品性质 " prop="resource">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="正常商品"></el-radio>
                                <el-radio label="扶贫商品"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            label="是否参加活动"
                            label-width="300"
                            prop="delivery"
                        >
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <template v-if="form.delivery"
                            ><el-form-item
                                label="活动区域"
                                prop="activeAreaValue"
                            >
                                <el-select
                                    style="width: 520px"
                                    v-model="form.activeAreaValue"
                                    placeholder="请选择"
                                >
                                    <el-option-group
                                        v-for="group in activeArea"
                                        :key="group.label"
                                        :label="group.label"
                                    >
                                        <el-option
                                            v-for="item in group.activeArea"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动时间" prop="activeDate">
                                <el-date-picker
                                    v-model="form.activeDate"
                                    type="daterange"
                                    range-separator="至"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动性质" prop="type">
                                <el-checkbox-group
                                    v-model="form.type"
                                    style="width: 520px"
                                >
                                    <el-checkbox
                                        label="春节活动"
                                        name="type"
                                    ></el-checkbox>
                                    <el-checkbox
                                        label="产品推广活动"
                                        name="type"
                                    ></el-checkbox>
                                    <el-checkbox
                                        label="产品促销活动"
                                        name="type"
                                    ></el-checkbox>
                                    <el-checkbox
                                        label="单纯品牌曝光"
                                        name="type"
                                    ></el-checkbox>
                                </el-checkbox-group> </el-form-item
                        ></template>
                    </el-form>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        class="submitBtn"
                        >立即添加</el-button
                    >
                </div>
            </div></template
        >
    </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
import { addGood } from '@/api/good'
import { Area, Rules } from './dataSource'
import { getClassify } from '@/api/classify.js'
import { imgUpload } from '@/api/upload.js'
export default {
    data() {
        return {
            actionURL: 'http://localhost:8080/api/upload',
            response: null,
            uploadFiles: [],
            fileList: [],
            activeArea: Area,
            goodsClass: [],
            form: {
                goodsClassValue: '',
                name: '',
                activeDate: '',
                delivery: false,
                price: '',
                sellPrice: '',
                num: '',
                type: [],
                resource: '正常商品',
                desc: '',
                goodsLabel: '',
                activeAreaValue: '',
                fileLists: null
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            formRules: Rules
        }
    },
    name: 'App',
    components: {
        Layout,
        SiteAside
    },
    created() {
        this.$store.dispatch('classify/GetClassify')
        this.initGoodsClass()
    },
    computed: { ...mapGetters(['classify', 'token']) },
    methods: {
        async initGoodsClass() {
            let { res } = await getClassify()
            this.goodsClass = res
        },
        async onSubmit() {
            this.$refs.upload.submit()
            this.delivery = true
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        const result = await this.uploadPromise
                        delete this.form.fileLists && delete this.form.delivery
                        let data = JSON.stringify({
                            status: '已上架',
                            ...this.form,
                            imageBox: JSON.parse(result.data)[0]
                        })
                        let res = await addGood(data)
                        if (res.state == 200) {
                            this.$refs.form.resetFields()
                            this.$refs['upload'].clearFiles()
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                        } else {
                            this.$refs.form.resetFields()
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        },
        preview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        async uploadFile(options) {
            const file = options.file
            const formData = new FormData()
            formData.append('file', file)

            try {
                const res = await imgUpload(formData)
                options.onSuccess(res)
            } catch (error) {
                param.onError(error)
            }
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isBMP = file.type === 'image/bmp'
            const isGIF = file.type === 'image/gif'
            const isIMG = isJPG || isPNG || isBMP || isGIF
            if (!isIMG) {
                this.$message.error('上传文件只能为图片格式！')
                return false
            }
            const currentCount = this.$refs.upload.uploadFiles.length
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 2MB！')
                return false
            }
            this.uploadPromise = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
            return true
        },
        handleSuccess(response, file, fileList) {
            this.resolve(response)
            this.$refs.upload.clearFiles()
        },
        handleError(error, file, fileList) {
            this.reject(error)
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        fileChange(uploadFile, fileList) {
            this.form.fileLists = uploadFile

            if (fileList.length !== 0) {
                this.$refs.form.validateField('fileLists')
            }
        },
        fileRemove(uploadFile, fileList) {
            if (fileList.length === 0) {
                this.form.file = null
                this.$refs.form.validateField('fileLists')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.addTheGoods {
    .set-padding20();
    user-select: none;
    height: 100vh;
    overflow-y: scroll;
    .goodsFrom {
        position: relative;
        .set-numberInput();
        width: 500px;
        min-height: 1000px;
        /*   overflow: hidden; */
        margin: 0 auto 70px auto;
        .submitBtn {
            position: absolute;
            left: 50%;
            margin-left: -30px;
        }
    }
    .el-form-item {
        background-color: transparent;
    }
}
</style>
