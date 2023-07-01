import request from './request'
export async function imgUpload(fd) {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    return await request.post('/api/upload', fd, config)
}