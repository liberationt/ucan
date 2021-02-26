<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs>
        <!--基本信息tabs start-->
        <!--服务信息tabs end-->
        <!-- <el-tab-pane label="基本信息" name="base"> -->
        <el-collapse v-model="activeCollapse">
          <!--基本信息item start-->
          <el-collapse-item name="baseItem_1">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />基本信息
                </span>
              </div>
            </template>
            <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column label="姓名" prop="fullName" />
              <el-table-column label="性别" prop="sexName" />
              <el-table-column label="年龄" prop="age" />
              <el-table-column label="家庭电话" prop="homePhone" />
              <el-table-column label="手机号码" prop="mobile" />
              <el-table-column label="户籍地址" prop="censusAreaCodeLevelName" min-width="120" />
              <el-table-column label="服务地址" prop="serviceAreaCodeLevelName" min-width="120" />
              <el-table-column label="居家养老补贴">
                <template slot-scope="{row}">
                  <span>{{ row.subsidyMoney + '元/月' }}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-collapse-item>
          <el-collapse-item name="baseItem_4">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />工单信息
                </span>
              </div>
            </template>
            <el-form
              ref="form_base"
              key="form_base"
              :model="form"
              :rules="isEditForm?rulesForm:null"
              label-width="120px"
            >
              <el-row :gutter="0">
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="工单编号" prop="orderNo">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.orderNo"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入工单编号"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.orderNo }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="工单状态" prop="orderStatusName">
                    <el-select v-if="isEditForm" v-model="form.orderStatus" style="width:100%" :disabled="orderDisabled" filterable placeholder="请选择工单状态" clearable @keyup.enter.native="onSubmit">
                      <el-option
                        v-for="item in statusOptions"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                    <span v-else>{{ form.orderStatusName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="是否异常" prop="isAbnormalName">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.isAbnormalName"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入是否异常"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.isAbnormalName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="异常原因" prop="abnormalRemark">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.abnormalRemark"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入异常原因"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.abnormalRemark }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="预计服务日期" prop="planServiceDate">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="form.planServiceDate"
                      :picker-options="pickerOptions"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="预计服务日期"
                      style="width:100%"
                    />
                    <span v-else>{{ form.planServiceDate }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="实际服务日期" prop="signStartDate">
                    <el-input
                      v-if="isEditForm"
                      ref="signStartDate"
                      v-model.trim="form.signStartDate"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入实际服务日期"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.signStartDate }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="预计服务时长" prop="planServiceTime">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.planServiceTime"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入预计服务时长"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.planServiceTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="实际服务时长" prop="actualServiceTime">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.actualServiceTime"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入实际服务时长"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.actualServiceTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="签到时间" prop="signInTime">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.signInTime"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入签到时间"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.signInTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="签退时间" prop="checkOutTime">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.checkOutTime"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入签退时间"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.checkOutTime }}</span>
                  </el-form-item>
                </el-col>

                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="签到坐标" prop="signStartAddr">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.signStartAddr"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入签到坐标"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.signStartAddr }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item label="签退坐标" prop="signEndAddr">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.signEndAddr"
                      :disabled="disabled"
                      clearable
                      placeholder="请输入签退坐标"
                      @keyup.enter.native="editContent"
                    />
                    <span v-else>{{ form.signEndAddr }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <div v-if="status!='to_be_served'" class="picCount">
                    <div>
                      <div class="imgBG"><img :src="signInPicture" alt=""></div>
                      <div>签到照片</div>
                    </div>
                    <div>
                      <div class="imgBG"><img :src="signOutPicture" alt=""></div>
                      <div>签退照片</div></div>
                    <div>
                      <div id="box" class="imgBG" @click="showBig" />
                      <div>签到签退地图</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="baseItem_2">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />服务内容
                </span>
              </div>
            </template>
            <el-table
              :data="form.serviceContent"
              :span-method="objectSpanMethod"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column label="服务日期" prop="planServiceDate" />
              <el-table-column label="星期" prop="dayOfTheWeek" />
              <el-table-column label="服务类型" prop="spType" />
              <el-table-column label="服务项目" prop="spName" />
              <el-table-column label="服务内容" prop="spContent" />
              <el-table-column label="服务单价(元)" prop="servicePrice" />
              <el-table-column label="服务时长(分钟)" prop="planServiceTimeLen" min-width="100" />
              <el-table-column label="每天服务(次)" prop="monthServiceCount" />
              <el-table-column label="服务人员" prop="serviceMan" align="center" min-width="100">
                <template slot-scope="{row,$index}">
                  <el-select v-if="isEditForm" v-model="row.serviceManId" filterable placeholder="请选择服务商" clearable :disabled="dateDisabled" @keyup.enter.native="onSubmit">
                    <el-option
                      v-for="item in serveOptions"
                      :key="item.id"
                      :label="item.empNoConcatFullName"
                      :value="item.id"
                    />
                  </el-select>
                  <span v-else>{{ row.serviceManNumber }}{{ row.serviceMan }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="status!='to_be_served'" label="服务照片" prop="servicePhotos" width="260">
                <template slot-scope="{row,$index}">
                  <viewer :images="row.servicePhotos">
                    <span v-for="(item,i) in row.servicePhotos" :key="i" class="tableImg"><img class="img" :src="baseUrl+item.imgUrl" alt=""></span>
                  </viewer>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="status==='service_failed'" class="fillReasonCon">
              <div class="fillReason">失败原因</div>
              <el-input
                v-if="isEditForm"
                v-model.trim="form.failedRemark"
                type="textarea"
                :rows="2"
                :disabled="disabled"
                clearable
                placeholder="请输入失败原因"
                @keyup.enter.native="editContent"
              />
              <!-- <span v-else>{{ form.failedRemark }}</span> -->
              <span v-else>{{ form.failedRemark }}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item v-if="form.operationLogList&&form.operationLogList.length" name="baseItem_5">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />操作日志
                </span>
              </div>
            </template>
            <el-table
              :data="form.operationLogList"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column label="操作人员" prop="opUser" min-width="120" />
              <el-table-column label="操作时间" prop="opDate" min-width="120" />
              <el-table-column label="修改内容" prop="sexName" min-width="200">
                <template slot-scope="{row,$index}">
                  <span v-if="row.osEmpName">服务人员【{{ row.osEmpName }}】改成【{{ row.newOsEmpName }}】 </span>
                  <span v-if="row.orderStatus">工单状态【{{ row.orderStatus }}】改成【{{ row.newOrderStatus }}】  </span>
                  <span v-if="row.planServiceDate">预计服务日期【{{ row.planServiceDate }}】改成【{{ row.newPlanServiceDate }}】</span>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item v-show="status!='to_be_served'" name="baseItem_6">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />服务评价
                </span>
              </div>
            </template>
            <div style="width:300px;height:60px;display:flex;align-item:center" @click="audioPlay">
              <span v-if="shoIcon" class="audioGif"><img src="@/assets/images/audio.gif" alt=""></span>
              <span v-if="!shoIcon" class="audioGif" style="font-size:40px"><img src="@/assets/images/audioNone.png" alt=""></span>
              <audio ref="audio" :src="fileUrl" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tabs>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
        </div>
        <div v-else>
          <!-- <el-button v-if="editAuthority==true&&hasEdit==true" type="warning" class="base-btn" @click="toEditType">编辑</el-button> -->
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
    <div v-show="dialog" class="toastImg" @click.self="dialog=false">
      <div id="container" />
    </div>
    <div v-show="dialogImg" class="toastImg" @click.self="closeBg">
      <div class="bgImgInfor">
        <div class="bigImg"><img :src="baseUrl+bigImg" alt=""></div>
        <div class="smallImg">
          <span v-for="(item,i) in servicePhotosImg" :key="i" @click="chooseImg(i)"><img :src="baseUrl+item.imgUrl" alt=""></span>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import {
  scrollToTop,
  scrollToEl
} from '@/utils/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import { getOrderDetail, getServePerson, saveOrderInfor } from '@/api/serverManagement/projectManagement'
import AMap from 'AMap'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          var curDate = new Date()
          // 获取当前月份
          var curMonth = curDate.getMonth()
          // 实际月份比curMonth大1，下面将月份设置为下一个月
          curDate.setMonth(curMonth + 1)
          // 将日期设置为0，表示自动计算为上个月（这里指的是当前月份）的最后一天
          curDate.setDate(0)
          // 返回当前月份的天数
          const num = curDate.getDate() - new Date().getDate() + 1
          const date = time.getTime() - 3600 * 1000 * 24 * num
          // 设置选择今天以及今天之后的日期
          return time.getTime() < Date.now() - 8.64e7 || date > Date.now() - 8.64e7
          // 设置选择今天以及今天以前的日期
          // return time.getTime() > Date.now();
          // 设置选择今天之后的日期（不能选择当天时间）
          // return time.getTime() < Date.now();
          // 设置选择今天之前的日期（不能选择当天）
          // return time.getTime() > Date.now() - 8.64e7;
        }
      },
      osEmpId: '',
      dialog: false,
      dialogImg: false,
      dateDisabled: false,
      orderDisabled: true,
      position1: '',
      position2: '',
      disabled: false,
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      disabled: false, // 表单是否可编辑
      // 自适应
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      baseUrl: process.env.VUE_APP_API_IMGURL,
      form: {},
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],
      tableData: [],
      rulesForm: {},
      signInPicture: '',
      signOutPicture: '',
      bigImg: '',
      servicePhotosImg: [],
      serveOptions: [],
      statusOptions: [],
      status: '',
      fileUrl: '',
      shoIcon: false
    }
  },
  async mounted() {
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''
    this.status = this.$route.query.status
    await this.getPerson()
    await this.getDict()
    await this.getData(_userId_)
    if (this.status === 'to_be_served') {
      this.disabled = true
    } else if (this.status === 'service_failed') {
      this.orderDisabled = false
    }
    if (this.modelType == 'look') {
      this.isEditForm = false
    } else {
      this.disabled = true
    }
  },
  methods: {
    showBig() {
      this.dialog = true
      this.init(this.position1, this.position2, 'container')
    },
    showImg(servicePhotosImg) {
      this.servicePhotosImg = []
      this.bigImg = ''
      this.dialogImg = true
      this.servicePhotosImg = servicePhotosImg
      this.bigImg = servicePhotosImg.length ? servicePhotosImg[0].imgUrl : ''
    },
    chooseImg(num) {
      this.bigImg = this.servicePhotosImg[num].imgUrl
    },
    closeBg() {
      this.dialogImg = false
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8) {
        if (rowIndex % this.form.serviceContent.length === 0) {
          return {
            rowspan: this.form.serviceContent.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    getPerson() {
      getServePerson().then(res => {
        if (res.code === 0) {
          this.serveOptions = res.data
        }
      })
    },
    init(position1, position2, id) {
      var map = new AMap.Map(id, {
        resizeEnable: true,
        zoom: 11,
        center: position1
      })
      // 构造点标记
      var marker1 = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: position1

      })
      var marker2 = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: position2
      })
      var marker = [marker2, marker1]
      map.add(marker)
      map.setFitView()
    },
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/serverManagement/orderManagement/orderWork')
    },
    // 取消按钮
    cancelDetailsPage() {
      this.$confirm('该页面的信息尚未保存，确定要关闭页面吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
				  closeOnClickModal: false
      }).then(() => {
        this.closeDetailsPage()
      }).catch(() => {
      })
    },
    getData(_userId_) {
      this.tableData = []
      getOrderDetail(_userId_).then(res => {
        if (res.code == 0) {
          this.form = res.data
          const { fullName, age, sexName, homePhone, mobile, serviceAreaCodeLevelName, censusAreaCodeLevelName, subsidyMoney, signStartLatitude, signStartLongitude, signEndLatitude, signEndLongitude } = res.data
          this.tableData.push({
            fullName: fullName,
            age: age,
            sexName: sexName,
            homePhone: homePhone,
            mobile: mobile,
            serviceAreaCodeLevelName: serviceAreaCodeLevelName,
            censusAreaCodeLevelName: censusAreaCodeLevelName,
            subsidyMoney: subsidyMoney
          })
          // 渲染判断查看
          this.signInPicture = res.data.signInPicture ? `${process.env.VUE_APP_API_IMGURL}${res.data.signInPicture.imgUrl}` : ''
          this.signOutPicture = res.data.signOutPicture ? `${process.env.VUE_APP_API_IMGURL}${res.data.signOutPicture.imgUrl}` : ''
          this.$nextTick(() => {
            this.fileUrl = res.data.serviceVoice ? `${process.env.VUE_APP_API_IMGURL}${res.data.serviceVoice.fileUrl}` : ''
          })
          this.position1 = [signStartLongitude, signStartLatitude]
          this.position2 = [signEndLongitude, signEndLatitude]
          this.init(this.position1, this.position2, 'box')
        }
      })
    },
    audioPlay() {
      if (this.fileUrl) {
        this.$refs.audio.play()
        this.shoIcon = true
      }
      this.timer = setInterval(() => {
        if (this.$refs.audio.paused) {
          clearInterval(this.timer)
          this.timer = null
          this.shoIcon = false
        }
      }, 500)
    },
    editContent() {
      const osEmpId = this.form.serviceContent[0].serviceManId
      const params = {
        id: this.form.id,
        orderStatus: this.form.orderStatus,
        osEmpId: osEmpId,
        planServiceDate: this.form.planServiceDate
      }
      if (!params.planServiceDate) {
        this.$message.error('预计服务日期不能为空！')
        return
      }
      if (!params.osEmpId) {
        this.$message.error('服务人员不能为空！')
        return
      }
      saveOrderInfor(params).then(res => {
        if (res.code == 0) {
          this.$message.success('工单修改成功！')
          this.closeDetailsPage()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('工单修改失败！')
      })
    },
    getDict() {
      const dictKey = [
        'ticket_status'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'ticket_status':
                this.statusOptions = dict[key]
                if (this.status === 'service_failed') {
                  this.statusOptions = this.statusOptions.filter(item => item.dictValue != 'serving')
                }
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }
  .titleSlider {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .titleSlider > span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    padding: 0 10px 0 20px;
    height: 47px;
    font-size:16px;
    font-weight: 600;
  }

  .titleSlider > span .titleTip {
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -9px;
    width: 3px;
    height: 18px;
    background-color: #0078D4;
    display: inline-block;
  }

  .titleSlider::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 1px dashed #E1E1E1;
    content: '';
  }

  table tr:nth-child(even) {
    background-color: transparent;
  }

  .addBtnDiv {
    border: 1px dashed #E1E1E1;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .addBtnDiv > span {
    cursor: pointer;
    color: #0078D4;
  }

  .el-collapse-item__arrow {
    margin-right: 30px !important;
  }

  .el-footer {
    padding-top: 24px;
    padding-right: 0;
  }

  .el-footer > div {
    overflow: hidden;
  }

  .el-footer > div > button {
    float: right;
  }

  .base-btn {
    margin-left: 15px;
  }

  .cancel-btn {
    border: 1px solid #2b579a;
    color: #2b579a;
  }

  .remarkSpan {
    padding: 10px 20px;
    margin: 0;
  }
  .picCount{
    display: flex;
    margin-left: 20px;
    font-size: 14px;
    color:#333;
    >div{
      text-align: center;
      margin-right: 20px;
      font-weight: bold;
    }
  }
  .imgBG{
    width:150px;
    height:150px;
    margin-bottom: 15px;
    img{
      width:150px;height:150px;
    }
  }
  .tableImg{
    display: inline-block;
    width:35px;height:35px;
    margin-right: 5px;
    .img{
      width:35px;height:35px;
    }
  }
  .toastImg{
    width:100vw;height:100vh;
    z-index:9990;
    position: fixed;
    top:0;bottom: 0;
    left: 0;
    right:0;
    background:rgba(0,0,0,.5)
  }
  .bgImgInfor{
    width:600px;height:700px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    .bigImg{
      width:600px;
      height:600px;
      img{
        width:600px;height:600px;
      }
    }
    .smallImg{
      height:100px;
      width:600px;
      border:1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      span{
        display: inline-block;
        width:100px;height:100px;
        img{
          width:100px;height:100px;
        }
      }
    }
  }
  #container{
    width:700px;
    height:700px;
    position:absolute;
    z-index: 999999;
    z-index: 100;
    left: 50%;
    top:50%;
    border-radius: 20px;
    transform: translate(-50%,-50%);
  }
  .fillReasonCon{
    margin-left:20px;
  }
  .fillReason{
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  .audioGif{
    height:60px;
    width:46px;
    padding-left: 30px;
    img{
      height:60px;
      width:46px;
    }
  }
  /*.XXX{margin-bottom: 16px !important;}*/
  /*.XXX .el-form-item__error{width: 200px;}*/
</style>
