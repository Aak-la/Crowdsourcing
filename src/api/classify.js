import request from './request'
export async function addClassify(data) {
    return await request.post('/api/classify/add', { pragma: data })
}
export async function getClassify() {
    return await request.get('/api/classify/get')
}
export async function deleteClassify(data) {
    return await request.post('/api/classify/delete', { pragma: data })
}
