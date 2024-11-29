import type { MessageOptions } from 'element-plus';
import { ElMessage } from 'element-plus';

type optionType = MessageOptions | string
type AppContext = boolean

interface MessageImplements {
    info(option?: optionType, showClose?: AppContext): void;
    warning(option?: optionType, showClose?: AppContext): void;
    success(option?: optionType, showClose?: AppContext): void;
    error(option?: optionType, showClose?: AppContext): void;
}

// message
export function useMessage() {
    class Message implements MessageImplements {
        // 普通提示
        info(option: optionType, showClose: Boolean = true): void {
            ElMessage.info({ massage: option, showClose: showClose });
        }
        // 警告提示
        warning(option: optionType, showClose: Boolean = true): void {
            ElMessage.warning({ massage: option, showClose: showClose });
        }
        // 成功提示
        success(option: optionType, showClose: Boolean = true): void {
            ElMessage.success({ massage: option, showClose: showClose });
        }
        // 错误提示
        error(option: optionType, showClose: Boolean = true): void {
            ElMessage.error({ message: option, showClose: showClose });
        }
    }
    return new Message();
}