<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false) // 定义对话框显示状态

const open = (row) => {
  dialogVisible.value = true
  console.log(row)
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- Dialog 对话框弹层 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
