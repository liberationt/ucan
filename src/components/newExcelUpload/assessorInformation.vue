<template>
  <div class="upload-excel">
    <div class="btn-level">
      <OpenDailog :dialog-table-visible="dialogTableVisible" :close="closeIt" :open="ajaxData" :title="title" :width="'900px'" :height="'0'">
        <div slot="content">
          <div class="excel-content">
            <div>
              <p>说明：</p>
              <p>1、导入之前请先下载模板</p>
              <p>2、红色*号为必填选项，如果不填写就进行导入则导入失败；</p>
              <p>3、如果导入失败，系统会自动生成导入失败的记录，你可以下载此文件，根据提示，调整导入的文件，调整正确后再进行数据导入；</p>
              <p>4、数据导入成功，系统会自动生成导入成功的记录，你可以下载此文件，进行数据核对；如果有新的导入，也可以进行数据核验；</p>
            </div>
            <div class="excel-btn-file" style="width: 18%;">
              <div class="excel-btn-title">选择导入文件：</div>
              <div style="width:300px;">
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
                  style="display: inline-block;margin-right: 30px;float:left"
                >
                  <el-button type="primary" :disabled="isUploading">导入文件</el-button>
                </el-upload>
              </div>
            </div>
            <div v-show="uploadingShow" class="upload-loading " style="width: 82%;padding-top: 40px">
              <p style="color: #999">
                {{ percentage === 100 ? failureMes : '文件已上传，系统正在处理，请勿关闭！' }}
              </p>
              <el-progress :text-inside="true" :stroke-width="16" :percentage="percentage" :status="isSuccess === true ? 'success' : 'exception'" />
            </div>
            <div v-if="failureNum !== 0" class="downLoad-fail-file">
              <span style="color: #ee9900">合计错误数据：{{ failureNum }}条</span>
              <span class="failure-btn" @click="downExcel(excelHref, excelName)">下载导入失败数据</span>
            </div>
            <div class="excel-btn-top">
              <el-button type="primary" size="small" :disabled="isUploading" @click="openList">历史导入记录</el-button>
              <el-button type="success" size="small" :disabled="isUploading" @click="downloadModel">下载导入模板</el-button>
            </div>
          </div>
        </div>
      </OpenDailog>
    </div>
    <div class="table-list">
      <OpenDailog :dialog-table-visible="dialogListVisible" :close="closeListIt" :open="ajaxListData" :title="'历史导入记录'" :width="'1320px'" :height="'48'">
        <div slot="content">
          <div>
            <el-form ref="form" :model="form" label-width="80px" class="demo-form-inline" :inline="true">
              <el-form-item label="导入日期">
                <el-date-picker
                  v-model="signDate"
                  type="datetimerange"
                  style="width: 380px"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @keyup.enter.native="onSubmit"
                />
              </el-form-item>
              <el-form-item label="导入账号">
                <el-input v-model="form.createBy" clearable placeholder="导入账号" @keyup.enter.native="onSubmit" />
              </el-form-item>
              <el-form-item label="导入状态">
                <el-select v-model="form.importStatus" clearable placeholder="导入状态" @change="chooseStatus" @keyup.enter.native="onSubmit">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="base-btn" @click="onSubmit(1)">查询
                </el-button>
                <el-button type="primary" class="base-btn" @click="onReset">重置
                </el-button>
              </el-form-item>
            </el-form>
            <div class="history-list">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;"
                header-align="left"
                border
                fit
                row-key="id"
              >
                <el-table-column
                  prop="importFileName"
                  label="导入文件"
                  align="center"
                />
                <el-table-column
                  label="成功数据"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.importSuccessNum }}条
                  </template>
                </el-table-column>
                <el-table-column
                  label="失败数据"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.importFailureNum }}条
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="导入时间"
                  align="center"
                />
                <el-table-column
                  prop="createBy"
                  label="导入账号"
                  align="center"
                />
                <el-table-column
                  prop="importStatusDict"
                  label="导入状态"
                  align="center"
                />
                <el-table-column
                  prop="importType"
                  label="导入类型"
                  align="center"
                />
                <el-table-column
                  prop="importStatusDict"
                  label="操作"
                  align="center"
                  min-width="200"
                >
                  <template slot-scope="{row, $index}">
                    <span class="table-btn" @click="downExcel(row.importFileSourceUrl, row.importFileSourceName)">下载源文件</span>
                    <span v-if="row.importSuccessNum !== 0" class="table-btn" @click="downExcel(row.importFileSuccessUrl, row.importFileSuccessName)">下载导入成功文件</span>
                    <span v-if="row.importFailureNum !== 0" class="table-btn" @click="downExcel(row.importFileFailureUrl, row.importFileFailureName)">下载导入失败文件</span>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </div>
        </div>
        <div slot="footer">
          <Pagination
            v-show="total>0"
            :total="total"
            :page.sync="form1.pageNum"
            :limit.sync="form1.pageSize"
            @pagination="getData()"
          />
        </div>
      </OpenDailog>

    </div>
  </div>
</template>

