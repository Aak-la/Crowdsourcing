import request from './request'
export async function getOrder() {
    return await request.get('/api/order/get')
}
export async function addOrders(data) {
    return await request.post('/api/order/add', { pragma: data })
}
export async function deleteOrder(data) {
    return await request.post('/api/order/delete', { pragma: data }
    )
}