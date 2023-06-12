<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template>
            <div class="drag-container" ref="DragCollection">
                <div class="select-info">
                    <template v-if="!Object.keys(dragElement).length"
                        ><div class="select-item">没有该员工哦</div></template
                    >
                    <template v-else
                        ><div class="select-item">
                            <div
                                class="item"
                                draggable="true"
                                v-for="(item, index) in dragElement"
                                :key="index"
                                data-effect="move"
                                @click="addInfo(item)"
                            >
                                {{ item.name }}
                            </div>
                        </div></template
                    >

                    <div class="searchBox">
                        <el-input
                            v-model="searchWord"
                            placeholder="请输入员工名字"
                            @input="filterSearch"
                        ></el-input>
                    </div>
                </div>
                <h3 style="padding: 0 20px">值班列表</h3>
                <div class="select-container">
                    <template v-if="!Object.keys(employeesList).length"
                        ><el-empty
                            description="暂无员工信息请上面点击添加"
                        ></el-empty
                    ></template>
                    <template v-else
                        ><div
                            v-for="(item, index) in employeesList"
                            :key="index"
                        >
                            <el-descriptions size="medium" border>
                                <el-descriptions-item label="用户名">{{
                                    item.name
                                }}</el-descriptions-item>
                                <el-descriptions-item label="手机号">{{
                                    item.mobilePhone
                                }}</el-descriptions-item>
                                <el-descriptions-item label="编辑信息">
                                    <el-button
                                        @click="editInfo(item)"
                                        type="primary"
                                        size="small"
                                        >{{
                                            !item.editState ? '编辑' : '完成'
                                        }}</el-button
                                    >
                                </el-descriptions-item>
                                <el-descriptions-item
                                    class="description-item year"
                                    label="年份"
                                >
                                    <template v-if="!item.editState"
                                        ><div class="year">
                                            {{
                                                item.year | changeTheTimeFormat
                                            }}
                                        </div></template
                                    >
                                    <template v-else>
                                        <el-date-picker
                                            class="setPicker-year"
                                            :size="size"
                                            v-model="item.year"
                                            type="date"
                                            placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                        >
                                        </el-date-picker
                                    ></template>
                                </el-descriptions-item>
                                <el-descriptions-item label="早上时间">
                                    <template v-if="!item.editState">
                                        <div class="setHeightA">
                                            {{
                                                item.AMstartTimer
                                            }}&nbsp;-&nbsp;{{ item.AMendTimer }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="setHeight">
                                            开始：
                                            <el-time-select
                                                class="setPicker-timer"
                                                placeholder="起始"
                                                v-model="item.AMstartTimer"
                                                :picker-options="{
                                                    start: '05:00',
                                                    step: '00:01',
                                                    end: '12:00'
                                                }"
                                            >
                                            </el-time-select>
                                            结束：
                                            <el-time-select
                                                class="setPicker-timer"
                                                placeholder="结束"
                                                v-model="item.AMendTimer"
                                                :picker-options="{
                                                    start: '12:00',
                                                    step: '00:01',
                                                    end: '24:00',
                                                    minTime: item.AMstartTimer
                                                }"
                                            >
                                            </el-time-select>
                                        </div>
                                    </template>
                                </el-descriptions-item>
                                <el-descriptions-item label="下午时间"
                                    ><template v-if="!item.editState">
                                        <div>
                                            {{
                                                item.PMstartTimer
                                            }}&nbsp;-&nbsp;{{ item.PMendTimer }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="setHeight">
                                            <el-time-select
                                                required
                                                class="setPicker-timer"
                                                placeholder="起始"
                                                v-model="item.PMstartTimer"
                                                :picker-options="{
                                                    start: '05:00',
                                                    step: '00:01',
                                                    end: '12:00'
                                                }"
                                            >
                                            </el-time-select>
                                            <el-time-select
                                                required
                                                class="setPicker-timer"
                                                placeholder="结束"
                                                v-model="item.PMendTimer"
                                                :picker-options="{
                                                    start: '12:00',
                                                    step: '00:01',
                                                    end: '24:00',
                                                    minTime: item.PMstartTimer
                                                }"
                                            >
                                            </el-time-select></div></template
                                ></el-descriptions-item>
                            </el-descriptions></div
                    ></template>
                </div>
            </div>
        </template>
    </Layout>
