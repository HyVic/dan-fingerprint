<template>
  <div class="fingerprint-search">
    <div class="search-box">
      <el-button @click="handleClick(0)"><i class="iconfont icon-tianjiaxinxi1"></i>添加角色</el-button>
    </div>
    <div class="search-result">
      <div class="dialog-basic-info common-cont">
        <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column property="name" label="角色名称" />
          <el-table-column property="department" label="部门类型" />
          <el-table-column property="describe" label="角色描述" />
          <el-table-column align="center" label="操作" width="120">
            <template #default="scope">
              <div class="operation">
                <!-- <span class="iconfont">权限设置</span> -->
                <span class="iconfont" @click="handleClick(1, scope.row)">编辑</span>
                <span class="iconfont" @click="handleDelete(scope.row)">删除</span>
                <!--                 <i class="iconfont icon-bianji" titlt="编辑" @click="handleClick(1,scope.row)"></i>
                <i class="iconfont icon-lajixiang2" titlt="删除" @click="handleDelete(scope.row)"></i> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination ref="paginationRef" :pageNum="pagination.pageNum" :page-size="pagination.pageSize"
      :total="pagination.total" @current-change="handlePagination"></el-pagination>
  </div>
  <edit-role v-if="centerDialogVisible" @close="centerDialogVisible = false" :row="currentRow"
    :type="diaType"></edit-role>
</template>
<script setup lang="ts">
import EditRole from "./dialog/EditRole.vue";
import ElPagination from "../common/ElPagination.vue";
import { getAllRoles, deleteRoles } from "../../api/admin";
import { onMounted, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
interface DataType {
  id: number;
  name: string;
  department: string;
  describe: string;
}
const tableData: DataType[] = [
  {
    id: 1,
    name: "管理员",
    department: "技术部",
    describe: "系统管理员",
  },
];
const diaType = ref(0);
const centerDialogVisible = ref(false);
const currentRow = ref<DataType>();
const handleClick = (type: number, row?: any) => {
  diaType.value = type;
  centerDialogVisible.value = true;
  if (type === 1) {
    currentRow.value = row;
  }
};
const paginationRef = ref(null);
const pagination = ref<any>({
  pageNum: 1,
  pageSize: 10,
  total: 1000,
});
const handlePagination = (currentPage: any) => {
  /*   pagination.value.pageNum = currentPage.pageNum;
    pagination.value.pageSize = currentPage.pageSize; */
  console.log(currentPage);
  getAllData(currentPage.pageNum, currentPage.pageSize);
};
const handleDelete = (row: any) => {
  console.log(row);
  deleteRoles(row.id).then((data) => {
    if (data.code === 0) {
      getAllData(pagination.value.pageNum, pagination.value.pageSize);
    }
    ElMessage({
      showClose: true,
      message: data.message,
      type: "error",
    });
  });
};
const getAllData = (pageNum: number, pageSize: number) => {
  let obj = {
    page: pageNum,
    page_size: pageSize,
  };
  getAllRoles(obj).then((res) => {
    if (res.code == 0) {
      tableData.splice(0, tableData.length);
      tableData.push(...res.data);
      pagination.value.total = res.total;
    }
  });
};
watchEffect(() => {
  console.log("mounted", tableData);
});
onMounted(() => {
  getAllData(pagination.value.pageNum, pagination.value.pageSize);
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

.search-box {
  button {
    color: white;
    border: 0;
    height: 30px;
    background-color: green;

    &:hover {
      opacity: 0.7;
    }
  }
}

.fingerprint-search {
  @include size(calc(100% - 20px), calc(100% - 20px));
  box-shadow: 0 2px 10px 1px #00000026;

  .search-box {
    @include size(calc(100% - 20px), 55px);
    @include layout(flex-end, flex-end);

    .iconfont {
      margin-right: 10px;
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
    }

    .dialog-basic-info {
      height: auto;

      :deep .el-table {
        border: 1px solid #e5e5e5;
        border-radius: 2px;

        .operation {
          width: 100%;
          @include layout(flex-end, space-evenly);

          .iconfont {
            font-size: 12px;
            color: white;
            cursor: pointer;
            padding: 0 8px;
            border-radius: 3px;

            &:first-child {
              background-color: green;
            }

            &:last-child {
              background-color: #b9300e;
            }

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  .paging {
    height: 55px;
  }
}

:deep .el-table th.el-table__cell {
  color: #656565 !important;
}
</style>