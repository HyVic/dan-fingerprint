import http from '../utils/request'
//获取所有的物种信息
export function getAllSpecies() {
    return http.get(`/api/v1/species`)
}