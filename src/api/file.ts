import http from '../utils/request'
//上传文件
export function postFile(params: any) {
    return http.post("/api/v1/file/upload", params)
}
//下载文件
export function downloadFile(filename: any) {
    return http.get(`/api/v1/file/${filename}`)
}
//获取图片流
export function getImageStream(filename: any) {
    return http.get(`/api/v1/file/image/${filename}`)
}