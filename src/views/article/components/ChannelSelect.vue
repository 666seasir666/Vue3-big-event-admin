<script setup>
import { artGetChannelService } from '@/api/article/article.js' //导入文章分类列表接口
import { ref } from 'vue'

defineProps({
  // 定义一个属性modelValue，类型为Number或String
  modelValue: {
    type: [Number, String]
  }
})

// 定义 `emit` 函数，该函数用于触发自定义事件，并传递 'update:modelValue' 作为事件名称
const emit = defineEmits(['update:modelValue'])
const channelList = ref([]) // 创建一个响应式引用（ref）变量，用于存储频道列表数据，初始值为空数组
// 定义一个异步函数，获取文章分类列表
const getChannelList = async () => {
  // 调用artGetChannelService函数，获取文章分类列表
  const res = await artGetChannelService()
  // 将获取到的频道列表赋值给channelList
  channelList.value = res.data.data
}
getChannelList() // 调用getChannelList函数，获取取文章分类列表
</script>

<template>
  <!-- 监听 update:modelValue 事件，触发 emit 函数传递 'update:modelValue' 作为事件名称和 $event 作为参数 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- [:key="channel.id"]: 设置每个 el-option 的唯一标识符为频道的 id -->
    <!-- [:label="channel.cate_name"]: 设置显示在下拉框中的文本为频道的 cate_name 属性 -->
    <!-- [:value="channel.id"]: 设置选中该项时，绑定的值为频道的 id -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
