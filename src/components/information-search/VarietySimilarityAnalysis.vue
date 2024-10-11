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
                  <div class="chromosome common" :id="'chromosome'+index">
                    <div class="table-info">
                      <el-table 
                          ref="tableRef"
                          stripe 
                          :data="item.ComparisonResults"
                          style="width: 100%"
                      >
                          <el-table-column property="name" label="相似物种名称"/>
                          <el-table-column property="validCount" label="相似度"/>
                      </el-table>
                    </div>
                  </div>
                  
                  <div class="content common" :id="'images'+index">
                    <el-scrollbar height="100%">
                      <div class="item">
                        <img :src="item.image" alt="">
                      </div>
                    </el-scrollbar>
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
  import { forEach } from 'lodash';
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
      {
          id: 13,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 14,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 15,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 16,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
  /*     {
          id: 17,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 18,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 19,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 20,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 21,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      },
      {
          id: 22,
          sortName: 'string',
          sortKind: 'string',
          approvalNumber: 'string',
          registrationNumber: 'string',
          sortSource: 'string'
      }, */
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
    const tableRef = ref<any>()
    const resultData = ref([
      {
        sortName: 'A品种',
        ComparisonResults: [
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '2',
            validCount: '99.8%',
          },
          {
            name: '3',
            validCount: '99.5%',
          },
          {
            name: '4',
            validCount: '99.2%',
          },
          {
            name: '5',
            validCount: '99.15%',
          },
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '2',
            validCount: '99.8%',
          },
          {
            name: '3',
            validCount: '99.5%',
          },
          {
            name: '4',
            validCount: '99.2%',
          },
          {
            name: '5',
            validCount: '99.15%',
          },
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '2',
            validCount: '99.8%',
          },
          {
            name: '3',
            validCount: '99.5%',
          },
          {
            name: '4',
            validCount: '99.2%',
          },
          {
            name: '5',
            validCount: '99.15%',
          },
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '2',
            validCount: '99.8%',
          },
          {
            name: '3',
            validCount: '99.5%',
          },
          {
            name: '4',
            validCount: '99.2%',
          },
          {
            name: '5',
            validCount: '99.15%',
          },
        ],
        image: image
      },
      {
        sortName: 'B品种',
        ComparisonResults: [
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '1',
            validCount: '99.8%',
          },
          {
            name: '1',
            validCount: '99.5%',
          },
          {
            name: '1',
            validCount: '99.2%',
          },
          {
            name: '1',
            validCount: '99.15%',
          },
          {
            name: '1',
            validCount: '99.12%',
          },
          {
            name: '1',
            validCount: '99.1%',
          },
          {
            name: '1',
            validCount: '99%',
          },
          {
            name: '1',
            validCount: '98%',
          },
          {
            name: '1',
            validCount: '97%',
          },
          {
            name: '1',
            validCount: '96%',
          },
          {
            name: '1',
            validCount: '94%',
          },
          {
            name: '1',
            validCount: '92%',
          },
          {
            name: '1',
            validCount: '90%',
          },
          {
            name: '1',
            validCount: '88%',
          },
          {
            name: '1',
            validCount: '86%',
          },
          {
            name: '1',
            validCount: '84%',
          },
          {
            name: '1',
            validCount: '82%',
          },
          {
            name: '1',
            validCount: '80%',
          },
        ],
        image: image
      },
      {
        sortName: 'C品种',
        ComparisonResults: [
          {
            name: '1',
            validCount: '99.99%',
          },
          {
            name: '1',
            validCount: '99.8%',
          },
          {
            name: '1',
            validCount: '99.5%',
          },
          {
            name: '1',
            validCount: '99.2%',
          },
          {
            name: '1',
            validCount: '99.15%',
          },
          {
            name: '1',
            validCount: '99.12%',
          },
          {
            name: '1',
            validCount: '99.1%',
          },
          {
            name: '1',
            validCount: '99%',
          },
          {
            name: '1',
            validCount: '98%',
          },
          {
            name: '1',
            validCount: '97%',
          },
          {
            name: '1',
            validCount: '96%',
          },
          {
            name: '1',
            validCount: '94%',
          },
          {
            name: '1',
            validCount: '92%',
          },
          {
            name: '1',
            validCount: '90%',
          },
          {
            name: '1',
            validCount: '88%',
          },
          {
            name: '1',
            validCount: '86%',
          },
          {
            name: '1',
            validCount: '84%',
          },
          {
            name: '1',
            validCount: '82%',
          },
          {
            name: '1',
            validCount: '80%',
          },
        ],
        image: image
      },
    ])
  const ChromosometableData: ChromosomeInfo[] = [
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
    {
      name: '1',
      validCount: '12/12%',
    },
  ]

  const handleResize = () => {
      if(showResult.value) {
          nextTick(() => {
            setTimeout(() => {
              resultData.value.forEach((item, index) => {
                (document as any).getElementById('images'+index).style.height = `${(document as any).getElementById('chromosome'+index).clientHeight + 1}px`;   
              })
            }, 0);    
          })
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
  /*     if(showResult.value) {
          nextTick(() => {
            setTimeout(() => {
              resultData.value.forEach((item, index) => {
                (document as any).getElementById('images'+index).style.height = `${(document as any).getElementById('chromosome'+index).clientHeight + 1}px`;   
              })
            }, 0);    
          })
      } */
      handleResize()
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
      height: calc(100% - 60px);
       @include layout(center, space-between)
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
          width: 85%;
          .item{
            width: calc(100% - 12px);
            @include layout(center,center);
            img{
              width: 100%;
              height: auto !important;
            }
          }
        }
        .chromosome{
          width: 15%;
          min-width: 220px;
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
        padding: 10px;
        overflow: auto;
        .item{
          @include size(calc(100% / 4 - 12px),auto);
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
</style>