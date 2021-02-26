<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="养老机构">
          <el-autocomplete
            v-model="form.orgName"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入养老机构名称"
            :trigger-on-focus="false"
            style="width:100%"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="评估状态">
          <el-select
            v-model="form.assessStatus"
            placeholder="请选择评估状态"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in assessmentStatusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评估类别">
          <el-select
            v-model="form.assessType"
            placeholder="请选择评估类别"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in evaluationCategoryOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="评估师">
          <el-select
            v-model="form.assessEmpId"
            placeholder="请选择评估师"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in org_typeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            style="width: 200px"
            placeholder="请输入老人姓名或身份证号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="servicePeriod"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询</el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer pgbiao">
      <el-container>
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
          <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="addTableRow()">导入</el-button>
          <el-button type="primary" class="base-btn" @click="exportFun()">导出</el-button>
          <div style="width: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="item in tabs"
                :key="item.type"
                :label="item.name"
                :name="item.key"
              />
            </el-tabs>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估编号" prop="assessNo" width="130" />
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="性别" prop="sexName" width="80" />
            <el-table-column label="年龄" prop="age" width="100" />
            <el-table-column label="身份证号" prop="idCard" width="180" />
            <el-table-column label="手机号码" prop="mobile" width="180" />
            <el-table-column label="居住地址" prop="liveAddr" width="180" />
            <el-table-column label="评估类别" prop="assessTypeName" width="120" />
            <el-table-column label="入住情况" prop="occupancyCodeName" width="120" />
            <el-table-column label="预约评估日期" prop="appointmentData" min-width="250" />
            <el-table-column label="评估地点" prop="assessAddrCode" min-width="250" />
            <el-table-column label="评估师1" prop="assessor1" width="160" />
            <el-table-column label="评估师2" prop="assessor2" width="160" />
            <el-table-column label="养老机构" prop="orgName" min-width="250" />
            <el-table-column v-if="activeName ==='has_not_started' || activeName === 'started'" label="任务状态" prop="taskStatus" min-width="150" />
            <el-table-column
              v-if="activeName ==='to_be_reviewed' || activeName === 'completed'"
              label="完成时间"
              prop="completeTime"
              min-width="150"
            />
            <el-table-column
              v-if="activeName === 'cancelled'"
              label="取消时间"
              prop="cancellationTime"
              min-width="150"
            />
            <el-table-column
              label="申请时间"
              prop="createTime"
              min-width="150"
            />
            <!--            <el-table-column label="评估联络人" prop="assessLinkman" min-width="180" />-->
            <!--            <el-table-column label="评估状态" prop="assessStatusName" width="120" />-->
            <!--            <el-table-column label="评估师2" prop="assessor2" width="160" />-->
            <!--            <el-table-column-->
            <!--              v-show="activeName=='completed'"-->
            <!--              label="完成时间"-->
            <!--              prop="completeTime"-->
            <!--              min-width="150"-->
            <!--            />-->
            <!--            <el-table-column label="开始时间" prop="assessBuildTime" min-width="150" />-->
            <!--            <el-table-column-->
            <!--              v-if="activeName=='has_not_started,started'"-->
            <!--              label="距任务结束时长"-->
            <!--              prop="distanceTaskEndTime"-->
            <!--              min-width="250"-->
            <!--            />-->
            <el-table-column label="操作" align="center" fixed="right" width="430">
              <template slot-scope="{row}">
                <!-- 评估状态为 -> 未开始的才可以开始评估 -->
                <span v-if="row.assessStatus == 'has_not_started'" v-has="{class: '开始评估'}" class="table-btn" @click="beginAssess(row.id,row.fullName)">开始评估</span>
                <!-- 评估状态为 -> 未开始的才可以修改评估日期 -->
                <!--                <span v-if="row.assessStatus == 'has_not_started' && !row.updatedAppointmentData" v-has="{class: '修改评估日期'}" class="table-btn" @click="modifyData(row.id)">修改评估日期</span>-->
                <span v-if="row.assessStatus == 'has_not_started' && !row.isUpdatedAppointmentData" v-has="{class: '修改评估日期'}" class="table-btn" @click="modifyData(row.id)">修改评估日期</span>
                <!-- 评估状态为 -> 已开始、待复审的才可以继续评估 并且 如果等于待复审则需要等待14天后才可继续评估 -->
                <span v-if="hasShowContinueAssess(row)" v-has="{class: '继续评估'}" class="table-btn" @click="handleEdit(row)">继续评估</span>
                <span class="table-btn" @click="toDetail(row)">查看</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData"
          />
        </el-main>
      </el-container>
      <el-dialog v-dialogDrag title="修改评估日期" :visible.sync="dialogVisible" width="30%">
        <div style="width:400px;margin:60px auto;">
          <div style="margin-bottom:30px;">原评估日期：{{ this.updateAssessDate.date }}</div>
          <div>
            <span>现评估日期：</span>
            <el-date-picker
              v-model="updateAssessDateValue"
              :picker-options="pickerOptions"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeData">取 消</el-button>
          <el-button type="primary" @click="saveData">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-dialogDrag title="评估师身份验证" :visible.sync="dialogVisible1" width="30%">
        <div style="width:400px;margin:10px auto;">
          <div v-if="nextType === false">
            <div style="margin-bottom:30px;">
              请获取并填写短信验证码，进行身份证验证
              <el-button style="margin-left:5px;" @click="flag && getObtain()">{{ content }}</el-button>
            </div>
            <div style="margin-bottom: 50px">
              <div style="margin-bottom:15px">
                <span>评估师：{{ stateForm.bizAssessEmp1.fullName }}</span>
              </div>
              <div style="margin-bottom:15px">
                <span>手机号：{{ stateForm.bizAssessEmp1.mobile }}</span>
              </div>
              <div style="margin-bottom:50px">
                <span>
                  验证码：
                  <el-input v-model="code1" clearable style="width:200px;" placeholder="请输入验证码" />
                </span>
              </div>
              <div style="margin-bottom:15px">
                <span>评估师：{{ stateForm.bizAssessEmp2.fullName }}</span>
              </div>
              <div style="margin-bottom:15px">
                <span>手机号：{{ stateForm.bizAssessEmp2.mobile }}</span>
              </div>
              <div>
                <span>
                  验证码：
                  <el-input
                    v-model="code2"
                    style="width:200px;"
                    clearable
                    placeholder="请输入验证码"
                  />
                </span>
              </div>
            </div>
          </div>
          <div v-if="nextType === true">
            <div style="text-align: center;margin-bottom: 30px">
              请上传包含两位评估师、评估对象的三人合照
            </div>
            <div style="width: 160px; margin: 0 auto" class="img-file">
              <div v-if="imgURL === ''" class="img-add">
                <span class="el-icon-plus" />
              </div>
              <input v-if="imgURL === ''" ref="inputer" type="file" class="upload-img" multiple accept="image/jpeg,image/png,image/jpg,image/bmp" @change="addImg">
              <div v-if="imgURL !== ''" class="img-show">
                <img v-if="imgURL !== ''" :src="imgURL">
                <div class="img-del">
                  <span class="el-icon-delete" @click="delImg" />
                </div>
              </div>
              <!--              <el-upload-->
              <!--                class="uploadUrlImg"-->
              <!--                list-type="picture-card"-->
              <!--                :headers="headers"-->
              <!--                :action="uploadUrl"-->
              <!--                :on-preview="handlePictureCardPreview"-->
              <!--                :on-success="handleAvatarSuccess"-->
              <!--                :before-upload="(params) =>beforeAvatarUpload(params, assessId)"-->
              <!--              >-->
              <!--                <i class="el-icon-plus" />-->
              <!--              </el-upload>-->
              <!--              <el-dialog :visible.sync="dialogVisibleImg">-->
              <!--                <img width="100%" :src="dialogImageUrl" alt="">-->
              <!--              </el-dialog>-->
            </div>
            <div style="text-align: center;margin-top: 30px; color: #999999;">
              只能上传一张jpg/png文件，不能超过10M
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAssesse">取 消</el-button>
          <el-button v-if="nextType === false" type="primary" @click="saveAssesse">下一步</el-button>
          <el-button v-if="nextType === true" type="primary" @click="saveImg">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-dialogDrag title="选择外院评估师" :visible.sync="dialogVisible2" width="30%">
        <div style="width:400px;margin:10px auto;">
          <div>请选择当前到场的外院评估师</div>
          <div style="margin-top: 45px">
            <span class="out-man">外院评估师</span>
            <el-select v-model="outMan" placeholder="请选择" @change="changeOutMan">
              <el-option
                v-for="item in outList"
                :key="item.id"
                :label="item.fullName"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeOutMan">取 消</el-button>
          <el-button type="primary" @click="saveOutMan">下一步</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import _ from 'lodash'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { getEsimateApplyList, getImg, getOutIn, getOutList, getEsTime } from '@/api/esimate/esimate'
