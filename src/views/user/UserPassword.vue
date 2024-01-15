<script setup>
import { ref } from 'vue'
import { userUpdatePassService } from '@/api/user.js'
// 引入 Vue Router
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores' //导入stores下面的用户仓库

const formRef = ref()
// 获取路由实例
const router = useRouter()
// 获取用户状态
const userStore = useUserStore()

const onSubmit = async () => {
  // 验证表单
  const valid = await formRef.value.validate()
  // 如果表单验证通过
  if (valid) {
    // 调用用户更新密码服务
    await userUpdatePassService(pwdForm.value)
    // 弹出提示框
    ElMessage({ type: 'success', message: '修改密码成功！' })
    // 更新用户token和用户信息
    userStore.setToken('')
    userStore.setUser({})
    // 跳转到登录页
    router.push('/login')
  }
}

const onReset = () => {
  // 重置表单
  formRef.value.resetFields()
}

// 声明一个ref对象，用于重置密码表单数据
const pwdForm = ref({
  // 旧密码
  old_pwd: '',
  // 新密码
  new_pwd: '',
  // 确认新密码
  re_pwd: ''
})

const checkOldSame = (rule, value, cb) => {
  // 检查新密码是否和原密码相同
  if (value === pwdForm.value.old_pwd) {
    // 如果相同，则报错
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    // 如果不同，则通过
    cb()
  }
}

const checkNewSame = (rule, value, cb) => {
  // 检查新密码和确认新密码是否一致
  if (value !== pwdForm.value.new_pwd) {
    // 不一致则报错
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    // 一致则通过
    cb()
  }
}

const rules = {
  // 原密码
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    }
  ],
  // 新密码
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 确认新密码
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
} // 表单校验规则
</script>

<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="6">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原始密码：" prop="old_pwd">
            <el-input
              show-password
              v-model="pwdForm.old_pwd"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新的密码：" prop="new_pwd">
            <el-input
              show-password
              v-model="pwdForm.new_pwd"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="re_pwd">
            <el-input
              show-password
              v-model="pwdForm.re_pwd"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item style="display: flex; justify-content: flex-end">
            <el-button @click="onReset" style="margin-left: 130px"
              >重置</el-button
            >
            <el-button
              @click="onSubmit"
              type="primary"
              style="margin-left: 10px"
              >修改密码</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
