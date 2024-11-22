<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>数据上传</span>
        <i class="iconfont icon-cha1" @click="Close"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <el-form :model="info">
          <!--             <el-form-item label="品种类型">
                  <el-select v-model="info.type">
                    <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-form-item> -->
          <el-form-item>
            <el-upload ref="upload" class="icon" drag action="#" :on-exceed="handleExceed" :on-change="getFileInfo" :auto-upload="false" :limit="1">
              <i class="iconfont icon-shujushangchuan3"></i>
              <div class="el-upload__text">
                将文件拖到此处 <em style="color: #365baa;font-weight: bold">或点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip"></div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="submitUpload"><i class="iconfont icon-p-footer"></i>提交</el-button>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { ref, onMounted } from "vue";
const emits = defineEmits(["close"]);
const Close = () => {
  emits("close");
};
const info = ref({
  id: "",
  type: "先玉335",
});
const sortList = ref([
  {
    id: 1,
    value: "先玉335",
    label: "先玉335",
  },
  {
    id: 1,
    value: "郑单958",
    label: "郑单958",
  },
  {
    id: 1,
    value: "京科968",
    label: "京科968",
  },
  {
    id: 1,
    value: "良玉99",
    label: "良玉99",
  },
  {
    id: 1,
    value: "先玉355",
    label: "先玉355",
  },
  {
    id: 1,
    value: "裕丰303",
    label: "裕丰303",
  },
  {
    id: 1,
    value: "伟科966",
    label: "伟科966",
  },
]);
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const upload = ref<UploadInstance>();
const getFileInfo = (file: UploadRawFile) => {
  console.log(22, file);
};
const handleExceed: UploadProps["onSuccess"] = (files) => {
  console.log(44, files);
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  console.log(111, file);
    file.uid = genFileId();
    upload.value!.handleStart(file);
};
const submitUpload = () => {
  console.log(info.value);
  upload.value!.submit();
  emits("close");
};
onMounted(() => {
  console.log(1111111);
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
    min-height: 400px;
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
      .icon {
        width: 100%;
        font-size: 25px;
        color: #9f9f9f;
        i {
          font-size: 50px;
          color: #9f9f9f;
        }
      }
      .el-form {
        width: 100%;
        .el-form-item {
          width: 100%;
          margin-bottom: 10px;
          :deep .el-form-item__label {
            width: 120px;
            justify-content: flex-start;
            font-weight: bold;
            text-align: left;
            &::after {
              color: var(--el-color-danger);
              content: "*";
              font-size: 13px;
            }
          }
          .el-form-item__content {
            width: calc(100% - 150px);
          }
          .label {
            border: 1px dashed #b3b3b3;
            padding: 0 20px;
            border-radius: 5px;
            width: calc(100% - 0px);
            text-align: left;
          }
          :deep .el-textarea__inner {
            min-height: 200px !important;
          }
          :deep .el-upload-list__item:hover{
            .el-upload-list__item-file-name{
              color: #606266 !important;
            }
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