/* import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from '../../public/config'
class HttpRequest {
    private readonly baseUrl: string;
    constructor() {
        this.baseUrl = config.apiUrl
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,// 所有的请求地址前缀部分(没有后端请求不用写)
            timeout: 80000, // 请求超时时间(毫秒)
            withCredentials: true,// 异步请求携带cookie
        }
        return config
    }

    // 请求拦截
    interceptors(instance: AxiosInstance, url: string | number | undefined) {
        instance.interceptors.request.use(config => {
            // 添加全局的loading..
            // 请求头携带token
            return config
        }, (error: any) => {
            return Promise.reject(error)
        })
        //响应拦截
        instance.interceptors.response.use(res => {
            //返回数据
            const { data } = res
            console.log('返回数据处理', res, url)
            return data
        }, (error: any) => {
            console.log('error==>', error)
            return Promise.reject(error)
        })
    }

    request(options: AxiosRequestConfig) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

const http = new HttpRequest()
export default http
 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import configUrl from '../../public/config'
//声明模型参数
type TAxiosOption = {
    timeout: number;
    baseURL: string;
}

//配置赋值
const config: TAxiosOption = {
    timeout: 5000,
    baseURL: configUrl.apiUrl,    // 本地api接口地址
}

class Http {
    service;
    constructor(config: TAxiosOption) {
        this.service = axios.create(config)

        /* 请求拦截 */
        this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            //可以在这里做请求拦截处理   如：请求接口前，需要传入的token
            // debugger;
            return config
        }, (error: any) => {
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
            // debugger;
            console.log('response==>', response.data)
            switch (response.data.code) {
                case 0:
                    return response.data;
                case 200:
                    return response.data;
                case 500:
                    //这里面可以写错误提示，反馈给前端
                    return response.data;
                case 99991:
                    return response.data;
                case 99992:
                    return response.data;
                case 99998:
                    return response.data;
                default:
                    break;
            }
        }, (error: any) => {
            return Promise.reject(error)
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.post(url, params, _object)
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
}

export default new Http(config)