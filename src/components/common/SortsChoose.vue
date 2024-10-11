<template>
    <div class="dialog">
      <div class="dialog-inner">
        <div class="dialog-top">
          <span>品种选择面板</span>
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
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column property="sortName" label="品种名称"/>
                <el-table-column property="sortKind" label="作物种类" />
                <el-table-column property="approvalNumber" label="审定编号" />
                <el-table-column property="registrationNumber" label="登记编号" />
                <el-table-column property="sortSource" label="品种来源" />
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <i class="iconfont icon-15qingkong-1"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialog-footer">
            <el-pagination :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" @current-change="handlePagination"></el-pagination>
            <!-- <el-button><i class="iconfont icon-p-footer"></i>清空面板</el-button> -->
            <el-button><i class="iconfont icon-lujing-6"></i>比对</el-button>
            <!-- <el-button><i class="iconfont icon-chanpinchaxun"></i>近似筛查</el-button> -->
          </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
    import ElPagination from '../common/ElPagination.vue'
    import type { TableInstance } from 'element-plus'
    import { ref, onMounted } from 'vue'
    const dialogFormVisible = ref(true)
    const emits = defineEmits(['close'])
    const Close = () => {
      emits('close')
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
    ]
    const handleSelectionChange = (val: User[]) => {
      multipleSelection.value = val
    }
    const handleDelete = (index: number, row: User) => {
      console.log(index, row)
    }
    onMounted(() => {
      console.log(1111111,dialogFormVisible.value)
    })
    const pagination = ref<any>({
      pageNum: 1,
      pageSize: 10,
      total: 1000
  })
    const handlePagination = (currentPage: any) => {
      pagination.value.pageNum = currentPage.pageNum
      pagination.value.pageSize = currentPage.pageSize
    }
  </script>
  
  
  <style scoped lang="scss">
  @mixin layout($align,$justify){
    display: flex;
    align-items: $align;
    justify-content: $justify;
  }
  .dialog-footer{
    button{
      color: white;
      height: 30px;
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
      width: 60%;
      min-width: 800px;
      height: auto;
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
        height: auto;
        :deep .el-table{
            border: 1px solid #e5e5e5;
            border-radius: 2px;
        }
      }
      .dialog-footer{
          border-top: 1px solid #e5e5e5;
          padding: 10px;
          text-align: right;
          @include layout(center,space-between);
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