</template>
<script>
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
export default {
    components: {
        Layout,
        SiteAside
    },
    data() {
        return {
            size: 'mini',
            searchWord: '',
            dragElement: [],
            info: [
                {
                    id: 1,
                    name: '小王',
                    des: '',
                    position: '',
                    mobilePhone: '18100000000',
                    year: new Date(),
                    AMstartTimer: '05:00',
                    AMendTimer: '06:00',
                    PMstartTimer: '02:00',
                    PMendTimer: '03:00',
                    editState: false
                },
                {
                    id: 2,
                    name: '晓丽',
                    des: '',
                    position: '',
                    mobilePhone: '18100000000',
                    year: new Date('2023.06.07'),
                    AMstartTimer: '05:00',
                    AMendTimer: '06:00',
                    PMstartTimer: '02:00',
                    PMendTimer: '03:00',
                    editState: false
                },
                {
                    id: 3,
                    name: '小物',
                    des: '',
                    position: '',
                    mobilePhone: '18100000000',
                    year: new Date('2023.06.07'),
                    AMstartTimer: '05:00',
                    AMendTimer: '06:00',
                    PMstartTimer: '02:00',
                    PMendTimer: '03:00',
                    editState: false
                }
            ],
            dragCollection: null,
            employeesList: []
        }
    },
    mounted() {
        this.dragHeader()
    },
    computed: {},
    methods: {
        dragHeader() {
            this.dragElement = this.info
            this.$refs.DragCollection.ondragstart = (e) => {
                e.dataTransfer.effectAllowed = e.target.dataset.effect
                console.log(e.target.dataset.effect)
            }
            this.$refs.DragCollection.ondragover = (e) => {
                e.preventDefault()
                /* console.log(e.target) */
            }
            this.$refs.DragCollection.ondragenter = (e) => {
                console.log(e.target)
            }
            this.$refs.DragCollection.ondrop = (e) => {
                console.log(e.target, 'sad')
            }
        },
        filterSearch() {
            if (!this.searchWord) {
                this.dragElement = this.info
            } else {
                this.dragElement = this.info.filter(
                    (item) =>
                        !this.searchWord ||
                        item.name
                            .toLowerCase()
                            .includes(this.searchWord.toLowerCase())
                )
            }
        },
        editInfo(value) {
            this.info.find((item) => {
                if (item.id === value.id && item.name === value.name) {
                    item.editState = !item.editState
                    if (!item.editState) {
                        console.log(value)
                    }
                }
            })
        },
        addInfo(item) {
            this.employeesList.push(item)
        }
    },
    filters: {
        changeTheTimeFormat(value) {
            if (!value) return ''
            const year = value.getFullYear()
            const month = addZero(value.getMonth() + 1)
            const day = addZero(value.getDate())
            const formattedDate = `${year}.${month}.${day} `
            function addZero(num) {
                return num >= 10 ? num : `0${num}`
            }
            return formattedDate
        }
    }
}
</script>

<style lang="less" scoped>
.drag-container {
    .select-info {
        max-width: 1100px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        .select-item {
            display: flex;
            width: calc(100vw - 250px);
            border: 1px solid #dcdfe6;
            line-height: 40px;
            .item {
                font-size: 14px;
                margin: 0 6px;
                width: 60px;
                cursor: pointer;
                text-align: center;
                border: 1px solid #dcdfe6;
            }
            .item:first-child {
                margin: 0 6px 0 0;
            }
        }
    }
    .select-container {
        max-width: 1100px;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
        margin: 0 20px;
        height: 500px;
        border: 1px solid #dcdfe6;
        .year {
            width: 130px;
            height: 28px;
            font-size: 13px;
            line-height: 28px;
        }
        .el-descriptions {
            margin: 10px 0;
            position: relative;

            .error-msg {
                color: @danger;
                font-size: 12px;
                position: absolute;
                left: 43%;
                top: 90px;
            }
            .setHeightA {
                width: 100px;
                height: 28px;
                overflow: hidden;
            }
            .setHeight {
                width: 300px;
                height: 28px;
                overflow: hidden;
            }
        }

        .setPicker-year {
            width: 130px;
            /deep/.el-input__inner {
                border: 1px solid transparent;
            }
        }
        .setPicker-timer {
            width: 100px;
            /deep/.el-input__inner {
                border: 1px solid transparent;
            }
        }
    }
}
</style>
