<template>
    <div class="dialog">
      <div class="dialog-inner">
        <div class="dialog-top">
          <span>详情</span>
          <i class="iconfont icon-cha1" @click="Close()"></i>
        </div>
        <div class="dialog-basic-info common-cont">
            <el-table 
                stripe 
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column property="ID" label="标记ID" />
                <el-table-column property="number" label="编号" />
                <el-table-column property="chromosome" label="染色体"/>
                <el-table-column property="position" label="位置" />
                <el-table-column property="approvalNumber" label="Refer基因型" />
                <el-table-column property="registrationNumber" label="Alt基因型" />
                <el-table-column property="genetype" label="样本基因型" />
                <el-table-column property="annotate" label="功能注释" />
                <el-table-column property="remarks" label="备注" />
            </el-table>
        </div>
        <div class="dialog-footer">
          <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" @current-change="handlePagination"></el-pagination>
          <el-button @click="Close"><i class="iconfont icon-p-footer" ></i>关闭</el-button>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
    import type { TableInstance } from 'element-plus'
    import ElPagination from '../common/ElPagination.vue'
    import { ref, onMounted } from 'vue'
    const dialogFormVisible = ref(true)
    const emits = defineEmits(['close'])
    const Close = () => {
        emits('close')
    }
    interface User {
      ID: number
      number: number
      chromosome: number
      position: string
      Refer: string
      Alt: string
      genetype: string
      annotate: string
      remarks: string
    }
    const multipleTableRef = ref<TableInstance>()
    const multipleSelection = ref<User[]>([])
    const tableData: User[] = [
        {
          ID: 1,
          number: 1,
          chromosome: 1,
          position: 'string',
          Refer: 'string',
          Alt: 'string',
          genetype: 'string',
          annotate: 'string',
          remarks: 'string',
        },
    ]
    const handleSelectionChange = (val: User[]) => {
        multipleSelection.value = val
    }
    const handleDelete = (index: number, row: User) => {
        console.log(index, row)
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
    onMounted(() => {
        console.log(1111111,dialogFormVisible.value)
    })
  </script>
  
  
  <style scoped lang="scss">
  @mixin layout($align,$justify){
    display: flex;
    align-items: $align;
    justify-content: $justify;
  }
  .dialog-footer{
      @include layout(center, space-between);
      text-align: right;
      padding-right: 5px;
      height: 55px;
      border-top: 1px solid #e5e5e5;
      padding: 10px 20px;
      text-align: right;
     .iconfont{
      padding-right: 10px;
      font-size: 18px;
     }
      button{
       outline: none;
    }
  }
  .dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(56, 52, 52, 0.62);
    z-index: 3;
    @include layout(center,center);
    .dialog-inner{
      width: 90%;
      min-width: 800px;
      max-width: 1500px;
      height: 90%;
      min-height: 400px;
      background-color: white;
      border-radius: 5px;
      .dialog-top{
        height: 50px;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 10px;
        padding-top: 5px;
        font-size: 20px;
        @include layout(center,space-between);
        .iconfont{
          cursor: pointer;
          font-size: 28px;
        }
      }
      .common-cont{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        .title{
          text-align: left;
          padding-bottom: 10px;
        }
      }
      .dialog-basic-info{
        height: calc(100% - 120px);;
        :deep .el-table{
            border: 1px solid #e5e5e5;
            border-radius: 2px;
        }
      }
      .dialog-footer{
          border-top: 1px solid #e5e5e5;
          padding: 10px;
          text-align: right;
          .iconfont{
            padding-right: 10px;
            font-size: 18px;
          }
          button{
            outline: none;
          }
        }
    }
  }
  :deep .el-table th.el-table__cell{
  color: #656565 !important;
}
  </style>