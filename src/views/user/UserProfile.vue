<script setup>
// 导入 useUserStore 函数，用于获取用户存储状态和方法
import { useUserStore } from '@/stores'

// 导入 ref 函数，用于创建响应式引用
import { ref } from 'vue'

// 导入 userUpdateInfoService，用于更新用户信息的 API
import { userUpdateInfoService } from '@/api/user.js'

const formRef = ref()
// 获取用户信息
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()

// 用户信息
const userInfo = ref({ username, nickname, email, id })

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
} //表单校验

const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userUpdateInfoService(userInfo.value)
    await getUser()
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="6">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left: 214px"
              @click="onSubmit"
              type="primary"
              >提交修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
