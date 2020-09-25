<!--政策资讯信息-->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="政策类型">
          <el-select
            v-model="tags"
            placeholder="请选择政策类型"
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
        <el-form-item label="审核状态">
          <el-select
            v-model="form.isPermit"
            placeholder="审核状态"
            clearable
            style="width:100%;"
          >
            <el-option
              v-for="item in isPermitOptions"
              v-if="isPermitOptions.length !== 0"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.title"
            clearable
            placeholder="请输入政策标题查询"
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
            <el-table-column label="标题" prop="title" min-width="300">
              <template slot-scope="{row,$index}">
                <div v-html="row.highlightTitle || row.title" />
              </template>
            </el-table-column>
            <el-table-column label="一级分类" prop="classify1Name" min-width="150" />
            <el-table-column label="二级分类" prop="classify2Name" min-width="150" />
            <el-table-column label="发布日期" prop="pubDate" min-width="150" />
            <el-table-column label="审核状态" prop="isPermit" min-width="150" align="center">
              <template slot-scope="{row,$index}">
                <div v-if="row.isPermit === 'audit_failed'">
                  <span class="table-btn auditClass failedClass" @click="auditFailedHandel(row)">{{ row.isPermitName }}</span>
                </div>
                <div v-else>
                  <span class="table-btn auditClass">{{ row.isPermitName }}</span>
                </div>
              </template>
            </el-table-column>
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
            @pagination="getData(form)"
          />
        </el-main>

      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import {
  getServiceData,
  removeTableRowData,
  getPolicyTree
} from '@/api/policyInfoConfig/policyInformation'
import { limitTextEllipsis, keywordsHighlight } from '@/utils/index'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { getMessageData } from '@/api/systemConfig/user'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'message'
    ])
  },
  data() {
    return {
      isPermitOptions: [], // 审核状态
      // 机构类型
      org_typeOptions: [],
      // 查询表单
      form: {
        isPermit: '', // 政策状态
        title: '', // 关键字查询
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      options: []
    }
  },
  mounted() {
    this.idEdit = false
    this.getSelect()
    this.getElderTags()
    this.getData(this.form)
  },
  methods: {
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'audit_status'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 审核状态
                case 'audit_status':
                  this.isPermitOptions = response.data[k]
                  break
              }
            }
          } else {
            this.$message.error('数据字典接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error('数据字典接口请求失败！')
          reject()
        })
      })
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 老人标签下拉数据初始化获取
    getElderTags() {
      getPolicyTree().then(res => {
        if (res) {
          this.options = res
        }
      }).catch(() => {
        this.$message.error('获取老人标签字典失败！')
      })
    },
    // 表单查询按钮
    onSubmit() {
      // 老人标签根据不同类型分成不同数组
      const { keys } = Object // 初始化keys方法 取键值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      this.tags.forEach((item, index) => {
        for (const key of keys(newArr)) {
          if (keys(newArr).indexOf(item.split(':')[0]) !== -1) {
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
      searchArr = newArr
      this.form.pageNum = 1
      this.getData(searchArr)
    },
    // 获取表格数据
    getData(form) {
      getServiceData(form).then(res => {
        if (res.rows) {
          this.tableData = res.rows
          if (this.form.title) {
            res.rows.forEach(item => {
              item.highlightTitle = keywordsHighlight(item.title, this.form.title)
            })
          }
          this.total = res.total
          this.realTimeUpdateMessageData()
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.tags = []
      this.form = {
        isPermit: '', // 政策状态
        title: '', // 关键字查询
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/policyInformation/details/0`,
        query: { 'modelType': 'add', '_title': `新增政策资讯信息`, 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.title, 10)
      this.$router.push({
        path: `/policyInformation/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'look', '_title': `查看${_title_}`, 'editAuthority': this.$route.meta.id, 'hasEdit': row.hasEdit } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      const _title_ = limitTextEllipsis(row.title, 10)
      this.$router.push({
        path: `/policyInformation/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}`, 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const _title_ = limitTextEllipsis(row.title, 10)
      this.$confirm('确定要删除【' + _title_ + '】政策资讯吗？一旦被删除，将无法查看相关信息。', '删除政策资讯', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
				    closeOnClickModal: false
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.form.pageNum = 1
            this.onSubmit(this.form)
            this.realTimeUpdateMessageData()
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('操作失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 审核未通过查看信息弹框
    auditFailedHandel(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '政策资讯审核结果',
        message: h('div', { style: 'font-size: 16px;padding:0 10px;' }, [
          h('p', { style: 'height: 30px;line-height: 30px;' }, [
            h('span', { style: 'color: #666' }, '审核结果：'),
            h('span', { style: 'color: #333;padding-left:8px;' }, row.isPermitName)
          ]),
          h('p', { style: 'line-height: 30px;overflow:hidden;' }, [
            h('span', { style: 'color: #666;float:left;' }, '审核建议：'),
            h('span', { style: 'padding: 3px 0;line-height: 24px;color: #333;float:right;width:340px;max-height:120px;overflow:auto;' }, row.rejectReason)
          ])
        ]),
        showCancelButton: false,
        showConfirmButton: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(() => {}).catch(() => {})
    },
    // 实时更新消息面板的数据
    realTimeUpdateMessageData() {
      getMessageData().then(response => {
        if (response) {
          this.$store.commit('message/ADD_MESSAGE_LIST', response)
        } else {
          this.$message.error('消息接口请求失败！')
        }
      }).catch(() => {
        this.$message.error('消息同步接口请求失败！')
      })
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.instituWrap {
		padding: 20px 20px 40px 20px;
	}

	.instituDiv {
		float: left;
		width: 140px;
		height: 140px;
		text-align: center;
		cursor: pointer;
		background-color: #DAE9F5;
		transition: all 0.5s;
	}

	.instituDiv .iconfont {
		font-size: 100px;
		display: block;
		color: #147FD9;
	}

	.instituDiv .text {
		font-size: 16px;
		color: #147FD9;
	}

	.instituDiv:first-child {
		margin-right: 40px;
	}

	.instituDiv:hover {
		background-color: #bfdcf3;
	}
	.auditClass{
		background-color: #EAF0FB;
		color: #34435C;
		padding: 10px;
	}
	.failedClass{
		color: #BF0000;
	}
</style>

