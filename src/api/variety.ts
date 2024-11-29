import http from '../utils/request'
//获取所有的品种信息
export function getAllVarieties(params: any) {
    return http.get(`/api/v1/varieties`,params)
}
//获取某个品种的统计数据
export function getVarietyStatistics(params: any) {
    return http.get(`/api/v1/varieties/statistics`,params)
}