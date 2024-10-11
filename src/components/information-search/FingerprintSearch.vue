<template>
    <div class="fingerprint-search">
        <div class="search-box">
            <div class="search-input">
                <el-input v-model="searchName" type="text" style="width: 250px" placeholder="请输入品种名称" />
                <el-input v-model="searchNumber" type="number" style="width: 250px" placeholder="请输入品种编号" />
            </div>
            <div class="search-btn">
                <el-button @click="submitSearch"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
                <el-button @click="reset"><i class="iconfont icon-initial"></i>重置</el-button>
            </div>
        </div>
        <div class="search-result">
          
          <el-scrollbar height="100%">
            <div class="search-result-snp20k common">
              <div class="title">SNP20K <span v-if="sortName">（{{ sortName }}）</span></div>
              <div class="result-content">
                <div class="left">
                  <div class="all-info" id="all-info">
                    <div><span>有效位点数量/比列</span><span>{{ allInfo.validCount }}</span></div>
                    <div><span>Refer位点数量/比列</span><span>{{ allInfo.referCount }}</span></div>
                    <div><span>Alt位点数量/比列</span><span>{{ allInfo.altCount }}</span></div>
                    <div><span>杂合位点数量/比列</span><span>{{ allInfo.mixCount }}</span></div>
                  </div>
                  <div class="content common" id="images_content">
                    <div class="item">
                      <el-scrollbar height="100%">
                        <site-echarts status="0"></site-echarts>
                        <site-heat-map></site-heat-map>
                      </el-scrollbar>
                    </div>
                  </div>
                </div>   
                <div class="chromosome common" id="chromosome_content">
                  <div class="table-info">
                    <el-scrollbar height="100%">
                    <el-table 
                        stripe 
                        ref="multipleTableRef"
                        :data="ChromosometableData"
                        style="width: 100%"
                    >
                        <el-table-column property="number" label="染色体" width="70">
                          <template #default="scope">
                              <div class="common_cell" @click="getCellDetail('all')">{{ scope.row.number }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column property="validCount" label="有效位点数量/比列">
                          <template #default="scope">
                              <div class="common_cell" @click="getCellDetail('all')">{{ scope.row.validCount }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column property="referCount" label="Refer位点数量/比列" >
                          <template #default="scope">
                              <div class="common_cell" @click="getCellDetail('refer')">{{ scope.row.referCount }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column property="altCount" label="Alt位点数量/比列" >
                          <template #default="scope">
                              <div class="common_cell" @click="getCellDetail('alt')">{{ scope.row.altCount }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column property="mixCount" label="杂合位点数量/比列" >
                          <template #default="scope">
                              <div class="common_cell" @click="getCellDetail('hybrid')">{{ scope.row.mixCount }}</div>
                          </template>
                        </el-table-column>
                    </el-table>
                    </el-scrollbar>
                </div>
                </div>
              </div>
            </div>
            <div class="search-bottom">
              <div class="search-result-ssr common">
                <div class="title">SSR</div>
                <div class="content">
                  <div class="item" v-for="(item,index) in ssrList" :key="index">
                    <img :src="item.img" alt="">
                    <div class="single"><span>引物名称：{{item.name}}</span></div>
                    <div class="single"><span>引物编号：{{item.number}}</span></div>
                    <div class="single"><span>品种名称：{{item.sortName}}</span></div>
                    <div class="single"><span>品种编号：{{item.sortNumber}}</span></div>
                  </div>
                </div>
              </div>
              <div class="search-result-snp common">
                <div class="title">SNP</div>
                <div class="table-info">
                    <el-table 
                        stripe 
                        ref="multipleTableRef"
                        :data="tableData"
                        style="width: 100%"
                    >
                        <el-table-column type="index" label="序号" width="60" />
                        <el-table-column property="number" label="位点编号"/>
                        <el-table-column property="name" label="位点名称" />
                        <el-table-column property="type" label="基因型" />
                    </el-table>
                </div>
              </div> 
            </div>
            
          </el-scrollbar>
        </div>
    </div>
    <table-cell-detail v-if="showCellDetail" @close="showCellDetail = false"></table-cell-detail>
</template>
    
<script setup lang="ts">
  import TableCellDetail from '../information-search/TableCellDetail.vue'
  import SiteEcharts from './SiteEcharts.vue'
  import SiteHeatMap from './SiteHeatMap.vue';
  import { ref, watchEffect, onUnmounted, nextTick } from 'vue';
  const searchName = ref('');
  const searchNumber = ref('');
  const sortName = ref('');
  const showCellDetail = ref(false);
  const submitSearch = () => {
    sortName.value = searchName.value;
  }
  const reset = () => {
    sortName.value = ''
    searchName.value = ''
  }

  const allInfo = ref({
    validCount: '19400/97%',
    referCount: '12780/64%',
    altCount: '6581/33%',
    mixCount: '39/0.1%'
  })
  interface SNPInfo {
    number:number,
    name:string,
    type:string,
  }
  const tableData:SNPInfo[] = [
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
    {
      number: 1,
      name: '位点1',
      type: 'SNP'
    },
  ]
  import img from '../../assets/ssr.png'
  interface ChromosomeInfo {
    number:string,
    validCount:string,
    referCount:string,
    altCount:string,
    mixCount:string,
  }
  const ChromosometableData: ChromosomeInfo[] = [
    {
      number: '1',
      validCount: '2358/79.9%',
      referCount: '1677/57%',
      altCount: '1160/39%',
      mixCount: '3/0.1%',
    },
    {
      number: '2',
      validCount: '1724/74%',
      referCount: '1210/52%',
      altCount: '1019/44%',
      mixCount: '8/00.3%',
    },
    {
      number: '3',
      validCount: '1653/74%',
      referCount: '1407/63%',
      altCount: '758/34%',
      mixCount: '2/0.08%',
    },
    {
      number: '4',
      validCount: '1763/74%',
      referCount: '2028/86%',
      altCount: '304/13%',
      mixCount: '1/0.04%',
    },
    {
      number: '5',
      validCount: '1510/72%',
      referCount: '1369/65%',
      altCount: '676/32%',
      mixCount: '3/00.1%',
    },
    {
      number: '6',
      validCount: '954/62%',
      referCount: '980/63%',
      altCount: '520/33%',
      mixCount: '5/0.3%',
    },
    {
      number: '7',
      validCount: '1143/66%',
      referCount: '1246/72%',
      altCount: '448/26%',
      mixCount: '3/0.1%',
    },
    {
      number: '8',
      validCount: '1145/65%',
      referCount: '979/56%',
      altCount: '703/40%',
      mixCount: '7/0.4%',
    },
    {
      number: '9',
      validCount: '935/61%',
      referCount: '811/53%',
      altCount: '644/42%',
      mixCount: '5/0.3%',
    },
    {
      number: '10',
      validCount: '869/59%',
      referCount: '1073/73%',
      altCount: '349/24%',
      mixCount: '2/0.1%',
    },
  ]
  const ssrList = ref([
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
    {
      img: img, 
      name: 'bnlg439w1',
      number: 'P01',
      sortName: '先玉335',
      sortNumber: 'BGG253-2'
    },
  ])
  const getCellDetail = (type:string) => {
    console.log(type)
    showCellDetail.value = true
  }
  const handleResize = () => {
    // (document as any).getElementById('images_content').style.height = `${(document as any).getElementById('all-info').clientHeight - 20}px`;
    // (document as any).getElementById('images').style.height = `${(document as any).getElementById('all-info').clientHeight - 50}px`
  }
  watchEffect(() => {
    nextTick(() => {
      // (document as any).getElementById('images_content').style.height = `${(document as any).getElementById('all-info').clientHeight - 20}px`;
      // (document as any).getElementById('images').style.height = `${(document as any).getElementById('all-info').clientHeight - 70}px`    
    })
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
  margin: 10px
}
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
.fingerprint-search{
    @include size(calc(100% - 20px),calc(100% - 20px));
    box-shadow: 0 2px 10px 1px #00000026;
  .search-box{
    @include size(calc(100% - 20px),55px);
    @include layout(flex-end,space-between);
    .search-input{
      :deep .el-input{
        margin-right: 10px;
        height: 40px;
      }
    }
    .search-btn{
        @include layout(center,flex-end);
        button:first-child{
          margin-right: 10px;
        }  
        .iconfont{
            padding-right: 10px
        } 
    }
  }
  .search-result{
    @include size(calc(100% - 20px),calc(100% - 80px));
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
    .search-bottom{
      @include layout(flex-start, space-between);
      .content{
        height: calc(100% - 65px);
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        overflow: auto;
        .item{
          margin: 5px;
          border: 1px solid #efefef;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;
          img{
            width: 270px;
            height: 230px;
          }
          @media screen and (min-width: 1901px){
            @include size(calc(100% / 4 - 20px),auto);
          }
          @media screen and (max-width: 1900px){
            @include size(calc(100% / 3 - 20px),auto);
          }
          @media screen and (max-width: 1600px){
            @include size(calc(100% / 2 - 20px),auto);
          }
          @media screen and (max-width: 1200px){
            @include size(calc(100% / 2 - 20px),auto);
            img{
              width: 90%;
              height: auto;
            }
          }
          .single{
            font-size: 15px;
            // text-align: left;
          }
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
      .table-info{
        height: calc(100% - 65px);
        overflow: auto;
      }
    }
    .search-result-ssr{
      width: 75%;
      // left: 0;
      // top: 100%;
    }
    .search-result-snp{
      width: calc(25% - 20px);
      // left: calc(80% + 10px);
      // top: 100%;
    }
    .search-result-snp20k{
      width: calc(100% - 10px);
      height: auto;
      max-height: 100%;
      // overflow: auto;
      // left: 0;
      // top: 0;
      .result-content{
        display: flex;
        flex-wrap: wrap;
        .left{
          @include layout(flex-start,space-between);
        }
        .all-info{
          width: 25%;
          padding: 5px;
          div{
            display: flex;
            flex-direction: column;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            margin-bottom: 10px;
            span{
              font-size: 14px;
              padding: 15px 5px;
            }
            span:first-child{
              font-size: 16px;
              font-weight: bold;
              white-space: nowrap;
              width: 100%;
              display: block;
              border-bottom: 1px solid #efefef;
              box-sizing: border-box;
              color: #5f5f5f;
            }
          }
        }
        .content{
          width: 75%;
          height: 462px;
          box-sizing: border-box;
          .item{
            width: calc(100% - 1px);
            height: 100%;
            @include layout(center,center);
            :deep .el-scrollbar__view{
              display: flex;    
              align-items: flex-start;
              @media screen and (min-width: 2001px){
                flex-direction: row;
               /*  img{
                  width: auto;
                  max-width: 50%;
                  max-height: 100%;
                } */
              }
              @media screen and (max-width: 2000px){
                flex-direction: column;
               /*  img{
                  width: auto;
                  max-width: 90%;
                  max-height: 50%;
                  margin: auto;
                } */
              }
            }
          }
        }
        
        .chromosome{
            height: 460px;
            .table-info{
              height: 100%;
              :deep .el-table td.el-table__cell div, :deep .el-table--enable-row-transition .el-table__body td.el-table__cell{
                padding: 0;
              }
              .common_cell{
                cursor: pointer;
                padding: 7px 12px !important;
                &:hover{
                  background-color: #e2edfb;
                } 
              }
            } 
        }
        @media screen and (min-width: 1901px){
          .left{
            width: 100%;
          }
          .chromosome{
            height: 460px;
            width: calc(100% - 13px);
          }
        }
        @media screen and (max-width: 1900px){
          .left{
            width: 100%;
          }
          .chromosome{
            width: 100%;
          }
        } 
        @media screen and (max-width: 1200px){
          .left{
            width: 100%;
            flex-direction: column;
            .all-info{
              width: calc(100% - 10px);
              display: flex;
              justify-content: space-between;
              div{
                width: calc(25% - 10px);
                margin: 5px;
                &:first-child{
                  margin-left: 0;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
            }
            .content{
              width: calc(100% - 10px);
            }
          }
          .chromosome{
            width: 100%;
          }
        } 
      }
    }
  }
}
:deep .el-table th.el-table__cell{
  color: #656565 !important;
}

:deep .el-table__inner-wrapper:before{
  background-color: unset !important;
}
</style>