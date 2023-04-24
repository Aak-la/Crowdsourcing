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
                                    v-for="item in form.goodsClass"
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
                        <el-form-item label="商品图片">
                            <!--    <el-upload
                                ref="upload"
                                action="http://localhost:8080/api/upload"
                                list-type="picture-card"
                                multiple
                                :limit="3"
                                :on-preview="preview"
                                :on-success="afterSuccessUpload"
                                :on-exceed="maxFile"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload> -->
                            <el-upload
                                ref="upload"
                                action="http://localhost:8080/api/upload"
                                list-type="picture-card"
                                multiple
                                :limit="3"
                                :on-preview="preview"
                                :on-remove="handleRemove"
                                :on-success="afterSuccessUpload"
                                :on-exceed="maxFile"
                            >
                                <i class="el-icon-plus"></i>
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
                                        v-for="group in form.activeArea"
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
import { getClassify } from '@/api/classify.js'
import { imgEdit } from '@/api/img'
export default {
    data() {
        return {
            fileList: [],
            form: {
                goodsClassValue: '',
                name: '',
                activeDate: '',
                delivery: false,
                price: '',
                sellPrice: ' ',
                num: ' ',
                type: [],
                resource: '',
                desc: '',
                goodsLabel: '',
                fileSrc: [],
                mapList: [],
                uploadHide: false,
                goodsClass: [],
                activeArea: [
                    {
                        label: '热门地域',
                        activeArea: [
                            {
                                value: '港南区江南大道',
                                label: '港南区江南大道'
                            },
                            {
                                value: '港北区万达',
                                label: '港北区万达'
                            }
                        ]
                    },
                    {
                        label: '地域名',
                        activeArea: [
                            {
                                value: '港北区金港大道',
                                label: '港北区金港大道'
                            },
                            {
                                value: '港北区吾星悦广场',
                                label: '港北区吾星悦广场'
                            },
                            {
                                value: '港南区江南校区',
                                label: '港南区江南校区'
                            },
                            {
                                value: '港南区青云大桥',
                                label: '港南区青云大桥'
                            }
                        ]
                    }
                ],
                activeAreaValue: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            formRules: {
                goodsClassValue: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '该项为必填项'
                    }
                ],
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '该项为必填项'
                    }
                ],
                goodsLabel: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '该项为必填项'
                    }
                ],
                price: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '该项为必填项'
                    }
                ],
                sellPrice: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '该项为必填项'
                    }
                ]
            }
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
    computed: { ...mapGetters(['classify']) },
    methods: {
        async initGoodsClass() {
            let { res } = await getClassify()
            this.form.goodsClass = res
        },
        async onSubmit() {
            this.delivery = true
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    let {
                        goodsClassValue,
                        activeAreaValue,
                        desc,
                        goodsLabel,
                        resource,
                        sellPrice,
                        price,
                        num,
                        name,
                        activeDate,
                        mapList,
                        type
                    } = this.form
                    let data = JSON.stringify({
                        status: '已上架',
                        goodsClassValue,
                        activeAreaValue,
                        desc,
                        goodsLabel,
                        resource,
                        sellPrice,
                        num,
                        name,
                        price,
                        activeDate,
                        type,
                        mapList
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
                }
            })
        },
        preview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        afterSuccessUpload(file) {
            console.log(file.src)
            this.form.fileSrc.push(file.src)
            this.form.mapList = this.form.fileSrc.map((item) => {
                return 'http://localhost:8080/' + item
            })
        },
        async handleRemove({ response }) {
            /* let res = await imgEdit(response.src)
            console.log(response.src) */
        },
        maxFile() {
            this.$message({
                message: '最多上传三张图片',
                type: 'warning'
            })
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
