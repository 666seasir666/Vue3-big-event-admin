<script setup>
import { ref } from 'vue'
import {
  artEditChannelService,
  artAddChannelService
} from '@/api/article/article.js'

const dialogVisible = ref(false) // 定义对话框显示状态
const formRef = ref(null) // 定义表单引用对象，使用 ref 创建

const formModel = ref({
  cate_name: '',
  cate_alias: ''
}) // 定义表单数据

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名称必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
} // 定义表单验证规则

const open = async (row) => {
  dialogVisible.value = true // 打开对话框
  formModel.value = { ...row } // 如果有数据，则进行数据回显
  if (formRef.value) {
    formRef.value.clearValidate() // 在确保 formRef 存在时调用 clearValidate
  }
} // 定义打开对话框方法

const emit = defineEmits(['success']) // 定义自定义事件，用于向父组件发送成功事件
const onSubmit = async () => {
  try {
    await formRef.value.validate() // 表单验证
    const isEdit = formModel.value.id // 是否有id，判断是编辑还是新增
    if (isEdit) {
      // 编辑
      await artEditChannelService(formModel.value)
      ElMessage.success('编辑成功')
    } else {
      // 新增
      await artAddChannelService(formModel.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false // 关闭对话框
    emit('success') // 触发自定义事件，传递数据给父组件
  } catch (error) {
    ElMessage.error('信息不正确')
  }
} // 定义提交表单事件

const closeDialog = () => {
  dialogVisible.value = false
  if (formModel.value.id) {
    ElMessage.info('取消编辑分类') // 显示取消编辑分类提示
  } else {
    ElMessage.info('取消添加分类') // 显示取消添加分类提示
  }
} //定义取消提示框

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- Dialog 对话框弹层 -->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
    align-center
    :draggable="true"
    :modal="false"
    :append-to-body="true"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称:" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名:" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- footer 插槽 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
