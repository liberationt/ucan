import { getToken } from '@/utils/auth'
import { getStatus } from '@/api/importExportApi'

export default {
  methods: {
    // 导入成功
    handleAvatarSuccess(file) {
      if (file.code === 0) {
        this.percentage = 0
        this.uploadingShow = true
        this.isUploading = true
        const run = setInterval(() => {
          getStatus(getStatus).then(res => {
            this.percentage = parseInt(res.schedule)
            this.myMes = res
            if (res.schedule === '100') {
              clearInterval(run)
              // this.uploadingShow = false
              this.isUploading = false
              // this.$emit('visible', false)
              // let messages = ''
              // res.tip.forEach((item, index) =>{
              //   if (index < 5) {
              //     messages = `${messages}<p style="text-align: center">${item}</p>`
              //   }
              //   if (index === 5) {
              //     messages = `${messages}<p style="text-align: center">...</p>`
              //   }
              // })
              // const mes = `<p style="text-align: center">成功：${res.success}条（新增：${res.insert}条，更新：${res.update}条）</p><p style="text-align: center">失败：${res.failure}条</p>${messages}`
              // this.$confirm(mes, '操作成功', {
              //   dangerouslyUseHTMLString: true,
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消'
              // }).then(() => {
              //   this.$emit('visible', false);
              //   this.onReset();
              // }).catch(() => {
              //   this.$emit('visible', false);
              //   this.onReset();
              // });
            }
          })
        }, 1000)
      } else {
        this.uploadingShow = false
        this.isUploading = false
        this.$message.error(file.msg)
      }
    },
    // 导入之前的验证
    beforeAvatarUpload(file) {
      const listArr = file.name.split('.')
      const isJPG = (listArr[listArr.length - 1] === 'xls' || listArr[listArr.length - 1] === 'xlsx')
      // const isJPG = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| file.type==='application/vnd.ms-excel');
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('导入失败，文件格式不对，请导入Excel表格')
      }
      if (!isLt20M) {
        this.$message.error('导入失败，文件最大不能超过20M，请重新上传')
      }
      return isJPG && isLt20M
    },
    // 导入失败后
    handleAvatarError(file) {
      this.uploadingShow = false
      this.isUploading = false
      this.$message.error('导入失败')
    },
    // 导入过程中
    progressUpload() {
      this.uploadingShow = true
    }
  }
}
