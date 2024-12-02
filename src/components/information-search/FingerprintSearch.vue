<template>
  <div class="fingerprint-search">
    <div class="search-box">
      <div class="search-input">
        <el-input v-model="search.varietyName" type="text" style="width: 250px" placeholder="请输入品种名称" />
        <!-- <el-select v-model="value" filterable placeholder="请输入品种名称" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-input v-model="search.varietyNumber" type="number" style="width: 250px" placeholder="请输入品种编号" />
      </div>
      <div class="search-btn">
        <el-button @click="submitSearch"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
        <el-button @click="reset"><i class="iconfont icon-initial"></i>重置</el-button>
      </div>
    </div>
    <div class="search-result">
      <el-scrollbar height="100%">
        <div class="search-result-snp20k common">
          <div class="title">
            {{ probesType }} <span v-if="sortName">（{{ sortName }}）</span>
          </div>
          <div class="result-content">
            <div class="left">
              <div class="all-info" id="all-info">
                <div>
                  <span>有效位点数量/比列</span><span>{{ allInfo.validCount }}</span>
                </div>
                <div>
                  <span>Refer位点数量/比列</span><span>{{ allInfo.referCount }}</span>
                </div>
                <div>
                  <span>Alt位点数量/比列</span><span>{{ allInfo.altCount }}</span>
                </div>
                <div>
                  <span>杂合位点数量/比列</span><span>{{ allInfo.mixCount }}</span>
                </div>
              </div>
              <div class="content common" id="images_content">
                <div class="item">
                  <el-scrollbar height="100%">
                    <site-echarts status="0" :genes-list="genesList"></site-echarts>
                    <site-heat-map></site-heat-map>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="chromosome common" id="chromosome_content">
              <div class="table-info">
                <el-scrollbar height="100%">
                  <el-table stripe ref="multipleTableRef" :data="sheetTableData" style="width: 100%">
                    <el-table-column property="number" label="染色体" width="70">
                      <template #default="scope">
                        <div class="common_cell" @click="getCellDetail('all')">
                          {{ scope.row.number }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column property="validCount" label="有效位点数量/比列">
                      <template #default="scope">
                        <div class="common_cell" @click="getCellDetail('all')">
                          {{ scope.row.validCount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column property="referCount" label="Refer位点数量/比列">
                      <template #default="scope">
                        <div class="common_cell" @click="getCellDetail('refer')">
                          {{ scope.row.referCount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column property="altCount" label="Alt位点数量/比列">
                      <template #default="scope">
                        <div class="common_cell" @click="getCellDetail('alt')">
                          {{ scope.row.altCount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column property="mixCount" label="杂合位点数量/比列">
                      <template #default="scope">
                        <div class="common_cell" @click="getCellDetail('hybrid')">
                          {{ scope.row.mixCount }}
                        </div>
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
              <div class="item" v-for="(item, index) in ssrList" :key="index">
                <img :src="item.img" alt="" />
                <div class="single">
                  <span>引物名称：{{ item.name }}</span>
                </div>
                <div class="single">
                  <span>引物编号：{{ item.number }}</span>
                </div>
                <div class="single">
                  <span>品种名称：{{ item.sortName }}</span>
                </div>
                <div class="single">
                  <span>品种编号：{{ item.sortNumber }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="search-result-snp common">
            <div class="title">SNP</div>
            <div class="table-info">
              <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column property="number" label="位点编号" />
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
import TableCellDetail from "../information-search/TableCellDetail.vue";
import SiteEcharts from "./SiteEcharts.vue";
import SiteHeatMap from "./SiteHeatMap.vue";
import { getVarietyStatistics } from "../../api/variety"
import { ref, watchEffect, onUnmounted, nextTick, onMounted } from "vue";
import { useStore } from '../../store/index'
const store = useStore()
const search = ref({
  varietyName: "",
  varietyNumber: "",
});
const searchName = ref("");
const searchNumber = ref("");
const sortName = ref("品种名");
const probesType = ref("");
const showCellDetail = ref(false);
const submitSearch = () => {
  sortName.value = searchName.value;
  getAllVarietyStatistics()
};
const reset = () => {
  search.value.varietyName = "";
  search.value.varietyNumber = "";
  getAllVarietyStatistics()
};
const allInfo = ref({
  validCount: "",
  referCount: "",
  altCount: "",
  mixCount: "",
});
interface SNPInfo {
  number: number;
  name: string;
  type: string;
}
const tableData: SNPInfo[] = [
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
  {
    number: 1,
    name: "位点1",
    type: "SNP",
  },
];
import img from "../../assets/ssr.png";
const ssrList = ref([
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
  {
    img: img,
    name: "bnlg439w1",
    number: "P01",
    sortName: "先玉335",
    sortNumber: "BGG253-2",
  },
]);
const getCellDetail = (type: string) => {
  console.log(type);
  showCellDetail.value = true;
};
const handleResize = () => {
  // (document as any).getElementById('images_content').style.height = `${(document as any).getElementById('all-info').clientHeight - 20}px`;
  // (document as any).getElementById('images').style.height = `${(document as any).getElementById('all-info').clientHeight - 50}px`
};
watchEffect(() => {
  console.log('store----------', store.currentSpeciesId);
  nextTick(() => {
    // (document as any).getElementById('images_content').style.height = `${(document as any).getElementById('all-info').clientHeight - 20}px`;
    // (document as any).getElementById('images').style.height = `${(document as any).getElementById('all-info').clientHeight - 70}px`
  });
  window.addEventListener("resize", handleResize);
});
/*   import axios from 'axios'
  import * as XLSX from 'xlsx'; */
import { transformSheets, commonSheet } from "../../utils/read_xlsx";
interface ChromosomeInfo {
  number: string;
  validCount: string;
  referCount: string;
  altCount: string;
  mixCount: string;
}
const genesList = ref([{}])
const sheetTableData = ref<ChromosomeInfo[]>([]);
//获取某个品种的统计数据
const getAllVarietyStatistics = async () => {
  let obj = {
    species_id: store.currentSpeciesId,
    // variety_name: search.value.varietyName,
    variety_name: 'RZ2300252',
    variety_code: search.value.varietyNumber,
  }
  getVarietyStatistics(obj).then((res) => {
    if (res.code === 0) {
      let total_stats = res.data.total_stats;
      let total = res.data.total_stats.total;
      allInfo.value.validCount = total_stats.valid_count + "/" + Number(total_stats.valid_count / total).toFixed(2) + "%";
      allInfo.value.referCount = total_stats.ref_count + "/" + Number(total_stats.ref_count / total).toFixed(2) + "%";
      allInfo.value.altCount = total_stats.alt_count + "/" + Number(total_stats.alt_count / total).toFixed(2) + "%";
      allInfo.value.mixCount = total_stats.het_count + "/" + Number(total_stats.het_count / total).toFixed(2) + "%";
      probesType.value = res.data.probes_type;
      console.log('probesType.value-----', res.data.chrom_stats.length);
      res.data.chrom_stats?.forEach(item => {
        genesList.value.push({ title: 1, genes: item.genes })
        sheetTableData.value.push({
          number: item.chromosome,
          validCount: item.valid_count + "/" + Number(item.valid_count / item.total).toFixed(2) + "%",
          referCount: item.ref_count + "/" + Number(item.ref_count / item.total).toFixed(2) + "%",
          altCount: item.alt_count + "/" + Number(item.alt_count / item.total).toFixed(2) + "%",
          mixCount: item.het_count + "/" + Number(item.het_count / item.total).toFixed(2) + "%",
        });
      });
      console.log('sheetTableData.value-----', sheetTableData.value);
    }
  })
}
onMounted(() => {
  getAllVarietyStatistics()
  /* let arr = commonSheet("/chrom.xlsx");
  setTimeout(async () => {
    sheetTableData.value = arr;
    console.log(12, sheetTableData.value);
  }, 1000); */
});
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
  margin: 10px;
}

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

.fingerprint-search {
  @include size(calc(100% - 20px), calc(100% - 20px));
  box-shadow: 0 2px 10px 1px #00000026;

  .search-box {
    @include size(calc(100% - 20px), 55px);
    @include layout(flex-end, space-between);

    .search-input {
      :deep .el-input {
        margin-right: 10px;
        height: 40px;
      }
    }

    .search-btn {
      @include layout(center, flex-end);

      button:first-child {
        margin-right: 10px;
      }

      .iconfont {
        padding-right: 10px;
      }
    }
  }

  .search-result {
    @include size(calc(100% - 20px), calc(100% - 80px));
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;

    .search-bottom {
      @include layout(flex-start, space-between);

      .content {
        height: calc(100% - 65px);
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        overflow: auto;

        .item {
          margin: 5px;
          border: 1px solid #efefef;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;

          img {
            width: 270px;
            height: 230px;
          }

          @media screen and (min-width: 1901px) {
            @include size(calc(100% / 4 - 20px), auto);
          }

          @media screen and (max-width: 1900px) {
            @include size(calc(100% / 3 - 20px), auto);
          }

          @media screen and (max-width: 1600px) {
            @include size(calc(100% / 2 - 20px), auto);
          }

          @media screen and (max-width: 1200px) {
            @include size(calc(100% / 2 - 20px), auto);

            img {
              width: 90%;
              height: auto;
            }
          }

          .single {
            font-size: 15px;
            // text-align: left;
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

      .table-info {
        height: calc(100% - 65px);
        overflow: auto;
      }
    }

    .search-result-ssr {
      width: 75%;
      // left: 0;
      // top: 100%;
    }

    .search-result-snp {
      width: calc(25% - 20px);
      // left: calc(80% + 10px);
      // top: 100%;
    }

    .search-result-snp20k {
      width: calc(100% - 10px);
      height: auto;
      max-height: 100%;

      // overflow: auto;
      // left: 0;
      // top: 0;
      .result-content {
        display: flex;
        flex-wrap: wrap;

        .left {
          @include layout(flex-start, space-between);
        }

        .all-info {
          width: 25%;
          padding: 5px;

          div {
            display: flex;
            flex-direction: column;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            margin-bottom: 10px;

            span {
              font-size: 14px;
              padding: 15px 5px;
            }

            span:first-child {
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

        .content {
          width: 75%;
          height: 462px;
          box-sizing: border-box;

          .item {
            width: calc(100% - 1px);
            height: 100%;
            @include layout(center, center);

            :deep .el-scrollbar__view {
              display: flex;
              align-items: flex-start;

              @media screen and (min-width: 2001px) {
                flex-direction: row;
                /*  img{
                  width: auto;
                  max-width: 50%;
                  max-height: 100%;
                } */
              }

              @media screen and (max-width: 2000px) {
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

        .chromosome {
          height: 460px;

          .table-info {
            height: 100%;

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

        @media screen and (min-width: 1901px) {
          .left {
            width: 100%;
          }

          .chromosome {
            height: 460px;
            width: calc(100% - 13px);
          }
        }

        @media screen and (max-width: 1900px) {
          .left {
            width: 100%;
          }

          .chromosome {
            width: 100%;
          }
        }

        @media screen and (max-width: 1200px) {
          .left {
            width: 100%;
            flex-direction: column;

            .all-info {
              width: calc(100% - 10px);
              display: flex;
              justify-content: space-between;

              div {
                width: calc(25% - 10px);
                margin: 5px;

                &:first-child {
                  margin-left: 0;
                }

                &:last-child {
                  margin-right: 0;
                }
              }
            }

            .content {
              width: calc(100% - 10px);
            }
          }

          .chromosome {
            width: 100%;
          }
        }
      }
    }
  }
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}

:deep .el-table__inner-wrapper:before {
  background-color: unset !important;
}
</style>
