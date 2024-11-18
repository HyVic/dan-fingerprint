<template>
    <!--   <apexchart
        type="heatmap"
        height="100%"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></apexchart> -->
      <div class="echarts-container" ref="viewRef">
        <div class="tooltip">
            <div class="title">
                <div class="invalid"></div>HOM
                <div class="valid"></div>HET
                <div class="blue"></div>DIF
            </div>
            <div>
                <i class="iconfont icon-xiazai1" title="下载" @click="onDownload"></i>
                <i class="iconfont icon-fangda1" title="放大" @click="onEnlarge"></i>
            </div>
        </div>
        <div class="echarts-container-inner">
            <div class="item-box" v-for="(item,index) in boxData" :class="{active_het: item.value === 'HET', active_blue: item.value === 'BLUE'}" :key="index"></div>
        </div>
      </div>
      <enlarge-page v-if="showEnlarge" @enlarge="showEnlarge = false" type="heat"></enlarge-page>
    </template>
<script setup lang="ts">
    import EnlargePage from '../common/EnlargePage.vue'
    import { onMounted, reactive, ref } from 'vue';
    import html2canvas from 'html2canvas';
    const viewRef = ref<any>(null);
    const boxData = reactive([
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        {
            value: 'HET'
        },
        {
            value: 'HOM'
        },
        {
            value: 'BLUE'
        },
        
    ]);
    /* const boxData = reactive([{
        value: false
    },{
        value: false
    },{
        value: true
    },{
        value: true
    },
    ]) */
    const showEnlarge = ref(false);
    const onEnlarge = () => {
        showEnlarge.value = true;
    };
    const onDownload = () => {
        (async () => {
            // hide.value = false
        try {
            const canvas = await html2canvas(viewRef.value, { useCORS: true });
            const img = canvas.toDataURL('image/png');
    
            const link = document.createElement('a');
            link.href = img;
            link.download = 'view.png';
            link.click();
        } catch (error) {
            console.error('Error capturing view as image:', error);
        }
        })();
    }
    onMounted(() => {
     console.log('boxData',boxData.length)
    })            
</script>
    <style scoped lang="scss">
     .echarts-container{
        @media screen and (min-width: 2001px){
            width: calc(55% - 40px);
            padding: 20px 20px 10px 10px;
        }
        @media screen and (max-width: 2000px){
            width: calc(97% - 40px);
            padding: 20px;
            margin: auto;
        }
        .tooltip{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 18px;
            margin-bottom: 20px;
            .title{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .invalid{
                width: 40px;
                height: 18px;
                margin-right: 10px;
                background-color: #e7e7e7;
            }
            .valid{
                width: 40px;
                height: 18px;
                margin-right: 10px;
                margin-left: 30px;
                background-color: #ee6666;
            }
            .blue{
                width: 40px;
                height: 18px;
                margin-right: 10px;
                margin-left: 30px;
                background-color: cornflowerblue;
            }
            .iconfont{
                margin-left: 20px;
                font-size: 25px;
                cursor: pointer;
                &:hover{
                    color: #ee6666;
                }
            }
        }
        .echarts-container-inner{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .item-box{
                width: calc(0.5% - 1px);
                aspect-ratio: 1;
                margin: 0.5px;
                background-color: #e7e7e7;
            }
            .active_het{
                background-color: #ee6666;
            }
            .active_blue{
                background-color: cornflowerblue;
            }
        }
     } 
    </style>