<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @keyup.enter.native="onSubmit"
            @getAreaCode="getAreaCode"
          />
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select
            v-model="form.orgType"
            placeholder="请选择机构类型"
            clearable
            multiple
            style="width: 300px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in org_typeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入机构名称查询"
            style="width: 200px"
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
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
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
            <el-table-column label="机构名称" show-overflow-tooltip prop="orgName" min-width="200" />
            <el-table-column label="机构类型" prop="orgTypeLabel" min-width="120" />
            <el-table-column label="地址" show-overflow-tooltip prop="addr" min-width="200" />
            <el-table-column label="联系电话" prop="phone" min-width="100" />
            <el-table-column label="成立时间" prop="establishTime" min-width="80" />
            <el-table-column label="开放状态" prop="openState" min-width="80" />
            <el-table-column fixed="right" label="操作" width="150" header-align="center" style="background:red">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span
                  v-has="{class: '删除'}"
                  class="table-btn"
                  @click="handleRemove($index, row)"
                >删除</span>
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

        <el-dialog
          title="机构类型选择"
          :visible.sync="dialogVisible"
          class="communityFacilitiesDialog"
          :close-on-click-modal="false"
        >
          <div class="">
            <el-row class="instituWraps">
              <div class="instituDivs" @click="jumpFacilitiesDetails('2010')" v-has="{class: '日间照护机构'}">
                <div>
                  <span class="iconfont">&#xe643;</span>
                </div>
                <span class="text">日间照护机构</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2011')" v-has="{class: '综合为老服务中心'}">
                <div class="iconfont2">
                  <span class="iconfont iconzhwlfw" />
                </div>
                <span class="text">综合为老服务中心</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2013')" v-has="{class: '老年活动室'}">
                <div class="iconfont3">
                  <span class="iconfont iconlnhds" />
                </div>
                <span class="text">老年活动室</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2014')" v-has="{class: '助餐点'}">
                <div class="iconfont4">
                  <span class="iconfont iconzcd" />
                </div>
                <span class="text">助餐点</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2018')" v-has="{class: '健康小屋'}">
                <div class="iconfont5">
                  <span class="iconfont iconjkxw" />
                </div>
                <span class="text">健康小屋</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2016')" v-has="{class: '护理站'}">
                <div class="iconfont6">
                  <span class="iconfont iconhlz" />
                </div>
                <span class="text">护理站</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2017')" v-has="{class: '社区养老组织'}">
                <div class="iconfont7">
                  <span class="iconfont iconsqylzz" />
                </div>
                <span class="text">社区养老组织</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('4001')" v-has="{class: '养老辅具展示点'}">
                <div class="iconfont8">
                  <span class="iconfont">&#xe647;</span>
                </div>
                <span class="text">养老辅具展示点</span>
              </div>
              <!-- iconsqwsfw -->
              <div class="instituDivs" @click="jumpFacilitiesDetails('2020')" v-has="{class: '社区卫生服务设施'}">
                <div class="iconfont9">
                  <span class="iconfont iconsqfw">&#xe642;</span>
                </div>
                <span class="text">社区卫生服务设施</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2021')" v-has="{class: '村民互助点'}">
                <div>
                  <span class="iconfont">&#xe643;</span>
                </div>
                <span class="text">村民互助点</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2010_chizhou')" v-has="{class: '池州日间照护机构'}">
                <div class="iconfont2">
                  <span class="iconfont iconzhwlfw" />
                </div>
                <span class="text">日间照护机构</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2022')" v-has="{class: '社区养老服务站'}">
                <div class="iconfont3">
                  <span class="iconfont iconlnhds" />
                </div>
                <span class="text">社区养老服务站</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2023')" v-has="{class: '养老服务指导中心'}">
                <div class="iconfont4">
                  <span class="iconfont iconzcd" />
                </div>
                <span class="text">养老服务指导中心</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2011_chizhou')" v-has="{class: '池州综合为老服务中心'}">
                <div class="iconfont5">
                  <span class="iconfont iconjkxw" />
                </div>
                <span class="text">综合为老服务中心</span>
              </div>
              <div class="instituDivs" @click="jumpFacilitiesDetails('2024')" v-has="{class: '社区为老服务站'}">
                <div class="iconfont3">
                  <span class="iconfont iconlnhds" />
                </div>
                <span class="text">社区为老服务站</span>
              </div>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog
          title="导入社区设施信息"
          :visible.sync="dialogVisibleImport"
          class="importStyleDialog"
          :close-on-click-modal="false"
        >
          <import-dialog
            :upload-url="uploadUrl"
            :template-api="getCommunityFacilitiesDownload"
            template-name="社区设施导入模板"
            :dialog-visible="dialogVisibleImport"
            @visible="visible"
          />
        </el-dialog>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
