<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <!--服务信息tabs end-->
        <el-tab-pane label="异常单设置" name="1">
          <el-checkbox v-model="checked1">未按预计服务日期服务的异常工单，允许月内在其它日期进行服务</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="签到拍照设置" name="2">
          <el-checkbox v-model="checked2">服务人员在小程序签到成功后，必须拍摄签到照片</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="签退拍照设置" name="3">
          <el-checkbox v-model="checked3">服务人员在小程序签退成功后，必须拍摄签退照片</el-checkbox>
        </el-tab-pane>
      </el-tabs>
      <el-footer>
        <div>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="toEditType">确定</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import { saveOrderSetting, getOrderSettingDetail } from '@/api/serverManagement/projectManagement'
import { closeSelectedTag } from '@/utils/rooterJump'

export default {
  data() {
    return {
      activeTabs: '1',
      checked1: false,
      checked2: false,
      checked3: false,
      formId1: '',
      formId2: '',
      formId3: '',
      dataList: [
        {
          id: '',
          parmDesc: '未按预计服务日期服务的异常工单，允许月内在其它日期进行服务',
          parmType: 'exception_order_setting',
          parmValue: ''
        },
        {
          id: '',
          parmDesc: '服务人员在小程序签到成功后，必须拍摄签到照片',
          parmType: 'sign_in_photo_settings',
          parmValue: ''
        },
        {
          id: '',
          parmDesc: '服务人员在小程序签退成功后，必须拍摄签退照片',
          parmType: 'sign_out_photo_settings',
          parmValue: ''
        }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    toEditType() {
      this.saveData()
    },
    saveData() {
      this.dataList[0].parmValue = this.checked1 === true ? '0' : '1'
      this.dataList[1].parmValue = this.checked2 === true ? '0' : '1'
      this.dataList[2].parmValue = this.checked3 === true ? '0' : '1'
      saveOrderSetting(this.dataList).then(res => {
        if (res.code == '0') {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.closeDetailsPage()
        } else {
          this.$message.error('保存失败，失败原因是：' + res.msg)
        }
      })
    },
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/serverManagement/orderManagement/orderSetting')
    },
    getData() {
      getOrderSettingDetail().then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length) {
            res.data.map(item => {
              if (item.parmDesc === '未按预计服务日期服务的异常工单，允许月内在其它日期进行服务') {
                this.checked1 = item.parmValue === '0'
                this.dataList[0].id = item.id
              }
              if (item.parmDesc === '服务人员在小程序签到成功后，必须拍摄签到照片') {
                this.checked2 = item.parmValue === '0'
                this.dataList[1].id = item.id
              }
              if (item.parmDesc === '服务人员在小程序签退成功后，必须拍摄签退照片') {
                this.checked3 = item.parmValue === '0'
                this.dataList[2].id = item.id
              }
            })
          }
        }
      })
    }
  }
}
</script>
