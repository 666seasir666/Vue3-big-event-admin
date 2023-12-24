// 引入用户存储和其他依赖
import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

// API 基础URL
const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 创建 Axios 实例
const instance = axios.create({
  baseURL, //基础地址
  timeout: 100000 //超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 获取用户存储实例
    const userStore = useUserStore()

    // 如果用户有令牌，将令牌添加到请求头中
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }

    return config
  },
  // 请求错误处理
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  // 成功响应处理
  (res) => {
    // 如果返回的数据 code 为 0，表示成功
    if (res.data.code === 0) {
      return res
    }

    // 如果返回的数据 code 不为 0，显示错误消息
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  // 响应错误处理
  (err) => {
    // 显示错误消息
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })

    // 在控制台记录错误信息
    console.log(err)

    // 如果响应状态码为 401，跳转到登录页面
    if (err.response?.status === 401) {
      router.push('/login')
    }

    return Promise.reject(err)
  }
)

// 导出 Axios 实例和基础URL
export default instance
export { baseURL }
