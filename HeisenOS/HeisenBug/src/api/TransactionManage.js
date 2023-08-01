import request from '../utils/request'

export function Test() {
    return request({
        url: '/Test',
        method: 'get',
    })
}

// 获取用户信息
export function GetUserInfo(params) {
    return request({
        url: '/GetUserInfo',
        method: 'get',
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


// 查找银行卡
export function findBankCard(params) {
    return request({
        url: '/findBankCard',
        method: 'get',
        params,
    })
}

// 查找订单信息
//@RequestParam(value = "card_id")String cardId,
//@RequestParam(value = "c_inner_ID")int cInnerId

export function getTradeList(params) {
    return request({
        url: '/getTradeList',
        method: 'get',
        params,
    })
}

//赎回指定基金
// @RequestParam(value = "f_id") String fId,
// @RequestParam(value = "card_id")String cardId,
// @RequestParam(value = "c_inner_ID")int cInnerId,
// @RequestParam(value = "portion")float portion
export function sellFund(params) {
    return request({
        url: '/sellFund',
        method: 'post',
        params,
    })
}

//赎回指定基金
// @RequestParam(value = "f_id") String fId,
// @RequestParam(value = "card_id")String cardId,
// @RequestParam(value = "c_inner_ID")int cInnerId,
// @RequestParam(value = "amount")float amount

export function buyFund(params) {
    return request({
        url: '/buyFund',
        method: 'post',
        params,
    })
}

// getFundCode（GET）
// 接口作用：获得指定基金信息
// 接口请求地址：IP:9091/getFundInfo
// 请求参数：@RequestParam(value = "fragment") String fragment
// 返回参数：返回代码与列表
export function getFundCode(params) {
    return request({
        url: '/getFundInfo',
        method: 'get',
        params,
    })
}

