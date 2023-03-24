import request from './request'

export async function getBlogCategories() {
    console.log('object')
    return await request.get('/api/blog/type')
}

export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, { params: commentInfo })
}

export async function getComments(id) {
    return await request.get(`/api/comment/${id}`)
}
