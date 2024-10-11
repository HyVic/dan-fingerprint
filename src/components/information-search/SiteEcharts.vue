<template>
  <div class="echarts-container" :class="[{'active0': status==='0'},{'active1': status==='1'}]" ref="viewRef">
    <div class="tooltip">
        <div class="title">
            <div class="ref" v-if="status==='0'"></div><span v-if="status==='0'">REF</span>
            <div class="alt" v-if="status==='0'"></div><span v-if="status==='0'">ALT</span>
            <div class="het"></div>{{ status==='0'? 'HET' : 'DIF' }}
        </div>
        <div>
            <i class="iconfont icon-xiazai1" title="下载" @click="onDownload"></i>
            <i class="iconfont icon-fangda1" title="放大" @click="onEnlarge"></i>
        </div>
        <!-- <i class="iconfont icon-suoxiao1"></i> -->
    </div>
    <div class="echarts-container-outer">
        <div class="echarts-container-inner" v-for="(item,index) in allEcharts" :key="item.title">
             <span class="title">{{ item.title }}</span>
            <div class="line_container">
                <el-scrollbar>
                    <div style="display: flex;" v-if="status==='0'">
                        <div v-for="(list,i) in item.data" class="line_item" :class="[{'active_ref':list.name==='REF'},{'active_alt':list.name==='ALT'},{'active_het':list.name==='HET'}]" :key="i" @mouseover="showLineDetail = i"></div>
                    </div>
                    <div style="display: flex;" v-if="status==='1'">
                        <div v-for="(list,i) in item.data" class="line_item" :class="[{'active_none':list.name==='REF' || list.name==='ALT'},{'active_dif':list.name==='HET'}]" :key="i" @click="showCellDetail = true"></div>
                    </div>
                </el-scrollbar>
            </div>
        </div>  
    </div>
  </div>
  <table-cell-detail v-if="showCellDetail" @close="showCellDetail = false"></table-cell-detail>
  <enlarge-page v-if="showEnlarge" :status="status" @enlarge="showEnlarge = false" type="site"></enlarge-page>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import TableCellDetail from '../information-search/TableCellDetail.vue'
    import EnlargePage from '../common/EnlargePage.vue'
    import html2canvas from 'html2canvas';
    const viewRef = ref<any>(null);
    const showLineDetail = ref(-1);
    const showCellDetail = ref(false);
    const showEnlarge = ref(false);
    // const hide = ref(true);
    defineProps({
        status: String,
    })
    const allEcharts = ref<any[]>([
                {
                    title: 1,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'REF'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        },{
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'ALT'
                        },{
                            name: 'HET'
                        }
                    ]
                },
                {
                    title: 2,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 3,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 4,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 5,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 6,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 7,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 8,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 9,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }
                    ]
                },
                {
                    title: 10,
                    data: [{
                        name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        },{
                            name: 'REF'
                        }, {
                            name: 'ALT'
                        }, {
                            name: 'HET'
                        }, {
                            name: 'ALT'
                        }
                    ]
                }
            ])
    const onEnlarge = () => {
        console.log('enlarge')
        showEnlarge.value = true
    }
    const onDownload = () => {
        (async () => {
            // hide.value = false
        try {
            const canvas = await html2canvas(viewRef.value, { useCORS: true });
            const img = canvas.toDataURL('image/png');
    
            const link = document.createElement('a');
            link.href = img;
            link.download = 'view.png';
            link.click();
        } catch (error) {
            console.error('Error capturing view as image:', error);
        }
        })();
    }
    onMounted(() => {
    });
</script>
<style scoped lang="scss">
 .echarts-container{
    .tooltip{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        margin-bottom: 20px;
        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            div:first-child{
                margin-left: 0 !important;
            }
        }
        .ref{
            width: 40px;
            height: 18px;
            margin-right: 10px;
            background-color: #3ba272;
        }
        .alt{
            width: 40px;
            height: 18px;
            margin-right: 10px;
            background-color: #fac858;
            margin-left: 30px;
        }
        .het{
            width: 40px;
            height: 18px;
            margin-right: 10px;
            background-color: #ee6666;
            margin-left: 30px;
        }
        .iconfont{
            margin-left: 20px;
            font-size: 25px;
            cursor: pointer;
            &:hover{
                color: #ee6666;
            }
        }
    }
    .echarts-container-outer{
        width: 100%;
        display: flex;
        flex-wrap: wrap; 
        .echarts-container-inner{
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .title{
                width: 49px;
                text-align: left;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                // box-shadow: -2px 2px 5px 1px #5d857729;
                font-size: 22px;
                color: #757575;
                background-color: #fafbfa52;
                border: 1px solid #ecf0ef;
                height: 48px;
            }
            .count{
                width: 150px;
            }
            .line_container{
                width: calc(100% - 50px);
                height: 50px;
                display: flex;
                // box-shadow: 1px 2px 5px 1px rgba(58, 95, 82, 0.1607843137);
                border: 1px solid #ecf0ef;
                padding-top: 10px;
                box-sizing: border-box;
                :deep .el-scrollbar{
                    padding: 0 10px;
                }
            }
            .line_item{
                border-right: 1px solid;
                height: 15px;
                position: relative;
                .line_detail{
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    width: 200px;
                    height: 200px;
                    box-shadow: 1px 1px 5px 1px black;
                    transition: ease all 0.3s;
                    z-index: 1;
                }
            }
            .active_ref{
                border-color: #3ba272;
            }
            .active_alt{
                border-color: #fac858;
            }
            .active_het{
                border-color: #ee6666;
                transform-origin: 50% 100%;
                transform: rotate(180deg);
            }
            .active_dif{
                border-color: #ee6666;
                padding: 10px 1px 5px 0;
            }
            .active_none{
                display: none
            }
        }
    }
 }
 .active0{
    @media screen and (min-width: 2001px){
        width: calc(45% - 40px);
        padding: 20px 20px 10px;
    }
    @media screen and (max-width: 2000px){
        width: calc(97% - 40px);
        padding: 20px;
        margin: auto;
    }
 } 
 .active1{
    width: calc(97% - 40px);
    margin: 20px auto;
 }
</style>