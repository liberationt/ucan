<template>
  <el-container class="questionnaire-index-container">
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane v-for="(nav, nkey) in navItems" :key="nkey + nav.value" :label="nav.label" :name="nav.label">
          <topic-list-render
            v-for="(data, dindex) in curTabData"
            :key="dindex + data.project"
            :title="data.project"
          >
            <template v-slot:topic-list>
              <div v-for="(item, index) in data.lists" :key="index + item.questionnaireId" class="topic-list-item">
                <h6>{{ `${index + 1}、${item.subjectTitle}` }}</h6>
                <p v-show="item.subjectRemarks">{{ item.subjectRemarks }}</p>
                <ul v-if="item.options">
                  <li v-for="(value, key) in item.options" :key="index + key" style="margin-bottom:20px;">
                    <div>
                      <span>{{ fmtOptionName(key + 1) }}、</span>
                      <span>{{ value.optionDes }}</span>
                      <div style="text-indent:25px;color:#999;margin-top:10px">{{ value.careAdvice }}</div>
                    </div>
                    <div v-if="value.optionValue">{{ value.optionValue }} 分</div>
                  </li>
                </ul>
              </div>
            </template>
          </topic-list-render>
          <page-edit-btn :options="editBtnOpts" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import TopicListRender from '../components/TopicListRender.vue'
import PageEditBtn from '../components/PageEditBtn.vue'
import mixins from '../mixins/index.js'
import { ONSITE_ASSESSMENT_CONFIG } from '../config/index.js'
export default {
  name: 'OnsiteAssessment',
  components: {
    TopicListRender,
    PageEditBtn
  },
  mixins: [mixins],
  data() {
    return {
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
      editBtnOpts: {
        path: `/questionnaire/onsiteAssessment/details`,
        query: { 'id': 'onsiteAssessment', '_title': `编辑：现场评估` }
      }
    }
  },
  created() {
    this.getTarQuestionnaireList()
  },
  methods: {
    async getTarQuestionnaireList() {
      const tarInfo = await this.getTargetTypeQuestionnaireInfo(this.mainType)
      this.onsiteData = tarInfo
      this.getCurTabData()
    },
    getCurTabData() {
      const filterData = this.onsiteData.filter(item => item.projectType === this.activeName)
      const tabVal = this.navItems.filter(item => item.label === this.activeName)[0]['value']
      const resData = ONSITE_ASSESSMENT_CONFIG[tabVal].map(item => { return { project: item, lists: [] } })
      filterData.forEach(item => {
        const _index = resData.findIndex(pro => pro.project === item.project)
        if (_index !== -1) {
          resData[_index].lists.push(item)
        }
      })
      this.curTabData = resData
    },
    handleTabClick() {
      this.getCurTabData()
    },
    handleHrefEdit() {
      this.$router.push({
        path: `/questionnaire/onsiteAssessment/details/1`,
        query: { 'id': 'onsiteAssessment', '_title': `编辑：现场评估-${this.navItems[0]['label']}` }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../components/styles/list.scss";
.questionnaire-index-container{
  margin:23px 10px 60px 10px;
  background: #ffffff;
  padding: 0px;
  border: 1px solid #e1e1e1;
  .question-edit--btn{
    height:40px;
    width:100%;
    z-index:999;
    text-align: right;
    &.edit--btn__fixed{
      background-color: #fff;
      height: 65px;
      width:calc(100% - 240px);
      position: fixed;
      bottom:0px;
      right:10px;
      z-index:999;
      padding-top:16px;
      padding-right:10px;
      box-shadow: 0px -1px 2px 0 rgba(0,0,0,0.3);
    }
  }
  .el-main{
    padding-top:0px!important;
    padding-bottom:10px!important;
  }
  .nav-container__outer{
    display: flex;
    justify-self: start;
    width:100%;
    height:48px;
    list-style: none;
    padding:0;
    border-bottom:1px solid #dcdfe6;
    li{
      padding:0 10px;
      line-height:48px;
      font-size:14px;
      cursor: pointer;
      position: relative;
      margin-right:10px;
      &:last-of-type{
        margin-right:0px;
      }
      &.active{
        color:#3367D6;
        &::after{
          content: '';
          z-index:99;
          position: absolute;
          bottom:-1px;
          left:0;
          width: 100%;
          height:2px;
          background-color:#3367D6;
        }
      }
    }
  }
}

</style>
