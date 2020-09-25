<template>
  <el-container class="adaptive-evaluation-container">
    <el-main>
      <topic-list-render
        v-for="(data, dindex) in dataList"
        :key="dindex + data.project"
        :title="data.project"
      >
        <template v-slot:topic-list>
          <div v-for="(item, index) in data.lists" :key="index" class="topic-list-item">
            <div class="edit-list-item__title">
              <h6>{{ `${index + 1}、${item.subjectTitle}` }}</h6>
              <div class="edit-list-item__operate" :class="data.showAdd ? 'disabled': ''">
                <i class="el-icon-edit-outline" @click="handleEditClick(item, data.showAdd)" />
                <i class="el-icon-delete" @click="handelDelClick(item, data.showAdd)" />
                <!-- <i class="el-icon-document-copy" @click="handleRelClick(item, data.showAdd)" /> -->
              </div>
            </div>
            <p v-show="item.subjectRemarks">{{ item.subjectRemarks }}</p>
            <ul v-if="item.options">
              <li v-for="(value, key) in item.options" :key="index + key" style="margin-bottom:20px">
                <div>
                  <span>{{ fmtOptionName(key + 1) }}、</span>
                  <span>{{ value.optionDes }}</span>
                  <div style="text-indent:25px;color:#999;margin-top:5px">{{ value.careAdvice }}</div>
                </div>
                <div v-if="value.optionValue">{{ value.optionValue }} 分</div>
              </li>
            </ul>
          </div>
          <el-button v-show="!data.showAdd" type="primary" class="base-btn add-topic--button" @click="handleAddTopic(data, dindex)">添加题目</el-button>
          <topic-operate
            :vis-operate="data.showAdd"
            :prop-index="dindex"
            operate-type="add"
            :topic-form="addFormFields"
            @listenCancelTrigger="handleTriggerCancel(arguments)"
            @listenConfirmTrigger="handleTriggerConfirm(arguments)"
          />
        </template>
      </topic-list-render>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="showEditTopic"
        direction="rtl"
        class="questionnaire-drawer-container"
        size="40%"
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
              <div v-for="(item, index) in care.options" :key="cindex + index" class="topic-list-item care-pro-rel--edit">
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
import TopicListRender from '../components/TopicListRender.vue'
import TopicOperate from '../components/TopicOperate.vue'
import { addQuestionnaire, editQuestionnaire, delQuestionnaire, getRelativePro, editRelativePro } from '@/api/evaluationManagement/questionnaire.js'
import mixins from '../mixins/index.js'
// import { DEFAULT_CATE } from '../config/index.js'
import _ from 'lodash'
export default {
  components: {
    TopicListRender,
    TopicOperate
  },
  mixins: [mixins],
  data() {
    return {
      mainType: '适应性评估',
      dataList: undefined,
      showEditTopic: false,
      editTopicForm: undefined,
      addFormFields: undefined,
      drawerTitle: '',
      boxStyle: {
        'width': '100%',
        'padding': '20px 20px 10px 20px',
        'margin': '10px auto'
      },
      dialogVisible: false,
      careProInfo: undefined,
      relProjectInfo: '',
      relProData: undefined
    }
  },
  created() {
    this.getTarQuestionnaireList()
  },
  methods: {
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
      const resData = [
        {
          project: '入住适应',
          showAdd: false,
          lists: [...tarInfo]
        }
      ]
      this.dataList = resData
      this.careProInfo = careProInfo.map(item => {
        if (item.options) {
          item.options.forEach(opt => {
            opt.isChecked = false
          })
        }
        return item
      })
    },
    // 获取关联照护项目,设定默认选中
    async getRelativeProInfo() {
      if (!this.relProjectInfo) return
      const res = await getRelativePro(this.relProjectInfo.questionnaireId)
      const { code, data } = res
      if (code === 0) {
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
      this.$set(this.dataList[index], 'showAdd', true)
      this.dataList.forEach((item, key) => {
        if (key !== index) {
          item.showAdd = false
        }
      })
    },
    handleEditClick(value, showAdd) {
      if (showAdd) return
      this.showEditTopic = !this.showEditTopic
      this.drawerTitle = value.project
      // -- 补充缺失选项值
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
    // 关联照护-点击处理
    handleRelClick(value, showAdd) {
      if (showAdd) return
      this.dialogVisible = true
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
            this.getTarQuestionnaireList()
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
        this.$set(this.dataList[args[1]], 'showAdd', false)
      }
    },
    handleTriggerConfirm(args) {
      if (args[0] === 'add') {
        addQuestionnaire(args[2]).then(res => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '新增成功'
          })
          if (res.code === 0) {
            this.getTarQuestionnaireList()
            this.$set(this.dataList[args[1]], 'showAdd', false)
          }
        }).catch(err => {
          console.log(err)
        })
      }
      if (args[0] === 'edit') {
        editQuestionnaire(args[2]).then(res => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '更新成功'
          })
          this.showEditTopic = false
          if (res.code === 0) {
            this.getTarQuestionnaireList()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // -- 处理关联项目的提交
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
.adaptive-evaluation-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding: 0px;
  border: 1px solid #e1e1e1;
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
