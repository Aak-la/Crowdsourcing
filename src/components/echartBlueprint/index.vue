<template>
    <div class="echartContainer" :id="`echartContainer${name}`"></div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        options: {
            type: Object,
            default: () => {},
            require
        },
        name: {
            type: String,
            default: 'cs'
        }
    },
    mounted() {
        this.initEchart()
    },
    methods: {
        initEchart() {
            let dom = this.$echarts.init(
                document.getElementById(`echartContainer${this.name}`)
            )
            dom.setOption(this.options)
        }
    }
}
</script>
<style lang="less" scoped>
.echartContainer {
    .set-echartsContainer();
}
</style>
