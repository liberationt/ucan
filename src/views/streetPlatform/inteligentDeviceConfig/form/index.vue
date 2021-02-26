<template>
  <el-container class="slotCardForm">
    <!--刷卡统计报表-->
    <el-header class="formDiv">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="所属区域：">
          <Address
            ref="address"
            :area-code="areaCode"
            :form-code="form.areaCode"
            :scope="'no_committee'"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="刷卡月份：">
          <el-date-picker
            v-model="form.creditCardMonth"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择刷卡月份"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
          <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="center"
            show-summary
            border
            row-key="id"
          >
            <el-table-column v-if="!orgState ? true : false" label="区/街道" prop="area_name" />
            <el-table-column v-if="!orgState ? true : false" label="机构数" prop="numberOfInstitutions" />
            <el-table-column v-if="orgState ? true : false" label="机构名称" prop="org_name" />
            <el-table-column label="POS机数" prop="posNumber" />
            <el-table-column label="刷卡人数" prop="numberOfPeople" />
            <el-table-column label="刷卡次数" prop="swipeTimes" />
          </el-table>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import Address from '@/components/Address/adress'
import { formSearch, getFORMxport } from '@/api/inteligentDeviceConfig/form'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant } from '@/common/constant'// 常量池
export default {
  components: {
    Address
  },
  data() {
    return {
      areaCode: [],
      form: {
        areaCode: '',
        creditCardMonth: ''
      },
      tableData: [],
      orgState: false,
      idClear: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
      if (val.length === 0) {
        this.form.areaCode = ''
        this.$refs.address.resetCode() // 调用子组件方法重置code
      }
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        areaCode: '',
        creditCardMonth: ''
      }
      this.areaCode = ''
      this.orgState = false
      this.$refs.address.resetCode() // 调用子组件方法重置code
      this.onSubmit()
    },
    // 提交表单
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.areaCode.length > 0) {
            this.form.areaCode = this.areaCode[this.areaCode.length - 1]
          }
          this.getData(this.form)
        }
      })
    },
    // 导出功能
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()

      let title = ''
      if (!this.orgState) {
        title = '导出刷卡统计报表-副本'
      } else {
        title = '导出刷卡统计报表'
      }
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getFORMxport(this.form).then(response => {
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

    // 获取数据
    getData() {
      formSearch(this.form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          if ('org_name' in this.tableData[0]) {
            this.orgState = true
          } else {
            this.orgState = false
          }
        }
      })
    }
  }
}
</script>
<style>
  @import "~@/styles/form.css";
  .el-month-table td.today .cell {
    color: #606266;
    font-weight: normal;
  }
</style>
