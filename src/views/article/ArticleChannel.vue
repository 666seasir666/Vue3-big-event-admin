<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'

// 表单数组
const channelList = ref([])

const loading = ref(false) //定义加载状态

const getChannelList = async () => {
  loading.value = true // 开始加载动画
  const { data } = await artGetChannelsService() // 请求后台数据
  channelList.value = data.data // 赋值给表单数组
  loading.value = false // 结束加载动画
}
getChannelList()

const onEditchannel = (row, $index) => {
  console.log(row, $index)
}

const onDeletechannel = (row, $index) => {
  console.log(row, $index)
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button tpye="primary"> 添加分类 </el-button>
    </template>
    <el-table
      v-if="channelList.length > 0"
      v-loading="loading"
      :data="channelList"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            round
            plain
            @click="onEditchannel(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            round
            plain
            @click="onDeletechannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
