<script setup>
// 从Vue中导入'ref'函数
import { ref } from 'vue'

// 从Element Plus库中导入特定的图标
import { Plus, Upload } from '@element-plus/icons-vue'

// 从'stores'模块中导入'useUserStore'函数
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user.js'
// 使用'useUserStore'函数创建对用户存储的引用
const userStore = useUserStore()

const uploadRef = ref() // 定义选择图片上传组件实例

// 声明一个变量imgUrl，用于存储用户头像的url
const imgUrl = ref(userStore.user.user_pic)
// 声明一个函数onUploadFile，用于上传文件
// 定义一个处理文件上传的函数，接受一个文件对象作为参数
const onUploadFile = (file) => {
  // 创建一个新的FileReader对象
  const reader = new FileReader()

  // 以DataURL形式读取文件内容
  reader.readAsDataURL(file.raw)

  // 监听读取完成事件
  reader.onload = () => {
    // 将读取结果赋值给imgUrl变量
    imgUrl.value = reader.result
  }
}

// 上传头像
const onUpdateAvatar = async () => {
  // 调用用户上传头像服务
  await userUploadAvatarService(imgUrl.value)
  // 获取用户信息
  await userStore.getUser()
  // 弹出提示框
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          @click="uploadRef.$el.querySelector('input').click()"
          type="primary"
          :icon="Plus"
          size="large"
        >
          选择图片
        </el-button>
        <el-button
          style="margin-left: 44px"
          @click="onUpdateAvatar"
          type="success"
          :icon="Upload"
          size="large"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
