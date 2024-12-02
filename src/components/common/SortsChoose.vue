<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>{{ showResult ? '比对结果' : '品种选择面板' }}</span>
        <i class="iconfont icon-cha1" @click="Close()"></i>
      </div>
      <div v-if="!showResult" style="height: calc(100% - 55px);">
        <VarietyDataTable :is="true" @update:model-value="updateUploadData"></VarietyDataTable>
      </div>
      <div v-if="showResult" class="result">biduijieguo</div>
      <div class="dialog-footer" v-if="showResult">
        <div></div>
        <el-button @click="showResult = false"><i class="iconfont icon-initial"></i>返回</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VarietyDataTable from "./VarietyDataTable.vue"
import { ElMessage } from "element-plus";
import { ref } from "vue";
const emits = defineEmits(['close'])
const Close = () => {
  emits('close')
}
const showResult = ref(false)
const updateUploadData = (data: any) => {
  console.log('data---------', data)
  if (data.length > 0) {
    showResult.value = true
  } else {
    ElMessage.warning('请选择比对数据')
  }
}
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
    width: 90%;
    min-width: 800px;
    height: 90%;
    background-color: white;
    border-radius: 5px;

    .dialog-top {
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 10px;
      padding-top: 5px;
      font-size: 20px;
      @include layout(center, space-between);

      .iconfont {
        cursor: pointer;
        font-size: 28px;
      }
    }
  }
}
.result{
  height: calc(100% - 115px)
}
.dialog-footer {
  @include layout(center, space-between);
  text-align: right;
  padding-right: 10px;
  height: 55px;

  button {
    height: 30px;
    color: #409eff;
    border-color: #409eff63;

    .iconfont {
      padding-right: 10px;
    }
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>