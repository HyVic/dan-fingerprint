<template>
    <div class="fingerprint-search">
        <div class="search-box">
           <el-button @click="addInfo"><i class="iconfont icon-tianjiaxinxi1"></i>添加机构信息</el-button>
           <el-button><i class="iconfont icon-chakanxiangqingjiaguxiangqing"></i>查看详情</el-button>
        </div>
        <div class="search-result">
            <div class="dialog-basic-info common-cont">
                <el-table 
                    stripe 
                    ref="multipleTableRef"
                    :data="tableData"
                    style="width: 100%"
                >
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column property="institutionName" label="机构名称"/>
                <el-table-column property="creditCode" label="统一社会信用代码"/>
                <el-table-column property="phone" label="电话"  width="110"/>
                <el-table-column property="applicationType" label="申请类型"  width="110"/>
                <el-table-column property="auditStatus" label="审核状态"  width="110"/>
                <el-table-column align="center" label="操作" width="120">
                    <template #default="scope">
                        <div class="operation">
                            <i class="iconfont icon-bianji" titlt="编辑" @click="handleClick(scope.row)"></i>
                            <i class="iconfont icon-lajixiang2" titlt="删除"></i>    
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        </div>
        <el-pagination ref="paginationRef" :pageNum="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" @current-change="handlePagination"></el-pagination>
    </div>
    <row-detail v-if="centerDialogVisible" @close="centerDialogVisible = false" :row="currentRow"></row-detail>
    <!-- <add-info v-if="addDialogVisible"></add-info> -->
     <AddInfo v-if="addDialogVisible" @close="addDialogVisible = false"></AddInfo>
</template>
<script setup lang="ts">
  import RowDetail from './RowDetail.vue'
  import AddInfo from '../information-management/AddInfo.vue';
  import ElPagination from '../common/ElPagination.vue'
  import { ref, watchEffect } from 'vue';
  interface DataType {
      institutionName: string;
      creditCode: number;
      phone: number;
      applicationType: string;
      auditStatus: string;
  }
  const tableData: DataType[] = [{
      institutionName: 'MSNP00001',
      creditCode: 1,
      phone: 111288396,
      applicationType: '新增',
      auditStatus: '审核通过'
  },];
  const centerDialogVisible = ref(false)
  const currentRow = ref<DataType>();
  const handleClick = (row: any) => {
      centerDialogVisible.value = true;
      currentRow.value = row;
      console.log(row);
  }
  const addDialogVisible = ref(false)
  const addInfo = () => {
      console.log('addInfo');
      addDialogVisible.value = true;
  }
  const paginationRef = ref(null);
  watchEffect(() => {
      console.log('mounted',paginationRef.value);
  });
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
.search-box{
  button{
    color: white;
    border: 0;
    height: 30px;
    &:first-child{
      background-color: green
    }
    &:last-child{
      background-color: #409eff;
    }
    &:hover{
      opacity: 0.7;
    }
  }
}
.fingerprint-search{
    @include size(calc(100% - 20px),calc(100% - 20px));
    box-shadow: 0 2px 10px 1px #00000026;
  .search-box{
    @include size(calc(100% - 20px),55px);
    @include layout(flex-end,flex-end);
    .iconfont{
        margin-right: 10px;
    }
  }
  .search-result{
    @include size(calc(100% - 20px),calc(100% - 130px));
    border: 1px solid #efefef;
    border-radius: 5px;
    .common-cont{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        .operation{
          width: 100%;
          @include layout(flex-end,space-evenly);
        }
    }
    .dialog-basic-info{
        height: auto;
        :deep .el-table{
            border: 1px solid #e5e5e5;
            border-radius: 2px;
            .iconfont{
                cursor: pointer;
                font-size: 18px;
                &:first-child{
                color: green
                }
                &:last-child{
                color: #fc9700;
                }
                &:hover{
                    opacity: 0.7;
                }
            }
        }
    }
  }
  .paging{
    height: 55px;
  }
}
:deep .el-table th.el-table__cell{
  color: #656565 !important;
}
</style>