<script>
import OpenDailog from '@/components/openDailog/index'
import uploadExcelMix from '@/mixins/uploadExcelMixNew'
import { getToken } from '@/utils/auth'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { allSelectdictionaryData } from '@/api/common'
import { searchAssessorHistory } from '@/api/importExportApi'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index.js'
import { getEditAuthority } from '@/api/user'
export default {
  components: {
    OpenDailog,
    Pagination
  },
  mixins: [uploadExcelMix],
  // props: ['dialogTableVisible', 'title', 'templateApi', 'templateName', 'uploadUrl', 'type','volunteerService','uploadUrls'],
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    templateApi: {
      type: Function,
      required: true
    },
    templateName: {
      type: String
    },
    uploadUrl: {
      type: String
    },
    type: {
      type: String
    },
    // volunteerService: {
    //   type: Boolean,
    //   default: false
    // },
    // volunteerImport: {
    //   type: Boolean,
    //   default: true
    // },
    uploadUrls: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      isUploading: false,
      uploadingShow: false,
      failureMes: '',
      failureNum: 0,
      percentage: 0,
      excelHref: '',
      excelName: '',
      dialogListVisible: false,
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      form: {
        importEndTime: '',
        importStartTime: '',
        importStatus: '',
        createBy: '',
        importType: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      },
      form1: {
        importEndTime: '',
        importStartTime: '',
        importStatus: '',
        createBy: '',
        importType: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      },
      signDate: [],
      statusOptions: [], // 卡状态选项
      tableData: [],
      total: 0,
      isSuccess: true
    }
  },
  watch: {
    dialogTableVisible() {
      if (this.dialogTableVisible === false && this.percentage === 100) {
        this.uploadingShow = false
        this.percentage = 0
        this.myMes = ''
      }
    }
  },
  mounted() {
    this.getDict()
  },
  methods: {
    onReset() {
      // 重置表单条件
      if (this.signDate.length === 2) {
        this.signDate = []
      }
      this.form = {
        importEndTime: '',
        importStartTime: '',
        importStatus: '',
        createBy: '',
        importType: this.type,
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.form1 = {
        importEndTime: '',
        importStartTime: '',
        importStatus: '',
        createBy: '',
        importType: this.type,
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.getData()
    },
    chooseStatus(val) {
      this.form.pageNum = 1
    },
    onSubmit(num) {
      this.form.pageNum = 1
      this.form1 = JSON.parse(JSON.stringify(this.form))
      this.getData(num)
    },
    getDict() {
      const dictKeys = ['biz_import_handel_status']
      allSelectdictionaryData(dictKeys).then(res => {
        const dict = res.data
        if (dict['biz_import_handel_status']) {
          this.statusOptions = dict['biz_import_handel_status']
        }
      }).catch(() => {

      })
    },
    openList() {
      this.dialogListVisible = true
    },
    closeListIt() {
      this.dialogListVisible = false
    },
    ajaxListData() {
      const data = {
        importEndTime: '',
        importStartTime: '',
        importStatus: '',
        createBy: '',
        importType: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.form = data
      this.form1 = data
      this.getData()
    },
    closeIt() {
      this.$emit('visible', false)
      this.failureNum = 0
    },
    ajaxData() {
    },
    getData() {
      this.form1.importType = this.type
      const param = JSON.parse(JSON.stringify(this.form1))
      if (this.signDate && this.signDate.length === 2) {
        param.importEndTime = parseTime(this.signDate[1]) + ''
        param.importStartTime = parseTime(this.signDate[0]) + ''
      }
      searchAssessorHistory(param).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 下载模板
    async downloadModel() {
      const data = {
        ignoreField: ''
      }
      await getEditAuthority(this.$route.meta.id).then(res => {
        res.forEach(item => {
          if (item.menuName === '含小区导入模板') {
            data.ignoreField = encodeURI(item.menuName)
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

<style lang="scss">
  .upload-excel {
    .btn-level {
      .el-dialog__header {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        background: #ffffff;
        z-index: 99;
      }
      .el-dialog__body {
        height: 415px;
        .all-dailog-body{
          height: 415px;
          padding: 20px 36px 10px 36px !important;
        }
      }
      .el-dialog__footer {
        display: none;
      }
      .excel-content {
        position: relative;
        padding-top: 40px;
        p {
          margin: 6px 0;
          color: #ff0000;
        }
        .excel-btn-file {
          width: 100%;
          border-top:1px solid #eeeeee;
          margin-top: 10px;
          padding: 10px 0 0 0;
          .excel-btn-title {
            font-weight: bold;
            margin-bottom: 10px;
          }
          span {

          }
        }
        .excel-btn-top {
          position: absolute;
          top: -12px;
          left: 120px;
          z-index: 999;
        }
      }
      .downLoad-fail-file {
        width: 100%;
        float: left;
        margin-top: 10px;
        padding-top: 10px;
        height: 30px;
        border-top: 1px solid #eeeeee;
        span {
          display: inline-block;
          vertical-align: middle;
          padding: 5px 10px 5px 10px;
        }
        .failure-btn {
          float: right;
          border-radius: 3px;
          background: #ee9900;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .table-list {
      .el-dialog__footer {
        padding:  0 20px 10px 20px;
      }
      .all-dailog-body {
        padding-bottom: 65px;
      }
      .pagination-container {
        margin-top: 10px !important;
      }
      .history-list {
        width: 100%;
        .table-btn {
          padding: 0 7px;
        }

      }
    }
  }
</style>
