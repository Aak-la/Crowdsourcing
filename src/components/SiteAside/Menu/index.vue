<template>
    <nav class="menu-container">
        <RouterLink
            :exact="item.exact"
            v-for="item in items"
            :key="item.link"
            :to="{ name: item.name }"
            active-class="selected"
            exact-active-class=""
        >
            <div class="icon">
                <svg-icon :icon-class="item.icon" />
            </div>
            <span>{{ item.title }}</span>
        </RouterLink>
    </nav>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'
export default {
    components: {
        Icon
    },
    data() {
        return {
            items: [
                {
                    name: 'home',
                    title: '添加商品',
                    icon: 'tianjia',
                    exact: true
                },

                {
                    name: 'goods',
                    title: '商品管理',
                    icon: 'shangping',
                    exact: true
                },
                {
                    name: 'order',
                    title: '订单管理',
                    icon: 'dingdan',
                    exact: true
                },
                {
                    name: 'takingGoods',
                    title: '进货阅览',
                    icon: 'jinhuo',
                    exact: true
                }
            ]
        }
    },
    created() {
        this.initRouter()
    },
    methods: {
        initRouter() {
            if (this.Permissions == 0) {
                this.items.push(
                    {
                        name: 'classify',
                        title: '分类管理',
                        icon: 'fenglei',
                        exact: false
                    },
                    {
                        name: 'backgroundManagement',
                        title: '后台管理',
                        icon: 'guanli',
                        exact: true
                    }
                )
            }
        }
    },
    computed: { ...mapGetters(['Permissions']) }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.menu-container {
    color: @gray;
    margin: 24px 0;
    a {
        &.selected {
            background: darken(@words, 3%);
        }
        padding: 0 50px;
        display: block;
        display: flex;
        align-items: center;
        height: 45px;
        .icon {
            width: 24px;
        }
        &:hover {
            color: #fff;
        }
    }
}
</style>
