import request from '../utils/request'

// 获取用户信息
//@RequestParam(value = "account") int account aka cInnerId
/*{
    "resultCode": 1,//结果代码
    "cIdType": 1,//用户证件号类型
    "cId": "450203200103020132",//用户证件号
    "cType": 1,//用户类型
    "cName": "刘启航",//用户姓名
    "cRiskLevel": 1,//用户风险等级
    "cAddress": "曹安公路4800号同济大学嘉定校区",//用户地址
    "cEmail": "2478167310@qq.com",//用户邮箱
    "cTel": "19992931234",//用户联系方式
    "cRepresentIdType": 0,//法人代表证件类型（默认置0）
    "cRepresentId": null,//法人代表证件号
    "cRegTime": "2023-07-26"//用户注册时间
}
 */
export function getUserInfo(params) {
    return request({
        url: '/GetUserInfo',
        method: 'get',
        params,
    })
}

// 创建用户，提交用户信息
/*@RequestParam(value = "c_ID_type")int cIdType,
@RequestParam(value = "c_ID")String cId,
@RequestParam(value = "c_type")int cType,
@RequestParam(value = "c_name")String cName,
@RequestParam(value = "c_risk_level")int cRiskLevel
 */
export function newUserInfo(params) {
    return request({
        url: '/NewUserInfo',
        method: 'post',
        params,
    })
}

// 删除用户
//@RequestParam(value = "c_inner_ID") int cInnerId
export function delUser(params) {
    return request({
        url: '/delUser',
        method: 'get',
        params,
    })
}

// 更改用户信息
/*@RequestParam(value = "c_inner_ID")int cInnerId,
@RequestParam(value = "c_risk_level")int cRiskLevel,
@RequestParam(value = "c_address") String cAddress,
@RequestParam(value = "c_email")String cEmail,
@RequestParam(value = "c_tel")String cTel,
@RequestParam(value = "c_represent_ID_type")int cRepresentIdType,
@RequestParam(value = "c_represent_ID")String cRepresentId
 */
export function changeUserInfo(params) {
    return request({
        url: '/ChangeUserInfo',
        method: 'post',
        params,
    })
}

// 获取用户内部编码
/*@RequestParam(value = "fragment")*/
export function getInnerId(params) {
    return request({
        url: '/getInnerId',
        method: 'get',
        params,
    })
}

// 用户绑卡
// @RequestParam(value = "c_inner_ID") int cInnerId,
// @RequestParam(value = "card_id") String cardId
export function bindBankCard(params) {
    return request({
        url: '/bindBankCard',
        method: 'post',
        params,
    })
}

// 查找银行卡
// @RequestParam(value = "c_inner_ID") int cInnerId,
export function findBankCard(params) {
    return request({
        url: '/findBankCard',
        method: 'get',
        params,
    })
}

// 银行卡充值
// @RequestParam(value = "card_id") String cardId,
// @RequestParam(value = "amount") float amount
export function rechargeCard(params) {
    return request({
        url: '/rechargeCard',
        method: 'get',
        params,
    })
}

// 银行卡解绑
// @RequestParam(value = "c_inner_ID") int cInnerId,
// @RequestParam(value = "card_id") String cardId
export function dismissBankCard(params) {
    return request({
        url: '/bindBankCard',
        method: 'post',
        params,
    })
}


//获得指定用户卡持仓
// 请求参数：
// @RequestParam(value = "card_id") String cardId,
// @RequestParam(value = "c_inner_ID") int cInnerId
export function getUserAccount(params) {
    return request({
        url: '/getUserAccount',
        method: 'get',
        params,
    })
}

