// 分析错误代码
export function codeResult(resultCode) {
    switch (resultCode) {
        case 1:
        case 2:
            return "操作正常"
        case -1:
            return "数据类型错误"
        case -2:
            return "输入代码检索失败"
        case -3:
            return "关键信息为空"
        case -101:
            return "查询的账户已经被注销"
        case -102:
            return "查询的账户已经被注册"
        case -103:
            return "查询的账户未被注册"
        case -121:
            return "查询得到信息为空"
        case -201:
            return "创建用户核心信息表失败"
        case -202:
            return "创建用户详细信息表失败"
        case -301:
            return "解绑失败，其还有余额"
        default:
            return "未知失败"
    }
}