import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'LoginPage',
            component: () => import('../views/LoginPage.vue'),
            meta: { keepAlive: true },
        },
        {
            path: '/index',
            name: 'IndexPage',
            component: () => import('../views/IndexPage.vue'),
            meta: { keepAlive: true },
            redirect: {
                name: 'HomePage'
            },
            children: [
                {
                    path: '/home',
                    name: 'HomePage',
                    meta: { title: "首页" },
                    component: () => import('../views/HomePage.vue')
                },
                {
                    path: '/information-search/fingerprint',
                    name: 'FingerprintSearch',
                    meta: { title: "指纹识别" },
                    component: () => import('../components/information-search/FingerprintSearch.vue')
                },
                {
                    path: '/information-search/snpmarker',
                    name: 'SNPMarkerSearch',
                    meta: { title: "SNP标记" },
                    component: () => import('../components/information-search/SNPMarkerSearch.vue')
                },
                {
                    path: '/information-search/varietysimilarityanalysis',
                    name: 'VarietySimilarityAnalysis',
                    meta: { title: "品种相似度分析" },
                    component: () => import('../components/information-search/VarietySimilarityAnalysis.vue')
                },
                {
                    path: '/information-search/varietydifferenceanalysis',
                    name: 'VarietyDifferenceAnalysis',
                    meta: { title: "品种差异分析" },
                    component: () => import('../components/information-search/VarietyDifferenceAnalysis.vue')
                },
                {
                    path: '/information-search/predictionofhybridparents',
                    name: 'PredictionOfHybridParents',
                    meta: { title: "杂交亲本预测" },
                    component: () => import('../components/information-search/PredictionOfHybridParents.vue')
                },
                {
                    path: '/information-management',
                    name: 'AccountInformationManagement',
                    meta: { title: "企业账户管理" },
                    component: () => import('../components/information-management/AccountInformationManagement.vue')
                }
            ]
        },
    ],
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 };
    }
})
router.beforeEach((to, from, next) => {
    if (to.name === 'LoginPage') {
        next()
    } else {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next({ name: 'LoginPage' })
        }
    }
})
export default router