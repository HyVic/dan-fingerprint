<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>品种选择面板</span>
        <i class="iconfont icon-cha1" @click="Close()"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <!--         <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%"
          @selection-change="handleSelectionChange">
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
        </el-table> -->
          <VarietyDataTable v-model="pagination.total" :page="pagination.pageNum" :page-size="pagination.pageSize" :is="true"></VarietyDataTable>
      </div>
      <div class="dialog-footer">
        <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total"
          @current-change="handlePagination"></el-pagination>
        <!-- <el-button><i class="iconfont icon-p-footer"></i>清空面板</el-button> -->
        <el-button><i class="iconfont icon-lujing-6"></i>比对</el-button>
        <!-- <el-button><i class="iconfont icon-chanpinchaxun"></i>近似筛查</el-button> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VarietyDataTable from "./VarietyDataTable.vue"
import ElPagination from '../common/ElPagination.vue'
import type { TableInstance } from 'element-plus'
// import { getAllVarieties } from "../../api/variety"
import { ref, onMounted } from 'vue'
const emits = defineEmits(['close'])
const Close = () => {
  emits('close')
}
onMounted(() => {
})
const pagination = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const handlePagination = (currentPage: any) => {
  pagination.value.pageNum = currentPage.pageNum
  pagination.value.pageSize = currentPage.pageSize
}
</script>
<style scoped lang="scss">
@mixin layout($align, $justify) {
  display: flex;
  align-items: $align;
  justify-content: $justify;
}

.dialog-footer {
  button {
    color: white;
    height: 30px;

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

.dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(56, 52, 52, 0.62);
  z-index: 3;
  @include layout(center, center);

  .dialog-inner {
    width: 90%;
    min-width: 800px;
    height: auto;
    background-color: white;
    border-radius: 5px;

    .dialog-top {
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 10px;
      padding-top: 5px;
      font-size: 20px;
      @include layout(center, space-between);

      .iconfont {
        cursor: pointer;
        font-size: 28px;
      }
    }

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
      min-height: 300px;

      :deep .el-table {
        border: 1px solid #e5e5e5;
        border-radius: 2px;

        .el-table__body-wrapper {
          min-height: 200px;
        }
      }
    }

    .dialog-footer {
      border-top: 1px solid #e5e5e5;
      padding: 10px;
      text-align: right;
      @include layout(center, space-between);

      .iconfont {
        padding-right: 10px;
        font-size: 18px;
      }

      button {
        outline: none;
      }
    }
  }
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}
</style>