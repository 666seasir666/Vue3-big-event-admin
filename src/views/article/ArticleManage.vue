<script setup>
import { ref } from 'vue'
// 引入element-plus编辑和删除图标
import { Edit, Delete } from '@element-plus/icons-vue'
// 引入文章分类下拉选择组件
import ChannelSelect from './components/ChannelSelect.vue'
// 引入文章列表请求的接口数据
import { artGetArticleListService } from '@/api/article/article.js'
// 导入封装格式化日期函数
import { formatTime } from '@/utils/format.js'

// 定义请求参数对象
const params = ref({
  // 分页参数
  pagenum: 1, // 当前页码，默认为第一页
  pagesize: 5, // 每页显示数量，默认为5条
  cate_id: '', // 分类id，初始为空
  state: '' // 文章状态，初始为空
})

const articleList = ref([]) //文章列表数据，初始为空数组
const total = ref(0) // 总文章数量，初始为0

const getArticleList = async () => {
  // 发送获取文章列表的请求
  const res = await artGetArticleListService(params.value)

  // 将返回的数据赋值给articleList和total
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList() //调用文章列表函数

// 处理分页逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1 // 重置为第一页
  params.value.pagesize = size // 更新每页显示数量
  getArticleList() // 重新获取文章列表
}

const onCurrentChange = (page) => {
  params.value.pagesize = page // 更新当前页码
  getArticleList() // 重新获取文章列表
}

// 编辑逻辑
const onEditArticle = (row) => {
  console.log('编辑逻辑', row)
}

// 删除逻辑
const onDeleteArticle = (row) => {
  console.log('删除文章', row)
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button tpye="primary"> 添加管理 </el-button>
    </template>

    <!-- 表单区域 -->
    <el-form :inline="true">
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>

      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            :icon="Edit"
            round
            plain
            @click="onEditArticle(row)"
          >
          </el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            :icon="Delete"
            round
            plain
            @click="onDeleteArticle(row)"
          >
          </el-button>
        </template>
      </el-table-column>
      <!-- 暂无数据显示el-empty -->
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 6, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="true"
      :pager-count="2"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: center"
    />
  </PageContainer>
</template>

<style lang="scss" scoped></style>
