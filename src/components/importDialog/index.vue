<template>
  <div class="impExpWrap">
    <span class="impExpTips">导入之前请先下载模板</span>
    <el-row class="impExpBtnWrap">
      <div style="height: 30px;">
        <div style="float: left">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-progress="progressUpload"
            :on-error="handleAvatarError"
            :disabled="isUploading"
            style="display: inline-block;margin-right: 120px"
          >
            <el-button type="primary" :disabled="isUploading">导入</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </div>
        <div style="float: right">
          <!--<el-button type="primary" icon="el-icon-upload2" @click="importFunModel">导入</el-button>-->
          <el-button type="success" :disabled="isUploading" @click="downloadModel">下载模板</el-button>
        </div>
      </div>
      <div v-show="uploadingShow" class="upload-loading " style="width: 100%">
        <p style="color: #999">
          {{ percentage === 100 ? '文件导入成功' : '文件已上传，系统正在处理，请勿关闭！' }}
        </p>
        <el-progress :text-inside="true" :stroke-width="16" :percentage="percentage" status="success" />
        <p style="text-align: center">成功：{{ myMes.success }}条（新增：{{ myMes.insert }}条，更新：{{ myMes.update }}条）</p>
        <p style="text-align: center">失败：{{ myMes.failure }}条</p>
        <div v-if="isShow">
          <p v-for="(item, index) in myMes.tip" :key="index" style="text-align: center">
            <span v-if="index < 5">{{ item }}</span>
          </p>
          <span v-if="myMes.tip !== undefined && myMes.tip.length > 5" class="lookMore" @click="showAllerror">更多</span>
          <!-- <el-button type="success" @click="downloadModel" :disabled="isUploading">查看更多</el-button> -->
        </div>
        <div v-else>
          <p v-for="(item, index) in myMes.tip" :key="index" style="text-align: center">
            <span>{{ item }}</span>
          </p>
        </div>

        <!--<div style="width:100%;margin-top: 20px;">-->
        <!--<el-button type="primary" @click="handleClose" style="float: right">关闭</el-button>-->
        <!--</div>-->
      </div>
    </el-row>
  </div>
</template>

<script>
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getToken } from '@/utils/auth'
import { getStatus } from '@/api/importExportApi'
import { getEditAuthority } from '@/api/user'
export default {
  name: 'ImportDialog',
  mixins: [uploadExcelMix],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    uploadUrl: {
      type: String,
      required: true
    },
    templateApi: {
      type: Function,
      required: true
    },
    templateName: {
      type: String,
      required: true
    },
    onReset: {
      type: Function,
      required: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true,
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      uploadingShow: false,
      isUploading: false,
      percentage: 0,
      myMes: ''
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible === false && this.percentage === 100) {
        this.uploadingShow = false
        this.percentage = 0
        this.myMes = ''
      }
    }
  },
  methods: {
    showAllerror() {
      this.isShow = false
    },
    handleClose($event) {
      this.isShow = true
      this.$emit('visible', false)
    },
    // 下载模板
    async downloadModel() {
      const data = {
        ignoreField: ''
      }
      await getEditAuthority(this.$route.meta.id).then(res => {
        res.forEach(item => {
          if (item.menuName === '含小区导入模板') {
            data.ignoreField = item.menuName
            return
          }
        })
      })
      await this.templateApi(data).then(response => {
        const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
        const fileName = `${this.templateName}.xlsx`
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
        this.$emit('visible', false)
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped>
	@import "~@/styles/form.css";
  .upload-loading{
    width:97%;
    margin-top: 30px;
  }
  .lookMore{
    display: block;
    text-align: right;
    cursor: pointer
  }
  .upload-loading .aaa.bbb{background: #6582c3;}
  .upload-loading .aaa{background: #d5d6d6;height: 15px;text-align: center;line-height:15px;height:15px;border-radius: 10px; font-size: 12px;color: #ffffff}
  .upload-loading .aaa.aaa{background-image:linear-gradient(135deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent); background-size: 40px 40px; -webkit-animation:per-animation 1.5s linear infinite; transition: width .6s ease;}
  @-webkit-keyframes per-animation{from{background-position:40px 0}to{background-position:0 0}}
</style>
