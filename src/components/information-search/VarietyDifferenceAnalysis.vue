<template>
  <div class="fingerprint-search">
    <div class="search-result">
      <el-scrollbar height="100%">
        <div class="choose" v-if="!showResult">
          <div class="search-result-snp common">
            <div class="search-box">
              <div class="search-input">
                <el-input v-model="uploadData.searchName" type="text" placeholder="请输入品种名称" />
                <el-input v-model="uploadData.searchNumber" type="text" placeholder="请输入品种编号" />
              </div>
              <div class="search-btn">
                <el-button @click="submitSearch(1)"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
                <el-button @click="reset(1)"><i class="iconfont icon-initial"></i>重置</el-button>
              </div>
            </div>
            <div class="title">本地上传品种数据</div>
            <div class="table-info">
              <el-scrollbar height="100%">
                <el-table stripe ref="leftTableRef" :data="leftTableData" style="width: 100%"
                  @selection-change="leftSelectionChange" row-key="id">
                  <el-table-column type="selection" />
                  <el-table-column type="index" label="序号" width="60" />
                  <el-table-column property="species_id" label="品种ID" />
                  <el-table-column property="variety_name" label="品种名称" />
                  <el-table-column property="variety_code" label="品种编号" />
                  <el-table-column property="approval_number" label="审定编号" />
                  <el-table-column property="registration_number" label="登记编号" />
                  <el-table-column property="origin" label="品种来源" />
                  <el-table-column property="organization_id" label="所属用户/机构" />
                  <el-table-column property="is_system" label="是否是系统库数据" />
                  <el-table-column property="probes_type" label="检测探针类型" />
                </el-table>
              </el-scrollbar>
            </div>
            <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total"
              @current-change="handlePagination"></el-pagination>
          </div>
          <div class="search-result-snp common">
            <div class="search-box">
              <div class="search-input">
                <el-input v-model="exitData.searchName" type="text" placeholder="请输入品种名称" />
                <el-input v-model="exitData.searchNumber" type="text" placeholder="请输入品种编号" />
              </div>
              <div class="search-btn">
                <el-button @click="submitSearch(2)"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
                <el-button @click="reset(2)"><i class="iconfont icon-initial"></i>重置</el-button>
              </div>
            </div>
            <div class="title">数据库数据</div>
            <div class="table-info">
              <el-scrollbar height="100%">
                <el-table stripe ref="rightTableRef" :data="rightTableData" style="width: 100%"
                  @selection-change="rightSelectionChange" row-key="id">
                  <el-table-column type="selection" />
                  <el-table-column type="index" label="序号" width="60" />
                  <el-table-column property="species_id" label="品种ID" />
                  <el-table-column property="variety_name" label="品种名称" />
                  <el-table-column property="variety_code" label="品种编号" />
                  <el-table-column property="approval_number" label="审定编号" />
                  <el-table-column property="registration_number" label="登记编号" />
                  <el-table-column property="origin" label="品种来源" />
                  <el-table-column property="organization_id" label="所属用户/机构" />
                  <el-table-column property="probes_type" label="检测探针类型" />
                </el-table>
              </el-scrollbar>
            </div>
            <el-pagination :pageNum="pagination1.pageNum" :page-size="pagination1.pageSize" :total="pagination1.total"
              @current-change="handlePagination1"></el-pagination>
          </div>
        </div>
        <div class="result" v-if="showResult">
          <div class="search-result- common">
            <div class="title">比对结果</div>
            <div class="result-content">
              <div class="left" id="left">
                <div class="all-info" id="all-info">
                  <div><span>有效位点</span><span>{{ allInfo.validCount }}</span></div>
                  <div><span>样本A的纯合位点数量</span><span>{{ allInfo.anumCount1 }}</span></div>
                  <div><span>样本A的杂合位点数量</span><span>{{ allInfo.anumCount2 }}</span></div>
                  <div><span>样本B的杂合位点数量</span><span>{{ allInfo.bnumCount1 }}</span></div>
                  <div><span>样本B的纯合位点数量</span><span>{{ allInfo.bnumCount2 }}</span></div>
                  <div><span>有效位点的整体相似度</span><span>{{ allInfo.validCountAll }}</span></div>
                  <div><span>有效位点的纯合位点相似度</span><span>{{ allInfo.validCount1 }}</span></div>
                  <div><span>有效位点的杂合位点相似度</span><span>{{ allInfo.validCount2 }}</span></div>
                </div>
                <div class="content common" id="images">
                  <div class="item">
                    <!-- <img :src="allInfo.img" alt=""> -->
                    <!-- <el-scrollbar height="100%"> -->
                    <site-echarts status="1"></site-echarts>
                    <!-- </el-scrollbar> -->
                  </div>
                </div>
              </div>
              <div class="chromosome common" id="chromosome">
                <!--        <el-upload style="display: flex;" :on-change="handleUpload" accept="xls,xlsx" :auto-upload="false"
                  :multiple="true">
                  <el-button type="primary">Click to upload</el-button>
                </el-upload> -->
                <div class="table-info">
                  <el-scrollbar height="100%">
                    <el-table stripe ref="multipleTableRef" :data="uploadTableData" style="width: 100%">
                      <el-table-column property="number" label="染色体" width="90">
                        <template #default="scope">
                          <div class="common_cell" @click="getCellDetail('all')">{{ scope.row.number }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column property="validCount" label="有效位点的整体相似度">
                        <template #default="scope">
                          <div class="common_cell" @click="getCellDetail('all')">{{ scope.row.validCount }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column property="referCount" label="有效位点的纯合位点相似度">
                        <template #default="scope">
                          <div class="common_cell" @click="getCellDetail('pure')">{{ scope.row.referCount }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column property="altCount" label="有效位点的杂合位点相似度">
                        <template #default="scope">
                          <div class="common_cell" @click="getCellDetail('hybrid')">{{ scope.row.altCount }}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-scrollbar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button v-if="!showResult" @click="showResult = true"><i class="iconfont icon-lujing-6"></i>比对</el-button>
          <el-button v-if="showResult" @click="showResult = false"><i class="iconfont icon-initial"></i>返回</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
  <table-cell-detail v-if="showCellDetail" @close="showCellDetail = false"></table-cell-detail>
</template>

<script setup lang="ts">
import image from "../../assets/RZ2300021-SNP-2_vs_RZ2300002-SNP-2.png";
import type { TableInstance } from "element-plus";
import ElPagination from "../common/ElPagination.vue";
import { ref, onUnmounted, watchEffect, nextTick, onMounted } from "vue";
import SiteEcharts from "./SiteEcharts.vue";
import TableCellDetail from "../information-search/TableCellDetail.vue";
import { getAllVarieties } from "../../api/variety"
import {useStore} from '../../store/index'
const store = useStore()
import * as XLSX from "xlsx";
const uploadData = ref({
  searchName: "",
  searchNumber: "",
});
const exitData = ref({
  searchName: "",
  searchNumber: "",
});
const submitSearch = (type: number) => {
  console.log(type);
  if (type === 1) {
    console.log(uploadData.value);
  } else {
    console.log(exitData.value);
  }
};
const reset = (type: number) => {
  if (type === 1) {
    uploadData.value.searchName = "";
    uploadData.value.searchNumber = "";
  } else {
    exitData.value.searchName = "";
    exitData.value.searchNumber = "";
  }
};
interface User {
  id: number,
  species_id: number,
  variety_name: string,
  variety_code: string,
  approval_number: string,
  registration_number: string,
  origin: string,
  organization_id: number,
  probes_type: string,
}
const selectedRows = ref<User[]>([]); //最终选择的需要进行对比的数据

const leftTableRef = ref<TableInstance>();
const leftSelection = ref<User[]>([]);
const leftTableData = ref<User[]>([]);
const rightTableRef = ref<TableInstance>();
const rightSelection = ref<User[]>([]);
const rightTableData = ref<User[]>([]);
const leftSelectionChange = (selection: User[]) => {
  handleAllSelectionChange(
    selection,
    leftTableRef.value!,
    // leftSelection.value,
    rightSelection.value,
    leftTableData,
    rightTableRef.value!
  );
  /*   if (selection.length > 2 && selection.length < 4) { //如果选择了三条，则删除第一条
      let del_row = selection.shift();
      leftTableRef.value!.toggleRowSelection(del_row, false);
    } else if (selection.length > 3) { //如果选择条数大于3条（全选的情况），则取数组前两条
      leftTableRef.value!.clearSelection();
      for (let i = 0; i < 2; i++) {
        leftTableRef.value!.toggleRowSelection(leftTableData[i], true);
      }
    }
    
    if(selection.length > 1 && rightSelection.value.length > 0){// 左边已存在一条，右边已存在一条的情况，再次选择左边，则删除左边之前存在那条数据
      let del_row = selection.shift();
      leftTableRef.value!.toggleRowSelection(del_row, false);
    }else if( rightSelection.value.length > 1){ // 右边已存在两条，当选择左边，则删除右边之前存在那两条数据的第一条
      let del_row = rightSelection.value.shift();
      rightTableRef.value!.toggleRowSelection(del_row, false);
    }*/
  leftSelection.value = leftTableRef.value!.getSelectionRows();
  selectedRows.value = [...leftSelection.value, ...rightSelection.value];
  if (selectedRows.value.length > 2) {
    selectedRows.value = selectedRows.value.slice(0, 2);
  }
};
const rightSelectionChange = (selection: User[]) => {
  handleAllSelectionChange(
    selection,
    rightTableRef.value!,
    // rightSelection.value,
    leftSelection.value,
    rightTableData,
    leftTableRef.value!
  );
  /*   if (selection.length > 2 && selection.length < 4) {
      let del_row = selection.shift();
      rightTableRef.value!.toggleRowSelection(del_row, false);
    } else if (selection.length > 3) {
      rightTableRef.value!.clearSelection();
      for (let i = 0; i < 2; i++) {
        rightTableRef.value!.toggleRowSelection(rightTableData[i], true);
      }
    }
    if(selection.length > 1 && leftSelection.value.length > 0){
      let del_row = selection.shift();
      rightTableRef.value!.toggleRowSelection(del_row, false);
    }else if( leftSelection.value.length > 1){
      let del_row = leftSelection.value.shift();
      leftTableRef.value!.toggleRowSelection(del_row, false);
    } */
  rightSelection.value = rightTableRef.value!.getSelectionRows();
  selectedRows.value = [...leftSelection.value, ...rightSelection.value];
  if (selectedRows.value.length > 2) {
    selectedRows.value = selectedRows.value.slice(0, 2);
  }
};
const handleAllSelectionChange = (
  selection: any,
  refTable: TableInstance,
  // selfSelection: any,
  otherSelection: any,
  selfTableData: any,
  otherRefTable: TableInstance
) => {
  if (selection.length > 2 && selection.length < 4) {//如果选择了三条，则删除第一条
    let del_row = selection.shift();
    refTable.toggleRowSelection(del_row, false);
  } else if (selection.length > 3) {//如果选择条数大于3条（全选的情况），则取数组前两条
    refTable.clearSelection();
    for (let i = 0; i < 2; i++) {
      refTable.toggleRowSelection(selfTableData[i], true);
    }
  }
  if (selection.length > 1 && otherSelection.length > 0) {// 左边已存在一条，右边已存在一条的情况，再次选择左边，则删除左边之前存在那条数据
    let del_row = selection.shift();
    refTable.toggleRowSelection(del_row, false);
  } else if (otherSelection.length > 1) {// 右边已存在两条，当选择左边，则删除右边之前存在那两条数据的第一条
    let del_row = otherSelection.shift();
    otherRefTable.toggleRowSelection(del_row, false);
  }
};
const showResult = ref(false);
const allInfo = ref({
  validCount: "",
  anumCount1: "",
  anumCount2: "",
  bnumCount1: "",
  bnumCount2: "",
  validCountAll: "",
  validCount1: "",
  validCount2: "",
  img: image,
});
interface ChromosomeInfo {
  number: string;
  validCount: string;
  referCount: string;
  altCount: string;
}
const ChromosometableData: ChromosomeInfo[] = [
  {
    number: "1",
    validCount: "58.84% (1664)",
    referCount: "59.12% (1634)",
    altCount: "1.06% (30)",
  },
  {
    number: "2",
    validCount: "60.00% (1314)",
    referCount: "60.56% (1282)",
    altCount: "1.46% (32)",
  },
  {
    number: "3",
    validCount: "46.60% (1008)",
    referCount: "59.24% (994)",
    altCount: "0.65% (14)",
  },
  {
    number: "4",
    validCount: "55.03% (1247)",
    referCount: "55.72% (1227)",
    altCount: "0.88% (20)",
  },
  {
    number: "5",
    validCount: "50.54% (1022)",
    referCount: "50.43% (1005)",
    altCount: "0.84% (17)",
  },
  {
    number: "6",
    validCount: "59.43% (882)",
    referCount: "59.28% (878)",
    altCount: "0.27% (4)",
  },
  {
    number: "7",
    validCount: "53.31% (886)",
    referCount: "52.57% (868)",
    altCount: "1.08% (18)",
  },
  {
    number: "8",
    validCount: "46.02% (775)",
    referCount: "68.52% (766)",
    altCount: "0.53% (9)",
  },
  {
    number: "9",
    validCount: "56.43% (825)",
    referCount: "57.45% (821)",
    altCount: "0.27% (4)",
  },
  {
    number: "10",
    validCount: "55.64% (774)",
    referCount: "56.33% (765)",
    altCount: "0.65% (9)",
  },
  {
    number: "11",
    validCount: "58.84% (1664)",
    referCount: "59.12% (1634)",
    altCount: "1.06% (30)",
  },
  {
    number: "12",
    validCount: "60.00% (1314)",
    referCount: "60.56% (1282)",
    altCount: "1.46% (32)",
  },
  {
    number: "13",
    validCount: "46.60% (1008)",
    referCount: "59.24% (994)",
    altCount: "0.65% (14)",
  },
  {
    number: "14",
    validCount: "55.03% (1247)",
    referCount: "55.72% (1227)",
    altCount: "0.88% (20)",
  },
  {
    number: "15",
    validCount: "50.54% (1022)",
    referCount: "50.43% (1005)",
    altCount: "0.84% (17)",
  },
  {
    number: "16",
    validCount: "59.43% (882)",
    referCount: "59.28% (878)",
    altCount: "0.27% (4)",
  },
  {
    number: "17",
    validCount: "53.31% (886)",
    referCount: "52.57% (868)",
    altCount: "1.08% (18)",
  },
  {
    number: "18",
    validCount: "46.02% (775)",
    referCount: "68.52% (766)",
    altCount: "0.53% (9)",
  },
  {
    number: "19",
    validCount: "56.43% (825)",
    referCount: "57.45% (821)",
    altCount: "0.27% (4)",
  },
  {
    number: "20",
    validCount: "55.64% (774)",
    referCount: "56.33% (765)",
    altCount: "0.65% (9)",
  },
];

const handleResize = () => {
  if (showResult.value) {
    nextTick(() => {
      setTimeout(() => {
        if (window.innerWidth >= 1500 && window.innerWidth < 1900) {
          (document as any).getElementById("images").style.height = `${(document as any).getElementById("all-info").clientHeight - 10
            }px`;
        }
        if (window.innerWidth >= 1901) {
          (document as any).getElementById("chromosome").style.height = `${(document as any).getElementById("left").clientHeight - 12
            }px`;
          (document as any).getElementById("images").style.height = `${(document as any).getElementById("chromosome").clientHeight - (document as any).getElementById("all-info").clientHeight - 12
            }px`
        }
      }, 0);
    });
  }
};
const pagination = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 1000,
});
const handlePagination = (currentPage: any) => {
  pagination.value.pageNum = currentPage.pageNum;
  pagination.value.pageSize = currentPage.pageSize;
  getAllVarietiesDataLeft()
};
const pagination1 = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 1000,
});
const handlePagination1 = (currentPage: any) => {
  pagination1.value.pageNum = currentPage.pageNum;
  pagination1.value.pageSize = currentPage.pageSize;
  getAllVarietiesDataRight()
};
const showCellDetail = ref(false);
const getCellDetail = (type: string) => {
  console.log(type);
  showCellDetail.value = true;
};

