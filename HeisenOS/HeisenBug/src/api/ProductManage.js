import request from '../utils/request'

//创建产品
export function submitProduct(params) {
    return request({
        url: '/updateFundInfo',
        method: 'post',
        params,
        // headers: {
        //     'Authorization': JSON.parse(localStorage.Authorization)
        // }
    })
}

//发送请求获得产品代码，从而获得列表
export function searchIndex(params) {
    return request({
        url: '/getFundCode',
        method: 'get',
        params,
        // headers: {
        //     'Authorization': JSON.parse(localStorage.Authorization)
        // }
    })
}

//发送请求获得产品详细信息
export function searchDetail(params) {
    return request({
        url: '/getFundInfo',
        method: 'get',
        params,
        // headers: {
        //     'Authorization': JSON.parse(localStorage.Authorization)
        // }
    })
}

//发送请求获得产品详细信息
export function updateProduct(params) {
    return request({
        url: '/updateFundInfo',
        method: 'post',
        params,
        // headers: {
        //     'Authorization': JSON.parse(localStorage.Authorization)
        // }
    })
}

//发送请求获得产品详细信息
export function deleteProduct(params) {
    return request({
        url: '/delFund',
        method: 'get',
        params,
        // headers: {
        //     'Authorization': JSON.parse(localStorage.Authorization)
        // }
    })
}