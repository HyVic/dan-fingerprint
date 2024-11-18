import { createRouter, createWebHashHistory  } from 'vue-router'
// import HomeIndex from '../views/IndexPage.vue'
const router = createRouter({
    history: createWebHashHistory (),
    routes: [
        {
            path: '/',
            name: 'IndexPage',
            component: () => import('../views/IndexPage.vue'),
            meta:{keepAlive: true},
            redirect: {
                name: 'HomePage'
            },
            children:[
                {
                    path: '/home',
                    name: 'HomePage',
                    meta:{title:"首页"},
                    component: () => import('../views/HomePage.vue')
                },
                {
                    path: '/fingerprint',
                    name: 'FingerprintSearch',
                    meta:{title:"指纹识别"},
                    component: () => import('../components/information-search/FingerprintSearch.vue')
                },
                {
                    path: '/snpmarker',
                    name: 'SNPMarkerSearch',
                    meta:{title:"SNP标记"},
                    component: () => import('../components/information-search/SNPMarkerSearch.vue')
                },
                {
                    path: '/varietysimilarityanalysis',
                    name: 'VarietySimilarityAnalysis',
                    meta:{title:"品种相似度分析"},
                    component: () => import('../components/information-search/VarietySimilarityAnalysis.vue')
                },
                {
                    path: '/varietydifferenceanalysis',
                    name: 'VarietyDifferenceAnalysis',
                    meta:{title:"品种差异分析"},
                    component: () => import('../components/information-search/VarietyDifferenceAnalysis.vue')
                },
                {
                    path: '/predictionofhybridparents',
                    name: 'PredictionOfHybridParents',
                    meta:{title:"杂交亲本预测"},
                    component: () => import('../components/information-search/PredictionOfHybridParents.vue')
                },
                {
                    path: '/information-management',
                    name: 'AccountInformationManagement',
                    meta:{title:"企业账户管理"},
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
export default router