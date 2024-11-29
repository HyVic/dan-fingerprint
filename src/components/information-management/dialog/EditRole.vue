<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>{{ type === 0 ? '新增角色' : '编辑角色' }}</span>
        <i class="iconfont icon-cha1" @click="Close"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <el-form :model="info">
          <el-form-item label="角色名称：">
            <el-input v-model="info.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="部门类型：">
            <el-select v-model="info.department">
              <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="角色描述：">
            <el-input type="textarea" v-model="info.describe" autocomplete="off" />
          </el-form-item>
          <el-form-item label="权限设置：">
            <el-tree style="max-width: 600px" :data="data" show-checkbox node-key="id" default-expand-all
              :default-checked-keys="[2]" :props="defaultProps" />
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
import { addRoles, getAllPermissions, updateRoles } from "../../../api/admin";
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
    name: info.value.name,
    describe: "123456",
    permission_ids: [1, 2, 3],
  };
  if (props.type === 0) {
    addRoles(obj).then((res) => {
      if (res.code === 0) {
        emits("close");
      }
      ElMessage({
        showClose: true,
        message: res.message,
        type: res.code === 0 ? "success":"error",
      });
    });
  } else {
    updateRoles(props.row.id, obj).then((res) => {
      if (res.code === 0) {
        emits("close");
      }
      ElMessage({
        showClose: true,
        message: res.message,
        type: res.code === 0 ? "success":"error",
      });
    });
  }
};
const info = ref({
  name: "",
  describe: "",
  department: "",
  permission_ids: [],
});
const applicationTypeList = ref([
  { value: "研发部", label: "研发部" },
  { value: "财务部", label: "财务部" },
  { value: "市场部", label: "市场部" },
]);
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    /* children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ], */
  },
  {
    id: 3,
    label: 'Level one 3',
    /* children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ], */
  },
]
watchEffect(() => {
  //   console.log(2222222, info.value.role,info.value);
});
onMounted(() => {
  getAllPermissions().then((res) => {
    if (res.code === 0) {
      console.log(res.data);
    }
  });
  if (props.type === 1) {
    info.value = props.row;
    /*     info.value.roles = props.row.role.map((item: any) => {
      return item.id;
    }); */
  }
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
        // justify-content: space-between;
        margin: 20px 2.5%;

        .el-form-item {
          width: 100%;
          margin-bottom: 25px;
          align-items: flex-start;

          :deep .el-form-item__label {
            width: 100px;
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