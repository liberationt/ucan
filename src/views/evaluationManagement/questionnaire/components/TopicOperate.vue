<template>
  <el-collapse-transition>
    <div v-show="visOperate" class="topic-operate-container" :style="fmtBoxStyle">
      <el-form v-if="topicForm" ref="topicForm" :model="topicForm" label-width="75px" :rules="topicFormRules">
        <el-form-item label="题目" prop="subjectTitle" required>
          <el-input v-model="topicForm.subjectTitle" type="text" maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="备注" prop="subjectRemarks">
          <el-input v-model="topicForm.subjectRemarks" type="textarea" maxlength="200" show-word-limit />
        </el-form-item>
        <el-row v-for="(item, optkey) in topicForm.options" :key="optkey">
          <el-row>
            <el-col :span="15">
              <el-form-item label="选项" :prop="`options.${optkey}.optionDes`" :rules="optionsRules.optionDes">
                <el-input v-model="item.optionDes" placeholder="选项内容" maxlength="200" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="8" class="form-item-col__flex">
              <el-form-item>
                <el-input-number v-model="item.optionValue" size="small" :step="1" :min="0" :max="10" />
                <span style="margin-left:10px;">分</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="20">
              <el-form-item :prop="`options.${optkey}.careAdvice`">
                <el-input v-model="item.careAdvice" placeholder="照护建议" maxlength="200" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-form-item class="add-topic--submit">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" class="base-btn" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-collapse-transition>
</template>
<script>
const DEFUALT_FORM_DATA = {
  'project': '',
  'projectType': '',
  'questionnaireType': '',
  'subjectRemarks': '',
  'subjectTitle': '',
  'isDel': '0',
  'multipleChoice': '',
  'options': [
    { 'optionDes': '', 'optionValue': '' },
    { 'optionDes': '', 'optionValue': '' },
    { 'optionDes': '', 'optionValue': '' }
  ]
}
export default {
  name: 'TopicOperate',
  props: {
    topicForm: {
      type: Object,
      default: () => (DEFUALT_FORM_DATA)
    },
    propIndex: {
      type: Number,
      default: -1
    },
    operateType: {
      type: String,
      default: ''
    },
    visOperate: {
      type: Boolean,
      default: false
    },
    boxStyle: {
      type: Object,
      default: () => ({
        'width': '100%',
        'padding': '20px 20px 10px 20px',
        'margin': '10px auto',
        'border': '1px solid #e5e5e5',
        'border-radius': '2px',
        'background-color': '#F6F9F7'
      })
    }
  },
  data() {
    return {
      topicFormRules: {
        subjectTitle: [
          { required: true, message: '请输入题目', trigger: 'blur' },
          { required: true, message: '请输入题目', trigger: 'change' },
          { max: 100, message: '长度在最多100个字', trigger: 'blur' }
        ],
        subjectRemarks: [
          { min: 0, max: 200, message: '长度在最多200个字', trigger: 'blur' }
        ]
      },
      optionsRules: {
        optionDes: [
          // { required: true, message: '请输入选项内容', trigger: 'blur' },
          { max: 100, message: '长度在最多100个字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    fmtBoxStyle() {
      let style = ''
      Object.keys(this.boxStyle).map(key => {
        style += `${key}: ${this.boxStyle[key]}; `
      })
      return style
    }
  },
  methods: {
    resetFormFields() { // --置空表单字段值
      this.$refs['topicForm'].resetFields()
    },
    onCancel() {
      this.$emit('listenCancelTrigger', this.operateType, this.propIndex, false)
      this.$refs['topicForm'].resetFields()
    },
    onSubmit() { // 提交表单数据 触发父组件回调
      this.$refs['topicForm'].validate(valid => {
        if (valid) {
          this.$emit('listenConfirmTrigger', this.operateType, this.propIndex, this.topicForm)
          if (this.operateType === 'add') {
            // setTimeout(_ => {
            //   this.$refs['topicForm'].resetFields()
            // }, 500)
          }
        }
      })
    }
  }
}
</script>
<style scoped>
  @import "~@/styles/form.css";
</style>
<style lang="scss" scoped>
.topic-operate-container{
  .add-topic--submit{
    text-align: right;
  }
  .form-item-col__flex{
    ::v-deep .el-form-item__content{
      margin-left:20px!important;
    }
  }
}
</style>