const uploadTableData = ref<any>([]);

//读取excel文件
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file.raw);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
};

const handleUpload = async (file) => {
  const data = await getXlsxData(file);
  uploadTableData.value = translateField(data);
};

//读取表格数据
const getXlsxData = async (file) => {
  const dataBinary = await readFile(file);
  const workBook = XLSX.read(dataBinary);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(workSheet);
  const newData = data.slice(0, data.length - 1);
  return newData;
};

//映射字段
const translateField = (data) => {
  let arr = [];
  const cnToEn = {
    chrom: "number",
    整体相似度: "validCount",
    纯合相似度: "referCount",
    杂合相似度: "altCount",
  };
  data.forEach((item) => {
    const arrItem = {};
    Object.keys(item).forEach((key) => {
      arrItem[cnToEn[key]] = item[key];
    });
    arr.push(arrItem);
  });
  return arr;
};
const getAllVarietiesDataLeft = async () => { //获取左边本地上传的品种数据
  let obj = {
    page: pagination.value.pageNum,
    page_size: pagination.value.pageSize,
    species_id: store.currentSpeciesId,
    is_system: false,
    variety_name: uploadData.value.searchName,
    variety_code: uploadData.value.searchNumber
  }
  getAllVarieties(obj).then((res) => {
    console.log('res=====', res)
    pagination.value.total = res.total
    leftTableData.value = res.data
  })
}
const getAllVarietiesDataRight = async () => { //获取右边的系统品种数据
  let obj = {
    page: pagination.value.pageNum,
    page_size: pagination.value.pageSize,
    species_id: store.currentSpeciesId,
    is_system: true,
    variety_name: exitData.value.searchName,
    variety_code: exitData.value.searchNumber
  }
  getAllVarieties(obj).then((res) => {
    pagination.value.total = res.total
    rightTableData.value = res.data
    console.log('rightTableData=====', rightTableData)
  })
}
watchEffect(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onMounted(() => {
  getAllVarietiesDataLeft()
  getAllVarietiesDataRight()
})
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
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
      height: calc(100% - 10px);
    }

    .choose {
      @include layout(center, space-between);
      height: calc(100% - 50px);

      @media screen and (max-width: 1500px) {
        flex-direction: column;

        .common {
          width: calc(100% - 10px);
          height: 50%;
        }
      }
    }

    @media screen and (min-width: 1901px) {

      .chromosome {
        .table-info {
          height: 100% !important;

          :deep .el-table td.el-table__cell div,
          :deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
            padding: 0;
          }

          .common_cell {
            cursor: pointer;
            padding: 7px 12px !important;

            &:hover {
              background-color: #e2edfb;
            }
          }
        }
      }
    }

    .result {
      @media screen and (min-width: 1901px) {
        height: calc(100% - 70px);
      }

      @include size(calc(100% - 10px), auto);

      .search-result- {
        width: calc(100% - 0px);
      }

      .result-content {
        display: flex;
        flex-wrap: wrap;

        .left {
          @include layout(flex-start, space-between);
        }

        @include layout(flex-start, space-between);

        .all-info {
          // width: 100%;
          min-width: 230px;
          padding: 5px;
          display: flex;
          flex-wrap: wrap;

          div {
            width: calc(100% - 12px);
            display: flex;
            flex-direction: column;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            margin: 5px;

            span {
              font-size: 14px;
              padding: 15px 5px;
            }

            span:first-child {
              font-size: 16px;
              font-weight: bold;
              width: 100%;
              display: block;
              border-bottom: 1px solid #efefef;
              box-sizing: border-box;
              color: #5f5f5f;
            }
          }
        }

        .content {
          box-sizing: border-box;

          // width: 100%;
          .item {
            width: 100%;
            @include layout(flex-start, center);

            img {
              width: 100%;
              height: auto !important;
            }
          }
        }

        @media screen and (min-width: 1901px) {
          height: calc(100% - 50px);

          .left {
            width: 55%;
            height: 100%;
            flex-direction: column;

            .all-info {
              width: 100%;
              padding: 0;

              div {
                width: calc(25% - 12px);
              }
            }

            .content {
              width: calc(100% - 10px);
            }
          }

          .chromosome {
            width: calc(45% - 13px);
          }
        }

        @media screen and (max-width: 1900px) {
          .left {
            width: 100%;

            .all-info {
              width: 22%;
              padding: 0;

              div {
                width: calc(100% - 12px);
              }
            }

            .content {
              width: 78%;

              :deep .el-scrollbar__view {
                height: unset !important;
              }
            }
          }

          .chromosome {
            width: calc(100% - 10px);
          }
        }

        @media screen and (max-width: 1500px) {
          .left {
            width: 100%;
            flex-direction: column;

            .all-info {
              width: 100%;
              padding: 0;

              div {
                width: calc(25% - 12px);
              }
            }

            .content {
              width: 100%;
            }
          }
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
        // padding: 10px;
        overflow: hidden;

        .item {
          @include size(calc(100% / 4 - 12px), 100%);
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
        height: calc(100% - 155px);
        overflow: auto;
        border-bottom: 1px solid #f1f1f1;
      }

      .search-box {
        @include size(calc(100% - 20px), 55px);
        @include layout(center, space-between);
        padding: 0 10px;

        .search-input {
          width: calc(100% - 220px);
          text-align: left;

          :deep .el-input {
            width: 40%;
            max-width: 250px;
            margin-right: 10px;
            height: 40px;
          }
        }

        /*         .search-btn{
          width: 200px;
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
              background-color: green;
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
      width: calc(50% - 10px);
    }

    .dialog-footer {
      text-align: right;
      padding-right: 5px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

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
:deep .el-scrollbar__bar.is-horizontal{
  visibility: hidden;
}
</style>