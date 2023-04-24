import request from './request'
export async function imgEdit(src) {
    return await request.get('/api/img', `${src}`)
}