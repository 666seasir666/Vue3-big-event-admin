<script setup>
import { ref } from 'vue'
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
    <el-form-item label="标题名称:">
      <el-input v-model="input" placeholder="请输入文章标题" clearable />
      <el-select>
        <!-- 下拉选择框 -->
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
