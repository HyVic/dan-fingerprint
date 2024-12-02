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
            <div class="title">本地上传品种数据</div>
            <div class="table-info">
              <VarietyDataTable ref="childTableRef" :is="false" @update:model-value="updateUploadData"
                :variety-name="uploadData.searchName" :variety-code="uploadData.searchNumber">
              </VarietyDataTable>
            </div>
          </div>
        </div>
        <div class="result" v-if="showResult">
          <div class="search-result- common" v-for="(item, index) in resultData" :key="index">
            <div class="title">{{ item.sortName }}比对结果</div>
            <div class="result-content">
              <div class="chromosome common" :id="'chromosome' + index">
                <div class="table-info">
                  <el-table ref="tableRef" stripe :data="item.ComparisonResults" style="width: 100%">
                    <el-table-column property="name" label="相似物种名称" />
                    <el-table-column property="validCount" label="相似度" />
                  </el-table>
                </div>
              </div>

              <div class="content common" :id="'images' + index">
                <el-scrollbar height="100%">
                  <div class="item">
                    <img :src="item.image" alt="">
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer" v-if="showResult">
          <div></div>
          <el-button v-if="showResult" @click="showResult = false"><i class="iconfont icon-initial"></i>返回</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import image from '../../assets/zhanwei2.jpg'
import { ElMessage } from "element-plus";
import VarietyDataTable from "../common/VarietyDataTable.vue"
import { ref, onUnmounted, watchEffect, nextTick, onMounted } from 'vue';
const uploadData = ref({
  searchName: '',
  searchNumber: ''
})
const exitData = ref({
  searchName: '',
  searchNumber: ''
})
interface ChildTable {
  getAllVarietiesData: () => void;
}
const childTableRef = ref<ChildTable | null>(null);
const submitSearch = (type: number) => {
  if (type === 1) {
    childTableRef.value?.getAllVarietiesData()
  }
}
const reset = (type: number) => {
  if (type === 1) {
    uploadData.value.searchName = ''
    uploadData.value.searchNumber = ''
    setTimeout(() => {
      childTableRef.value?.getAllVarietiesData()
    }, 100);
  } else {
    exitData.value.searchName = ''
    exitData.value.searchNumber = ''
  }
}
const showResult = ref(false)
interface ChromosomeInfo {
  name: string,
  validCount: string,
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
  if (showResult.value) {
    nextTick(() => {
      setTimeout(() => {
        resultData.value.forEach((item, index) => {
          (document as any).getElementById('images' + index).style.height = `${(document as any).getElementById('chromosome' + index).clientHeight + 1}px`;
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
  // getAllVarietiesData()
}
const updateUploadData = (data: any) => {
  if (data.length > 0) {
    showResult.value = true
  } else {
    ElMessage.warning('请选择比对数据')
  }
}
watchEffect(() => {
  handleResize()
  window.addEventListener('resize', handleResize);
})
onMounted(() => {
  // getAllVarietiesData()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style scoped lang="scss">
@mixin layout($align-items, $justify-content) {
  display: flex;
  align-items: $align-items;
  justify-content: $justify-content;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.fingerprint-search {
  @include size(calc(100% - 20px), calc(100% - 20px));
  @include layout(center, space-between);
  box-shadow: 0 2px 10px 1px #00000026;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;

  .search-result {
    @include size(100%, 100%);
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow-x: hidden;

    :deep .el-scrollbar__view {
      height: 100%;
    }

    .choose {
      height: 100%;
      @include layout(center, space-between)
    }

    .result {
      @include size(calc(100% - 10px), auto);

      .search-result- {
        width: calc(100% - 0px);
      }

      .result-content {
        @include layout(flex-start, space-between);

        .content {
          box-sizing: border-box;
          width: 85%;

          .item {
            width: calc(100% - 12px);
            @include layout(center, center);

            img {
              width: 100%;
              height: auto !important;
            }
          }
        }

        .chromosome {
          width: 15%;
          min-width: 220px;
        }
      }
    }

    .common {
      height: calc(100% - 10px);
      margin: 5px;
      border: 1px solid #efefef;
      border-radius: 5px;

      .title {
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #efefef;
        padding: 10px;
        background-color: #f5f5f5;
      }

      .content {
        height: calc(100% - 65px);
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        overflow: auto;

        .item {
          @include size(calc(100% / 4 - 12px), auto);
          box-sizing: border-box;
          text-align: center;

          img {
            width: 270px;
            height: 230px;
            // aspect-ratio: 1;
          }

          .single {
            font-size: 15px;
            // text-align: left;
          }
        }
      }

      .table-info {
        height: calc(100% - 100px);
      }

      .search-box {
        @include size(calc(100% - 20px), 55px);
        @include layout(center, space-between);
        padding: 0 10px;

        .search-input {
          :deep .el-input {
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
        .search-btn {
          button {
            color: white;
            border: 0;
            height: 30px;

            &:first-child {
              background-color: green
            }

            &:last-child {
              background-color: #fc9700;
            }

            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }

    .search-result-snp {
      width: 100%;
    }

    .dialog-footer {
      @include layout(center, space-between);
      text-align: right;
      padding-right: 5px;
      height: 55px;

      button {
        color: white;
        height: 30px;

        .iconfont {
          padding-right: 10px;
        }

        &:first-child {
          color: #fc9700;
          border-color: #fc970061;
        }

        &:nth-child(2) {
          color: #409eff;
          border-color: #409eff63;
        }

        &:last-child {
          color: green;
          border-color: #00800075;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}

:deep .el-scrollbar__bar.is-horizontal {
  visibility: hidden !important;
}
</style>