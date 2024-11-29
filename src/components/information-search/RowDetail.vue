<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="dialog-top">
        <span>{{ type === 1 ? '详情' : '新增' }}</span>
        <i class="iconfont icon-cha1" @click="Close"></i>
      </div>
      <div class="dialog-basic-info common-cont">
        <el-form :model="info">
          <el-form-item label="位点ID：" v-if="type === 1">
            <!-- <span>{{ row.id }}</span> -->
            <el-input v-model="info.id" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="物种ID：">
            <!-- <span>{{ row.species_id }}</span> -->
            <el-input v-model="info.species_id" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="位点编号：">
            <!-- <span>{{ row.marker_code }}</span> -->
            <el-input v-model="info.marker_code" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="位点名称：">
            <!-- <span>{{ row.marker_name }}</span> -->
            <el-input v-model="info.marker_name" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="染色体编号：">
            <!-- <span>{{ row.chromosome }}</span> -->
            <el-input v-model="info.chromosome" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="物理位置：">
            <!-- <span>{{ row.physical_position }}</span> -->
            <el-input v-model="info.physical_position" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="参考等位基因：">
            <!-- <span>{{ row.reference_allele }}</span> -->
            <el-input v-model="info.reference_allele" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="可选等位基因：">
            <!-- <span>{{ row.alternative_allele }}</span> -->
            <el-input v-model="info.alternative_allele" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
          <el-form-item label="侧翼序列：">
            <!-- <span>{{ row.flanking_sequence }}</span> -->
            <el-input v-model="info.flanking_sequence" type="textarea" autocomplete="off" :disabled="type === 1" />
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="Close" v-if="type === 1"><i class="iconfont icon-cha1"></i>关闭</el-button>
        <el-button @click="submit" v-if="type === 0"><i class="iconfont icon-cha1"></i>提交</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { addSnpmarker } from "../../api/admin";
import { ref, onMounted } from 'vue'
const props = defineProps<{
  row: any,
  type: number,
}>()
const emits = defineEmits(['close','success'])
const Close = () => {
  emits('close')
}
const info = ref({
  id: '',
  species_id: '',
  marker_code: '',
  marker_name: '',
  chromosome: '',
  physical_position: '',
  reference_allele: '',
  alternative_allele: '',
  flanking_sequence: '',
})
const submit = () => {
  let obj = {
    snp_markers: [info.value]
  }
  addSnpmarker(obj).then((res) => {
    if (res.code === 0) {
      emits('success')
      ElMessage.success('添加成功')
    }
  })
}
onMounted(() => {
  console.log(1111111, props.row)
  if (props.type === 1) {
    info.value = props.row
  }
})
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

      span {
        display: block;
        width: 100%;
        border: 1px dashed #e7e7e7a6;
        border-radius: 5px;
        text-align: left;
        padding: 5px 10px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        box-sizing: border-box;
        line-height: 1.6;
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

        .el-form-item {
          width: 100%;
          margin-bottom: 10px;

          :deep .el-form-item__label {
            width: 160px;
            justify-content: flex-start;
            font-weight: bold;
            text-align: left;
          }

          .el-form-item__content {
            width: calc(100% - 160px);
          }

          .label {
            border: 1px dashed #b3b3b3;
            padding: 0 20px;
            border-radius: 5px;
            width: calc(100% - 0px);
            text-align: left;
          }

          :deep .el-textarea__inner {
            min-height: 100px !important;
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