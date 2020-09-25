<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
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
        <el-form-item label="计生标签">
          <el-select
            v-model="tags"
            placeholder="请选计生人员标签"
            style="width: 200px"
            multiple
            @keyup.enter.native="onSubmit"
          >
            <el-option-group
              v-for="group in tagOptions"
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
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{ class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{ class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入</el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出</el-button>

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
            <el-table-column label="姓名" prop="fullName" min-width="65" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="140" />
            <el-table-column label="户籍地" prop="areaCodeName" min-width="200" show-overflow-tooltip />
            <el-table-column label="联系方式" prop="homePhone" min-width="130">
              <template slot-scope="{row}">
                <span>{{ row.homePhone }}</span>
                <span v-if="row.mobile && row.homePhone">/</span>
                <span> {{ row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标签" prop="label" min-width="180" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span>{{ row.pbFamilyTypeName }}</span>
                <span>{{ row.pbSubTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateTime" min-width="180" sortable="custom" show-overflow-tooltip />
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="{row}">
                <span v-show="row.hasEdit" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-show="row.hasDelete" v-has="{class: '删除'}" class="table-btn" @click="handleRemove(row)">删除</span>
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
    <!-- <el-dialog title="导入计生人员信息" :visible.sync="dialogVisible" class="importStyleDialog">
      <import-dialog :upload-url="uploadUrl" :template-api="getFamilyInfoImportTemplate" template-name="计生人员信息导入模板" :dialog-visible="dialogVisible" @visible="visible" />
    </el-dialog> -->
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入计生人员信息'" :template-name="'计生人员信息导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'计生人员信息管理'" @visible="visible" />

  </el-container>
</template>

<script>
import _ from 'lodash'
import { getFamilyInfoImportTemplate, getFamilyInfoExport } from '@/api/importExportApi'
import ImportDialog from '@/components/importDialog/index'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { transformTags, downloadFromBlob } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import {
  getDateList,
  removeFamilyPlan
} from '@/api/userInfoConfig/familyplanInfo'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import { getEditAuthority } from '@/api/user'
import { Msg } from '@/utils/tools'
import ExcelUpload from '@/components/newExcelUpload/userInformation'
import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池

export default {
  components: {
    ImportDialog,
    Address,
    Pagination,
    ExcelUpload
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      form: {
        ageMax: '',
        ageMin: '',
        keyword: '', // ID或者姓名
        dateRange: '',
        sort: 'desc',
        areaCode: [], // 区域表单ID
        pbFamilyTypeList: [],
        pbSubTypeList: [],
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      areaCode: [],
      tags: [],
      tagOptions: [],
      familyOptions: [],
      subsidyOptions: [],
      idEdit: true,
      tableData: [],
      total: 0,
      exportData: '', // 查询成功后赋值
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/biz/plan/birth/import?ignoreField=',
      templateApi: getFamilyInfoImportTemplate
    }
  },
  mounted() {
    this.getSelect()
    this.getData(this.form)
    this.idEdit = false
    const data = {
      ignoreField: ''
    }
    getEditAuthority(this.$route.meta.id).then(res => {
      res.forEach(item => {
        if (item.menuName === '含小区导入模板') {
          data.ignoreField = item.menuName
          this.uploadUrl = process.env.VUE_APP_BASE_API + '/biz/plan/birth/import?ignoreField=' + data.ignoreField
          return
        }
      })
    })
  },
  methods: {
    sortChange(data) {
      const { prop, order } = data
      if (order === 'descending') {
        this.form.sort = 'desc'
      } else {
        this.form.sort = 'asc'
      }
      this.getData()
    },
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'birthControl_family',
        'birthControl_subsidy'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'birthControl_family':
                this.familyOptions = dict[key]
                this.tagOptions.push(
                  {
                    label: '计生家庭',
                    options: dict[key]
                  }
                )
                break
              case 'birthControl_subsidy':
                this.subsidyOptions = dict[key]
                this.tagOptions.push(
                  {
                    label: '计生补助',
                    options: dict[key]
                  }
                )
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    async getData() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      this.tags.forEach((item) => {
        this.familyOptions.forEach((items) => {
          if (item == items.dictValue) {
            newArr.pbFamilyTypeList.push(items.dictValue)
          }
        })
        this.subsidyOptions.forEach((items) => {
          if (item == items.dictValue) {
            newArr.pbSubTypeList.push(items.dictValue)
          }
        })
      })
      searchArr = newArr
      searchArr.areaCode = searchArr.areaCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      await getDateList(searchArr).then(res => {
        if (res.code == '0') {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      }).catch(() => {
        this.$message.error('获取计生人员信息失败！')
      })
    },
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData()
    },
    onReset() {
      this.tags = []
      this.areaCode = []
      this.form = {
        ageMax: '',
        ageMin: '',
        keyword: '', // ID或者姓名
        // dateRange: '',
        areaCode: [], // 区域表单ID
        pbFamilyTypeList: [],
        pbSubTypeList: [],
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    handleEdit(row) {
      this.$router.push({
        path: `/familyplanInfo/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}` }
      })
    },
    handleRemove(row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除计生人员信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeFamilyPlan(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            // 延迟5s再去调用列表接口，以为后台数据库和搜索引擎之间需要数据同步 后期双写优化
            Msg.loading()
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: `删除计生人员信息成功！`
              })
              this.form.pageNum = 1
              this.getData(this.form)
              Msg.hideLoading()
            }, 5000)
          } else {
            this.$message.error(`删除计生人员信息操作失败，失败原因是：` + response.msg)
          }
        }).catch(() => {
          this.$message.error(`删除计生人员信息操作失败！`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/familyplanInfo/details/0',
        query: { 'modelType': 'add', '_title': '新增计生人员' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    importFun() {
      this.dialogVisible = true
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit();
      if (!canExport(this.total)) return;

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr
				 // 所选区域赋值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      this.tags.forEach((item) => {
        this.familyOptions.forEach((items) => {
          if (item == items.dictValue) {
            newArr.pbFamilyTypeList.push(items.dictValue)
          }
        })
        this.subsidyOptions.forEach((items) => {
          if (item == items.dictValue) {
            newArr.pbSubTypeList.push(items.dictValue)
          }
        })
      })
      searchArr = newArr
      searchArr.areaCode = searchArr.areaCode.length ? searchArr.areaCode[0] : ''
      delete searchArr.pageSize
      delete searchArr.pageNum
      this.$confirm(
        confirmTitle,
        '导出计生人员信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getFamilyInfoExport(searchArr).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return;
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
      // if (this.form.ageMax == '' && this.form.ageMin == '' && this.form.keyword == '' && this.form.areaCode.length == 0 && this.tags.length == 0) {
      //   confirmTitle = '确认导出全部计生人员信息吗？'
      // } else {
      //   confirmTitle = '确认导出筛选计生人员信息吗？'
      // }
      // const arr = []
      // if (this.areaCode.length !== 0) {
      //   arr.push(this.areaCode[this.areaCode.length - 1])
      // }
      // this.form.areaCode = arr
      // 	 // 所选区域赋值
      // let searchArr
      // const newArr = _.cloneDeep(this.form) // 深拷贝form
      // this.tags.forEach((item) => {
      //   this.familyOptions.forEach((items) => {
      //     if (item == items.dictValue) {
      //       newArr.pbFamilyTypeList.push(items.dictValue)
      //     }
      //   })
      //   this.subsidyOptions.forEach((items) => {
      //     if (item == items.dictValue) {
      //       newArr.pbSubTypeList.push(items.dictValue)
      //     }
      //   })
      // })
      // searchArr = newArr
      // searchArr.areaCode = searchArr.areaCode.length ? searchArr.areaCode[0] : ''
      // delete searchArr.pageSize
      // delete searchArr.pageNum
	    //   this.$confirm(
		  //     confirmTitle,
      //   '导出计生人员信息',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // )
      //   .then(() => {
      //     getFamilyInfoExport(searchArr).then(response => {
      //       if (response instanceof ArrayBuffer) {
      //         const data = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
      //         downloadFromBlob(data, '计生人员信息列表.xlsx')
      //         this.$message.success('导出计生人员信息成功！')
      //       } else {
      //         if (response.code != 0 || response.code != '0') {
      //           this.$message.error('导出计生人员信息操作失败，失败原因是：' + response.msg)
      //         }
      //       }
      //     }).catch((error) => {
      //       if (error && error.message) {
      //         if (error.message.indexOf('timeout') > -1) {
      //           error.message = '网络连接超时'
      //         }
      //         this.$message.error('导出计生人员信息操作失败，失败原因是：' + error.message)
      //       } else {
      //         this.$message.error('导出计生人员信息操作失败！')
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
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/familyplanInfo/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menuId': this.$route.meta.id, 'hasEdit': row.hasEdit }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisible = value
    },
    // 去世
    tableRowClassName({ row, rowIndex }) {
      if (row.status === '1') {
        return 'dead-row'
      }
      if (row.status === 'moved_out') {
        return 'moved_out'
      }
      return ''
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/form.css";
</style>
