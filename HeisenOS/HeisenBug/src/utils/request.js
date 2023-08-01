import axios from 'axios'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    // 外网更新
    // baseURL: 'http://xxxxx',
    baseURL: '/api/9091',
    headers: {},
    timeout: 5000 // request timeout
})

export default service
