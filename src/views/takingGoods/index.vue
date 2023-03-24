<template>
    <Layout>
        <template #left>
            <div class="aside">
                <SiteAside />
            </div>
        </template>
        <template>
            <div class="takingGoodsContent">
                <div class="classifyEcharts">
                    <echartBlueprint :options="classifyOptions" />
                </div>
                <div class="lineEcharts">
                    <echartBlueprint :options="lineOptions" name="line" />
                </div>
                <div class="orderEcharts">
                    <echartBlueprint :options="orderOptions" name="order" />
                </div>
            </div>
            <div class="DataAnalysis"></div>
        </template>
    </Layout>
</template>
<script>
import { classifyOptions, lineOptions, orderOptions } from './Echartsdata'
import echartBlueprint from '../../components/echartBlueprint'
import Layout from '@/components/Layout'
import SiteAside from '@/components/SiteAside'
export default {
    components: { Layout, SiteAside, echartBlueprint },
    data() {
        return { classifyOptions, lineOptions, orderOptions }
    },
    created() {},
    computed: {},
    methods: {}
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
        width: 740px;
        height: 350px;
    }
    .setEcharetsTitle {
        position: absolute;
    }
}
</style>
