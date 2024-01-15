<script setup>
import {
  // 引入管理图标
  Management,
  // 引入优惠图标
  Promotion,
  // 引入已填充用户图标
  UserFilled,
  // 引入用户图标
  User,
  // 引入裁剪图标
  Crop,
  // 引入编辑 pen 图标
  EditPen,
  // 引入切换按钮图标
  SwitchButton,
  // 引入下拉按钮图标
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

import { useUserStore } from '@/stores' //导入stores下面的用户仓库
import { onMounted } from 'vue' //导入onMounted方法
// import router from '../../router'
import { useRouter } from 'vue-router'

const userStore = useUserStore() // 创建一个用户仓库实例
const router = useRouter() // 创建一个路由实例

// 监听用户仓库中的用户基本信息并渲染
onMounted(() => {
  userStore.getUser() // 当组件加载完成时调用
})

//用户信息下拉菜单退出登录和路由跳转
const handleCommand = async (key) => {
  // 判断用户点击的图标
  if (key === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true // 是否可以拖拽
      })

      // 用户点击了确认按钮
      ElMessage({
        type: 'success',
        message: '退出成功'
      })

      // 退出操作
      userStore.removeToken() // 调用 removeToken 函数，用于移除用户信息 token
      userStore.setUser({}) // 重置用户信息
      router.push('/login') // 跳转登录页面
    } catch (error) {
      // 用户点击了取消按钮
      ElMessage({
        type: 'info',
        message: '用户取消操作'
      })
      // 如果点击取消，可以选择在这里返回或执行其他操作
      return
    }
  } else {
    // 跳转到对应的路由
    router.push(`/user/${key}`)
  }
}

// 跳转到github 【666seasir666】用户名
const githubUsername = () => {
  window.location.href = 'https://github.com/666seasir666'
}
</script>

<template>
  <!-- 侧边栏头部 -->
  <el-container class="layout-container">
    <!-- 侧边栏开始 -->
    <el-aside width="200px">
      <!-- 侧边栏头像 -->
      <div class="el-aside__logo" @click="githubUsername"></div>
      <!-- 侧边栏菜单 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <!-- 文章分类路由跳转 -->
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <!-- 文章分管理由跳转 -->
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- 个人中心路由跳转 -->
        <el-sub-menu index="/user">
          <!-- 个人中心标题下拉展开 -->
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <!-- 基本资料路由跳转 -->
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <!-- 更换头像路由跳转 -->
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <!-- 重置密码路由跳转 -->
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 侧边栏结束 -->

    <el-container>
      <el-header>
        <div>
          用户昵称：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <!-- 用户头像 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 用户下拉菜单 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>SeasirHyde ©2024 Created by 原神，启动！</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
  .el-aside__logo {
    cursor: pointer;
  }
}
</style>
