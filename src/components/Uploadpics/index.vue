<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :limit="6"
      :file-list="fileList"
      :headers="headers"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :class="{'pic-is-show' : isShow}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'Uploadpics',
  props: ['idEdit', 'formImgs'],
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/agency/file/upload',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      fileList: [], // 编辑时用于展示的数据
      dialogImageUrl: '',
      dialogVisible: false,
      isShow: false,
      pics: [] // 用于提交表单的数据
    }
  },
  watch: {
    // 编辑页面时第一次赋值
    idEdit: {
      handler() {
        this.formImgs.forEach(item => {
          const data = {}
          const formData = {}
          data.url = `${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`
          formData.imgUrl = item.imgUrl
          this.fileList.push(data)
          this.pics.push(formData)
          this.$emit('pics', this.pics)
        })
        // this.code = this.formCode
        // this.getAddress()
      }
    }
  },
  mounted() {
    if (this.$route.query.modelType === 'look') {
      this.isShow = true
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件`)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传图片只能是jpeg,png,jpg,bmp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功后
    handleAvatarSuccess(response, file, fileList) {
      if (response.code === 0) {
        const data = {}
        data.imgUrl = response.data.fullPath
        data.uid = file.uid
        this.pics.push(data)
        this.$emit('pics', this.pics)
      }
    },
    handleError(res) {
      const { message } = res
      const msg = JSON.parse(message)
      this.$message.error(msg.msg)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.pics.length; i++) {
        if (this.pics[i].uid) {
          if (this.pics[i].uid === file.uid) {
            this.pics.splice(i, 1)
            break
          }
        } else {
          if (this.pics[i].imgUrl === file.url.split(process.env.VUE_APP_API_IMGURL)[1]) {
            this.pics.splice(i, 1)
          }
        }
      }
    }
  }
}
</script>

<style>
	.pic-is-show .el-upload {
		display: none;
	}
</style>
