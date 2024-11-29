<template>
    <div class="dialog">
      <div class="dialog-inner">
        <div class="dialog-top">
          <span>申请升级机构信息</span>
          <i class="iconfont icon-cha1" @click="Close"></i>
        </div>
        <div class="dialog-basic-info common-cont">
            <el-form :model="info" class="el-form-vertical">
                <el-form-item label="机构名称：">
                    <el-input v-model="info.institutionName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="统一社会信用代码：">
                    <el-input v-model="info.creditCode" autocomplete="off" />
                </el-form-item>
                <el-form-item label="上级机构：">
                  <el-select v-model="info.applicationType">
                    <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input v-model="info.responsiblePerson" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="info.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电子邮箱：">
                    <el-input v-model="info.email" autocomplete="off" />
                </el-form-item>
<!--                 <el-form-item label="传真：">
                    <el-input v-model="info.fax" autocomplete="off" />
                </el-form-item>
                <el-form-item label="成立时间：">
                    <el-date-picker
                        v-model="info.date"
                        type="date"
                        placeholder="Pick a day"
                    />
                </el-form-item> -->
                <el-form-item label="上传营业执照：">
                    <div class="business-license">
                        <!-- <el-upload
                            class="icon"
                            drag
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple
                            :accept="acceptTypes"
                        >
                        <i class="iconfont icon-jiahao2"></i>
                        <div class="el-upload__text">
                            将文件拖到此处， <em style="color: #365baa;font-weight: bold">或点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                            </div>
                        </template>
                        </el-upload> -->
                        <el-upload action="#" list-type="picture-card" :auto-upload="false">
                            <!-- <el-icon><Plus /></el-icon> -->
                            <i class="iconfont icon-jiahao2"></i>
                            <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleDownload(file)"
                                >
                                    <el-icon><Download /></el-icon>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                    <el-icon><Delete /></el-icon>
                                </span>
                                </span>
                            </div>
                            </template>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <el-form :model="info" class="el-form-horizontal">
                <el-form-item label="传真：">
                    <el-input v-model="info.fax" autocomplete="off" />
                </el-form-item>
                <el-form-item label="成立时间：">
                    <el-date-picker
                        v-model="info.date"
                        type="date"
                        placeholder="Pick a day"
                    />
                </el-form-item>
                <el-form-item label="邮编：">
                    <el-input v-model="info.postalCode" autocomplete="off" />
                </el-form-item>
                <el-form-item label="公司官网：">
                    <el-input v-model="info.website" autocomplete="off" />
                </el-form-item>
                <el-form-item label="机构地点：">
                    <!-- <el-input v-model="info.address" autocomplete="off" /> -->
                    <el-select v-model="info.address1">
                        <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                    <el-select v-model="info.address2">
                        <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                    <el-select v-model="info.address3">
                        <el-option v-for="item in applicationTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                    <el-input v-model="info.detailedAddress" autocomplete="off" placeholder="详细地址"/>
                </el-form-item>
 <!--                <el-form-item label="具体地址：">
                    <el-input v-model="info.detailedAddress" autocomplete="off" />
                </el-form-item> -->
                <el-form-item label="经营范围">
                    <el-input v-model="info.businessScope" type="textarea" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="info.remark" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <div class="dialog-footer">
            <el-button><i class="iconfont icon-p-footer"  @click="Close"></i>保存</el-button>
            <el-button><i class="iconfont icon-p-footer"  @click="Close"></i>关闭</el-button>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </template>
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const emits = defineEmits(['close'])
  const Close = () => {
    emits('close')
  }
  const info = ref({
    institutionName:'',
    creditCode:'',
    applicationType:'',
    date: '',
    responsiblePerson:'',
    phone:'',
    email:'',
    fax:'',
    address1:'',
    address2:'',
    address3:'',
    detailedAddress:'',
    postalCode:'',
    website:'',
    businessScope:'',
    remark:''
  })
  const acceptTypes = '.jpg,.png'
  const applicationTypeList = ref([{ value: '1', label: '新增' }, { value: '2', label: '变更' }, { value: '3', label: '注销' }])
  onMounted(() => {
    console.log(1111111)
  })
  import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
  </script>
  
  
  <style scoped lang="scss">
  @mixin layout($align,$justify){
    display: flex;
    align-items: $align;
    justify-content: $justify;
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
      width: 900px;
      height: auto;
      min-height: 500px;
      background-color: white;
      border-radius: 5px;
      .dialog-top{
        height: 50px;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 20px;
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
        padding: 20px;
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
        .el-form {
        width: 100%;
        .el-form-item {
          width: 100%;
          margin-bottom: 10px;
          :deep .el-form-item__label{
            width: 140px;
            justify-content: flex-start;
            font-weight: bold;
            text-align: left;
            padding: 0;
          }
          :deep .el-form-item__content{
            width: calc(100% - 150px) !important;
            flex-wrap: unset !important;
          }
          .label{
            border: 1px dashed #b3b3b3;
            padding: 0 20px;
            border-radius: 5px;
            width: calc(100% - 0px);
            text-align: left;
          }
          :deep .el-textarea__inner{
            min-height: 100px !important;
          }
        }
       }
       .el-form-vertical{
        position: relative;
        .el-form-item{
            &:nth-child(1), &:nth-child(2), &:nth-child(5){
                :deep .el-form-item__label{
                    &::after{
                        color: var(--el-color-danger);
                        content: "*";
                        font-size: 13px;
                    }
                }
            }
            @for $i from 0 through 6{
                &:nth-child(#{$i}){
                    width: calc(50% - 15px);
                }
            }
            &:nth-child(7){
                display: flex;
                flex-direction: column;
                position: absolute;
                width: calc(50% - 15px);
                top: 0;
                right: 0;
                :deep .el-form-item__content{
                    width: 100% !important;
                }
                .business-license{
                    height: 250px;
                    width: 100%;
                    .iconfont{
                        font-size: 50px;
                    }
                }
            }
        }
       }
       .el-form-horizontal{
            display: flex;
            flex-wrap: wrap;
            .el-form-item{
                :deep .el-date-editor.el-input, .el-date-editor.el-input__wrapper{
                    width: 100% !important;
                }
                &:nth-child(5){
                :deep .el-select{
                    width: 25%;
                    margin-right: 10px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
                }
                &:nth-child(3), &:nth-child(1){
                    width: calc(50% - 15px);
                    margin-right: 30px;
                }
                &:nth-child(4), &:nth-child(2){
                    width: calc(50% - 15px);
                }
        }
       }
      }
      .dialog-footer{
          border-top: 1px solid #e5e5e5;
          padding: 10px 20px;
          text-align: right;
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
  </style>