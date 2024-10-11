<template>
    <div class="fingerprint-search">
        <div class="search-result">
          <el-scrollbar height="100%">
            <div class="choose" v-if="!showResult">
                <div class="search-result-snp common">
                    <div class="search-box">
                        <div class="search-input">
                            <el-input v-model="uploadData.searchName" type="text" style="width: 250px" placeholder="请输入品种名称" />
                            <el-input v-model="uploadData.searchNumber" type="text" style="width: 250px" placeholder="请输入品种编号" />
                        </div>
                        <div class="search-btn">
                            <el-button @click="submitSearch(1)"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
                            <el-button @click="reset(1)"><i class="iconfont icon-initial"></i>重置</el-button>
                        </div>
                    </div>
                    <div class="title">本地上传物种数据</div>
                    <div class="table-info">
                        <el-table 
                        stripe 
                        ref="multipleTableRef"
                        :data="tableData"
                        style="width: 100%"
                        @selection-change="handleSelectionChange1"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column type="index" label="序号" width="100" />
                        <el-table-column property="sortName" label="品种名称"/>
                        <el-table-column property="sortKind" label="作物种类" />
                        <el-table-column property="approvalNumber" label="审定编号" />
                        <el-table-column property="registrationNumber" label="登记编号" />
                        <el-table-column property="sortSource" label="品种来源" />

                    </el-table>
                    </div>
                </div>
            </div>
            <div class="result" v-if="showResult">
                <div class="search-result- common" v-for="(item, index) in resultData" :key="index">
                <div class="title">{{item.sortName}}比对结果</div>
                <div class="result-content">
                <div class="chromosome common" id="chromosome">
                  <div class="table-info">
                    <el-table 
                        stripe 
                        ref="multipleTableRef"
                        :data="item.ComparisonResults"
                        style="width: 100%"
                    >
                        <el-table-column property="ID" label="数据库亲本ID"/>
                        <el-table-column property="HeterozygosityRate" label="数据库亲本杂合率"/>
                        <el-table-column property="similarity" label="杂交种与亲本相似性"/>
                    </el-table>
                  </div>
                </div>
                
                <div class="content common" id="images">
                    <div class="table-info">
                    <el-table 
                        stripe 
                        ref="multipleTableRef"
                        :data="item.ComparisonResults2"
                        style="width: 100%"
                    >
                        <el-table-column property="combination" label=""/>
                        <el-table-column property="Parent1" label="亲本1"/>
                        <el-table-column property="Parent2" label="亲本2"/>
                        <el-table-column property="HomozygousSite" label="纯合位点一致率"/>
                        <el-table-column property="HeterozygosityRate" label="杂合位点一致率"/>
                        <el-table-column property="OverallConsistencyRate" label="整体一致率"/>
                    </el-table>
                  </div>
                </div>
              </div>
                </div>
            </div>           
            <div class="dialog-footer">
                <el-pagination v-if="!showResult" :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" @current-change="handlePagination"></el-pagination>
                <div v-if="showResult"></div>
                    <!-- <el-button v-if="!showResult"><i class="iconfont icon-p-footer"></i>清空面板</el-button> -->
                    <el-button v-if="!showResult" @click="showResult = true"><i class="iconfont icon-lujing-6"></i>比对</el-button>
                    <!-- <el-button v-if="!showResult" @click="showResult = true"><i class="iconfont icon-chanpinchaxun"></i>近似筛查</el-button> -->
                    <el-button v-if="showResult" @click="showResult = false"><i class="iconfont icon-initial"></i>返回</el-button>
            </div>
          </el-scrollbar>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import image from '../../assets/zhanwei2.jpg'