import { pageModel } from '@/common'
import { getAssessmentList, getStartAssess, getVerificationCode, saveStartAssess, editAssessDate, updateAssessDate } from '@/api/evaluationManagement/assessmentForm'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getOrgList } from '@/api/evaluationManagement/basicInformation'
import { exportAssessmentForm } from '@/api/importExportApi'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
import axios from 'axios'
export default {
  name: 'AssessmentForm',
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisibleImg: false,
      pics: [],
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      uploadUrl: '',
      nextType: false,
      // 修改评估日期需要限制日期选择范围
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.parse(new Date(this.updateAssessDate.endDate)) || time.getTime() < Date.parse(new Date(this.updateAssessDate.startDate))
        }
      },
      // 修改评估日期对象
      updateAssessDateAssessId: '',
      updateAssessDateValue: '',
      updateAssessDate: {
        date: '',
        startDate: '',
        endDate: ''
      },
      value1: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      code2: '',
      code1: '',
      input: '',
      fullName: '',
      content: '获取验证码',
      flag: true,
      timer: null,
      form: {
        areaCode: '', // 区域表单ID
        // assessEmpId: '', // 评估师
        assessStatus: '', // 评估状态
        assessType: '', // 评估类别
        assessTypeTab: '', // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      stateForm: {
        bizAssessEmp1: {
          mobile: '',
          fullName: ''
        },
        bizAssessEmp2: {
          mobile: '',
          fullName: ''
        }
      },
      assessId: '',
      tableData: [],
      assessmentStatusOptions: [], // 评估状态
      evaluationCategoryOptions: [], // 评估类别
      restaurants: [],
      servicePeriod: [],
      areaCode: [],
      idEdit: true,
      total: 0,
      org_typeOptions: [],
      tabs: [{
        name: '全部',
        type: '1',
        key: ''
      }, {
        name: '待评估',
        type: '2',
        key: 'has_not_started'
      }, {
        name: '评估中',
        type: '3',
        key: 'started'
      }, {
        name: '待终评',
        type: '4',
        key: 'to_be_reviewed'
      }, {
        name: '已完成',
        type: '5',
        key: 'completed'
      }, {
        name: '已取消',
        type: '6',
        key: 'cancelled'
      }],
      activeName: '',
      outList: [],
      outMan: '',
      files: '',
      fileName: '',
      inMan: false,
      imgURL: '',
      fil: ''
    }
  },
  mounted() {
    this.getSelect()
    this.getOrgOption()
    this.getData()
    this.idEdit = false
    this.getEsTime()
  },
  methods: {
    delImg() {
      this.imgURL = ''
      this.files = ''
      this.fileName = ''
      this.fil = ''
    },
    addImg(event) {
      const inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      console.log(inputDOM.files, 777)
      this.files = inputDOM.files[0]
      this.fil = inputDOM.files
      const len = this.fil.length
      if (len > 1) {
        this.$message.warning('只能上传一张图片！')
        return false
      }
      for (let i = 0; i < this.fil.length; i++) {
        const size = Math.floor(this.fil[i].size / 1024)
        if (size > 10 * 1024 * 1024) {
          this.$message.warning('请选择10M以内的图片！')
          return false
        }
      }
      this.fileName = inputDOM.files[0].name
      const URL = window.URL || window.webkitURL
      // 通过 file 生成目标 url
      this.imgURL = URL.createObjectURL(inputDOM.files[0])
    },
    getEsTime() {
      getEsTime({
        type3: '从提交评估时间计,超过'
      }).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            if (item.title === '从提交评估时间计,超过') {
              this.pickerOptions = {
                disabledDate(time) {
                  const date = time.getTime() + 3600 * 1000 * 24
                  const dateVal = time.getTime() - 3600 * 1000 * 24 * item.value1
                  if (date < Date.now()) {
                    return true
                  } else if (Date.now() < dateVal) {
                    return true
                  }
                }
              }
            }
          })
        }
      })
    },
    changeOutMan(val) {
      this.outList.forEach(item => {
        if (item.id === val) {
          this.stateForm.bizAssessEmp2 = item
        }
      })
    },
    saveOutMan() {
      if (this.outMan === '') {
        this.$message.warning('请选择外院评估员！')
        return false
      }
      this.dialogVisible2 = false
      this.dialogVisible1 = true
      this.code1 = ''
      this.code2 = ''
    },
    closeOutMan() {
      this.dialogVisible2 = false
    },
    saveImg() {
      if (this.fileName === '') {
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      const nameList = this.files.name.split('.')
      const isJPG = nameList[nameList.length - 1] === 'jpeg' || nameList[nameList.length - 1] === 'png' || nameList[nameList.length - 1] === 'jpg' || nameList[nameList.length - 1] === 'bmp'
      const isLt2M = this.files.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传图片只能是jpeg,png,jpg,bmp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      if (isJPG && isLt2M) {
        const fileFormData = new FormData()
        const requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + getToken()
          }
        }
        fileFormData.append('file', this.files, this.fileName)
        axios.post(process.env.VUE_APP_BASE_API + '/assess/assess/report/upload/detail/' + this.assessId + '/' + this.stateForm.bizAssessEmp2.id, fileFormData, requestConfig).then(res => {
          if (res.data.code === 0) {
            this.$message.success('上传成功！')
            this.dialogVisible1 = false
            this.$router.push({
              path: `/assessmentForm/details/${this.assessId}?`,
              query: {
                modelType: 'edit',
                _title: `编辑${this.fullName}`
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      // getImg(this.assessId, this.stateForm.bizAssessEmp2.id, this.stateForm.bizAssessEmp2.mobile).then(res => {
      //   console.log(res)
      // })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImg = true
    },
    // 上传成功后
    handleAvatarSuccess(response, file, fileList) {
      if (response.code === 0) {
        // this.$message.success(response.data)
      } else {
        this.$message.error(response.data)
      }
    },
    beforeAvatarUpload(file, id) {
      this.fileName = ''
      // return new Promise((resolve, reject) => {
      //   this.$nextTick(() => {
      //     this.uploadUrl = `${process.env.VUE_APP_BASE_API}/assess/assess/report/upload/${id}`
      //     resolve()
      //   })
      // })
      console.log(file, 666)
      this.files = file
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片只能是jpeg,png,jpg,bmp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      this.fileName = file.name
      if (isJPG && isLt2M) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.uploadUrl = `${process.env.VUE_APP_BASE_API}/assess/assess/report/upload/${id}`
            resolve()
          })
        })
      }
      return isJPG && isLt2M
    },
    // 是否可以继续评估
    hasShowContinueAssess(assess) {
      // 如果等于待复审则需要等待14天后才可继续评估
      const assessStatus = assess.assessStatus
      if (assessStatus === 'to_be_reviewed' && assess.completeTime != null) {
        const completeTimeDate = new Date(assess.completeTime)
        const completeTimeDateOffset14 = new Date(completeTimeDate.setDate(completeTimeDate.getDate() + 14))
        return new Date().getTime() > completeTimeDateOffset14.getTime()
      }
      return assessStatus === 'to_be_reviewed' || assessStatus === 'started'
    },
    // 修改评估日期
    modifyData(assessId) {
      // 获取原评估日期
      this.updateAssessDateAssessId = assessId
      this.updateAssessDateValue = null
      editAssessDate({ assessId: assessId }).then((res) => {
        if (res.code === 0) {
          this.updateAssessDate = res.data
        } else {
          this.$message.error(res.msg)
          setTimeout(() => {
            this.dialogVisible = false
          }, 1000)
        }
      })
      this.dialogVisible = true
    },
    saveData() {
      // 更新评估时间
      updateAssessDate({
        assessId: this.updateAssessDateAssessId,
        assessDate: this.updateAssessDateValue
      }).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          setTimeout(() => {
            this.dialogVisible = false
            this.onSubmit()
          }, 500)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeData() {
      this.dialogVisible = false
      this.value1 = ''
    },
    getOutIn() {
      return new Promise((resolve) => {
        getOutIn({
          bizAssessInfoId: this.assessId
        }).then(res => {
          if (res.code === 0) {
            if (res.msg === 'true') {
              this.inMan = true
            } else {
              this.stateForm.bizAssessEmp2 = res.data
            }
          }
          resolve()
        })
      })
    },
    getStartAssess(id) {
      return new Promise((resolve) => {
        getStartAssess({ assessId: id }).then(res => {
          if (res.code === 0) {
            if (res.data.bizAssessEmp2 !== null) {
              this.stateForm = res.data
              this.dialogVisible1 = true
            } else {
              if (this.inMan === true) {
                this.dialogVisible2 = true
              } else {
                this.dialogVisible1 = true
              }
              this.stateForm.bizAssessEmp1 = res.data.bizAssessEmp1
              getOutList().then(response => {
                if (response.code === 0) {
                  this.outList = response.data
                }
              })
            }
          } else {
            this.$message.error(res.msg)
          }
          resolve()
        })
      })
    },
    // 评估师身份验证
    async beginAssess(id, fullName) {
      this.outMan = ''
      this.nextType = false
      this.assessId = id
      this.fullName = fullName
      this.inMan = false
      await this.getOutIn()
      await this.getStartAssess(id)
    },
    closeAssesse() {
      this.dialogVisible1 = false
      this.flag = true
      this.content = '获取验证码'
      clearInterval(this.timer)
      this.timer = null
    },
    saveAssesse() {
      const data = {
        assessId: this.assessId,
        code1: this.code1,
        code2: this.code2
      }
      saveStartAssess(data).then(res => {
        if (res.code === 0) {
          // this.$router.push({
          //   path: `/assessmentForm/details/${this.assessId}`,
          //   query: {
          //     modelType: 'edit',
          //     _title: `编辑${this.fullName}`
          //   }
          // })
          this.nextType = true
          this.flag = true
          this.content = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
        } else {
          this.flag = true
          this.content = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
          this.$message.error(res.msg)
        }
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/assessmentForm/details/${row.id}`,
        query: {
          modelType: 'look',
          _title: `查看${row.fullName}`
        }
      })
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估表',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const params = _.cloneDeep(this.form)
          delete params.pageNum
          delete params.pageSize
          exportAssessmentForm(params).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return
                  this.$router.push('/dataManagement/exportManagement')
                }
              })
            } else {
              this.$message.warning(response.msg)
            }
          }).catch((error) => {
            this.$message.warning(error.msg)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 获取验证码
    getObtain() {
      this.setTimeout()
      getVerificationCode({
        assessId: this.assessId,
        emp2Mobile: this.stateForm.bizAssessEmp2.mobile
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('短信验证码发送成功')
        } else {
          this.$message.error(res.msg)
          clearInterval(this.timer)
          this.content = '获取验证码'
          this.flag = true
          this.timer = null
        }
      })
    },
    setTimeout() {
      const TIME_COUNT = 60
      this.flag = false
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.content = this.count + ' s后获取'
          } else {
            this.content = '获取验证码'
            this.flag = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 编辑
    handleEdit(row) {
      if (row.assessStatus === 'to_be_reviewed') {
        this.$router.push({
          path: `/assessmentForm/details/${row.id}?`,
          query: {
            modelType: 'edit',
            _title: `编辑${row.fullName}`,
            assessStatus: 'true'
          }
        })
      } else {
        this.$router.push({
          path: `/assessmentForm/details/${row.id}?`,
          query: {
            modelType: 'edit',
            _title: `编辑${row.fullName}`
          }
        })
      }
    },
    handleClick() {
      this.tableData = []
      this.form.assessTypeTab = this.activeName == '0' ? '' : this.activeName
      this.getData()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData()
    },
    onReset() {
      this.areaCode = []
      this.servicePeriod = []
      this.form = {
        areaCode: '', // 区域表单ID
        // assessEmpId: '', // 评估师
        assessStatus: '', // 评估状态
        assessType: '', // 评估类别
        assessTypeTab: this.activeName == '0' ? '' : this.activeName, // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      }
      this.idEdit = !this.idEdit
      this.getData()
    },
    async getData() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        params.areaCode = ''
      }
      if (this.servicePeriod && this.servicePeriod.length) {
        params.startTime = setDateTime(this.servicePeriod[0])
        params.endTime = setDateTime(this.servicePeriod[1])
      }
      await getAssessmentList(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/esimateApply/details/0',
        query: { modelType: 'add', _title: `新增评估申请` }
      })
    },
    getSelect() {
      const dictKey = [
        'assessment_status', // 评估状态
        'evaluation_category', // 类别
        'check_in' // 入住情况
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
            const dict = response.data
            for (const key in dict) {
              switch (key) {
                case 'assessment_status':
                  this.assessmentStatusOptions = dict[key]
                  break
                case 'evaluation_category':
                  this.evaluationCategoryOptions = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    getOrgOption() {
      getOrgList().then((res) => {
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach((item) => {
              this.restaurants.push({
                value: item.orgName
              })
            })
          }
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        )
      }
    }
  }
}
</script>

<style lang="scss">
.pgbiao {
  .el-dialog__body {
    min-height: 470px;
  }
}
.uploadUrlImg {
  .el-upload-list {
    position: absolute;
  }
}
.out-man:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.img-file {
  position: relative;
  .img-add {
    width: 160px;
    height: 160px;
    position: absolute;
    border: 1px dashed #e1e1e1;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    .el-icon-plus {
      line-height: 160px;
      font-size: 30px;
      font-weight: bold;
      color: #999999;
    }
  }
}
.img-show {
  width: 160px;
  height: 160px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 160px;
    height: 160px;
  }
  .img-del {
    position: absolute;
    width: 160px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    top: 0;
    border-radius: 5px;
    background: rgba(0,0,0, 0.5);
    display: none;
    .el-icon-delete {
      font-size: 30px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
.img-show:hover {
  .img-del {
    display: block;
  }
}
.upload-img {
  width: 160px;
  height: 160px;
  background: #ffffff;
  opacity: 0;
  position: relative;
  z-index: 99;
}
</style>
