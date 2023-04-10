<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template
            ><div class="orderContainer">
                <div class="oderNavBtn">
                    <el-input
                        v-model="oderNumber"
                        placeholder="请输入单号"
                        class="btnRest"
                        @input="inputValueChange"
                    ></el-input>
                    <el-select
                        @change="changSelectValue($event)"
                        v-model="selectValue"
                        class="btnRest"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button
                        type="primary"
                        @click="closeTheOrder($event, 'all')"
                        ><i class="el-icon-delete"></i
                        >&nbsp;删除选中的订单</el-button
                    >
                    <el-button type="primary" @click="addOrder"
                        ><i class="el-icon-plus"></i>&nbsp;添加订单</el-button
                    >
                </div>
                <el-table
                    :data="list"
                    style="width: 100%"
                    ref="orderTable"
                    class="orderTable"
                    :expand-row-keys="expands"
                    @selection-change="handleSelectionChange"
                    row-key="id"
                >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="50"
                    />
                    <el-table-column type="expand" width="1">
                        <template slot-scope="props">
                            <el-form
                                label-position="left"
                                inline
                                class="demo-table-expand itemHover"
                            >
                                <div>
                                    <el-form-item label="配送地址">
                                        <i class="el-icon-map-location"></i>
                                        <span
                                            @click="openMap(props.row.address)"
                                            >{{ props.row.address }}</span
                                        >
                                    </el-form-item>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="订单号" width="200">
                        <template slot-scope="scope">
                            {{ scope.row.orderNumber }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品名称"
                        width="160"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品数量"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.num }}
                        </template>
                    </el-table-column>
                    <el-table-column label="电话" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.phone }}
                        </template>
                    </el-table-column>
                    <el-table-column label="收货人" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.owner }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建时间">
                        <template slot-scope="scope">
                            <span>{{ scope.row.time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="配送状态">
                        <template slot-scope="scope">
                            <div v-show="!scope.row.editStatus">
                                <span
                                    v-if="scope.row.sendStatus == '未配送'"
                                    style="color: red"
                                    >未配送</span
                                >
                                <span v-else style="color: #37b328"
                                    >已配送</span
                                >
                            </div>
                            <el-select
                                v-show="scope.row.editStatus"
                                v-model="scope.row.sendStatus"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-show="scope.row.editStatus"
                                    v-for="item in selectSendStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="付款状态" align="center">
                        <template slot-scope="scope">
                            <div v-show="!scope.row.editStatus">
                                <span
                                    v-if="scope.row.payState == '未付款'"
                                    style="color: red"
                                    >未付款</span
                                >
                                <span v-else style="color: #37b328"
                                    >已付款</span
                                >
                            </div>
                            <el-select
                                v-model="scope.row.payState"
                                v-show="scope.row.editStatus"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in selectPayStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="toViewTheOrder(scope)"
                                type="text"
                                size="small"
                                >查看</el-button
                            >
                            <el-button
                                v-if="!scope.row.editStatus"
                                @click="
                                    scope.row.editStatus = !scope.row.editStatus
                                "
                                type="text"
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                v-else
                                @click="
                                    scope.row.editStatus = !scope.row.editStatus
                                "
                                type="text"
                                size="small"
                                >完成编辑</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="closeTheOrder(scope)"
                                >删除订单</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="orderContainerBtn">
                    <el-button
                        :loading="downloadLoading"
                        style="margin-bottom: 20px"
                        type="primary"
                        icon="el-icon-document"
                        @click="handleDownload"
                    >
                        生成表格
                    </el-button>
                </div>
                <div
                    class="mapContainer"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    v-if="isShow"
                >
                    <span class="colesBtn" @click="resetLoadingState"
                        ><i class="el-icon-close"></i
                    ></span>
                    <baidu-map
                        @ready="mapReady"
                        ref="map"
                        class="map"
                        :scroll-wheel-zoom="true"
                    >
                        <bm-geolocation
                            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                            :showAddressBar="true"
                            :autoLocation="true"
                            @locationSuccess="locationSuccess"
                        ></bm-geolocation>
                        <bm-marker
                            v-if="bmMarker"
                            :position="startLocations"
                            :dragging="true"
                            animation="BMAP_ANIMATION_BOUNCE"
                        ></bm-marker>
                        <bm-walking
                            v-if="!bmMarker"
                            :start="startLocations"
                            :end="endLocations"
                            :auto-viewport="true"
                            location="北京"
                            :panel="false"
                        ></bm-walking>
                    </baidu-map>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
import { getOrder, addOrders, deleteOrder } from '../../api/order'
/* import { data } from './data' */
export default {
    components: {
        Layout,
        SiteAside
    },
    data() {
        return {
            isShow: false,
            bmMarker: false,
            loading: false,
            address: '',
            startLocations: { lng: 0, lat: 0 },
            endLocations: { lng: 0, lat: 0 },
            BMap: null,
            map: null,
            loading: true,
            list: [],
            listLoading: true,
            multipleSelection: [],
            downloadLoading: false,
            filename: '用户信息表',
            oderNumber: '',
            dialogVisible: false,
            options: [
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '未付款',
                    label: '未付款'
                },
                {
                    value: '已付款',
                    label: '已付款'
                },
                {
                    value: '未配送',
                    label: '未配送'
                },
                {
                    value: '已配送',
                    label: '已配送'
                }
            ],
            selectValue: '全部',
            expands: [],
            selectSendStatus: [
                {
                    value: '未配送',
                    label: '未配送'
                },
                {
                    value: '已配送',
                    label: '已配送'
                }
            ],
            selectPayStatus: [
                {
                    value: '未付款',
                    label: '未付款'
                },
                {
                    value: '已付款',
                    label: '已付款'
                }
            ]
        }
    },
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            let { res } = await getOrder()
            this.list = res
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        handleDownload() {
            if (this.multipleSelection.length) {
                this.downloadLoading = true
                import('@/vendor/excel').then((excel) => {
                    const tHeader = [
                        '订单号',
                        '商品名称',
                        '商品数量',
                        '电话',
                        '创建时间',
                        '配送状态',
                        '配送地址',
                        '付款状态'
                    ]
                    const filterVal = [
                        'orderNumber',
                        'name',
                        'num',
                        'phone',
                        'time',
                        'sendStatus',
                        'address',
                        'payState'
                    ]
                    const list = this.multipleSelection
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '商品订单表'
                    })
                    this.$refs.orderTable.clearSelection()
                    this.downloadLoading = false
                })
            } else {
                this.$message({
                    message: '请至少选择一个数据生成表格',
                    type: 'warning'
                })
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]))
        },
        distributionSuccess() {},
        outbound() {},
        async closeTheOrder(scope, type) {
            let ID = []
            if (
                type != 'undefined' &&
                this.$refs.orderTable.selection.length != 0
            ) {
                this.$refs.orderTable.selection.map((v) => {
                    ID.push(v.id)
                })
            }
            if (this.$refs.orderTable.selection.length == 0 && type == 'all') {
                this.$message({
                    message: '请至少选择中一条订单',
                    type: 'warning'
                })
            }
            if (
                this.$refs.orderTable.selection.length == 0 &&
                type == undefined
            ) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        let res = await deleteOrder(scope.row.id)
                        this.initData()
                        console.log(res)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            }
            /* if (type != 'undefined' && this.$refs.orderTable.selection != 0) {
                this.$refs.orderTable.selection.map(v=>{ID.push(Object.assign({},{id:v.id}))})
                console.log(ID);
            } */
            /* if (scope != 'All') {
                let { id } = scope.row
                console.log(id)
            } else {
                if (this.$refs.orderTable.selection.length < this.list.length) {
                    this.checkAll = true
                } else {
                    this.checkAll = false
                }
                this.$refs.orderTable.toggleAllSelection()
                this.$confirm('此操作将永久删除全部订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            } */
        },
        toViewTheOrder(scope) {
            Array.prototype.remove = function (val) {
                let index = this.indexOf(val)
                if (index > -1) {
                    this.splice(index, 1)
                }
            }

            if (this.expands.indexOf(scope.row.id) < 0) {
                this.expands.push(scope.row.id)
            } else {
                this.expands.remove(scope.row.id)
            }
        },
        addOrder() {
            this.$router.push({ name: 'createOrder' })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then((_) => {
                    done()
                })
                .catch((_) => {})
        },
        openMap(res) {
            this.address = res
            this.dialogVisible = true
            this.isShow = !this.isShow
        },
        mapReady({ BMap, map }) {
            const geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition((res) => {
                this.startLocations.lng = res.point.lng
                this.startLocations.lat = res.point.lat
                this.point = new BMap.Point(
                    this.startLocations.lng,
                    this.startLocations.lat
                )
                map.centerAndZoom(this.point, 15)
                let myGeo = new BMap.Geocoder()
                let self = this
                myGeo.getPoint(this.address, function (point) {
                    self.endLocations.lng = point.lng
                    self.endLocations.lat = point.lat
                })
                this.loading = false
            })
        },
        locationSuccess() {
            this.bmMarker = true
        },
        changSelectValue(value) {
            let self = this
            function getData(value, states) {
                return self.list.filter((item) => {
                    return item[states] == value
                })
            }
            switch (value) {
                case '未付款':
                    this.list = data
                    this.list = getData('未付款', 'payState')
                    break
                case '已付款':
                    this.list = data
                    this.list = getData('已付款', 'payState')

                    break
                case '已配送':
                    this.list = data
                    this.list = getData('已配送', 'sendStatus')
                    break
                case '未配送':
                    this.list = data
                    this.list = getData('未配送', 'sendStatus')
                    break

                default:
                    this.list = data
                    break
            }
        },
        inputValueChange(value) {
            if (value) {
                this.list = this.list.filter((item) => {
                    return item['orderNumber'] == value
                })
            } else {
                this.list = data
            }
        },
        resetLoadingState() {
            ;(this.isShow = !this.isShow), (this.loading = true)
        }
    }
}
</script>
<style lang="less" scoped>
.orderContainer {
    user-select: none;
    position: relative;
    .set-padding20();
    margin: 0 auto;
    height: 100vh;
    overflow: hidden;

    .oderNavBtn {
        padding: 20px 0;
        box-sizing: border-box;
        .btnRest {

            width: 200px;
            height: 35px;
            margin: 0 10px;
        }
    }
    .orderContainerBtn {
        position: absolute;
        right: 0;
        bottom: 40px;
    }
    .orderTable {
        ::v-deep .el-table__expand-icon {
            display: none !important;
        }
        .demo-table-expand {
            padding-left: 130px;
            box-sizing: border-box;
        }
    }
    .mapContainer {
        position: absolute;
        z-index: 999;
        top: 40px;
        width: 95%;
        height: 650px;
        .colesBtn {
            position: absolute;
            display: block;
           /*  width: 70px;
            height: 70px; *//* 
            border-radius: 50%; */
            width: 20px;
            right: 0;
            border-radius: 50%;
            z-index: 9999;
            text-align: center;
           /*  background-color: aqua; */
            cursor: pointer;
        }
        .map {
            width: 100%;
            height: 100%;
        }
    }
    .itemHover:hover {
        cursor: pointer;
        color: #409eff;
    }
    /deep/.el-form-item {
        background-color: transparent;
    }
}
</style>
