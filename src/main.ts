import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import '../public/iconfont/iconfont.css'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'
// import * as echarts from 'echarts';
// import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
app.use(router)
app.use(createPinia().use(persist))
app.use(VueApexCharts)
app.use(ElementPlus,{
    locale: zhCn,
  })
  // app.config.globalProperties.$message = ElMessage
// app.config.globalProperties.$message = message
app.mount('#app')