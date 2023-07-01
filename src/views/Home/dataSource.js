let Area = [{
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
}]
let Rules = {
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
    ],
    fileLists: [
        {
            required: true,
            message: '请选择图片',
            trigger: 'change'
        }
    ]
}

export {
    Area, Rules
}