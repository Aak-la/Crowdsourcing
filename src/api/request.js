import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:8080/',
})
request.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bear ' + token;
    } else {
        const newToken = localStorage.getItem('localStorageToken')
        config.headers.Authorization = 'Bear ' + newToken;
    }
    return config;
});

request.interceptors.response.use(function (res) {
    if (res.data.state == 400) {
        alert(res.data.msg)
        return null
    }
    return res.data
})

export default request
