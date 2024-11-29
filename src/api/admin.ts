import http from '../utils/request'
//获取所有用户
export function getAllUsers(params: any) {
    return http.get(`/api/v1/admin/users`,params)
}
//添加用户
export function addUsers(params: any) {
    return http.post(`/api/v1/admin/users`, params)
}
//给用户添加角色
export function addUsersRoles(params: any) {
    return http.put(`/api/v1/admin/users/roles`, params)
}
//删除用户
export function deleteUsers(id: number) {
    return http.delete(`/api/v1/admin/users/${id}`)
}
//重置用户密码
export function resetPassword(id: number,params: any) {
    return http.put(`/api/v1/admin/password/${id}`, params)
}


//获取所有权限
export function getAllPermissions() {
    return http.get(`/api/v1/admin/permissions`)
}
//获取所有角色
export function getAllRoles(params: any) {
    return http.get(`/api/v1/admin/roles`,params)
}
//新建角色
export function addRoles(params: any) {
    return http.post(`/api/v1/admin/roles`, params)
}
//给角色添加权限
export function addPermissions(params: any) {
    return http.put(`/api/v1/admin/roles/permissions`, params)
}
//删除角色
export function deleteRoles(id: number) {
    return http.delete(`/api/v1/admin/roles/${id}`)
}
//更新角色
export function updateRoles(id: number,params: any) {
    return http.put(`/api/v1/admin/roles/${id}`,params)
}


//新建物种snpmarker
export function addSnpmarker(params: any) {
    return http.post(`/api/v1/admin/snpmarker`, params)
}
//新建物种
export function addSpecies(params: any) {
    return http.post(`/api/v1/admin/species`, params)
}
//新建品种
export function addVarieties(params: any) {
    return http.post(`/api/v1/admin/varieties`, params)
}
//新建品种基因
export function addVarietyGenotype(params: any) {
    return http.post(`/api/v1/admin/variety_genotype`, params)
}