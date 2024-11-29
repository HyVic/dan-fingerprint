<template>
  <div class="fingerprint-search">
    <div class="search-box">
      <div class="search-input">
        <el-input v-model="searchNumber" type="text" style="width: 250px" placeholder="请输入位点编号" />
      </div>
      <div class="search-btn">
        <el-button @click="submitSearch"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
        <el-button @click="reset"><i class="iconfont icon-initial"></i>重置</el-button>
        <el-button @click="addNewMarker"><i class="iconfont icon-jiahao1"></i>新增</el-button>
      </div>
    </div>
    <div class="search-result">
      <div class="dialog-basic-info common-cont">
        <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column property="id" label="位点ID" width="110" />
          <el-table-column property="species_id " label="物种ID" width="80" />
          <el-table-column property="marker_code" label="位点编号" width="110" />
          <el-table-column property="marker_name" label="位点名称" />
          <el-table-column property="chromosome" label="染色体编号" />
          <el-table-column property="physical_position" label="物理位置" />
          <el-table-column property="reference_allele" label="参考等位基因" />
          <el-table-column property="alternative_allele" label="可选等位基因" />
          <el-table-column property="flanking_sequence" label="侧翼序列" />
          <el-table-column align="center" label="详情" width="100">
            <template #default="scope">
              <i class="iconfont icon-jichuxinxiguanli" titlt="详情" @click="handleClick(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total"
      @current-change="handlePagination"></el-pagination>
  </div>
  <RowDetail v-if="centerDialogVisible" @success="submitSuccess" @close="centerDialogVisible = false" :row="currentRow" :type="type"></RowDetail>
</template>
<script setup lang="ts">
import RowDetail from '../information-search/RowDetail.vue'
import ElPagination from '../common/ElPagination.vue'
import { getAllSnpmarkers } from "../../api/sitemarker"
import { onMounted, ref } from 'vue';
const searchNumber = ref('');
const isSearched = ref(false)
const submitSearch = () => {
  if (searchNumber.value) {
    getAllDatas()
    isSearched.value = true;
  }
}
const reset = () => {
  if (searchNumber.value) {
    searchNumber.value = '';
    getAllDatas()
    isSearched.value = false;
  }
}
interface DataType {
  id: number,
  species_id: number,
  marker_code: string,
  marker_name: string,
  chromosome: string,
  physical_position: number,
  reference_allele: string,
  alternative_allele: string,
  flanking_sequence: string
}
const tableData: DataType[] = [{
  id: 0,
  species_id: 0,
  marker_code: 'string',
  marker_name: 'string',
  chromosome: '0',
  physical_position: 0,
  reference_allele: 'string',
  alternative_allele: 'string',
  flanking_sequence: 'string'
}];
const type = ref(0)
const centerDialogVisible = ref(false)
const currentRow = ref<DataType>();
const handleClick = (row: any) => {
  centerDialogVisible.value = true;
  currentRow.value = row;
  console.log(row);
  type.value = 1
}
const addNewMarker = () => {
  centerDialogVisible.value = true;
  type.value = 0
}
const submitSuccess = () => {
  centerDialogVisible.value = false;
  getAllDatas()
}
const pagination = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 1000
})
const handlePagination = (currentPage: any) => {
  pagination.value.pageNum = currentPage.pageNum
  pagination.value.pageSize = currentPage.pageSize
  getAllDatas()
}
const getAllDatas = () => {
  let obj = {
    page: pagination.value.pageNum,
    page_size: pagination.value.pageSize,
    species_id: 1
  }
  getAllSnpmarkers(obj).then((res: any) => {
    pagination.value.total = res.total
  })
}
onMounted(() => {
  getAllDatas()
})
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
  margin: 10px
}

.search-btn {
  @include layout(center, flex-end);

  button {
    color: white;
    border: 0;
    height: 30px;

    .iconfont {
      padding-right: 10px
    }

    &:nth-child(1) {
      background-color: #409eff
    }

    &:nth-child(2) {
      background-color: #fc9700;
    }

    &:nth-child(3) {
      background-color: green;
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
  }

  .search-result {
    @include size(calc(100% - 20px), calc(100% - 130px));
    border: 1px solid #efefef;
    border-radius: 5px;

    .common-cont {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      .title {
        text-align: left;
        padding-bottom: 10px;
      }
    }

    .dialog-basic-info {
      height: auto;

      :deep .el-table {
        border: 1px solid #e5e5e5;
        border-radius: 2px;

        .iconfont {
          color: #00b700;
          font-size: 18px;
          cursor: pointer;

          &:hover {
            color: #00e700;
          }
        }
      }
    }
  }

  .paging {
    height: 55px;
    padding: 10px;
    box-sizing: border-box;
  }
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}
</style>