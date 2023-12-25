<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

// 表单数组
const channelList = ref([])

const loading = ref(false) //定义加载状态
const dialog = ref() //定义弹窗

const getChannelList = async () => {
  loading.value = true // 开始加载动画
  const { data } = await artGetChannelsService() // 请求后台数据
  channelList.value = data.data // 赋值给表单数组
  loading.value = false // 结束加载动画
}
getChannelList()

const onDeletechannel = (row, $index) => {
  console.log(row, $index)
}

const onEditchannel = (row) => {
  dialog.value.open({ row })
}

const onaddChannel = () => {
  dialog.value.open({})
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button @click="onaddChannel" tpye="primary"> 添加分类 </el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
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

    <!-- Dialog 对话框弹层组件 -->
    <ChannelEdit ref="dialog"></ChannelEdit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
