export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home'),
        meta: {
            title: '添加商品',

            isAuthenticated: true
        }
    },
    {
        name: 'order',
        path: '/order',
        component: () => import('@/views/order'),
        meta: {
            title: '商品订单',
            isAuthenticated: true,
            activeMenuName: 'basinMgr'
        }
    },
    {
        name: 'createOrder',
        path: '/createOrder',
        component: () => import('@/views/order/createOrder'),
        meta: {
            title: '创建订单',
            isAuthenticated: true,
            activeMenuName: 'basinMgr'
        }
    },
    {
        name: 'classify',
        path: '/classify',
        component: () => import('@/views/classify'),
        meta: {
            title: '商品分类',

            isAuthenticated: true
        }
    },
    {
        name: 'goods',
        path: '/goods',
        component: () => import('@/views/goods'),
        meta: {
            title: '商品条目',

            isAuthenticated: true
        }
    },
    {
        name: 'takingGoods',
        path: '/takingGoods',
        component: () => import('@/views/takingGoods'),
        meta: {
            title: '进货管理',

            isAuthenticated: true
        }
    },
    ,
    {
        name: 'backgroundManagement',
        path: '/backgroundManagement',
        component: () => import('@/views/backgroundManagement'),
        meta: {
            title: '后台管理',

            isAuthenticated: true
        }
    },
    {
        name: 'SignIn',
        path: '/',
        component: () => import('@/views/SignIn'),
        meta: {
            title: '登录',
            activeMenuName: 'basinMgr'
        }
    },
    {
        name: 'Register',
        path: '/register',
        component: () => import('@/views/Register'),
        meta: {
            title: '注册',
            activeMenuName: 'basinMgr'
        }
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/404'),
        meta: {
            title: '404',
            activeMenuName: 'basinMgr'
        }
    },
    {
        name: 'drag',
        path: '/drag',
        component: () => import('@/views/drag'),
        meta: {
            title: 'drag',
            activeMenuName: 'basinMgr'
        }
    }
]
