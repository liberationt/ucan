<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        :rules="isEditForm?rulesForm:null"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="isEditForm?'服务类型':'服务类型：'" prop="serviceType">
              <el-select
                v-if="isEditForm"
                v-model="form.serviceType"
                placeholder="请选择服务类型"
                clearable
                style="width:100%;"
                @keyup.enter.native="submitBtn"
              >
                <el-option
                  v-for="item in serviceOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
              <span v-else>{{ form.serviceTypeName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="isEditForm?'服务项目':'服务项目：'" prop="spName">
              <el-input
                v-if="isEditForm"
                v-model.trim="form.spName"
                clearable
                placeholder="请输入服务项目"
                @keyup.enter.native="submitBtn"
              />
              <span v-else>{{ form.spName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item :label="isEditForm?'服务内容':'服务内容：'" prop="spContent">
              <el-input
                v-if="isEditForm"
                v-model="form.spContent"
                type="textarea"
                rows="5"
                placeholder="请输入服务内容"
                maxlength="40"
                show-word-limit
              />
              <span v-else>{{ form.spContent }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="isEditForm?'时长分钟':'时长分钟：'" prop="timeLen">
              <span v-if="isEditForm" style="display:flex">
                <el-input
                  v-model.trim="form.timeLen"
                  placeholder="请输入整数"
                  clearable
                  style="width:100%;"
                  oninput="if(value.length>10)value=value.slice(0,10)"
                  @keyup.enter.native="submitBtn"
                />&nbsp;&nbsp;&nbsp;分
              </span>
              <span v-else>{{ form.timeLen }}分钟</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="isEditForm?'服务单价':'服务单价：'" prop="spPrice">
              <span v-if="isEditForm" style="display:flex">
                <el-input
                  v-model.trim="form.spPrice"
                  placeholder="请输入整数或二位小数"
                  oninput="if(value.length>10)value=value.slice(0,10)"
                  clearable
                  style="width:100%;"
                  @keyup.enter.native="submitBtn"
                />&nbsp;&nbsp;&nbsp;元
              </span>
              <span v-else>{{ form.spPrice }}元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="isEditForm?'每天次数':'每天次数：'" prop="dayCount">
              <span v-if="isEditForm" style="display:flex">
                <el-input
                  v-model.trim="form.dayCount"
                  placeholder="请输入整数"
                  clearable
                  style="width:100%;"
                  oninput="if(value.length>10)value=value.slice(0,10)"
                  @keyup.enter.native="submitBtn"
                />&nbsp;&nbsp;&nbsp;次
              </span>
              <span v-else>{{ form.dayCount }}次</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
            <el-form-item :label="isEditForm?'服务状态':'服务状态：'" prop="serviceStatus">
              <el-switch
                v-if="isEditForm"
                v-model="form.serviceStatus"
                class="switchStyle"
                active-text="启用"
                inactive-text="禁用"
                active-value="1"
                inactive-value="0"
                @click.native="changeSwitch(form.serviceStatus)"
              />
              <span v-else>{{ form.serviceStatus==='1'?'启用':'禁用' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-footer>
        <div v-if="isEditForm">
          <el-button type="warning" class="base-btn" @click="submitBtn">确定</el-button>
          <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
        </div>
        <div v-else>
          <el-button v-if="editAuthority&&data.accountType==='3'&& data.assistiveRentType!=null" type="warning" class="base-btn" @click="handleEdit">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
      <div class="tip">
        <div>温馨提示</div>
        <div class="tipBorder">
          <p>1、时长/金额/次数如果没有，就填写0，不能为空。</p>
          <p>2、已创建项目计划的服务项目，不能删除。</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { saveProject, getProjectDetails } from '@/api/serverManagement/projectManagement'
import { allSelectdictionaryData } from '@/api/common'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import { recordSearch } from '@/api/inteligentDeviceConfig/record'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { validateForms, scrollToTop } from '@/utils/index'
import { getEditAuthority } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      serviceOptions: [],
      statusOptions: [],
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      modelType: '', // 查看：look  编辑：edit  新增：add
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      form: {
        id: '',
        serviceType: '',
        serviceTypeName: '',
        spName: '',
        spContent: '',
        timeLen: '',
        spPrice: '',
        dayCount: '1',
        serviceStatus: '1'
      },
      edited: '',
      rulesForm: {
        serviceType: [{ required: true, message: '服务类型不能为空！' }],
        spName: [
          { required: true, message: '服务项目不能为空！' },
          { max: 20, message: '服务项目最多20字！', trigger: 'blur' }
        ],
        spContent: [{ required: true, message: '服务内容不能为空！' }],
        timeLen: [
          { required: true, message: '时长分钟不能为空！' },
          { pattern: /^(0|\+?[1-9][0-9]*)$/, message: '请输入正确格式', trigger: 'change' }
        ],
        spPrice: [
          { required: true, message: '服务单价不能为空！' },
          { pattern: /^(0|\+?0\.\d{0,1}[1-9]|\+?[1-9][0-9]*)(\.\d{1,2})?$/, message: '请输入正确格式', trigger: 'change' }
        ],
        dayCount: [
          { required: true, message: '每天次数不能为空！' },
          { pattern: /^(0|\+?[1-9][0-9]*)$/, message: '请输入正确格式', trigger: 'change' }
        ]
      },

      // record 查询表单
      recordForm: {
        ecCode: '', // 敬老卡编号
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      editAuthority: false
    }
  },

  mounted() {
    this.modelType = this.$route.query.modelType
    const id = this.$route.params.id || ''
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      getEditAuthority(this.$route.query.menu).then(res => {
        res.forEach(item => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      })
      // 请求当前用户信息
      getProjectDetails(id)
        .then((response) => {
          if (response.code === 0) {
            if (response.data) {
              this.form = response.data
              this.edited = response.data.edited || ''
            }
          } else {
            this.$message.error(response.msg)
          }
        })
        .catch(() => {
          this.$message.error('获取服务项目失败！')
        })
    } else {
      this.isEditForm = true
      this.getData(id)
    }
  },
  methods: {
    async getData(id) {
      await this.getSelect()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      }
    },
    changeSwitch(state) {
      if (state === '0') {
        this.$confirm('禁用后，不能创建项目计划，确定禁用吗？', '禁用', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.serviceStatus = '0'
        }).catch(() => {
          this.form.serviceStatus = '1'
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
      }
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/projectManagement/serveProject/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `查看${this.form.spName}` }
      })
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getProjectDetails(id)
          .then((response) => {
            if (response.code === 0) {
              if (response.data) {
                this.form = response.data
              }
            } else {
              this.$message.error(response.msg)
            }
          })
          .catch(() => {
            this.$message.error('获取服务项目失败！')
          })
      })
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'order_set_meal_type' // 服务类型
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
            const dict = response.data
            for (const key in dict) {
              switch (key) {
                case 'order_set_meal_type':
                  this.serviceOptions = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base'].map((key) => this.$refs[key])
      validateForms(formRefs)
        .then(() => {
          const _form = _.cloneDeep(this.form)
          // 新增
          if (this.modelType === 'add') {
            saveProject(_form)
              .then((response) => {
                if (response.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '新增服务项目保存成功!'
                  })
                  // 关闭页面，跳转到列表
                  this.closeDetailsPage()
                } else {
                  this.$message.error(
                    '新增服务项目操作失败，失败原因是：' + response.msg
                  )
                }
              })
              .catch(() => {
                this.$message.error('新增服务项目操作失败!')
              })
          }
          // 编辑
          else if (this.modelType === 'edit') {
            saveProject(_form)
              .then((response) => {
                if (response.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '编辑服务项目保存成功!'
                  })
                  // 关闭页面，跳转到列表
                  this.closeDetailsPage()
                } else {
                  this.$message.error(
                    '编辑服务项目操作失败，失败原因是：' + response.msg
                  )
                }
              })
              .catch(() => {
                this.$message.error('编辑服务项目操作失败!')
              })
          }
        })
        .catch((objectList) => {
          scrollToTop()
        })
    },
    // 取消按钮
    cancelBtn() {
      this.$confirm('该页面的信息尚未保存，确定要关闭页面吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.closeDetailsPage()
        })
        .catch(() => {})
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/serverManagement/projectManagement/serveProject')
    }
  }
}
</script>

<style scoped>
@import "~@/styles/form.css";

.tableContainer {
  margin-top: 20px;
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
.tip{
  margin-top: 50px;
  color:#666
}
.tipBorder{
  margin-top: 10px;
  padding:10px 0 10px 10px;
  border:1px dashed #999;
  font-size: 14px;;
}
</style>
