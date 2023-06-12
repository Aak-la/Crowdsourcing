<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template>
            <div
                class="takingGoodsContent"
                v-loading="loading"
                element-loading-text="拼命加载中"
            >
                <div class="classifyEcharts" ref="classify"></div>
                <div class="lineEcharts" ref="line"></div>
                <div class="orderEcharts" ref="order"></div>
            </div>
            <div class="DataAnalysis"></div>
        </template>
    </Layout>
</template>

<script>
import echartBlueprint from '../../components/echartBlueprint'
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
export default {
    name: 'takingGoods',
    components: { Layout, SiteAside, echartBlueprint },
    data() {
        return {
            echartData: null,
            classify: null,
            line: null,
            order: null,
            loading: true
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            let _this = this
            let ws = new WebSocket('ws://127.0.0.1:3001/')
            ws.onopen = function () {
                ws.send('发送数据')
                console.log('数据发送中...')

                _this.initDom()
            }
            ws.onmessage = function (evt) {
                this.echartData = JSON.parse(evt.data)
                if (this.echartData != null) {
                    _this.renderClassifyChart(this.echartData)
                    _this.renderLineChart(this.echartData)
                    _this.renderOrderChart(this.echartData)
                    _this.loading = false
                }
            }
            ws.onclose = function () {
                console.log('连接关闭了')
            }
        },
        renderClassifyChart(echartData) {
            const option = {
                title: {
                    left: 'center',
                    text: '分类'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: echartData[0],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }

            this.classify.setOption(option)
        },
        renderLineChart(echartData) {
            const option = {
                title: {
                    left: 'center',
                    text: '月订单对比'
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0
                    },
                    data: [
                        '一月',
                        '二月',
                        '三月',
                        '四月',
                        '五月',
                        '六月',
                        '七月',
                        '八月',
                        '九月',
                        '十月',
                        '十一月',
                        '十二月'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: echartData[1],
                        type: 'line'
                    }
                ]
            }

            this.line.setOption(option)
        },
        renderOrderChart(echartData) {
            const option = {
                title: {
                    left: 'center',
                    text: '商品销量'
                },
                xAxis: {
                    type: 'category',
                    data: [
                        '一月',
                        '二月',
                        '三月',
                        '四月',
                        '五月',
                        '六月',
                        '七月',
                        '八月',
                        '九月',
                        '十月',
                        '十一月',
                        '十二月'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: echartData[2],
                        type: 'bar'
                    }
                ]
            }

            this.order.setOption(option)
        },
        initDom() {
            this.classify = this.$echarts.init(this.$refs.classify)
            this.line = this.$echarts.init(this.$refs.line)
            this.order = this.$echarts.init(this.$refs.order)
        }
    }
}
</script>
<style lang="less" scoped>
.takingGoodsContent {
    .set-padding20();
    display: flex;
    position: relative;
    flex-wrap: wrap;
    min-width: 1300px;

    .classifyEcharts {
        width: 350px;
        height: 350px;
    }
    .lineEcharts {
        margin-left: 70px;
        width: 740px;
        height: 350px;
    }
    .orderEcharts {
        width: 900px;
        height: 350px;
    }
    .setEcharetsTitle {
        position: absolute;
    }
}
</style>
