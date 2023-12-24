<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article/article.js'

// 表单数组
const channelList = ref([])

const getChannelList = async () => {
  const { data } = await artGetChannelsService()
  channelList.value = data.data
  console.log(channelList.value)
}
getChannelList()
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button tpye="primary"> 添加分类 </el-button>
    </template>
    <el-table :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100"></el-table-column>
    </el-table>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
