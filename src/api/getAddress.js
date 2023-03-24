import request from './outRequest'
export async function getAddress() {
    return await request.get('/v3/config/district?parameters', {
        params: {
            key: '689d2283f845547f7c01b91be099e151',
            keyWords: '中国',
            subdistrict: 3
        }
    })
}