import type { TableInstance } from 'element-plus'
import ElPagination from '../common/ElPagination.vue'
import { ref, onUnmounted, watchEffect, nextTick } from 'vue';
const uploadData = ref({
    searchName: '',
    searchNumber: ''
})
const exitData = ref({
    searchName: '',
    searchNumber: ''
})
const submitSearch = (type: number) => {
    console.log(type)
    if(type === 1) {
        console.log(uploadData.value)    
    } else {
        console.log(exitData.value)
    }
}
const reset = (type: number) => {
    if(type === 1) {
        uploadData.value.searchName = ''
        uploadData.value.searchNumber = ''
    } else {
        exitData.value.searchName = ''
        exitData.value.searchNumber = ''
    }
}
  interface User {
    id: number
    sortName: string
    sortKind: string
    approvalNumber: string
    registrationNumber: string
    sortSource: string
  }
  const multipleTableRef = ref<TableInstance>()
  const multipleSelection = ref<User[]>([])
  const tableData: User[] = [
    {
        id: 1,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 2,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 3,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 4,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 5,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 6,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 7,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 8,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 9,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 10,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 11,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
    {
        id: 12,
        sortName: 'string',
        sortKind: 'string',
        approvalNumber: 'string',
        registrationNumber: 'string',
        sortSource: 'string'
    },
  ]
  const handleSelectionChange1 = (val: User[]) => {
    multipleSelection.value = val
  }
  const handleSelectionChange2 = (val: User[]) => {
    multipleSelection.value = val
  }
  const showResult = ref(false)
  interface ChromosomeInfo {
    name:string,
    validCount:string,
  }
  const resultData = ref([
    {
      sortName: '杂交样本：RM2300035',
      ComparisonResults: [
        {
            ID: 'RZ2300002.SNP',
            HeterozygosityRate: '0.149%',
            similarity: '98.837%'
        },
        {
            ID: 'RZ2300001.SNP',
            HeterozygosityRate: '1.330%',
            similarity: '98.721%'
        },
        {
            ID: 'RZ2300021.SNP',
            HeterozygosityRate: '6.97%',
            similarity: '97.896%'
        },
        {
            ID: 'RZ2300074.SNP',
            HeterozygosityRate: '2.360%',
            similarity: '96.019%'
        },
        {
            ID: 'CRX093613',
            HeterozygosityRate: '0.208%',
            similarity: '95.361%'
        },
        {
            ID: 'RZ2300006.SNP',
            HeterozygosityRate: '0.195%',
            similarity: '94.917%'
        },
        {
            ID: 'RZ2300038.SNP',
            HeterozygosityRate: '0.395%',
            similarity: '94.842%'
        },
        {
            ID: 'RZ2300076.SNP',
            HeterozygosityRate: '3.460%',
            similarity: '94.682'
        },
        {
            ID: 'RZ2300019.SNP',
            HeterozygosityRate: '0.195%',
            similarity: '94.60%'
        },
        {
            ID: 'RZ2300033.SNP',
            HeterozygosityRate: '0.584%',
            similarity: '94.586%'
        },
        {
            ID: 'RZ2300015.SNP',
            HeterozygosityRate: '0.205%',
            similarity: '94.575%'
        },
        {
            ID: 'RZ2300014.SNP',
            HeterozygosityRate: '0.251%',
            similarity: '94.502%'
        },
        {
            ID: 'RZ2300067.SNP',
            HeterozygosityRate: '0.246%',
            similarity: '94.366%'
        },
        {
            ID: 'CRX093646',
            HeterozygosityRate: '0.158%',
            similarity: '93.87%'
        },
        {
            ID: 'RZ2300008.SNP',
            HeterozygosityRate: '9.340%',
            similarity: '93.870%'
        },
        {
            ID: 'RZ2300061.SNP',
            HeterozygosityRate: '2.640%',
            similarity: '93.144%'
        },
        {
            ID: 'RZ2300068.SNP',
            HeterozygosityRate: '7.550%',
            similarity: '92.911%'
        },
        {
            ID: 'CRX039322',
            HeterozygosityRate: '0.997%',
            similarity: '92.863%'
        },
        {
            ID: 'D2004558',
            HeterozygosityRate: '0.173%',
            similarity: '92.744%'
        },
        {
            ID: 'D2004629',
            HeterozygosityRate: '0.204%',
            similarity: '92.708%'
        },
      ],
      ComparisonResults2: [
        {
            combination: '预测组合1',
            Parent1: 'RZ2300002.SNP',
            Parent2: 'RZ2300021.SNP',
            HomozygousSite: '99.88%​',
            HeterozygosityRate: '95.40%',
            OverallConsistencyRate: '98.11%'
        },
        {
            combination: '预测组合2',
            Parent1: 'RZ2300001.SNP',
            Parent2: 'RZ2300021.SNP',
            HomozygousSite: '90.37%',
            HeterozygosityRate: '79.92%',
            OverallConsistencyRate: '86.12%'
        },
        {
            combination: '预测组合3',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300006.SNP',
            HomozygousSite: '83.99%',
            HeterozygosityRate: '74.72%',
            OverallConsistencyRate: '80.51%'
        },
        {
            combination: '预测组合4',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300067.SNP',
            HomozygousSite: '83.83%',
            HeterozygosityRate: '74.57%',
            OverallConsistencyRate: '80.34%'
        },
        {
            combination: '预测组合5',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300038.SNP',
            HomozygousSite: '83.76%',
            HeterozygosityRate: '74.38%',
            OverallConsistencyRate: '80.22%'
        },
        {
            combination: '预测组合6',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300033.SNP',
            HomozygousSite: '75.67%',
            HeterozygosityRate: '58.75%',
            OverallConsistencyRate: '68.82%'
        },
        {
            combination: '预测组合7',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300015.SNP',
            HomozygousSite: '75.68%',
            HeterozygosityRate: '58.70%',
            OverallConsistencyRate: '68.80%'
        },
        {
            combination: '预测组合8',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300019.SNP',
            HomozygousSite: '75.53%',
            HeterozygosityRate: '56.60%',
            OverallConsistencyRate: '67.59%'
        },
        {
            combination: '预测组合9',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300014.SNP',
            HomozygousSite: '73.07%',
            HeterozygosityRate: '53.53%',
            OverallConsistencyRate: '64.89%'
        },
        {
            combination: '预测组合10',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300061.SNP',
            HomozygousSite: '72.30%',
            HeterozygosityRate: '53.82%',
            OverallConsistencyRate: '64.70%'
        },

        
        {
            combination: '预测组合11',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300008.SNP',
            HomozygousSite: '72.57%​',
            HeterozygosityRate: '52.86%',
            OverallConsistencyRate: '64.39%'
        },
        {
            combination: '预测组合12',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300068.SNP',
            HomozygousSite: '72.28%',
            HeterozygosityRate: '53.03%',
            OverallConsistencyRate: '64.31%'
        },
        {
            combination: '预测组合13',
            Parent1: 'RZ2300002.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '71.47%',
            HeterozygosityRate: '52.40%',
            OverallConsistencyRate: '63.95%'
        },
        {
            combination: '预测组合14',
            Parent1: 'RZ2300001.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '70.43%',
            HeterozygosityRate: '52.42%',
            OverallConsistencyRate: '63.82%'
        },
        {
            combination: '预测组合15',
            Parent1: 'RZ2300006.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '71.36%',
            HeterozygosityRate: '52.19%',
            OverallConsistencyRate: '63.56%'
        },
        {
            combination: '预测组合16',
            Parent1: 'RZ2300067.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '65.29%',
            HeterozygosityRate: '53.40%',
            OverallConsistencyRate: '63.13%'
        },
        {
            combination: '预测组合17',
            Parent1: 'RZ2300038.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '69.65%',
            HeterozygosityRate: '51.29%',
            OverallConsistencyRate: '63.09%'
        },
        {
            combination: '预测组合18',
            Parent1: 'RZ2300033.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '65.09%',
            HeterozygosityRate: '53.24%',
            OverallConsistencyRate: '62.93%'
        },
        {
            combination: '预测组合19',
            Parent1: 'RZ2300021.SNP',
            Parent2: 'RZ2300024.SNP',
            HomozygousSite: '65.08%',
            HeterozygosityRate: '53.20%',
            OverallConsistencyRate: '62.91%'
        },
        {
            combination: '预测组合20',
            Parent1: 'RZ2300015.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '69.80%',
            HeterozygosityRate: '51.19%',
            OverallConsistencyRate: '62.42%'
        },
      ]
    },
    {
      sortName: '杂交样本：RM2300038',
      ComparisonResults: [
        {
            ID: 'RZ2300004.SNP',
            HeterozygosityRate: '0.192%',
            similarity: '98.602%'
        },
        {
            ID: 'RZ2300060.SNP',
            HeterozygosityRate: '1.330%',
            similarity: '98.537%'
        },
        {
            ID: 'RZ2300055.SNP',
            HeterozygosityRate: '0.308%',
            similarity: '87.994%'
        },
        {
            ID: 'RZ2300017.SNP',
            HeterozygosityRate: '1.020%',
            similarity: '85.300%'
        },
        {
            ID: 'RZ2300009.SNP',
            HeterozygosityRate: '0.856%',
            similarity: '85.154%'
        },
        {
            ID: 'RZ2300063.SNP',
            HeterozygosityRate: '1.520%',
            similarity: '74.074%'
        },
        {
            ID: 'RZ2300065.SNP',
            HeterozygosityRate: '1.510%',
            similarity: '74.018%'
        },
        {
            ID: 'RZ2300030.SNP',
            HeterozygosityRate: '3.560%',
            similarity: '72.524%'
        },
        {
            ID: 'RZ2300024.SNP',
            HeterozygosityRate: '0.388%',
            similarity: '71.941%'
        },
        {
            ID: 'RZ2300032.SNP',
            HeterozygosityRate: '0.716%',
            similarity: '70.629%'
        },
        {
            ID: 'RZ2300021.SNP',
            HeterozygosityRate: '7.000%',
            similarity: '69.915%'
        },
        {
            ID: 'RZ2300045.SNP',
            HeterozygosityRate: '9.320%',
            similarity: '69.694%'
        },
        {
            ID: 'RZ2300018.SNP',
            HeterozygosityRate: '4.190%',
            similarity: '69.573%'
        },
        {
            ID: 'RZ2300031.SNP',
            HeterozygosityRate: '0.187%',
            similarity: '69.501%'
        },
        {
            ID: 'RZ2300052.SNP',
            HeterozygosityRate: '0.800%',
            similarity: '69.213%'
        },
        {
            ID: 'RZ2300022.SNP',
            HeterozygosityRate: '0.532%',
            similarity: '69.108%'
        },
        {
            ID: 'RZ2300008.SNP',
            HeterozygosityRate: '9.440%',
            similarity: '68.991%'
        },
        {
            ID: 'RZ2300043.SNP',
            HeterozygosityRate: '0.304%',
            similarity: '68.846%'
        },
        {
            ID: 'RZ2300059.SNP',
            HeterozygosityRate: '0.284%',
            similarity: '68.737%'
        },
        {
            ID: 'RZ2300026.SNP',
            HeterozygosityRate: '1.290%',
            similarity: '67.806%'
        },
      ],
      ComparisonResults2: [
        {
            combination: '预测组合1',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300060.SNP',
            HomozygousSite: '99.88%​',
            HeterozygosityRate: '95.40%',
            OverallConsistencyRate: '98.11%'
        },
        {
            combination: '预测组合2',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300055.SNP',
            HomozygousSite: '90.37%',
            HeterozygosityRate: '79.92%',
            OverallConsistencyRate: '86.12%'
        },
        {
            combination: '预测组合3',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300010.SNP',
            HomozygousSite: '83.99%',
            HeterozygosityRate: '74.72%',
            OverallConsistencyRate: '80.51%'
        },
        {
            combination: '预测组合4',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300017.SNP',
            HomozygousSite: '83.83%',
            HeterozygosityRate: '74.57%',
            OverallConsistencyRate: '80.34%'
        },
        {
            combination: '预测组合5',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300009.SNP',
            HomozygousSite: '83.76%',
            HeterozygosityRate: '74.38%',
            OverallConsistencyRate: '80.22%'
        },
        {
            combination: '预测组合6',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300063.SNP',
            HomozygousSite: '75.67%',
            HeterozygosityRate: '58.75%',
            OverallConsistencyRate: '68.82%'
        },
        {
            combination: '预测组合7',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300065.SNP',
            HomozygousSite: '75.68%',
            HeterozygosityRate: '58.70%',
            OverallConsistencyRate: '68.80%'
        },
        {
            combination: '预测组合8',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300024.SNP',
            HomozygousSite: '75.53%',
            HeterozygosityRate: '56.60%',
            OverallConsistencyRate: '67.59%'
        },
        {
            combination: '预测组合9',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300018.SNP',
            HomozygousSite: '73.07%',
            HeterozygosityRate: '53.53%',
            OverallConsistencyRate: '64.89%'
        },
        {
            combination: '预测组合10',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300021.SNP',
            HomozygousSite: '72.30%',
            HeterozygosityRate: '53.82%',
            OverallConsistencyRate: '64.70%'
        },

        
        {
            combination: '预测组合11',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300031.SNP',
            HomozygousSite: '72.57%​',
            HeterozygosityRate: '52.86%',
            OverallConsistencyRate: '64.39%'
        },
        {
            combination: '预测组合12',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300022.SNP',
            HomozygousSite: '72.28%',
            HeterozygosityRate: '53.03%',
            OverallConsistencyRate: '64.31%'
        },
        {
            combination: '预测组合13',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300032.SNP',
            HomozygousSite: '71.47%',
            HeterozygosityRate: '52.40%',
            OverallConsistencyRate: '63.95%'
        },
        {
            combination: '预测组合14',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300030.SNP',
            HomozygousSite: '70.43%',
            HeterozygosityRate: '52.42%',
            OverallConsistencyRate: '63.82%'
        },
        {
            combination: '预测组合15',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300052.SNP',
            HomozygousSite: '71.36%',
            HeterozygosityRate: '52.19%',
            OverallConsistencyRate: '63.56%'
        },
        {
            combination: '预测组合16',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300010.SNP',
            HomozygousSite: '65.29%',
            HeterozygosityRate: '53.40%',
            OverallConsistencyRate: '63.13%'
        },
        {
            combination: '预测组合17',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300030.SNP',
            HomozygousSite: '69.65%',
            HeterozygosityRate: '51.29%',
            OverallConsistencyRate: '63.09%'
        },
        {
            combination: '预测组合18',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300017.SNP',
            HomozygousSite: '65.09%',
            HeterozygosityRate: '53.24%',
            OverallConsistencyRate: '62.93%'
        },
        {
            combination: '预测组合19',
            Parent1: 'RZ2300060.SNP',
            Parent2: 'RZ2300009.SNP',
            HomozygousSite: '65.08%',
            HeterozygosityRate: '53.20%',
            OverallConsistencyRate: '62.91%'
        },
        {
            combination: '预测组合20',
            Parent1: 'RZ2300004.SNP',
            Parent2: 'RZ2300043.SNP',
            HomozygousSite: '69.80%',
            HeterozygosityRate: '51.19%',
            OverallConsistencyRate: '62.42%'
        },
      ]
    },
  ])
  const handleResize = () => {
    if(showResult.value) {
            // (document as any).getElementById('images').style.height = `${(document as any).getElementById('chromosome').clientHeight - 20}px`
    }
  }
  const pagination = ref<any>({
      pageNum: 1,
      pageSize: 10,
      total: 1000
  })
  const handlePagination = (currentPage: any) => {
      pagination.value.pageNum = currentPage.pageNum
      pagination.value.pageSize = currentPage.pageSize
  }
watchEffect(() => {
    if(showResult.value) {
        nextTick(() => {
          console.log(222,(document as any).getElementById('chromosome').clientHeight)
        //  (document as any).getElementById('images').style.height = `${(document as any).getElementById('chromosome').clientHeight - 20}px`    
        })
    }
    window.addEventListener('resize', handleResize);
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style scoped lang="scss">
@mixin layout($align-items, $justify-content){
  display: flex;
  align-items: $align-items;
  justify-content: $justify-content;
}
@mixin size($width, $height){
  width: $width;
  height: $height;
}
.fingerprint-search{
    @include size(calc(100% - 20px),calc(100% - 20px));
    @include layout(center,space-between);
    box-shadow: 0 2px 10px 1px #00000026;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
  .search-result{
    @include size(100%,100%);
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow-x: hidden;
    :deep .el-scrollbar__view{
      height: 100%;
    }
    .choose{
        @include layout(center, space-between);
        height: calc(100% - 60px);
    }
    .result{
        @include size(calc(100% - 10px),auto);
        .search-result-{
            width: calc(100% - 0px);
        }
        .result-content{
        @include layout(flex-start, space-between);
        .content{
          box-sizing: border-box;
          width: 60%;
          /* .item{
            width: calc(100% - 12px);
            @include layout(center,center);
            img{
              width: 95%;
              height: auto !important;
            }
          } */
        }
        .chromosome{
          width: 40%;
        }
      }
    }
    .common{
      height: calc(100% - 10px);
      margin: 5px;
      border: 1px solid #efefef;
      border-radius: 5px;
      .title{
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #efefef;
        padding: 10px;
        background-color: #f5f5f5;
      }
      .content{
        height: calc(100% - 65px);
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .item{
          @include size(calc(100% / 4 - 12px),auto);
          margin: 5px;
          border: 1px solid #efefef;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;
          img{
            width: 270px;
            height: 230px;
            // aspect-ratio: 1;
          }
          .single{
            font-size: 15px;
            // text-align: left;
          }
        }
      }
      .table-info{
        width: 100%;
        height: calc(100% - 100px);
        overflow: auto;
      }
      .search-box{
        @include size(calc(100% - 20px),55px);
        @include layout(center,space-between);
        padding: 0 10px;
        .search-input{
        :deep .el-input{
            margin-right: 10px;
            height: 40px;
        }
        }
/*         .search-btn{
            @include layout(center,flex-end);
            button:first-child{
            margin-right: 10px;
            }  
            .iconfont{
                padding-right: 10px
            } 
        } */
        .search-btn{
          button{
            color: white;
            border: 0;
            height: 30px;
            &:first-child{
              background-color: green
            }
            &:last-child{
              background-color: #fc9700;
            }
            &:hover{
              opacity: 0.8;
            }
          }
        }
      }
    }
    .search-result-snp{
      width: 100%;
    }
    .dialog-footer{
        @include layout(center, space-between);
        text-align: right;
        padding-right: 5px;
        height: 55px;
        button{
        color: white;
        height: 30px;
        .iconfont{
            padding-right: 10px;
        }
        &:first-child{
            color: #fc9700;
            border-color: #fc970061;
        }
        &:nth-child(2){
            color: #409eff;
            border-color: #409eff63;
        }
        &:last-child{
            color: green;
            border-color: #00800075;
        }
        &:hover{
            opacity: 0.7;
        }
        }
    }
  }
}
:deep .el-table th.el-table__cell{
  color: #656565 !important;
}
:deep .el-table .cell{
    white-space: nowrap;
}
</style>