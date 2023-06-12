<template>
    <div class="theWatermark-container" ref="theWatermark"></div>
</template>
<script>
export default {
    data() {
        return {
            dependOnTheData: 0,
            ob: null
        }
    },
    props: {
        msg: { required: false, default: '仿冒必究' },
        fillStyle: { required: false, default: 'rgba(0, 0, 0, 0.2)' },
        textAlign: { required: false, default: 'center' },
        textBaseline: { required: false, default: 'middle' },
        angle: { required: false, default: (-30 * Math.PI) / 180 }
    },
    created() {},
    methods: {
        initWatermark(text) {
            var canvas = document.createElement('canvas')
            canvas.id = 'watermark-canvas'
            canvas.width = 300
            canvas.height = 300
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            var ctx = canvas.getContext('2d')
            ctx.font = '26px Arial'
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(this.angle)
            ctx.fillText(text, 0, 0)
            var dataUrl = canvas.toDataURL()
            document.body.removeChild(canvas)
            var watermark = document.createElement('div')
            watermark.style.position = 'absolute'
            watermark.style.top = '0'
            watermark.style.left = '0'
            watermark.style.width = '100%'
            watermark.style.height = '100%'
            watermark.style.backgroundImage = 'url(' + dataUrl + ')'
            watermark.style.pointerEvents = 'none'
            this.$refs.theWatermark.appendChild(watermark)
        }
    },
    watch: {},
    mounted() {
        this.ob = new MutationObserver((change) => {
            for (const iterator of change) {
                for (const iterator of iterator.removedNodes) {
                    this.initWatermark(this.msg)
                }
            }
        })
        this.ob.observe(this.$refs.theWatermark.parentNode, {
            childList: true,
            attributes: true,
            subtree: true
        })
        this.initWatermark(this.msg)
    },
    destroyed() {
        this.ob && this.ob.disconnect()
    }
}
</script>
<style lang="less" scoped>
.theWatermark-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
