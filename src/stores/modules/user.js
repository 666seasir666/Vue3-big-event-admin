import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    // 定义一个token变量，用于存储用户信息token
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 定义一个removeToken函数，用于移除用户信息token
    const removeToken = () => {
      token.value = ''
    }

    // 定义一个user变量，用于存储用户信息
    const user = ref({})
    // 异步函数，用于获取用户信息
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
    }
    // 设置用户函数，用于设置用户信息
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      // 获取token
      token,
      // 设置token
      setToken,
      // 移除token
      removeToken,
      // 获取用户信息
      user,
      // 获取用户信息
      getUser,
      // 设置用户信息
      setUser
    }
  },
  {
    // 设置 persist 为 true，表示将数据存储到本地，以便在页面重新加载后可以继续使用
    persist: true
  }
)
