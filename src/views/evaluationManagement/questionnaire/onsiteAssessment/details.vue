<template>
  <el-container class="questionnaire-detail-container">
    <el-main v-if="curTabData">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane v-for="(nav, nkey) in navItems" :key="nkey + nav.value" :label="nav.label" :name="nav.label">
          <topic-list-render
            v-for="(dvalue, dindex) in curTabData"
            :key="dindex + dvalue.project"
            :title="dvalue.project"
          >
            <template v-slot:topic-list>
              <draggable
                class="edit-list-group"
                tag="ul"
                :list="dvalue.lists"
                v-bind="dragOptions"
                @start="isDragging = true"
                @end="dragover"
              >
                <transition-group type="transition" name="flip-list">
                  <li
                    v-for="(item, index) in dvalue.lists"
                    :key="dindex + index"
                    class="edit-list-group__item edit-cursor__move"
                  >
                    <div class="edit-list-item__title">
                      <h6>{{ `${index + 1}、${item.subjectTitle}` }}</h6>
                      <div class="edit-list-item__operate" :class="dvalue.showAdd ? 'disabled': ''">
                        <i class="el-icon-edit-outline" @click="handleEditClick(item, dvalue.showAdd)" />
                        <i class="el-icon-delete" @click="handelDelClick(item, dvalue.showAdd)" />
                        <!-- <i class="el-icon-document-copy" @click="handleRelClick(item, dvalue.showAdd)" /> -->
                      </div>
                    </div>
                    <p v-show="item.subjectRemarks">{{ item.subjectRemarks }}</p>
                    <ol v-if="item.options">
                      <li v-for="(value, okey) in item.options" :key="index + okey" style="margin-bottom:20px">
                        <div style="width:96%">
                          <span>{{ fmtOptionName(okey + 1) }}、</span>
                          <span>{{ value.optionDes }}</span>
                          <div style="margin-top:5px;padding-left:25px">{{ value.careAdvice }}</div>
                        </div>
                        <div style="flex:1">{{ value.optionValue }} 分</div>
                      </li>
                    </ol>
                  </li>
                </transition-group>
              </draggable>
              <el-button v-show="!dvalue.showAdd" type="primary" class="base-btn add-topic--button" @click="handleAddTopic(dvalue, dindex)">添加题目</el-button>
              <topic-operate
                :vis-operate="dvalue.showAdd"
                operate-type="add"
                :prop-index="dindex"
                :topic-form="addFormFields"
                @listenCancelTrigger="handleTriggerCancel(arguments)"
                @listenConfirmTrigger="handleTriggerConfirm(arguments)"
              />
            </template>
          </topic-list-render>
        </el-tab-pane>
      </el-tabs>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="showEditTopic"
        direction="rtl"
        class="questionnaire-drawer-container"
        size="55%"
      >
        <topic-operate
          :box-style="boxStyle"
          operate-type="edit"
          :topic-form="editTopicForm"
          :vis-operate="true"
          @listenCancelTrigger="handleTriggerCancel(arguments)"
          @listenConfirmTrigger="handleTriggerConfirm(arguments)"
        />
      </el-drawer>
      <el-dialog title="关联照护项目" :visible.sync="dialogVisible" class="rel-dialog-container">
        <el-main>
          <topic-list-render
            v-for="(care, cindex) in relProData"
            :key="cindex + care.project"
            :title="care.project"
          >
            <template v-slot:topic-list>
              <div v-for="(item, index) in care.options" :key="index + item.id" class="topic-list-item care-pro-rel--edit">
                <div class="care-pro-rel">
                  <el-checkbox v-model="item.isChecked">{{ item.optionDes }}</el-checkbox>
                </div>
                <p v-if="item.remark" class="not-select-option">{{ item.remark }}</p>
              </div>
            </template>
          </topic-list-render>
        </el-main>
        <el-footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" class="base-btn" @click="onDialogSubmit">确定</el-button>
        </el-footer>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import _ from 'lodash'
