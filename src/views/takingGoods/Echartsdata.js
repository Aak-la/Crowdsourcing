import { isShowRed } from '../../utils/isShowRed'
let classifyOptions = {
    title: {
        left: 'center',
        text: '分类'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 130, name: '家电类 ' },
                { value: 20, name: '母婴类' },
                { value: 90, name: '数码类' },
                { value: 484, name: '食品类' },
                { value: 300, name: '生活用品类' },
                { value: 180, name: '服装类' },
                { value: 260, name: '酒水类' },
                { value: 450, name: '家具类' },
                { value: 250, name: '配料类' }
            ],
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

let lienArr = [120, 420, 150, 80, 70, 110, 130, 192, 400, 100, 419, 320]
let lineOptions = {
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
            data: isShowRed(lienArr, 300),
            type: 'bar'
        }
    ]
}

let orderOptions = {
    title: {
        left: 'center',
        text: '月订单对比'
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
            data: [
                150,
                230,
                224,
                218,
                135,
                147,
                260,
                150,
                230,
                224,
                218,
                135,
                147,
                260
            ],
            type: 'line'
        }
    ]
}

export { classifyOptions, lineOptions, orderOptions }
