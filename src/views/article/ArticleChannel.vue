<script setup>
import { ref } from 'vue'
import {
  artGetChannelService,
  artDeleteChannelService
} from '@/api/article/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue' // 导入 ChannelEdit 组件

// 表单数组
const channelList = ref([])

const loading = ref(false) //定义加载状态
const dialog = ref() //定义弹窗

const getChannelList = async () => {
  loading.value = true // 开始加载动画
  const { data } = await artGetChannelService() // 请求后台数据
  channelList.value = data.data // 赋值给表单数组
  loading.value = false // 结束加载动画
}
getChannelList() // 调用获取频道列表的方法

const onDelChannel = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该分类名称?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true // 是否可以拖拽
    })

    // 用户点击确认按钮时
    await artDeleteChannelService(row.id) // 删除文章分类
    ElMessage.success('删除成功')
    getChannelList() // 调用获取频道列表的方法
  } catch (error) {
    // 用户点击取消按钮或右上角×时
    ElMessage({
      type: 'info',
      message: '取消操作'
    })
    // 阻止删除
  }
}

const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onSuccess = () => {
  getChannelList()
} // 监听子组件的关闭事件
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel" type="primary"> 添加分类 </el-button>
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
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            round
            plain
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <!-- Dialog 对话框弹层组件 -->
    <Channel-Edit ref="dialog" @success="onSuccess"></Channel-Edit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
