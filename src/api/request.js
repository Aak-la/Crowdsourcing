import axios from 'axios'
const API_BASE_URL = 'http://localhost:8080/'
const request = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
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
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use(function (res) {
    if (res.data.state == 400) {
        alert(res.data.msg)
        return null
    }
    return res.data
})

export default request
