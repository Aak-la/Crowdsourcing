<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template>
            <div class="createOrderContainer">
                <el-form
                    ref="elForm"
                    label-width="80px"
                    :rules="rules"
                    :model="form"
                >
                    <el-form-item label="商品名字" prop="name">
                        <el-input
                            style="width: 420px"
                            v-model="form.name"
                            placeholder="商品名字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="配送地址" prop="selectedOptions"
                        ><el-cascader
                            style="width: 420px"
                            size="large"
                            :options="city"
                            v-model="selectedOptions"
                            @change="handleChange($event)"
                        >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="addressDesc">
                        <el-input
                            style="width: 420px"
                            v-model="form.addressDesc"
                            type="textarea"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="num">
                        <el-input-number
                            style="width: 420px"
                            v-model.number="form.num"
                            :min="0"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="付款状态" prop="payState">
                        <el-select
                            v-model="form.payState"
                            placeholder="请选择"
                            style="width: 420px"
                        >
                            <el-option
                                v-for="item in payOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配送状态" prop="sendStatus">
                        <el-select
                            v-model="form.sendStatus"
                            placeholder="请选择"
                            style="width: 420px"
                        >
                            <el-option
                                v-for="item in sendOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货人" prop="owner">
                        <el-input
                            style="width: 420px"
                            v-model="form.owner"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="收货电话" prop="phone">
                        <el-input
                            style="width: 420px"
                            v-model="form.phone"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="onSubmit" class="submitBtn"
                    >提交订单</el-button
                >
            </div>
        </template>
    </Layout>
</template>
<script>
import { regionData, CodeToText } from 'element-china-area-data'
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
import { addOrders } from '../../api/order'

export default {
    components: {
        Layout,
        SiteAside
    },
    data() {
        return {
            form: {
                orderNumber: '',
                name: '',
                num: '',
                phone: '',
                time: '',
                sendStatus: '',
                addressDesc: '',
                payState: '',
                owner: ''
            },
            str: '',
            city: regionData,
            selectedOptions: [],
            payOptions: [
                { value: '已付款', label: '已付款' },
                { value: '未付款', label: '未付款' }
            ],
            sendOptions: [
                { value: '已配送', label: '已配送' },
                { value: '未配送', label: '未配送' }
            ],
            rules: {
                name: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ],
                num: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ],
                phone: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ],
                sendStatus: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ],
                payState: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ],
                owner: [
                    {
                        required: true,
                        trigger: ['change', 'blur'],
                        message: '该项为必填项'
                    }
                ]
            }
        }
    },
    created() {},

    methods: {
        onlyId() {
            function buildShortUUID() {
                let unique = 0
                const time = Date.now()
                const random = Math.floor(Math.random() * 190)
                // eslint-disable-next-line no-undef
                unique++
                return random + unique + String(time).slice(0, 8)
            }
            return buildShortUUID()
        },
        handleChange(value) {
            this.selectedOptions = value
            if (
                this.selectedOptions[0] != null &&
                this.selectedOptions[1] != null &&
                this.selectedOptions[2] != null
            ) {
                this.str =
                    CodeToText[this.selectedOptions[0]] +
                    CodeToText[this.selectedOptions[1]] +
                    CodeToText[this.selectedOptions[2]]
            }
        },
        onSubmit() {
            this.$refs.elForm.validate(async (valid) => {
                let time = this.dayjs().format('YYYY-MM-DD')
                let data = {
                    ...this.form,
                    orderNumber: this.onlyId(),
                    time: time,
                    address: this.str + this.form.addressDesc
                }
                delete data.addressDesc
                if (valid) {
                    this.$refs.elForm.resetFields()
                    let res = await addOrders(data)
                    if (res.state == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.timer = setTimeout(() => {
                            this.$router.push('order')
                        }, 1200)
                    }
                } else {
                    this.$message({
                        message: '请填写完整信息',
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.createOrderContainer {
    .set-padding20();
}
</style>
