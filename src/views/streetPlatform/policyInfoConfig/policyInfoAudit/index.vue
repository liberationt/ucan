<!--政策资讯审核-->
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
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <div class="table-btn" style="text-align: center;" @click="handleAudit(row)">审核</div>
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

        <el-dialog v-dialogDrag title="政策资讯审核" :visible.sync="dialogVisible" class="zczx" :close-on-click-modal="false" @closed="cancelDialog">
          <el-form ref="form_audit" key="form_audit" :model="form_audit" :rules="rulesForm" class="demo-form-inline" label-width="80px">
            <el-row :gutter="0">
              <el-col :span="24" style="min-height:auto;">
                <el-form-item label="审核结果" prop="isPermit" style="margin-bottom:10px;" class="isPermitWrap">
                  <el-radio-group v-model="form_audit.isPermit">
                    <el-radio label="通过" name="examination_passed" value="examination_passed" />
                    <el-radio label="未通过" name="audit_failed" value="audit_failed" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="审核建议" style="width:100%;margin-bottom:0;">
                  <el-input v-model="form_audit.rejectReason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" show-word-limit maxlength="200" clearable resize="none" style="width: 100%" class="policyInfoAuditTextArea" />
                </el-form-item>
              </el-col>
              <!--							<el-col :span="24">-->
              <!--								<el-footer>-->
              <!--									-->
              <!--								</el-footer>-->
              <!--							</el-col>-->
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <div>
              <el-button type="warning" class="base-btn btnMarginLeft15" @click="submitDialogAudit('form_audit')">确定</el-button>
              <el-button class="cancel-btn btnMarginLeft15" @click="cancelDialog">取消</el-button>
            </div>
          </div>
        </el-dialog>

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
  pilicyInfoAudit,
  getPolicyTree
} from '@/api/policyInfoConfig/policyInformation'
import { limitTextEllipsis, keywordsHighlight } from '@/utils/index'
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
    // 审核结果
    const verifyAuditResult = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择审核结果！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      // 机构类型
      org_typeOptions: [],
      // 查询表单
      form: {
        isPermit: 'pending_review', // 审核状态
        title: '', // 关键字查询
        pageNum: pageModel.pageNum,
          			pageSize: pageModel.pageSize
      },
      // 老人标签集合
      tags: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      options: [],
      form_audit: {
        id: '',
        isPermit: '',
        rejectReason: ''// 建议
      },
      // form 表单的验证规则
      rulesForm: {
        // 审核结果（弹框）
        isPermit: [
          { required: true, trigger: 'change', validator: verifyAuditResult }
        ]
      }
    }
  },
  mounted() {
    this.idEdit = false
    this.getElderTags()
    this.getData(this.form)
  },
  methods: {
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
        isPermit: 'pending_review', // 审核状态
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
        path: `/policyInfoAudit/details/0`,
        query: { 'modelType': 'add', '_title': `新增政策资讯信息` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.title, 10)
      this.$router.push({
        path: `/policyInfoAudit/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'look', '_title': `查看${_title_}`, 'editAuthority': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 审核
    handleAudit(row) {
      this.dialogVisible = true
      this.form_audit.id = row.id
    },
    // 提交弹框
    submitDialogAudit(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          const params = this.form_audit
          if (params.isPermit === '未通过') {
            params.isPermit = 'audit_failed'
          } else if (params.isPermit === '通过') {
            params.isPermit = 'examination_passed'
          }

          pilicyInfoAudit(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '提交政策资讯审核成功!'
              })
              // 关闭弹框
              this.cancelDialog()
              this.getData(this.form)
              this.realTimeUpdateMessageData()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('提交政策资讯审核失败!')
          })
        } else {
          /* this.$message.error({
							message: '审核结果不能为空，请选择！'
						});*/
          return false
        }
      })
    },
    // 关闭弹框
    cancelDialog() {
      this.dialogVisible = false
      this.form_audit.id = ''
      this.form_audit.isPermit = ''
      this.form_audit.rejectReason = ''// 建议
      this.$refs['form_audit'].clearValidate()
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
</style>
<style>
	.policyInfoAuditTextArea.el-textarea .el-input__count{
		bottom: 0 !important;
		height: 16px;
		line-height: 16px;
		background: transparent;
	}
	.isPermitWrap .el-form-item__error{
		top: 26px;
	}
  .zczx > .el-dialog {
    min-width: 440px !important;
  }
</style>

