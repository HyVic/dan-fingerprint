<template>
  <div class="fingerprint-search">
    <div class="search-box">
      <div class="search-input">
        <el-input v-model="searchName" type="text" style="width: 250px" placeholder="请输入用户名" />
      </div>
      <div class="search-btn">
        <el-button @click="submitSearch"><i class="iconfont icon-chanpinchaxun"></i>检索</el-button>
        <el-button @click="reset"><i class="iconfont icon-initial"></i>重置</el-button>
        <el-button @click="handleClick(0)"><i class="iconfont icon-tianjiaxinxi1"></i>添加用户</el-button>
      </div>
    </div>
    <div class="search-result">
      <div class="dialog-basic-info common-cont">
        <el-table stripe ref="multipleTableRef" :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column property="userName" label="用户名" />
          <el-table-column property="sex" label="性别" width="80" />
          <el-table-column property="workNumber" label="工号" />
          <el-table-column property="department" label="部门" />
          <el-table-column property="role" label="角色">
            <template #default="scope">{{ scope.row.role.map((item: any) => item.name).join(",") }}</template>
          </el-table-column>
          <el-table-column property="phone" label="电话" />
          <el-table-column align="center" label="操作" width="180">
            <template #default="scope">
              <div class="operation">
                <!--                 <i class="iconfont icon-zhongzhimima1" title="重置密码" @click="handleResetPassword(scope.row)"></i>
                <i class="iconfont icon-bianji" titlt="编辑" @click="handleClick(1,scope.row)"></i>
                <i class="iconfont icon-lajixiang1" titlt="删除" @click="handleDelete(scope.row)"></i> -->
                <span class="iconfont" @click="handleResetPassword(scope.row)">重置密码</span>
                <span class="iconfont" @click="handleClick(1, scope.row)">编辑</span>
                <span class="iconfont" @click="handleDelete(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination ref="paginationRef" :pageNum="pagination.pageNum" :page-size="pagination.pageSize"
      :total="pagination.total" @current-change="handlePagination"></el-pagination>
  </div>
  <edit-user v-if="centerDialogVisible" @close="centerDialogVisible = false" :row="currentRow"
    :type="diaType"></edit-user>
</template>
<script setup lang="ts">
import EditUser from "./dialog/EditUser.vue";
import ElPagination from "../common/ElPagination.vue";
import { getAllUsers, deleteUsers, resetPassword } from "../../api/admin";
import { onMounted, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
const searchName = ref("");
const submitSearch = () => {}
const reset = () => {}
interface DataType {
  id: number;
  userName: string;
  sex: string;
  department: string;
  workNumber: string;
  role: Array<{ id: string; name: string }>;
  phone: number;
}
const tableData: DataType[] = [
  {
    id: 1,
    userName: "张三",
    sex: "男",
    department: "技术部",
    workNumber: "10001",
    phone: 111288396,
    role: [
      { id: "1", name: "部门科长" },
      { id: "2", name: "工程师" },
    ],
  },
];
const diaType = ref(0);
const centerDialogVisible = ref(false);
const currentRow = ref<DataType>();
const handleResetPassword = (row: any) => {
  console.log(row);
  let obj = {
    password: "123456",
    confirm_password: "123456",
  };
  resetPassword(row.id, obj).then((data) => {
    ElMessage({
      showClose: true,
      message: data.message,
      type: data.code === 0 ? "success" : "error",
    });
  });
};
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
  getAllData(currentPage.pageNum, currentPage.pageSize);
};
const handleDelete = (row: any) => {
  console.log(row);
  deleteUsers(row.id).then((data) => {
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
  getAllUsers(obj).then((res) => {
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

      .iconfont {
        padding-right: 10px
      }
    }
  }


.fingerprint-search {
  @include size(calc(100% - 20px), calc(100% - 20px));
  box-shadow: 0 2px 10px 1px #00000026;

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
          @include layout(baseline, space-evenly);

          .iconfont {
            font-size: 12px;
            color: white;
            cursor: pointer;
            padding: 0 8px;
            border-radius: 3px;

            &:first-child {
              background-color: #fc9700;
            }

            &:nth-child(2) {
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