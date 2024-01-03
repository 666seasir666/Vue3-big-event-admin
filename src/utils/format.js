import { dayjs } from 'element-plus'

/**
 * 格式化时间
 * @param {string | number | Date} time - 要格式化的时间
 * @returns {string} 格式化后的时间字符串，例如：'2024年01月03日'
 */
// 导出一个名为formatTime的函数，该函数接收一个参数time，返回一个字符串，表示time的格式为YYYY年MM月DD日
export const formatTime = (time) =>
  dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
