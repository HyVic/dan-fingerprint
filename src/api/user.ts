import http from '../utils/request'
//获取用户信息
export function getUserInfo() {
    /*     return http.request({
            url: 'api/v1/user/info',
            method: 'get'
        }) */
    return http.get("/api/v1/user/info")
}
//用户登录
export function postLogin(params: any) {
    return http.post("/api/v1/user/login", params)
/*     .then(res => {
        console.log('res', res)
        return res
    }).catch(err => {
        console.log('err', err)
        return err
    }) */
}
//修改密码
export function putPassword(params: any) {
    return http.put('api/v1/user/password',params)
}
//获取用户拥有的权限
export function getPermissions() {
    return http.get('api/v1/user/permissions')
}
//更新令牌
export function getRefresh() {
    return http.get('api/v1/user/refresh')
}
//用户注册
export function postRegister(params: any) {
    return http.post("/api/v1/user/register", params)
}