import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建一个pinia实例
const pinia = createPinia()
// 使用piniaPluginPersistedstate插件
pinia.use(piniaPluginPersistedstate)

// 导出pinia实例
export default pinia

// 导出user模块
export * from './modules/user'
// 导出counter模块
export * from './modules/counter'
