<template>
  <div class="index_container">
   <div class="index_bg"></div> 
   <div class="index_content">
    <div class="three">
      <ul>
        <li v-for="(item,index) in characteristicList" :key="index" :class="{'allow':!item.disabled, 'disabled':item.disabled}" @click="handleClick(item,index)">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
   </div>
  </div>
  <UploadData v-if="showUploadData" @close="showUploadData=false"></UploadData>
</template>
  
<script setup lang="ts">
import {useRouter} from 'vue-router';
import UploadData from '../components/common/UploadData.vue'
const router = useRouter()
import { ref } from 'vue';
const showUploadData = ref(false)
  const characteristicList = ref([
    {
      icon: 'icon-chakanxiangqingjiaguxiangqing',
      title: '品种查询',
      path: 'FingerprintSearch',
      disabled: false  
    },
    {
      icon: 'icon-zhonglei',
      title: '品种鉴定',
      disabled: true    
    },
    {
      icon: 'icon-chakanxiangqingjiaguxiangqing',
      title: '品种比对',
      disabled: true    
    },
    {
      icon: 'icon-shangchuan2',
      title: '数据上传',
      disabled: false    
    },
    {
      icon: 'icon-chanpinchaxun',
      title: 'SNP查询',
      path: 'SNPMarkerSearch',
      disabled: false    
    },
  ])
  const handleClick = (item: any,index: number) => {
    console.log(item.title)
    if(item.path){
      router.push({
        name: item.path
      })
    }
    if(index==3) {
      showUploadData.value = true
    }
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
}
.index_container{
 @include size(100%, 100%);
 position: relative;
 isolation: isolate;
 .index_bg{
   @include size(100%, 100%);
   position: absolute;
   top: 0;
   left: 0;
   background: url('../assets/index-bg.png') no-repeat;
   background-size: cover;
   background-position: center;
   opacity: 0.8;
   z-index: -1;
   overflow: hidden;
 }
 .index_content{
   @include size(100%, 100%);
   display: flex;
   flex-direction: column;
   justify-content: center;
   background: linear-gradient(45deg, #ffffffcc, transparent);
 }
 .three{
  @include size(100%, 50%);
  position: relative;
  //background: linear-gradient(rgb(216, 224, 232), rgb(235, 240, 245)) center top / auto 100% no-repeat;
  transition: background-image 0.6s ease 0s;
  ul{
    @include size(80%, 80%);
    margin: auto;
    display: flex;
    @include layout(center, space-between);
    li{
      @include size(calc(25% - 20px), 80%);
      margin: 0 10px;
      flex-direction: column;
      background: linear-gradient(#011a4a0f, #0959ae03);
      @include layout(center, center);
      border-radius: 10px;
      .iconfont{
        font-size: 5rem;
        color: green;
      }
    }
    .allow{
        transform: scale(1);
        transition: ease all 0.3s;
      &:hover{
        background: linear-gradient(#011a4a29, #0959ae05);
        transform: scale(1.1);
        transition: ease all 0.3s;
      }
      cursor: pointer;
    }
    .disabled{
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
}
</style>