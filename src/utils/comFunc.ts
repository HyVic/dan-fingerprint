//权限判断
export const checkLimitation = (key:string, list:string[]) => {
    const exit = list ? list.some(item => item === key) : false // 检测数组中元素是否满足指定条件
    return exit
}