<template>
  <el-container class="single-item-container">
    <el-main>
      <topic-list-render
        v-for="(data, dindex) in dataList"
        :key="dindex + data.project"
        :title="data.project"
      >
        <template v-slot:topic-list>
          <div v-for="(item, index) in data.lists" :key="index + item.questionnaireId" class="topic-list-item">
            <h6>{{ item.subjectTitle }}</h6>
            <p v-if="item.subjectRemarks" class="not-select-option">{{ item.subjectRemarks }}</p>
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
  name: 'SingleItemAssessment',
  components: {
    TopicListRender,
    PageEditBtn
  },
  mixins: [mixins],
  data() {
    return {
      mainType: '单列事项评估',
      dataList: undefined,
      editBtnOpts: {
        path: `/questionnaire/singleItemAssessment/details`,
        query: { 'id': 'singleItemAssessment', '_title': `编辑：单例事项评估` }
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
          project: '单列事项',
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
.single-item-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding: 0px;
  border: 1px solid #e1e1e1;
}
</style>
