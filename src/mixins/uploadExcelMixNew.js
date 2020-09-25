import { getToken } from '@/utils/auth'
import { getStatusNew, excelDownload } from '@/api/importExportApi'
export default {
  methods: {
    // 导入成功
    handleAvatarSuccess(file) {
      if (file.code === 0) {
        this.percentage = 0
        this.uploadingShow = true
        this.isUploading = true
        const run = setInterval(() => {
          getStatusNew(getToken).then(res => {
            this.percentage = parseInt(res.schedule)
            this.myMes = res
            if (res.schedule === '100') {
              clearInterval(run)
              this.failureNum = res.failure
              this.excelHref = JSON.parse(res.result).importFileFailureUrl
              this.excelName = JSON.parse(res.result).importFileFailureName
              const succ = JSON.parse(res.result)
              if (res.failure === 0) {
                if (succ.importStatus !== 3) {
                  this.failureMes = `恭喜您导入的数据共计${res.success}条数据，已全部导入成功！`
                  this.isSuccess = true
                } else {
                  this.failureMes = `导入失败，请联系系统管理员！`
                  this.isSuccess = false
                }
              } else {
                this.failureMes = `文件共计${res.total}条数据，成功${res.success}条数据，失败${res.failure}条数据，请下载导入失败的数据到本地，调整后再次导入。`
                this.isSuccess = true
              }
              // this.uploadingShow = false
              this.isUploading = false
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
      this.failureNum = 0
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
      this.failureNum = 0
      this.uploadingShow = false
      this.isUploading = false
      this.$message.error('导入失败')
    },
    // 导入过程中
    progressUpload() {
      this.uploadingShow = true
    },
    downExcel(href, name) {
      excelDownload({
        path: href,
        fileName: name
      }).then(response => {
        if (response) {
          const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
          const fileName = `${name}`
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(datas, fileName)
          } else {
            const a = document.createElement('a')
            a.href = URL.createObjectURL(datas)
            a.download = fileName
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(a.href)
            document.body.removeChild(a)
          }
        }
      })
    }
  }
}
