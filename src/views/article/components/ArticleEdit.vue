<script setup>
import { ref } from 'vue'
// 导入ChannelSelect组件
import ChannelSelect from './ChannelSelect.vue'
// 导入Plus图标
import { Plus } from '@element-plus/icons-vue'
// 导入QuillEditor组件
import { QuillEditor } from '@vueup/vue-quill'
// 导入QuillEditor的样式
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const visbleDrawer = ref(false) // 控制添加管理弹窗的显示与隐藏

// 默认数据
const defaultFrom = {
  title: '', //标题
  cate_id: '', //分类id
  content: '', //string 内容
  cover_img: '', //封面图 file 对象
  status: '' // 状态
}
// 准备数据
const formModel = ref({ ...defaultFrom })

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请选择文章封面', trigger: 'change' }]
} // 表单验证规则

//图片上传相关逻辑
const imgUrl = ref('')
// 定义一个函数，用于处理上传的文件
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 文件对象转成url
}

const open = (row) => {
  visbleDrawer.value = true // 显示弹窗
  if (row.id) {
    // 如果有id，则表示是编辑操作
    console.log('编辑回显')
  } else {
    // 如果没有id，则表示是添加操作
    formModel.value = { ...defaultFrom }
    console.log('添加')
  }
  console.log(row)
}

defineExpose({
  open
})
</script>

<template>
  <!-- 添加文章弹窗 -->
  <el-dialog
    v-model="visbleDrawer"
    title="添加管理标题"
    width="30%"
    :draggable="true"
    :align-center="true"
  >
    <!-- 发表文章表单 -->
    <el-form
      :rules="rules"
      :model="formModel"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="标题名称:" prop="title">
        <el-input
          v-model="formModel.title"
          placeholder="请输入文章标题"
          clearable
        />
      </el-form-item>
      <el-form-item label="文章分类:" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!--  -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor theme="snow" v-model:content="formModel.content">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 100%;
      height: 100%;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
