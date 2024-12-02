<template>
  <el-scrollbar>
    <div class="dialog-basic-info common-cont">
      <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%"
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
      </el-table>
    </div>
  </el-scrollbar>
  <div class="dialog-footer">
    <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total"
      @current-change="handlePagination"></el-pagination>
    <!-- <el-button><i class="iconfont icon-p-footer"></i>清空面板</el-button> -->
    <el-button @click="multipleSelectionData"><i class="iconfont icon-lujing-6"></i>比对</el-button>
    <!-- <el-button><i class="iconfont icon-chanpinchaxun"></i>近似筛查</el-button> -->
  </div>
</template>
<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { getAllVarieties } from "../../api/variety"
import ElPagination from '../common/ElPagination.vue'
import { ref, onMounted } from 'vue'
import { useStore } from '../../store/index'
const store = useStore()
const props = defineProps({
  is: Boolean,
  varietyName: String,
  varietyCode: String
})
const emit = defineEmits(['update:modelValue'])
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
const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])
const tableData = ref<User[]>([])
const pagination = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const getAllVarietiesData = () => {
  let obj = {
    page: pagination.value.pageNum,
    page_size: pagination.value.pageSize,
    species_id: store.currentSpeciesId,
    is_system: props.is,
    variety_name: props.varietyName,
    variety_code: props.varietyCode
  }
  getAllVarieties(obj).then((res) => {
    if (res.code === 0) {
      tableData.value = [...res.data]
      pagination.value.total = res.total
    }
  })
}
const handlePagination = (currentPage: any) => {
  pagination.value.pageNum = currentPage.pageNum
  pagination.value.pageSize = currentPage.pageSize
  getAllVarietiesData()
}
const multipleSelectionData = () => {
  emit('update:modelValue', multipleSelection.value)
}
onMounted(() => {
  getAllVarietiesData()
})
defineExpose({
  getAllVarietiesData
})
</script>
<style lang="scss" scoped>
@mixin layout($align, $justify) {
  display: flex;
  align-items: $align;
  justify-content: $justify;
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
  height: 100%;
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

.el-scrollbar {
  height: calc(100% - 75px) !important;
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}
</style>