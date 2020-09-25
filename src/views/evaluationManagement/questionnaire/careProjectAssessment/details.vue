<template>
  <el-container class="carepro-index-container">
    <el-main>
      <topic-list-render
        v-for="(data, dindex) in dataList"
        :key="dindex"
        :title="data.project"
      >
        <template v-slot:topic-list>
          <div v-for="(item, index) in data.lists[0].options" :key="index" class="topic-list-item care-pro">
            <div class="edit-list-item__title ">
              <h6>{{ fmtSortCode(index) }}. {{ item.optionDes }}</h6>
              <div class="edit-list-item__operate" :class="data.showAdd ? 'disabled': ''">
                <i class="el-icon-edit-outline" @click="handleEditClick(item, data.showAdd)" />
                <i class="el-icon-delete" @click="handelDelClick(item, data.showAdd)" />
              </div>
            </div>
            <p v-if="item.remark" class="not-select-option">{{ item.remark }}</p>
          </div>
          <el-button v-show="!data.showAdd" type="primary" class="base-btn add-topic--button care-pro--btn" @click="handleAddTopic(data.project, dindex)">新增事项</el-button>
          <!-- 新增事项 -->
          <topic-render-form
            ref="addFormCom"
            :form-fields="addFormFields"
            :form-rules="formConfig.formRules"
            :form-items="formConfig.formItems"
            :vis-operate="data.showAdd"
            :prop-index="dindex"
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
        </template>
      </topic-list-render>
      <el-drawer
        :title="drawerTitle"
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
    </el-main>
  </el-container>
</template>
<script>
const FORM_CONFIG = {
  'formItems': [
    {
      type: 'text',
      prop: 'optionDes',
      label: '项目',
      required: true,
      existlimit: {
        maxlen: 100,
        showWordLimit: true
      }
    },
    {
      type: 'textarea',
      prop: 'remark',
      label: '项目描述',
      required: false,
      existlimit: {
        maxlen: 200,
        showWordLimit: true
      },
      placeholder: ''
    }
  ],
  'formFields': {
    optionDes: '',
    remark: ''
  },
  'formRules': {
    'optionDes': [
      { required: true, message: '请输入项目名称', trigger: 'blur' },
      { max: 100, message: '长度在最多100个字', trigger: 'blur' }
    ],
    'remark': [
      { min: 0, max: 200, message: '长度在最多200个字', trigger: 'blur' }
    ]
  }
}
import TopicListRender from '../components/TopicListRender.vue'
import TopicRenderForm from '../components/TopicRenderForm.vue'
import { addOpinion, editOpinion, delOpinion } from '@/api/evaluationManagement/questionnaire.js'
import mixins from '../mixins/index.js'
import { DEFAULT_CATE } from '../config/index.js'
export default {
  name: 'AdaptiveEvaluation',
  components: {
    TopicListRender,
    TopicRenderForm
  },
  mixins: [mixins],
  data() {
    return {
      showEditTopic: false,
      editTopicForm: undefined,
      addFormFields: FORM_CONFIG.formFields,
      formConfig: FORM_CONFIG,
      dataList: undefined,
      mainType: '照护项目',
      drawerTitle: ''
    }
  },
  created() {
    this.getTarQuestionnaireList()
  },
  methods: {
    async getTarQuestionnaireList() {
      const tarInfo = await this.getTargetTypeQuestionnaireInfo(this.mainType)
      const resData = DEFAULT_CATE.map(item => {
        return {
          project: item,
          showAdd: false,
          lists: []
        }
      })
      tarInfo.forEach(item => {
        const _index = resData.findIndex(pro => pro.project === item.project)
        if (_index !== -1) {
          resData[_index].lists.push(item)
        }
      })
      this.dataList = resData
    },
    resetTopicAddFalse(tarIndex) {
      this.dataList.forEach((item, index) => {
        if (tarIndex !== index) {
          item.showAdd = false
        }
      })
    },
    handleAddTopic(project, index) {
      const tarInfo = this.dataList[index]['lists'][0]
      this.addFormFields = {
        'questionnaireId': tarInfo.questionnaireId,
        'optionDes': '',
        'remark': ''
      }
      this.$set(this.dataList[index], 'showAdd', true)
      this.resetTopicAddFalse(index)
    },
    handleEditClick(value, showAdd) {
      if (showAdd) return
      this.showEditTopic = !this.showEditTopic
      this.editTopicForm = {
        'id': value.id,
        'optionDes': value.optionDes,
        'remark': value.remark
      }
    },
    handelDelClick(item, showAdd) {
      if (showAdd) return
      this.$confirm(`确定要删除题目【${item.optionDes}】吗？ 一旦被删除，将无法显示和操作。`, '删除题目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delOpinion(item.id).then(res => {
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
    // 表单组件取消回调 更新数据
    handleTriggerCancel(args) {
      if (args[0] === 'edit') {
        this.showEditTopic = args[2]
      }
      if (args[0] === 'add') {
        this.$set(this.dataList[args[1]], 'showAdd', false)
      }
    },
    // 表单组件确认回调 更新数据
    handleTriggerConfirm(args) {
      console.log(args)
      if (args[0] === 'add') {
        addOpinion(args[2]).then(res => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '新增成功'
          })
          if (res.code === 0) {
            this.getTarQuestionnaireList()
            this.$set(this.dataList[args[1]], 'showAdd', false)
            this.$refs['addFormCom'].resetFormFields()
          }
        }).catch(err => {
          console.log(err)
        })
      }
      if (args[0] === 'edit') {
        editOpinion(args[2]).then(res => {
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
.carepro-index-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding: 0px;
  border: 1px solid #e1e1e1;
}
</style>
