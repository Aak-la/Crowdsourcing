import axios from 'axios'
const token = localStorage.getItem('token')
const ins = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: 'Bearer ' + token
    }
})
ins.interceptors.response.use(function(res) {
    if (res.data.state == 400) {
        alert(res.data.msg)
        return null
    }
    return res.data
})

export default ins
