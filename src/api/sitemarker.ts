import http from '../utils/request'
//获取物种所有的位点信息
export function getAllSnpmarkers(params: any) {
    return http.get(`/api/v1/snpmarkers`,params)
}