import TopicListRender from '../components/TopicListRender.vue'
import draggable from 'vuedraggable'
import TopicOperate from '../components/TopicOperate.vue'
import { addQuestionnaire, editQuestionnaire, delQuestionnaire, getRelativePro, editRelativePro } from '@/api/evaluationManagement/questionnaire.js'
import mixins from '../mixins/index.js'
import { ONSITE_ASSESSMENT_CONFIG } from '../config/index.js'
export default {
  name: 'OnsiteAssessmentDetails',
  components: {
    draggable,
    TopicListRender,
    TopicOperate
  },
  mixins: [mixins],
  data() {
    return {
      showTopic: true,
      showEditTopic: false,
      boxStyle: {
        'width': '100%',
        'padding': '20px 20px 10px 20px',
        'margin': '10px auto'
      },
      editTopicForm: undefined,
      addFormFields: undefined,
      drawerTitle: '',
      mainType: '现场评估',
      navItems: [
        { label: '生活自理能力', value: 'life' },
        { label: '认知能力', value: 'cognitive' },
        { label: '情绪行为', value: 'emotional' },
        { label: '视觉', value: 'visiual' }
      ],
      activeName: '生活自理能力',
      onsiteData: undefined,
      curTabData: undefined,
      careProInfo: undefined,
      dialogVisible: false,
      relProjectInfo: '',
      relProData: undefined
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  created() {
    this.getTarQuestionnaireList()
  },
  methods: {
    async dragover(event) {
      // 拖拽后修改相应的数据，并且提交
      // {to, from, item, clone, oldIndex, newIndex} dvalue.lists
      this.curTabData.forEach(item => {
        item.lists.forEach(v => {
          v.project = item.project
        })
      })
      this.curTabData.forEach(item => {
        item.lists.forEach((v, i) => {
          v.orderNum = i + 1
          editQuestionnaire(v).then(res => {})
        })
      })
    },
    async getTarQuestionnaireList() {
      const allInfo = await this.getTargetTypeQuestionnaireInfo()
      const tarInfo = []
      const careProInfo = []
      allInfo.forEach(item => {
        if (item.questionnaireType === this.mainType) {
          tarInfo.push(item)
        }
        if (item.questionnaireType === '照护项目') {
          careProInfo.push(item)
        }
      })
      this.onsiteData = tarInfo
      this.getCurTabData()
      this.careProInfo = careProInfo.map(item => {
        if (item.options) {
          item.options.forEach(opt => { opt.isChecked = false })
        }
        return item
      })
    },
    // -- 获取关联照护项目
    async getRelativeProInfo() {
      if (!this.relProjectInfo) return
      const res = await getRelativePro(this.relProjectInfo.questionnaireId)
      const { code, data } = res
      if (code === 0) {
        this.relProData = undefined
        const copyCareProInfo = _.cloneDeep(this.careProInfo)
        this.relProData = copyCareProInfo.map(item => {
          data.forEach(dvalue => {
            if (item.options) {
              item.options.forEach(opt => {
                if (opt.id === dvalue.questionnaireOptionId) {
                  opt.isChecked = true
                }
              })
            }
          })
          return item
        })
        this.dialogVisible = true
      }
    },
    getCurTabData() {
      const tabVal = this.navItems.filter(item => item.label === this.activeName)[0]['value']
      const resData = ONSITE_ASSESSMENT_CONFIG[tabVal].map(item => { return { project: item, showAdd: false, lists: [] } })
      const filterData = this.onsiteData.filter(item => item.projectType === this.activeName)
      if (filterData.length === 0) return
      filterData.forEach(item => {
        const _index = resData.findIndex(pro => pro.project === item.project)
        if (_index !== -1) {
          const orderVal = resData[_index].lists.length
          item['order'] = orderVal + 1
          resData[_index].lists.push(item)
        }
      })
      this.curTabData = resData
    },
    handleTabClick() {
      this.getCurTabData()
    },
    handleAddTopic(value, index) {
      if (value.lists.length >= 100) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '每个二级分类下的题目数量不超过100个'
        })
        return
      }
      this.addFormFields = {
        'project': value.project,
        'projectType': this.activeName,
        'questionnaireType': this.mainType,
        'subjectRemarks': '',
        'subjectTitle': '',
        'isDel': '0',
        'multipleChoice': '0',
        'options': [
          { 'optionDes': '', 'optionValue': '' },
          { 'optionDes': '', 'optionValue': '' },
          { 'optionDes': '', 'optionValue': '' },
          { 'optionDes': '', 'optionValue': '' }
        ]
      }
      this.$set(this.curTabData[index], 'showAdd', true)
      this.curTabData.forEach((item, key) => {
        if (key !== index) {
          item.showAdd = false
        }
      })
    },
    handleEditClick(value, showAdd) {
      if (showAdd) return
      this.showEditTopic = !this.showEditTopic
      this.drawerTitle = value.project
      if (value.options && value.options.length < 4) {
        const addtchOpts = []
        const attchLen = 4 - value.options.length
        for (let i = 0; i < attchLen; i++) {
          addtchOpts.push({ 'optionDes': '', 'optionValue': '', 'questionnaireId': value.options[0]['questionnaireId'] })
        }
        value.options = [...value.options, ...addtchOpts]
      }
      this.editTopicForm = value
    },
    handleRelClick(value, showAdd) {
      if (showAdd) return
      this.relProjectInfo = value
      this.getRelativeProInfo()
    },
    handelDelClick(item, showAdd) {
      if (showAdd) return
      this.$confirm(`确定要删除题目【${item.subjectTitle}】吗？ 一旦被删除，将无法显示和操作。`, '删除题目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delQuestionnaire(item.questionnaireId).then(res => {
            this.$message({
              showClose: true,
              type: 'success',
              message: '删除成功'
            })
            if (res.code === 0) {
              this.getTarQuestionnaireList()
            }
          }).catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleTriggerCancel(args) {
      if (args[0] === 'edit') {
        this.showEditTopic = args[2]
      }
      if (args[0] === 'add') {
        this.$set(this.curTabData[args[1]], 'showAdd', false)
      }
    },
    handleTriggerConfirm(args) {
      if (args[0] === 'add') {
        const arr = []
        args[2].options.forEach((item, index) => {
          if (item.optionDes !== '') {
            arr.push(item)
          }
        })
        args[2].options = arr
        addQuestionnaire(args[2]).then(res => {
          if (res.code === 0) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '新增成功'
            })
            this.getTarQuestionnaireList()
            this.$set(this.curTabData[args[1]], 'showAdd', false)
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '新增问卷失败'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
      if (args[0] === 'edit') {
        editQuestionnaire(args[2]).then(res => {
          this.showEditTopic = false
          if (res.code === 0) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '更新成功'
            })
            this.getTarQuestionnaireList()
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '修改问卷失败'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onDialogSubmit() {
      const fmtData = []
      this.relProData.map(item => {
        item.options.forEach(opt => {
          if (opt.isChecked) {
            fmtData.push({
              'questionnaireId': this.relProjectInfo.questionnaireId,
              'subjectTitle': item.project,
              'questionProjectId': this.relProjectInfo.questionnaireId,
              'projectName': this.relProjectInfo.subjectTitle,
              'questionnaireOptionId': opt.id,
              'optionName': opt.optionDes
            })
          }
        })
      })
      editRelativePro(fmtData).then(res => {
        if (res.code === 0) {
          this.$message({
            showClose: true,
            type: 'success',
            message: '编辑关联项目成功'
          })
          this.dialogVisible = false
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../components/styles/list.scss";
.questionnaire-detail-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding:0;
  border: 1px solid #e1e1e1;
  & ::v-deep .el-main{
    padding-top:0px!important;
  }
  & ::v-deep .el-dialog__title{
    font-size:20px;
  }
}
.rel-dialog-container{
  & ::v-deep .el-dialog__body{
    position: relative;
    padding: 20px 0px 0 0px!important;
    .el-footer{
      position: sticky;
      width: 100%;
      text-align: right;
      height:60px;
      line-height: 60px;
      bottom:0px;
      left:-20px;
      z-index:999;
      background-color:#fff;
      box-shadow: 0px -1px 4px 0 rgba(0,0,0,0.1);
      padding-top:0!important;
      padding-right:20px;
    }
  }
}
</style>
