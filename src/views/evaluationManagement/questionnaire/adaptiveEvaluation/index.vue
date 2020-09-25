<template>
  <el-container class="adaptive-evaluation-container">
    <el-main v-if="dataList">
      <topic-list-render
        v-for="(data, dindex) in dataList"
        :key="dindex"
        :title="data.project"
      >
        <template v-slot:topic-list>
          <div v-for="(item, index) in data.lists" :key="index + item.questionnaireId" class="topic-list-item">
            <h6>{{ `${index + 1}、${item.subjectTitle}` }}</h6>
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
        </template>
      </topic-list-render>
      <page-edit-btn :options="editBtnOpts" />
    </el-main>
  </el-container>
</template>
<script>
import TopicListRender from '../components/TopicListRender.vue'
import PageEditBtn from '../components/PageEditBtn.vue'
import mixins from '../mixins/index.js'
export default {
  name: 'AdaptiveEvaluation',
  components: {
    TopicListRender,
    PageEditBtn
  },
  mixins: [mixins],
  data() {
    return {
      mainType: '适应性评估',
      dataList: undefined,
      editBtnOpts: {
        path: `/questionnaire/adaptiveEvaluation/details`,
        query: { 'id': 'adaptiveEvaluation', '_title': `编辑：适应性评估` }
      }
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
          project: '入住适应',
          lists: [...tarInfo]
        }
      ]
      this.dataList = resData
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
</style>
