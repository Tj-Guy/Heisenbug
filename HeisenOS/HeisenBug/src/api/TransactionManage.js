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
        method: 'post',
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
export function getFundInfo(params) {
    return request({
        url: '/getFundInfo',
        method: 'get',
        params,
    })
}

// 19、getUserAccount（GET）
// 接口作用：获得指定用户卡持仓
// 接口请求地址：IP:9091/getUserAccount
// 请求参数：
// @RequestParam(value = "card_id")String cardId,
// @RequestParam(value = "c_inner_ID")int cInnerId
// 返回参数：返回表格
export function getUserAccount(params) {
    return request({
        url: '/getUserAccount',
        method: 'get',
        params,
    })
}



// 18、cancelOrder（GET）
// 接口作用：撤回当前订单列
// 接口请求地址：IP:9091/cancelOrder
// 请求参数：
// @RequestParam(value = "fTradeType")int TradeMethod,
// @RequestParam(value = "fTradeStreamId")int fTradeStreamId
// 返回参数：返回代码
export function cancelOrder(params) {
    return request({
        url: '/cancelOrder',
        method: 'get',
        params,
    })
}

// 24、saveCal(GET)
// 接口作用：最终确定清算结果
// 接口请求地址：IP:9091/saveCal
// 请求参数：
// 返回参数：返回代码
// 上面三个接口都一个原理，我放一张图，以此类推即可
export function saveCal() {
    return request({
        url: '/saveCal',
        method: 'get',
    })
}

// 23、reCal（GET）
// 接口作用：进行重算
// 接口请求地址：IP:9091/cal
// 请求参数：无
// 返回参数：返回代码，并且注意重新打开数据界面时要刷新，即重新从后台读取新的数据
export function reCal() {
    return request({
        url: '/reCal',
        method: 'get',
    })
}

// 22、cal(GET)
// 接口作用：进行清算
// 接口请求地址：IP:9091/cal
// 请求参数：无
// 返回参数：返回代码，并且注意重新打开数据界面时要刷新，即重新从后台读取新的数据
export function cal() {
    return request({
        url: '/cal',
        method: 'get',
    })
}

// 20、getNextDay（GET）
// 接口作用：获得指定用户卡持仓
// 接口请求地址：IP:9091/getNextDay
// 请求参数：
// 返回参数：返回下一天的字符串
export function getNextDay(params) {
    return request({
        url: '/getNextDay',
        method: 'get',
        params,
    })
}


export function getFundWorthList(params) {
    return request({
        url: '/getFundWorthList',
        method: 'get',
        params,
    })
}




