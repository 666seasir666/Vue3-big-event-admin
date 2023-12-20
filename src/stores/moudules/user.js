import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '../../api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 移除token
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    // 异步函数，用于获取用户信息
    const getUser = async () => {
      const res = await getUserInfoService() // 请求获取数据
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      // 设置token
      setToken,
      // 移除token
      removeToken,
      // 用户信息
      user,
      // 获取用户信息
      getUser,
      // 设置用户信息
      setUser
    }
  },
  {
    persist: true
  }
)
