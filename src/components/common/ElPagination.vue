<template>
    <div class="paging">
        <el-pagination
            v-model:current-page="props.pageNum"
            v-model:page-size="props.pageSize"
            :page-sizes="[10, 30, 100, 200]"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next"
            :total="props.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const props = defineProps({
        pageNum: Number,
        pageSize: Number,
        total: Number
    })
    const emits = defineEmits(['current-change'])
    const pagination = ref({
        pageNum:1,
        pageSize:10,
        total:1000
    })
    const background = ref(false)
    const disabled = ref(false)
    const handleSizeChange = (val: number) => {
        console.log(`${val} items per page`)
        pagination.value.pageSize = val
        emits('current-change', pagination.value)
    }
    const handleCurrentChange = (val: number) => {
        console.log(`current page: ${val}`)
        pagination.value.pageNum = val
        emits('current-change', pagination.value)
    }
    defineExpose({
        pagination,
    })
</script>
<style lang="scss" scoped>  
.paging{
    height: 55px;
    padding: 10px;
    box-sizing: border-box;
  }
</style>