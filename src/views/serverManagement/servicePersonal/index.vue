<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商">
          <el-select v-model="form.ospId" filterable placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in serveOptions"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号">
          <el-input
            v-model.trim="form.empNo"
            clearable
            placeholder="请输入服务人员员工编号"
            style="width: 260px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入服务人员姓名"
            style="width: 260px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model.trim="form.mobile"
            clearable
            placeholder="请输入服务人员手机号"
            style="width: 260px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model.trim="form.idCard"
            clearable
            placeholder="请输入服务人员身份证号"
            style="width: 260px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="人员状态">
          <el-select v-model="form.jobStatus" filterable placeholder="请选择服务人员状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in statusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
            <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '绑定服务人员'}" type="primary" class="base-btn" @click="dialogSubmit=true">绑定服务人员</el-button>
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
            <div v-else class="totalWrap">无法找到匹配信息</div>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="orgEmpId"
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商名称" prop="ospName" min-width="120" />
            <el-table-column label="员工编号" prop="empNo" min-width="100" />
            <el-table-column label="姓名" prop="fullName" />
            <el-table-column label="身份证号" prop="idCard" min-width="120" />
            <el-table-column label="性别" prop="sexName" min-width="80" />
            <el-table-column label="年龄" prop="age" />
            <el-table-column label="手机号" prop="mobile" />
            <el-table-column label="人员状态" prop="jobStatusName">
              <template slot-scope="{row}">
                <span :style="{color:row.jobStatusName==='离职'?'red':''}">{{ row.jobStatusName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="账号" prop="loginName" />
            <el-table-column label="擅长服务" prop="goodAtService" show-overflow-tooltip min-width="130" />
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType!=null" fixed="right" label="操作" width="170" header-align="center">
              <template slot-scope="{row,$index}">
                <!-- <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span> -->
                <span v-if="row.jobStatus==='work'" class="table-btn" @click="leaveWork(row)">离职</span>
                <span v-if="row.jobStatus==='resign'" class="table-btn" @click="joinWork(row)">在职</span>
                <span v-if="row.bindStatus==='notBind'" class="table-btn" @click="addCount(row)">绑定账号</span>
                <span v-if="row.bindStatus==='bind'" class="table-btn" style="color:#f8ba69">已绑定</span>
                <!-- <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span> -->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData(form)"
          />
        </el-main>
      </el-container>
    </el-main>
    <el-dialog
      v-if="dialogSubmit"
      v-dialogDrag
      title="绑定服务人员"
      :visible.sync="dialogSubmit"
      width="10%"
      :close-on-click-modal="false"
      @close="resetForm"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="loginName" label="登录账号：">
              <el-input v-model="ruleForm.loginName" placeholder="请输入登录账号" clearable />
            </el-form-item>
            <el-form-item prop="idCard" label="身份证号：">
              <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号" clearable />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="count"
      v-dialogDrag
      title="绑定账号"
      :visible.sync="count"
      width="10%"
      :close-on-click-modal="false"
      @close="countresetForm"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <el-form ref="countForm" :model="countForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="loginName" label="登录账号：">
              <el-input v-model="countForm.loginName" placeholder="请输入登录账号" clearable />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="countresetForm('countForm')">取 消</el-button>
        <el-button type="primary" @click="submitCountForm('countForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import { allSelectdictionaryData } from '@/api/common'
import {
  cardSearch,
  removeCard
} from '@/api/inteligentDeviceConfig/card'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getempList, saveServiceOrder, saveServiceAccount, saveWorkStatus, getServiceProvider } from '@/api/serverManagement/projectManagement'
import { verifyIdCard } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogSubmit: false,
      count: false,
      ruleForm: {
        loginName: '',
        idCard: ''
      },
      countForm: {
        empId: '',
        loginName: ''
      },
      rules: {
        loginName: [
          { required: true, trigger: 'blur', message: '登录账号不能为空，请输入！' }
        ],
        idCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
        ]
      },
      // 查询表单
      form: {
        ospId: '', // 卡状态
        empNo: '',
        fullName: '',
        mobile: '',
        idCard: '',
        jobStatus: '',
        keyword: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      statusOptions: [], // 卡状态选项
      serveOptions: [], // 服务商
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '' // 查询成功后赋值
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  mounted() {
    this.getDict()
    this.getData(this.form)
    getServiceProvider().then(res => {
      if (res.code == 0) {
        this.serveOptions = res.data
      }
    })
  },
  methods: {
    addCount(row) {
      this.countForm.empId = row.id
      this.count = true
    },
    resetForm(formName) {
      this.dialogSubmit = false
      this.$refs.ruleForm.resetFields()
    },
    countresetForm() {
      this.count = false
      this.$refs.countForm.resetFields()
    },
    submitCountForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveServiceAccount(this.countForm).then(res => {
            if (res.code == 0) {
              this.$message.success('绑定账号成功')
              this.count = false
              this.getData(this.form)
              this.countresetForm()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveServiceOrder(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.$message.success('绑定服务人员成功')
              this.getData(this.form)
              this.resetForm()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    getDict() {
      const dictKeys = ['person_status']
      allSelectdictionaryData(dictKeys).then(res => {
        const dict = res.data
        if (dict['person_status']) {
          this.statusOptions = dict['person_status']
        }
      }).catch(() => {
      })
    },
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      getempList(form).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('获取服务人员失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        ospId: '', // 卡状态
        empNo: '',
        fullName: '',
        mobile: '',
        idCard: '',
        jobStatus: '',
        keyword: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    fomatFloat(num, n) {
      var f = parseFloat(num)
      if (isNaN(f)) {
        return 0
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
      var s = f.toString()
      var rs = s.indexOf('.')
      // 判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + n) {
        s += '0'
      }
      return s
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/serverManagement/servicePersonal/details',
        query: { 'modelType': 'add', '_title': '新增服务人员' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/serverManagement/servicePersonal/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/serverManagement/servicePersonal/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}` }
      })
    },
    leaveWork(row) {
      const content = '<p>确定【' + row.fullName + '】离职吗？</p>'
      const params = {
        id: row.id,
        ospId: row.ospId,
        jobStatus: 'resign',
        fullName: row.fullName
      }
      this.$confirm(content, '温馨提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveWorkStatus(params).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `离职成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error(`离职操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离职！'
        })
      })
    },
    joinWork(row) {
      const content = '<p>确定【' + row.fullName + '】在职吗？</p>'
      const params = {
        id: row.id,
        ospId: row.ospId,
        jobStatus: 'work'
      }
      this.$confirm(content, '温馨提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveWorkStatus(params).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `在职成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error(`在职操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消在职！'
        })
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const content = '<p>确定【' + row.fullName + '】在职吗？</p>'
      this.$confirm(content, '温馨提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCard(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除敬老卡成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error(`删除敬老卡操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisible = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
