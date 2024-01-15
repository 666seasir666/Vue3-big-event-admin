<script setup>
// 引入用户注册和登录的服务
import { userRegisterService, userLoginService } from '@/api/user.js'
// 引入 Element Plus 图标
import { User, Lock } from '@element-plus/icons-vue'
// 引入 Vue 相关功能
import { ref, watch } from 'vue'
// 引入用户状态管理工具
import { useUserStore } from '@/stores'
// 引入 Vue Router
import { useRouter } from 'vue-router'
// 创建一个响应式变量，用于表示当前操作是否为注册操作
const isRegister = ref(false)
// 创建一个响应式变量，用于存储表单数据
const form = ref()

// 提交form数据对象
const formModel = ref({
  username: '', // 用于存储用户输入的用户名
  password: '', // 用于存储用户输入的密码
  repassword: '' // 用于存储用户输入的确认密码
})

// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      // 自定义校验器，用于检查确认密码与密码是否一致
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur' // 触发校验的事件类型
    }
  ]
}

// 注册校验
const register = async () => {
  await form.value.validate() // 调用表单验证方法
  await userRegisterService(formModel.value) // 调用用户注册服务，使用表单模型中的数据
  ElMessage.success('注册成功') // 使用 Element Plus 的 ElMessage 显示注册成功消息
  isRegister.value = false //注册成功切换到登录
}

// 获取用户状态管理实例，可能是一个 Vuex store 或其他状态管理工具
const userStore = useUserStore()

// 获取 Vue Router 实例，用于在代码中进行路由导航
const router = useRouter()

// 登录函数，处理用户登录逻辑
const login = async () => {
  // 调用表单验证方法，确保用户输入满足规则
  await form.value.validate()

  // 调用用户登录服务，使用表单模型中的数据
  const res = await userLoginService(formModel.value)

  // 使用用户状态管理工具设置用户的登录令牌
  userStore.setToken(res.data.token)

  // 使用 Element Plus 的 ElMessage 显示登录成功消息
  ElMessage.success('登录成功')

  // 使用路由导航到首页
  router.push('/')
}

// 使用 watch 监听 isRegister 变化
watch(isRegister, () => {
  // 当 isRegister 变化时，重置 formModel 的值
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="4" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        class="zhuce"
      >
        <el-form-item>
          <div class="User_Registration">注册</div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            show-password
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox :validate-event="true" :checked="true"
              >记住我</el-checkbox
            >
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  // background-color: #58feb9;
  background: url(http://localhost:5173/src/assets/login_bg.jpg);
  background-size: cover;
  justify-content: center;
  // .bg {
  //   background:
  //     // url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
  //     url('@/assets/login_bg.jpg') no-repeat left / cover;

  //   border-radius: 0 20px 20px 0;
  // }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .zhuce {
    background: rgba(255, 255, 255, 0.24);
    backdrop-filter: blur(8px);
    border-radius: 22px;
    justify-content: center;
  }

  .User_Registration {
    justify-content: center;
  }
}
</style>
