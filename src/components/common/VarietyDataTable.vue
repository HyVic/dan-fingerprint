<template>
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
</template>
<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { getAllVarieties } from "../../api/variety"
import { ref, onMounted } from 'vue'
import {useStore} from '../../store/index'
const store = useStore()
const props = defineProps({
  page: Number,
  pageSize: Number,
  is:Boolean
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
let tableData: User[] = [
  {
    id: 1,
    species_id: 1,
    variety_name: 'string',
    variety_code: 'string',
    approval_number: 'string',
    registration_number: 'string',
    origin: 'string',
    organization_id: 0,
    probes_type: 'string',
  },
  {
    id: 2,
    species_id: 2,
    variety_name: 'string',
    variety_code: 'string',
    approval_number: 'string',
    registration_number: 'string',
    origin: 'string',
    organization_id: 0,
    probes_type: 'string',
  },
]
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const count = ref(20)
const getAllVarietiesData = () => {
  console.log('props.page=====', props)
  let obj = {
    page: props.page,
    page_size: props.pageSize,
    species_id: store.currentSpeciesId,
    is_system: props.is
  }
  getAllVarieties(obj).then((res) => {
    console.log('count.value*2=====', res)
    emit('update:modelValue', count.value)
  })
}
onMounted(() => {
  getAllVarietiesData()
})
/* watchEffect(() => {
  getAllVarietiesData()
}) */
</script>