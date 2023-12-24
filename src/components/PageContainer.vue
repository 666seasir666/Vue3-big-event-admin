<script setup>
defineProps({
  title: {
    required: true,
    type: String // 文章分类的标题
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
