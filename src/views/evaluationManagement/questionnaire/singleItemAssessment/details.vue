<template>
  <el-container class="single-item-container">
    <el-main>
      <topic-list-render
        v-for="(data, dindex) in dataList"
        :key="dindex"
        :title="data.project"
      >
        <template v-slot:topic-list>
          <div v-for="(item, index) in data.lists" :key="index" class="topic-list-item">
            <div class="edit-list-item__title">
              <h6>{{ item.subjectTitle }}</h6>
              <div class="edit-list-item__operate" :class="visOpTopicAdd ? 'disabled': ''">
                <i class="el-icon-edit-outline" @click="handleEditClick(item)" />
                <i class="el-icon-delete" @click="handelDelClick(item)" />
              </div>
            </div>
            <p v-if="item.subjectRemarks" class="not-select-option">{{ item.subjectRemarks }}</p>
          </div>
          <el-button v-show="!visOpTopicAdd" type="primary" class="base-btn add-topic--button" @click="handleAddTopic">添加事项</el-button>
          <topic-render-form
            :form-fields="addFormFields"
            :form-rules="formConfig.formRules"
            :form-items="formConfig.formItems"
            :vis-operate="visOpTopicAdd"
            operate-type="add"
            :box-style="{
              'width': '100%',
              'padding': '20px 20px 10px 20px',
              'margin': '30px auto 10px auto',
              'border': '1px solid #e5e5e5',
              'border-radius': '2px',
              'background-color': '#F6F9F7'
            }"
            @listenCancelTrigger="handleTriggerCancel(arguments)"
            @listenConfirmTrigger="handleTriggerConfirm(arguments)"
          />
          <el-drawer
            :title="data.title"
            :visible.sync="showEditTopic"
            direction="rtl"
            size="40%"
          >
            <topic-render-form
              :box-style="{
                'width': '100%',
                'padding': '20px 20px 10px 20px',
                'margin': '30px auto 10px auto',
              }"
              :form-fields="editTopicForm"
              :form-rules="formConfig.formRules"
              :form-items="formConfig.formItems"
              operate-type="edit"
              :vis-operate="true"
              @listenCancelTrigger="handleTriggerCancel(arguments)"
              @listenConfirmTrigger="handleTriggerConfirm(arguments)"
            />
          </el-drawer>
        </template>
      </topic-list-render>
    </el-main>
  </el-container>
</template>
<script>
import TopicListRender from '../components/TopicListRender.vue'
import TopicRenderForm from '../components/TopicRenderForm.vue'
import { addQuestionnaire, editQuestionnaire, delQuestionnaire } from '@/api/evaluationManagement/questionnaire.js'
import mixins from '../mixins/index.js'
const FORM_CONFIG = {
  'formItems': [
    {
      type: 'text',
      prop: 'subjectTitle',
      label: '项目',
      required: true,
      existlimit: {
        maxlen: 100,
        showWordLimit: true
      }
    },
    {
      type: 'textarea',
      prop: 'subjectRemarks',
      label: '描述',
      required: false,
      existlimit: {
        maxlen: 200,
        showWordLimit: true
      },
      placeholder: ''
    }
  ],
  'formFields': {
    subjectTitle: '',
    subjectRemarks: ''
  },
  'formRules': {
    'subjectTitle': [
      { required: true, message: '请输入项目名称', trigger: 'blur' },
      { required: true, message: '请输入项目名称', trigger: 'change' },
      { max: 100, message: '长度在最多100个字', trigger: 'blur' }
    ],
    'subjectRemarks': [
      { min: 0, max: 200, message: '长度在最多200个字', trigger: 'blur' }
    ]
  }
}
export default {
  name: 'SingleItemAssessment',
  components: {
    TopicListRender,
    TopicRenderForm
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
      visOpTopicAdd: false,
      addFormFields: FORM_CONFIG.formFields,
      editTopicForm: undefined,
      formConfig: FORM_CONFIG,
      dataList: undefined,
      mainType: '单列事项评估'
    }
  },
  created() {
    this.getTarQuestionnaireList()
  },
  methods: {
    async getTarQuestionnaireList() {
      const tarInfo = await this.getTargetTypeQuestionnaireInfo(this.mainType)
      const resData = [
        {
          project: '单列事项',
          lists: [...tarInfo]
        }
      ]
      this.dataList = resData
    },
    handleAddTopic(value) {
      this.addFormFields = {
        'project': '单列事项',
        'projectType': '',
        'questionnaireType': this.mainType,
        'subjectRemarks': '',
        'subjectTitle': '',
        'isDel': '0',
        'multipleChoice': '1',
        'options': []
      }
      this.visOpTopicAdd = true
    },
    // =-- details page
    handleEditClick(value) {
      if (this.visOpTopicAdd) return
      this.showEditTopic = !this.showEditTopic
      this.editTopicForm = value
    },
    handelDelClick(item) {
      if (this.visOpTopicAdd) return
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
        this.showEditTopic = args[1]
      }
      if (args[0] === 'add') {
        this.visOpTopicAdd = args[1]
      }
    },
    handleTriggerConfirm(args) {
      this.visOpTopicAdd = false
      if (args[0] === 'add') {
        addQuestionnaire(args[2]).then(res => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '新增成功'
          })
          this.visOpTopicAdd = false
          if (res.code === 0) {
            this.getTarQuestionnaireList()
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../components/styles/list.scss";
.single-item-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding: 0px;
  border: 1px solid #e1e1e1;
}
</style>