/** ****************
	 instituType：机构类型
	 1010:养老院/敬老院、
	 1011:长者照护之家、
	 2010:日间照护机构、
	 2011:综合为老服务中心、
	 2012:邻里会、
	 2013:老年活动室、
	 2014:助餐点、
	 2015:社区长者食堂、
	 2016:护理站、
	 2017:社区养老组织、
   2018:健康小屋',
	 ******************/
import _ from 'lodash'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import ImportDialog from '@/components/importDialog/index'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import { getCommunityFacilitiesDownload, getCommunityFacilitiesExport } from '@/api/importExportApi'
import { downloadFromBlob } from '@/utils/index'
import {
  institutionSearch,
  removeTableRowData,
  removeTableRowData_chizhou,
  removeTableRowData_playRoom,
  removeTableRowData_healthy,
  allSelectdictionaryData,
  getInstitutionalTypeData
} from '@/api/facilitiesConfig/communityFacilities'
import qs from 'qs'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { facilityTypeFun } from '@/common/facilityType'
import { debounce } from '@/utils'

export default {
  components: {
    ImportDialog,
    Address,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      dialogVisible: false,
      dialogVisibleImport: false,
      // 机构类型
      org_typeOptions: [],
      // 查询表单
      form: {
        keyword: '', // 关键字查询
        areaCode: [], // 区域表单ID
        orgType: [], // 机构类型
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
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/service/facility/import',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      getCommunityFacilitiesDownload
    }
  },
  mounted() {
    this.idEdit = false
    /**
			 * 数据字典接口
			 */
    const dicKey = { 'selectType': '20XX' }
    getInstitutionalTypeData(dicKey).then(response => {
      this.org_typeOptions = response.data
    }).catch(() => {
      this.$message.error('获取机构类型失败！')
    })
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
    onSubmit() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      const data = JSON.parse(JSON.stringify(this.form))
      data.orgType = data.orgType.join(',')
      data.areaCode = arr // 所选区域赋值
      data.pageNum = 1
      this.getData(data)
    },
    // 获取表格数据
    getData(form) {
      const parmas = _.cloneDeep(form)
      parmas.areaCode = this.areaCode.length !== 0 ? this.areaCode[this.areaCode.length - 1] : ''
      // parmas.areaCode = typeof (parmas.areaCode) === 'object' ? parmas.areaCode.join('') : parmas.areaCode
      institutionSearch(parmas).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = this.form
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        keyword: '', // 关键字查询
        areaCode: [], // 区域表单ID
        orgType: [], // 机构类型
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.dialogVisible = true
    },
    // 双击行去详情页面
    toDetail(row) {
      const _orgType_ = row.orgType
      const _id_ = row.orgId
      let _path_ = ''
      switch (_orgType_) {
        case '2010':
          _path_ = `/communityFacilities/dayCareFacilitiesDetails/${_id_}` // 日间照护机构
          break
        case '2011':
          _path_ = `/communityFacilities/comprehensiveDetails/${_id_}` // 综合为老服务中心,
          break
        case '2012':
          _path_ = `/communityFacilities/comprehensiveDetails/${_id_}` // 邻里汇
          break
        case '2013':
          _path_ = `/communityFacilities/elderlyActivityRoomDetails/${_id_}` // 老年活动室
          break
        case '2014':
          _path_ = `/communityFacilities/helpMealsDetails/${_id_}` // 助餐点,
          break
        case '2015':
          _path_ = `/communityFacilities/helpMealsDetails/${_id_}` // 社区长者食堂
          break
        case '2016':
          _path_ = `/communityFacilities/nursingStationDetails/${_id_}` // 护理站
          break
        case '2019':
          _path_ = `/communityFacilities/nursingStationDetails/${_id_}` // 护理院
          break
        case '2017':
          _path_ = `/communityFacilities/communityPensionOrganizationDetails/${_id_}` // 社区养老组织
          break
        case '2018':
          _path_ = `/communityFacilities/healthHutDetails/${_id_}` // 健康小屋
          break
        case '4001':
          _path_ = `/communityFacilities/assistantDeviceSiteDetails/${_id_}` // 养老辅具展示点
          break
        case '2020':
          _path_ = `/communityFacilities/healthService/${_id_}` // 社区卫生服务设施
          break
        case '2021':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 村民互助点
          break
        case '2022':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 社区养老服务站
          break
        case '2023':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 养老服务指导中心
          break
        case '2024':
          _path_ = `/communityFacilities/communityForOldServe/${_id_}` // 社区为老服务站
          break
        case '2010_chizhou':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 池州日间照护机构
          break
        case '2011_chizhou':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 池州综合为老服务中心
          break
      }
      this.$router.push({
        path: _path_,
        query: {
          'id': _id_,
          'modelType': 'look',
          'instituType': _orgType_,
          '_title': `查看${row.orgName}`,
          'editAuthority': this.$route.meta.id
        }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      const _orgType_ = row.orgType
      const _id_ = row.orgId
      let _path_ = ''
      switch (_orgType_) {
        case '2010':
          _path_ = `/communityFacilities/dayCareFacilitiesDetails/${_id_}` // 日间照护机构
          break
        case '2011':
          _path_ = `/communityFacilities/comprehensiveDetails/${_id_}` // 综合为老服务中心
          break
        case '2012':
          _path_ = `/communityFacilities/comprehensiveDetails/${_id_}` // 邻里汇
          break
        case '2013':
          _path_ = `/communityFacilities/elderlyActivityRoomDetails/${_id_}` // 老年活动室
          break
        case '2014':
          _path_ = `/communityFacilities/helpMealsDetails/${_id_}` // 助餐点
          break
        case '2015':
          _path_ = `/communityFacilities/helpMealsDetails/${_id_}` // 社区长者食堂
          break
        case '2016':
          _path_ = `/communityFacilities/nursingStationDetails/${_id_}` // 护理站
          break
        case '2019':
          _path_ = `/communityFacilities/nursingStationDetails/${_id_}` // 护理院
          break
        case '2017':
          _path_ = `/communityFacilities/communityPensionOrganizationDetails/${_id_}` // 社区养老组织
          break
        case '2018':
          _path_ = `/communityFacilities/healthHutDetails/${_id_}` // 健康小屋
          break
        case '4001':
          _path_ = `/communityFacilities/assistantDeviceSiteDetails/${_id_}` // 养老辅具展示点
          break
        case '2020':
          _path_ = `/communityFacilities/healthService/${_id_}` // 养老辅具展示点
          break
        case '2021':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 村民互助点
          break
        case '2022':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 社区养老服务站
          break
        case '2023':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 养老服务指导中心
          break
        case '2024':
          _path_ = `/communityFacilities/communityForOldServe/${_id_}` // 社区为老服务站
          break
        case '2010_chizhou':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 池州日间照护机构
          break
        case '2011_chizhou':
          _path_ = `/communityFacilities/chiZhouService/${_id_}` // 池州综合为老服务中心
          break
      }
      this.$router.push({
        path: _path_,
        query: { 'id': _id_, 'modelType': 'edit', 'instituType': _orgType_, '_title': `编辑${row.orgName}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      console.log('row',row)
      const _orgType_ = row.orgType
      this.$confirm('确定要删除【' + row.orgName + '】的信息吗？一旦被删除，将无法查看【' + row.orgName + '】的信息', '删除社区设施信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (_orgType_) {
          case '2010':// 日间照护机构
          case '2011':// 综合为老服务中心
          case '2012':// 邻里汇
          case '2017':// 社区养老组织
          case '2014':// 助餐点,
          case '2015':// 社区长者食堂
          case '2020':
            removeTableRowData(row.orgId).then(response => {
              if (response.code === 0 || response.code === '0') {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.form.pageNum = 1
                this.getData(this.form)
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('操作失败！')
            })
            break
          case '2021': //村民互助点
          case '2022': //社区养老服务站
          case '2023': //养老服务指导中心
          case '2010_chizhou': //池州日间照护机构
          case '2011_chizhou': //池州综合为老服务中心
            removeTableRowData_chizhou(row.orgId).then(response => {
                if (response.code === 0 || response.code === '0') {
                  this.$message({
                    type: 'success',
                    message: response.msg
                  })
                  this.form.pageNum = 1
                  this.getData(this.form)
                } else {
                  this.$message.error(response.msg)
                }
              }).catch(() => {
                this.$message.error('操作失败！')
              })
            break
          case '2013':// 老年活动室
          case '2024': //社区为老服务站
          case '4001':// 养老辅具展示点
            removeTableRowData_playRoom(row.orgId).then(response => {
              if (response.code === 0 || response.code === '0') {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.form.pageNum = 1
                this.getData(this.form)
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('操作失败！')
            })
            break
          case '2016':// 护理站
          case '2019':// 护理院
          case '2018':// 健康小屋
            removeTableRowData_healthy(row.orgId).then(response => {
              if (response.code === 0 || response.code === '0') {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.form.pageNum = 1
                this.getData(this.form)
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('操作失败！')
            })
            break
          // case '2018':// 养老辅具展示点
            // TODO
            break
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 跳转到机构详情页
    jumpFacilitiesDetails(_orgType_) {
      let _path_ = ''
      const _orgName_ = facilityTypeFun(_orgType_)
      switch (_orgType_) {
        case '2010':
          _path_ = `/communityFacilities/dayCareFacilitiesDetails/0` // 日间照护机构
          break
        case '2011':
          _path_ = `/communityFacilities/comprehensiveDetails/0` // 综合为老服务中心,
          break
        case '2012':
          _path_ = `/communityFacilities/comprehensiveDetails/0` // 邻里汇
          break
        case '2013':
          _path_ = `/communityFacilities/elderlyActivityRoomDetails/0` // 老年活动室
          break
        case '2014':
          _path_ = `/communityFacilities/helpMealsDetails/0` // 助餐点,
          break
        case '2015':
          _path_ = `/communityFacilities/helpMealsDetails/0` // 社区长者食堂
          break
        case '2016':
          _path_ = `/communityFacilities/nursingStationDetails/0` // 护理站
          break
        case '2019':
          _path_ = `/communityFacilities/nursingStationDetails/0` // 护理院
          break
        case '2017':
          _path_ = `/communityFacilities/communityPensionOrganizationDetails/0` // 社区养老组织
          break
        case '2018':
          _path_ = `/communityFacilities/healthHutDetails/0` // 健康小屋
          break
        case '4001':
          _path_ = `/communityFacilities/assistantDeviceSiteDetails/0` // 养老辅具展示点
          break
        case '2020':
          _path_ = `/communityFacilities/healthService/0` // 社区卫生服务设施
          break
        case '2021':
          _path_ = `/communityFacilities/chiZhouService/0` // 村民互助点
          break
        case '2022':
          _path_ = `/communityFacilities/chiZhouService/0` // 社区养老服务站
          break
        case '2023':
          _path_ = `/communityFacilities/chiZhouService/0` // 养老服务指导中心
          break
        case '2024':
          _path_ = `/communityFacilities/communityForOldServe/0` // 社区为老服务站
          break
        case '2010_chizhou':
          _path_ = `/communityFacilities/chiZhouService/0` // 池州日间照护机构
          break
        case '2011_chizhou':
          _path_ = `/communityFacilities/chiZhouService/0` // 池州综合为老服务中心
          break
      }
      this.$router.push({
        path: _path_,
        query: { 'modelType': 'add', 'instituType': _orgType_, '_title': `新增${_orgName_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },

    importFun() {
      this.dialogVisibleImport = true
    },
    // 导出功能
    exportFun() {
      let confirmTitle = ''
      if (this.exportData.areaCode.length === 0 && this.exportData.keyword === '' && this.exportData.orgType === '') {
        confirmTitle = '确定要导出全部的社区设施信息吗？'
      } else {
        confirmTitle = '确定要导出筛选的的社区设施信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出社区设施信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          // const data = qs.stringify(this.exportData)
          const arr = []
          if (this.areaCode && this.areaCode.length !== 0) {
            arr.push(this.areaCode[this.areaCode.length - 1])
          }
          this.form.areaCode = arr // 所选区域赋值
          const data = _.cloneDeep(this.form)
          data.orgType = data.orgType.join(',')
          data.areaCode = typeof (data.areaCode) === 'object' ? data.areaCode.join('') : data.areaCode
          getCommunityFacilitiesExport(data).then(response => {
            if (response instanceof ArrayBuffer) {
              const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(datas, '社区设施列表.xlsx')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出社区设施信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch((error) => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出社区设施信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出社区设施信息操作失败！')
            }
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
      this.dialogVisibleImport = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.instituDivs {
		float: left;
		width:180px;
		text-align: center;
		cursor: pointer;
		transition: all 0.5s;
		margin: 0 10px 40px;
	}

	.instituDivs .iconfont {
		font-size: 26px;
		display: block;
		color: #fff;
    text-align: center;
	}
  .instituDivs div{
    margin:0 auto;
    border-radius: 50%;
    background:#28bf1e;
    width:64px;
    height:64px;
    text-align: center;
    line-height: 64px;
    margin-bottom:12px;
  }
	.instituDivs .iconfont2{
		background:#ff7272;
	}
	.instituDivs .iconfont3{
		background:#2f7dea;
	}
	.instituDivs .iconfont4{
		background:#14b9c2;
	}
	.instituDivs .iconfont5{
		background:#55b5f9;
	}
	.instituDivs .iconfont6{
		background:#eecc28;
	}
	.instituDivs .iconfont7{
		background:#fe7c35;
	}
	.instituDivs .iconfont8{
		background:#f35fa1;
	}
	.instituDivs .iconfont9{
		background:#d16cee;
	}
  .instituDivs  .iconlnhds,.iconhlz,.iconsqfw,.iconsqylzz,.iconjkxw{
    margin-left:5px;
  }

	.instituDivs .text {
		font-size: 16px;
		color: #32415a;
    margin-bottom:50px;;
	}
	.instituDivMore .text {
		line-height: 26px;
		margin-top: 38px;
		color: #666666;
		display: inline-block;
	}
</style>

