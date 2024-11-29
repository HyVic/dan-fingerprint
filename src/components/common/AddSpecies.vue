<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>添加物种</span>
        <i class="iconfont icon-cha1" @click="Close"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <el-form :model="info">
          <el-form-item label="物种名称：">
            <el-input v-model="info.species_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="物种描述：">
            <el-input v-model="info.describe" autocomplete="off" />
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
import { ref, onMounted, defineEmits } from "vue";
import { addSpecies } from "../../api/admin";
import {getAllSpecies} from "../../api/species"
import { ElMessage } from "element-plus";
import { useStore } from '../../store'
const store = useStore()
const emits = defineEmits(["close"]);
const Close = () => {
  emits("close");
};
const submit = () => {
  console.log(info.value);
  addSpecies(info.value).then((res) => {
    if (res.code === 0) {
      ElMessage.success("添加成功")
      getAllSpecies().then((res) => {
              console.log("res.data====", res.data);
              store.speciesList = res.data.species;
              store.currentSpeciesId = res.data.species[0].id; // 物种默认id
            })
      emits("close");
    }
  });
};
const info = ref({
  species_name: "",
  describe: ""
});
onMounted(() => {

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
    min-height: 300px;
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
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 0;

        .el-form-item {
          width: 47%;
          margin-bottom: 25px;
          align-items: flex-start;

          :deep .el-form-item__label {
            width: 90px;
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
            width: calc(100% - 90px);
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