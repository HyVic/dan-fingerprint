<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>{{ type === 0?'新增用户':'编辑用户' }}</span>
        <i class="iconfont icon-cha1" @click="Close"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <el-form :model="info">
          <el-form-item label="用户名：">
            <el-input v-model="info.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别：">
            <!-- <el-input v-model="info.sex" autocomplete="off" /> -->
            <el-radio-group v-model="info.sex">
              <el-radio value="男">男</el-radio>
              <el-radio value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="部门：">
            <el-select v-model="info.department">
              <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="工号：">
            <el-input v-model="info.workNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色：">
            <!-- <el-input v-model="info.role" autocomplete="off" /> -->
            <el-select v-model="info.roles" placeholder="角色选择" clearable multiple>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="info.phone" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="submit"><i class="iconfont icon-p-footer"></i>提交</el-button>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { addUsers } from "../../../api/admin";
import { ElMessage } from "element-plus";
const props = defineProps<{
  row: any;
  type: number;
}>();
const emits = defineEmits(["close"]);
const Close = () => {
  emits("close");
};
const submit = () => {
  console.log(info.value);
  let obj = {
    username: info.value.userName,
    password: "123456",
    confirm_password: "123456",
    role_ids: info.value.roles,
  };
  addUsers(obj).then((res) => {
    if (res.code === 0) {
      emits("close");
    }
    ElMessage({
      showClose: true,
      message: res.message,
      type: res.code === 0 ? "success":"error",
    });
  });
  emits("close");
};
const info = ref({
  userName: "",
  sex: "",
  department: "",
  workNumber: "",
  roles: "",
  phone: "",
});
const applicationTypeList = ref([
  { value: "研发部", label: "研发部" },
  { value: "财务部", label: "财务部" },
  { value: "市场部", label: "市场部" },
]);
const options = ref([
  {
    value: "1",
    label: "部门科长",
  },
  {
    value: "2",
    label: "工程师",
  },
  {
    value: "3",
    label: "主任",
  },
]);
watchEffect(() => {
  //   console.log(2222222, info.value.role,info.value);
});
onMounted(() => {
  if (props.type === 1) {
    info.value = props.row;
    info.value.roles = props.row.role.map((item: any) => {
      return item.id;
    });
  }
  console.log(1111111, props.row);
  /*   options.value = props.row.role.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  }); */
});
</script>
  
  
<style scoped lang="scss">
@mixin layout($align, $justify) {
  display: flex;
  align-items: $align;
  justify-content: $justify;
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
    width: 50%;
    max-width: 800px;
    min-width: 500px;
    height: auto;
    min-height: 500px;
    background-color: white;
    border-radius: 5px;
    .dialog-top {
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 20px;
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
      padding: 20px;
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
      }
      .el-form {
        width: 95%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 2.5%;
        .el-form-item {
          width: 45%;
          margin-bottom: 25px;
          align-items: flex-start;
          :deep .el-form-item__label {
            width: 70px;
            justify-content: flex-start;
            font-weight: bold;
            text-align: left;
            /* &::after{
                color: var(--el-color-danger);
                content: "*";
                font-size: 13px;
            } */
          }
          .el-form-item__content {
            width: calc(100% - 150px);
          }
          :deep .el-select {
            width: 100% !important;
          }
          .label {
            border: 1px dashed #b3b3b3;
            padding: 0 20px;
            border-radius: 5px;
            width: calc(100% - 0px);
            text-align: left;
          }
          :deep .el-input__inner {
            height: 35px;
          }
          :deep .el-select__wrapper {
            min-height: 35px;
          }
        }
      }
    }
    .dialog-footer {
      border-top: 1px solid #e5e5e5;
      padding: 10px 20px;
      text-align: right;
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
</style>