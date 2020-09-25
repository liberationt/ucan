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
            <h6>{{ fmtSortCode(index) }}. {{ item.optionDes }}</h6>
            <p v-if="item.remark" class="not-select-option">{{ item.remark }}</p>
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
import { DEFAULT_CATE } from '../config/index.js'
export default {
  name: 'AdaptiveEvaluation',
  components: {
    TopicListRender,
    PageEditBtn
  },
  mixins: [mixins],
  data() {
    return {
      dataList: undefined,
      mainType: '照护项目',
      editBtnOpts: {
        path: `/questionnaire/careProjectAssessment/details`,
        query: { 'id': 'careProjectAssessment', '_title': `编辑：照护项目` }
      }
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
  & ::v-deep .topic-list-container{
    margin-bottom:20px;
  }
}
</style>
