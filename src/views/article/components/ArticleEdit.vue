<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'

const input = ref('')

const visbleDrawer = ref(false) // 控制添加管理弹窗的显示与隐藏

// 默认数据
const defaultFrom = {
  title: '', //标题
  cate_id: '', //分类id
  content: '', //string 内容
  cover_img: '', //封面图 file 对象
  status: '' // 状态
}
// 准备数据
const formModel = ref({ ...defaultFrom })

const open = (row) => {
  visbleDrawer.value = true // 显示弹窗
  if (row.id) {
    console.log('编辑回显')
  } else {
    formModel.value = { ...defaultFrom }
    console.log('添加')
  }
  console.log(row)
}

defineExpose({
  open
})
</script>

<template>
  <!-- 添加文章弹窗 -->
  <el-dialog
    v-model="visbleDrawer"
    title="添加管理标题"
    width="30%"
    :draggable="true"
    :align-center="true"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="标题名称:">
        <el-input v-model="input" placeholder="请输入文章标题" clearable />
      </el-form-item>
      <el-form-item label="文章分类:">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
