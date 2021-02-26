<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <!--<el-cascader v-model="form.areaCode" :options="provenceArray" change-on-select-->
          <!--@change="handleItemChange" :props="props" >-->
          <!--</el-cascader>-->
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="老人标签">
          <el-select
            v-model="tags"
            placeholder="请选择老人标签"
            style="width: 200px"
            multiple
            @change="handleChange"
            @keyup.enter.native="onSubmit"
          >
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="年龄范围">
          <el-date-picker
            v-model="form.dateRange"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item> -->
        <el-form-item label="年龄范围">
          <el-input
            v-model.trim="form.ageMin"
            clearable
            placeholder="最小年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMax"
            clearable
            placeholder="最大年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="户籍情况">
          <el-select
            v-model="form.householdRegistration"
            placeholder="请选择户籍情况"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in censusStatusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户口性质">
          <el-select
            v-model="form.residenceType"
            clearable
            placeholder="请选择户口性质"
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in residenceTypeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人口类别">
          <el-select
            v-model="form.populationType"
            placeholder="请选择人口类别"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in populationTypeOptions"
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
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>
            <el-button v-has="{class: '迁入'}" type="primary" class="base-btn" @click="showMovein()">迁入
            </el-button>
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
            row-key="id"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column
              label="户籍地"
              prop="areaCodeName"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="联系方式" prop="homePhone" min-width="130">
              <template slot-scope="{row,$index}">
                <span>{{ row.homePhone }}</span>
                <span v-if="row.homePhone !== '' && row.homePhone !== null && row.mobile !== '' && row.mobile !== null">/</span>
                <span>{{ row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="标签"
              prop="label"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="户籍情况"
              prop="householdRegistrationName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="户口性质"
              prop="residenceTypeName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="人口类别"
              prop="populationTypeName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column label="更新时间" prop="updateTime" sortable="custom" min-width="180" show-overflow-tooltip />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-show="row.hasEdit" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-show="row.hasDelete" v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="toNextPage"
          />
        </el-main>
      </el-container>
    </el-main>
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入老人信息'" :template-name="'老人信息导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'老人信息管理'" @visible="visible" />

    <!-- <el-dialog title="导入老人信息" :visible.sync="dialogVisible" class="importStyleDialog">
      <import-dialog
        :upload-url="uploadUrl"
        :template-api="getRepairFaultDownload"
        template-name="老人信息导入模板"
        :dialog-visible="dialogVisible"
        @visible="visible"
      />
    </el-dialog> -->

    <!-- 新增迁入 -->
    <el-dialog
      v-dialogDrag
      title="迁入人员"
      :visible.sync="movein"
      width="30%"
      :close-on-click-modal="false"
      @close="resetIdCard"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <el-input v-model.trim="idCard" placeholder="请输入身份证号查询" style="width:50%" clearable />
          <el-button type="primary" @click="seachInfor">查询</el-button>
          <el-button type="primary" @click="resetIdCard">重置</el-button>
        </div>
        <div v-if="showTable">
          <el-table
            :data="dataList"
            tooltip-effect="dark"
            style="width: 100%;"
            border
            row-key="id"
          >
            <el-table-column label="姓名" prop="fullName" min-width="80" />
            <el-table-column label="性别" prop="sexName" min-width="60">
              <template slot-scope="{row}">
                <span v-if="row.sex==1">女</span>
                <span v-if="row.sex==0">男</span>
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证号" prop="idCard" min-width="170" />
            <el-table-column label="户籍区划" prop="censusAreaCodeLevelName" show-overflow-tooltip min-width="180" />
            <el-table-column label="户籍地址" prop="censusAddr" show-overflow-tooltip min-width="150" />
            <el-table-column label="居住区划" prop="liveAreaCodeLevelName" show-overflow-tooltip min-width="180" />
            <el-table-column label="居住地址" prop="liveAddr" show-overflow-tooltip min-width="150" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="dialogSubmit"
      v-dialogDrag
      title="迁入地址"
      :visible.sync="dialogSubmit"
      width="10%"
      :close-on-click-modal="false"
      @close="resetForm"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <p>请输入{{ dataList&&dataList.length?dataList[0].fullName:'' }}在您街道的户籍区划及户籍地址</p>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="censusArea" label="户籍区划：">
              <Address
                style="width:100%"
                :area-code="censusAreaCode"
                :form-code="ruleForm.censusArea"
                :id-edit="idEdit"
                @getAreaCode="getcensusAreaCode"
              />
            </el-form-item>
            <el-form-item prop="censusAddr" label="户籍详细地址：">
              <el-input v-model="ruleForm.censusAddr" placeholder="请输入户籍详细地址" />
            </el-form-item>
            <el-form-item label="居住区划：">
              <Address
                style="width:100%"
                :area-code="liveAreaCode"
                :form-code="ruleForm.liveArea"
                :id-edit="idEdit"
                @getAreaCode="getliveAreaCode"
              />
            </el-form-item>
            <el-form-item label="居住详细地址：">
              <el-input v-model="ruleForm.liveAddr" placeholder="请输入居住详细地址" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { getRepairFaultDownload, getElderMesDownload } from '@/api/importExportApi'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import ImportDialog from '@/components/importDialog/index'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import qs from 'qs'
import { downloadFromBlob } from '@/utils/index'
import { Tools } from '@/utils/tools'
import {
  getElderDict,
  elderSearch,
  removeTableRowData,
  getMovePerson,
  saveMovePerson
} from '@/api/userInfoConfig/elderInfo'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getEditAuthority } from '@/api/user'
import { Msg } from '@/utils/tools'
import ExcelUpload from '@/components/newExcelUpload/userInformation'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
import {
  institutionSearch,
  getMoveServiceObjByIdCard,
  moveServiceObjRecord
} from '@/api/sidekickProjectConfig/volunteerServiceObject'
export default {
  components: {
    ImportDialog,
    Address,
    Pagination,
    ExcelUpload
  },
  mixins: [uploadExcelMix],
  data() {
    const verifycensusAreaCode = (rule, value, callback) => {
      if (this.censusAreaCode.length === 0 || this.censusAreaCode[0] === '') {
        callback(new Error('户籍区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    const verifyliveAreaCode = (rule, value, callback) => {
      if (this.liveAreaCode.length === 0 || this.liveAreaCode[0] === '') {
        callback(new Error('户籍区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    return {
      movein: false,
      idCard: '',
      showTable: false,
      dataList: [],
      dialogSubmit: false,
      censusAreaCode: [],
      liveAreaCode: [],
      ruleForm: {
        censusArea: '',
        censusAddr: '',
        liveAddr: '',
        liveArea: ''
      },
      rules: {
        censusArea: [{ required: true, message: '请选择户籍区划', trigger: 'change', validator: verifycensusAreaCode }],
        censusAddr: [{ required: true, message: '请输入户籍详细地址', trigger: 'blur' }],
        liveArea: [{ required: true, message: '请选择居住区划', trigger: 'change', validator: verifyliveAreaCode }],
        liveAddr: [{ required: true, message: '请输入居住详细地址', trigger: 'blur' }]
      },

      options: [],
      // 查询表单
      form: {
        // dateRange: '',
        ageMin: '',
        ageMax: '',
        sort: 'desc',
        householdRegistration: '', // 户籍情况
        populationType: '', // 人口类别
        residenceType: '', // 户口性质
        fullName: '', // ID或者姓名
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      exportData: '', // 查询成功后赋值
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/biz/person/import?ignoreField=',
      templateApi: getRepairFaultDownload,
      residenceTypeOptions: [],
      populationTypeOptions: [],
      censusStatusOptions: []
    }
  },
  mounted() {
    this.idEdit = false
    this.getElderTags()
    this.getData(this.form)
    this.getDict()
    const data = {
      ignoreField: ''
    }
    getEditAuthority(this.$route.meta.id).then(res => {
      res.forEach(item => {
        if (item.menuName === '含小区导入模板') {
          data.ignoreField = encodeURI(item.menuName)
          this.uploadUrl = process.env.VUE_APP_BASE_API + '/biz/person/import?ignoreField=' + encodeURI(data.ignoreField)
          return
        }
      })
    })
  },
  methods: {
    // 迁入
    showMovein() {
      this.idCard = ''
      this.showTable = false
      this.movein = true
    },
    handleClose() {
      this.movein = false
      this.dataList = []
    },
    seachInfor() {
      if (!this.idCard) {
        return this.$message.warning('请输入身份证号查询')
      }
      this.dataList = []
      getMovePerson({ idCard: this.idCard }).then(res => {
        if (res.code == 0) {
          this.showTable = true
          this.dataList.push(res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetIdCard() {
      this.idCard = ''
      this.dataList = []
    },
    submit() {
      if (this.dataList && this.dataList.length) {
        const fullName = this.dataList[0].fullName
        this.$confirm(`确定要将${fullName}迁入您所在的街道吗?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogSubmit = true
        }).catch(() => {

        })
      } else {
        this.$message.error('请先查询人员信息')
      }
    },
    resetForm(formName) {
      this.dialogSubmit = false
      this.censusAreaCode = []
      this.liveAreaCode = []
      this.ruleForm = {
        censusArea: '',
        censusAddr: '',
        liveAddr: '',
        liveArea: ''
      },
      // this.idEdit = !this.idEdit
      this.$refs.ruleForm.resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = _.cloneDeep(this.ruleForm)
          params.censusArea = this.censusAreaCode[this.censusAreaCode.length - 1]
          params.liveArea = this.liveAreaCode[this.liveAreaCode.length - 1]
          params.id = this.dataList[0].id
          saveMovePerson(params).then(res => {
            if (res.code == 0) {
              this.movein = false
              this.dialogSubmit = false
              this.$message.success('迁入成功')
              this.resetForm()
              this.onSubmit()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    getcensusAreaCode(val) {
      this.censusAreaCode = val
    },
    getliveAreaCode(val) {
      this.liveAreaCode = val
    },
    getDict() {
      const dictKey = [
        'biz_residence_type', // 户口性质
        'people_category', // 人口类别
        'biz_census_status' // 户籍情况
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              // 户口性质
              case 'biz_residence_type':
                this.residenceTypeOptions = dict[key]
                break
                // 人口类别
              case 'people_category':
                this.populationTypeOptions = dict[key]
                break
                // 户籍
              case 'biz_census_status':
                this.censusStatusOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (order === 'descending') {
        this.form.sort = 'desc'
      } else {
        this.form.sort = 'asc'
      }
      this.getData(this.form)
    },
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 老人标签下拉数据初始化获取
    getElderTags() {
      getElderDict().then(res => {
        if (res) {
          this.options = res
        }
      }).catch(() => {
        this.$message.error('获取老人标签字典失败！')
      })
    },
    // 表单查询按钮
    async onSubmit() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      // 老人标签根据不同类型分成不同数组
      const { keys } = Object // 初始化keys方法 取键值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      this.tags.forEach((item, index) => {
        for (const key of keys(newArr)) {
          if (keys(newArr).indexOf(item.split(':')[0]) != -1) {
            // form里面有该属性，把此象放入该属性数组
            newArr[item.split(':')[0]].push(item.split(':')[1])
            break
          } else {
            // form里面没有该属性，新建该属性，然后把此象放入该属性数组
            newArr[item.split(':')[0]] = []
            newArr[item.split(':')[0]].push(item.split(':')[1])
            break
          }
        }
      })
      if (newArr.assessLevelList && newArr.assessLevelList.length) {
        newArr.assessLevelList.forEach((item, i) => {
          if (item == 'zero_to_sex') {
            newArr.assessLevelList.splice(i, 1)
            newArr.assessLevelList.push('00', '1', '2', '3', '4', '5', '6')
          }
        })
      }
      searchArr = newArr
      searchArr.areaCode = searchArr.areaCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      searchArr.pageNum = 1
      this.form.pageNum = 1
      await this.getData(searchArr)
    },
    toNextPage() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      // 老人标签根据不同类型分成不同数组
      const { keys } = Object // 初始化keys方法 取键值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      this.tags.forEach((item, index) => {
        for (const key of keys(newArr)) {
          if (keys(newArr).indexOf(item.split(':')[0]) != -1) {
            // form里面有该属性，把此象放入该属性数组
            newArr[item.split(':')[0]].push(item.split(':')[1])
            break
          } else {
            // form里面没有该属性，新建该属性，然后把此象放入该属性数组
            newArr[item.split(':')[0]] = []
            newArr[item.split(':')[0]].push(item.split(':')[1])
            break
          }
        }
      })
      if (newArr.assessLevelList && newArr.assessLevelList.length) {
        newArr.assessLevelList.forEach((item, i) => {
          if (item == 'zero_to_sex') {
            newArr.assessLevelList.splice(i, 1)
            newArr.assessLevelList.push('0', '1', '2', '3', '4', '5', '6')
          }
        })
      }
      searchArr = newArr
      searchArr.areaCode = searchArr.areaCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      this.getData(searchArr)
    },
    // 获取表格数据
    async getData(form) {
      await elderSearch(form).then(res => {
        if (res && res.rows) {
          this.tableData = res.rows
          this.total = res.total
          this.exportData = _.cloneDeep(form)
          if (this.exportData.areaCode === undefined) {
            this.exportData.areaCode = []
          }
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      }).catch(() => {
        this.$message.error('获取老人信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.tags = []
      this.areaCode = []
      this.form = {
        // dateRange: '',
        ageMin: '',
        ageMax: '',
        fullName: '', // ID或者姓名
        householdRegistration: '', // 户籍情况
        populationType: '', // 人口类别
        residenceType: '', // 户口性质
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/elderlyInfo/details',
        query: { 'modelType': 'add', '_title': '新增老人', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/elderlyInfo/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id, 'hasEdit': row.hasEdit }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/elderlyInfo/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除老人信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            Msg.loading()
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: `删除老人信息成功！`
              })
              this.form.pageNum = 1
              this.getData(this.form)
              Msg.hideLoading()
            }, 5000)
          } else {
            this.$message.error(`删除老人信息操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除老人信息操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 表格如果已去世，这一行标黄
    tableRowClassName({ row, rowIndex }) {
      if (row.status === '1') {
        return 'dead-row'
      }
      if (row.status === 'moved_out') {
        return 'moved_out'
      }
      return ''
    },
    // 导入功能
    importFun() {
      this.dialogVisible = true
    },
    // 导出功能
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出老人信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getElderMesDownload(this.exportData).then(response => {
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
      // let confirmTitle = ''
      // if (this.exportData.areaCode.length === 0 && this.exportData.fullName === '' && this.tags.length === 0 && this.form.ageMin == '' && this.form.ageMax == '' && this.form.householdRegistration === '' && this.form.populationType === '' && this.form.residenceType === '') {
      //   confirmTitle = '确认导出全部老人信息吗？'
      // } else {
      //   confirmTitle = '确认导出筛选的老人信息吗？'
      // }
      // this.$confirm(
      //   confirmTitle,
      //   '导出老人信息',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // )
      //   .then(() => {
      //     getElderMesDownload(this.exportData).then(response => {
      //       if (response instanceof ArrayBuffer) {
      //         const data = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
      //         downloadFromBlob(data, '老人信息列表.xlsx')
      //         this.$message.success('导出老人信息成功！')
      //       } else {
      //         if (response.code != 0 || response.code != '0') {
      //           this.$message.error('导出老人信息操作失败，失败原因是：' + response.msg)
      //         }
      //       }
      //     }).catch((error) => {
      //       if (error && error.message) {
      //         if (error.message.indexOf('timeout') > -1) {
      //           error.message = '网络连接超时'
      //         }
      //         this.$message.error('导出老人信息操作失败，失败原因是：' + error.message)
      //       } else {
      //         this.$message.error('导出老人信息操作失败！')
      //       }
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消操作！'
      //     })
      //   })
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
