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
            :form-code="form.censusArea"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="老人补贴">
          <el-select
            v-model="tags"
            placeholder="请选择老人补贴"
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
                :label="item.dictType"
                :value="item.dictValue"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
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
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
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
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
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
              prop="censusArea"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="联系方式" prop="contactDetails" min-width="130" />
            <el-table-column
                    label="补贴类型"
                    prop="subsidyTitleName"
                    min-width="180"
                    show-overflow-tooltip
            />
            <el-table-column
              label="补贴名称"
              prop="subsidyElementName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="补贴金额/频次"
              prop="subsidyUnitName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="何时享受补贴"
              prop="subsidyDate"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
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
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入补贴信息'" :template-name="'补贴信息导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'老人补贴'" @visible="visible" />
  </el-container>
</template>

<script>
import _ from 'lodash'
import { getSubsidyTemplate, getElderMesDownload, getSubsidyDownload } from '@/api/importExportApi'
import ImportDialog from '@/components/importDialog/index'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import qs from 'qs'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { Msg } from '@/utils/tools'
import ExcelUpload from '@/components/newExcelUpload/userInformation'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
import { getSubsidyList, deleteSubsidy } from '@/api/userInfoConfig/subsidyConfig'
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
      idCard: '',
      dataList: [],
      dialogSubmit: false,
      censusAreaCode: [],
      liveAreaCode: [],
      options: [
        {
          label: '养老补贴',
          options: [
            {
              dictType: '敬老卡津贴',
              dictValue: '敬老卡津贴'
            },
            {
              dictType: '居家养老补贴',
              dictValue: '居家养老补贴'
            },
            {
              dictType: '长护险补贴',
              dictValue: '长护险补贴'
            },
            {
              dictType: '助餐补贴',
              dictValue: '养老助餐补贴'
            }
          ]
        },
        {
          label: '救助补贴',
          options: [
            {
              dictType: '低保补贴',
              dictValue: '低保补贴'
            },
            {
              dictType: '支内回沪补贴',
              dictValue: '支内回沪补贴'
            }
          ]
        },
        {
          label: '残疾补贴',
          options: [
            {
              dictType: '重残无业市补贴',
              dictValue: '重残无业市补贴'
            },
            {
              dictType: '重残无业区补贴',
              dictValue: '重残无业区补贴'
            },
            {
              dictType: '残疾人交通补贴',
              dictValue: '残疾人交通补贴'
            },
            {
              dictType: '残疾人护理补贴',
              dictValue: '残疾人护理补贴'
            },
            {
              dictType: '残疾人居家养护补贴',
              dictValue: '残疾人居家养护补贴'
            },
            {
              dictType: '残疾人生活补贴',
              dictValue: '残疾人生活补贴'
            }
          ]
        },
        {
          label: '优抚补贴',
          options: [
            {
              dictType: '优抚补贴',
              dictValue: '优抚补贴'
            }
          ]
        },
        {
          label: '计生补贴',
          options: [
            {
              dictType: '特别扶助金（伤残）',
              dictValue: '特别扶助金（伤残）'
            },
            {
              dictType: '特别扶助金（死亡）',
              dictValue: '特别扶助金（死亡）'
            },
            {
              dictType: '助餐补贴',
              dictValue: '计生助餐补贴'
            },
            {
              dictType: '农村奖扶金',
              dictValue: '农村奖扶金'
            }

          ]
        },
        {
          label: '失独补贴',
          options: [
            {
              dictType: '失独补贴',
              dictValue: '失独补贴'
            }
          ]
        },
        {
          label: '失地补贴',
          options: [
            {
              dictType: '失地补贴',
              dictValue: '失地补贴'
            }
          ]
        },
        {
          label: '礼品补贴',
          options: [
            {
              dictType: '礼品补贴',
              dictValue: '礼品补贴'
            }
          ]
        }
      ],
      // 查询表单
      form: {
        // dateRange: '',
        ageMin: '',
        ageMax: '',
        fullName: '', // ID或者姓名
        censusArea: '',
        subsidyElementNameSplice: '',
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
      uploadUrl: process.env.VUE_APP_BASE_API + '/biz/subsidy/import',
      templateApi: getSubsidyTemplate,
      residenceTypeOptions: [],
      populationTypeOptions: [],
      censusStatusOptions: []
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    async onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    toNextPage() {
      this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      if (this.tags && this.tags.length) {
        form.subsidyElementNameSplice = this.tags.join()
      } else {
        form.subsidyElementNameSplice = ''
      }
      if (this.areaCode && this.areaCode.length) {
        form.censusArea = this.areaCode[this.areaCode.length - 1]
      } else {
        form.censusArea = ''
      }
      await getSubsidyList(form).then(res => {
        if (res && res.data) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = _.cloneDeep(form)
          if (this.exportData.areaCode === undefined) {
            this.exportData.areaCode = []
          }
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      }).catch(() => {
        this.$message.error('获取补贴信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.tags = []
      this.areaCode = []
      this.form = {
        ageMin: '',
        ageMax: '',
        fullName: '', // ID或者姓名
        censusArea: '',
        subsidyElementNameSplice: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/personnelSubsidy/details/${row.personId}`,
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
        path: `/personnelSubsidy/details/${row.personId}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除补贴信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSubsidy(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            Msg.loading()
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: `删除补贴信息成功！`
              })
              this.form.pageNum = 1
              this.getData(this.form)
              Msg.hideLoading()
            }, 5000)
          } else {
            this.$message.error(`删除补贴信息操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除补贴信息操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 导入功能
    importFun() {
      this.dialogVisible = true
    },
    // 导出功能
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出补贴信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getSubsidyDownload(this.exportData).then(response => {
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
