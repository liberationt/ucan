<template>
  <el-collapse-transition>
    <div v-show="visOperate" class="topic-render-form" :style="fmtBoxStyle">
      <el-form ref="topicForm" label-width="75px" :model="formFields" :rules="formRules">
        <el-form-item
          v-for="(item, index) in formItems"
          :key="item.label + index"
          :label="item.label"
          :prop="item.prop"
          :required="item.required"
        >
          <template v-if="['text', 'textarea', 'password'].includes(item.type)">
            <el-input
              v-if="item.existlimit"
              v-model="formFields[item.prop]"
              :type="item.type"
              :autosize="item.type === 'textarea' ? { minRows: 2, maxRows: 10} : false"
              :maxlength="item.existlimit.maxlen"
              :show-word-limit="item.existlimit.showWordLimit"
            />
            <el-input v-else v-model="formFields[item.prop]" :type="item.type" />
          </template>
          <el-input-number v-else-if="item.type == 'inputnumber'" v-model="formFields[item.prop]" size="small" :step="1" />
          <el-radio-group v-else-if="item.type == 'radio'" v-model="formFields[item.prop]">
            <el-radio v-for="(_radio, rindex) in item.groups" :key="rindex" :label="_radio.value">{{ _radio.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="add-topic--submit">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" class="base-btn" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-collapse-transition>
</template>
<script>
export default {
  name: 'TopicRenderForm',
  props: {
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
    },
    propIndex: {
      type: String,
      default: 0
    },
    visOperate: {
      type: Boolean,
      default: false
    },
    operateType: {
      type: String,
      default: 'add'
    },
    formFields: {
      type: Object,
      default: () => ({})
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
    }
  },
  computed: {
    fmtBoxStyle() { // -- 表单容器样式计算
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
    onCancel() { // --取消操作
      this.$emit('listenCancelTrigger', this.operateType, this.propIndex, false)
      this.resetFormFields()
    },
    onSubmit() { // -- 表单数据提交
      this.$refs['topicForm'].validate(valid => {
        if (valid) {
          this.$emit('listenConfirmTrigger', this.operateType, this.propIndex, this.formFields)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.topic-render-form{
  .add-topic--submit{
    text-align: right;
  }
  .form-item-col__flex{
    ::v-deep .el-form-item__content{
      margin-left:20px!important;
    }
  }
  & ::v-deep .el-textarea .el-input__count{
    display: inline-block;
    height:18px;
    line-height: 18px;
    background-color: transparent!important;
  }
}
</style>
