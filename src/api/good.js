import request from './request'
export async function addGood(data) {
    return await request.post('/api/goods/add', { pragma: data })
}
export async function getGood() {
    return await request.get('/api/goods/get')
}
export async function deleteGood(id) {
    return await request.get('/api/goods/delete/' + `${id}`)
}
export async function updateGood(data) {
    return await request.get('/api/goods/delete/', { pragma: data })
}

