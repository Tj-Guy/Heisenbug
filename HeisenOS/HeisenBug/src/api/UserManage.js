import request from '../utils/request'

// // 获取用户信息表
// export function getUserInfo() {
//     request({
//         url: '/GetAllInnerId',
//         method: 'get',
//     }).then(res => {
//         res.data.innerId
//     })
// }

// 获取用户信息
export function getUserInfo(params) {
    return request({
        url: '/GetUserInfo',
        method: 'get',
        params,
    })
}

// 创建用户，提交用户信息
export function newUserInfo(params) {
    return request({
        url: '/NewUserInfo',
        method: 'post',
        params,
    })
}

// 删除用户
export function delUser(params) {
    return request({
        url: '/delUser',
        method: 'get',
        params,
    })
}

// 更改用户信息
export function changeUserInfo(params) {
    return request({
        url: '/ChangeUserInfo',
        method: 'post',
        params,
    })
}

// 获取用户内部编码
export function getInnerId(params) {
    return request({
        url: '/getInnerId',
        method: 'get',
        params,
    })
}

// 用户绑卡
export function bindBankCard(params) {
    return request({
        url: '/bindBankCard',
        method: 'post',
        params,
    })
}

// 查找银行卡
export function findBankCard(params) {
    return request({
        url: '/findBankCard',
        method: 'get',
        params,
    })
}

// 银行卡充值
export function rechargeCard(params) {
    return request({
        url: '/rechargeCard',
        method: 'get',
        params,
    })
}

// 银行卡解绑
export function dismissBankCard(params) {
    return request({
        url: '/bindBankCard',
        method: 'post',
        params,
    })
}

