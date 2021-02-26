<template>
  <div>
    <el-container>
      <el-main class="tableContainer">
        <el-tabs v-model="activeTabs">
          <el-tab-pane label="基本信息" name="base">
            <el-form ref="form_base" key="form_base" :model="form" label-width="140px">
              <el-collapse v-model="activeCollapse">
                <el-collapse-item name="baseItem_1">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />基本信息
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '姓名' : '姓名：'">
                        <span>{{ form.fullName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '身份证号' : '身份证号'">
                        <span>{{ form.idCard }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '性别' : '性别：'" prop="sex">
                        <span>{{ form.sex=='0'?'男':form.sex=='1'?'女':'' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '出生日期' : '出生日期：'" prop="birthday">
                        <span>{{ form.birthday }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '年龄': '年龄：'" prop="age">
                        <span>{{ form.age }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm? '社保卡号': '社保卡号：'" prop="socialSecurityArd">
                        <span>{{ form.socialSecurityArd }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '民族' : '民族：'">
                        <span>{{ form.nationName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '文化程度' : '文化程度：'">
                        <span>{{ form.eduLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm? '曾从事职业': '曾从事职业：'">
                        <span>{{ form.jobDes }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm? '籍贯': '籍贯：'" prop="hometown">
                        <span>{{ form.hometown }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '婚姻状况' : '婚姻状况：'">
                        <span>{{ form.maritalStatusName }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="baseItem_2">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />联系信息
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '户籍行政区划' : '户籍行政区划：'">
                        <span>{{ form.censusAreaLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '户籍详细地址' : '户籍详细地址：'">
                        <span>{{ form.censusAddr }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住行政区划' : '居住行政区划：'" prop="liveArea">
                        <span>{{ form.liveAreaLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住详细地址' : '居住详细地址：'">
                        <span>{{ form.liveAddr }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '住宅电话' : '住宅电话：'" prop="homePhone">
                        <span>{{ form.homePhone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'" prop="mobile">
                        <span>{{ form.mobile }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '邮编' : '邮编：'">
                        <span>{{ form.placeResidence }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="0">
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm?'有无代理人':'有无代理人：'">
                        <el-radio-group v-model="form.isAgents" disabled>
                          <el-radio label="1">是</el-radio>
                          <el-radio label="0">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="0">
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '代理人姓名' : '代理人姓名：'">
                        <span>{{ form.agentsName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '与申请人关系' : '与申请人关系：'">
                        <span>{{ form.agentsRelation }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '住宅电话' : '住宅电话：'">
                        <span>{{ form.agentsHomePhone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-show="form.isAgents == '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住行政区划' : '居住行政区划：'">
                        <span>{{ form.agentsLiveAreaCodeLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住详细地址' : '居住详细地址：'">
                        <span>{{ form.agentsLiveAddr }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'" prop="agentsMobile">
                        <span>{{ form.agentsMobile }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '邮编' : '邮编：'" prop="agentsPlaceResidence">
                        <span>{{ form.agentsPlaceResidence }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="baseItem_5">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />目前生活状态
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col>
                      <el-form-item :label="isEditForm ? '经济状况' : '经济状况：'" prop="economicState">
                        <span>{{ form.economicStateName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住情况' : '居住情况：'" prop="liveState">
                        <span>{{ form.liveStateName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '长护险评估等级' : '长护险评估等级：'">
                        <span>{{ form.longTermLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '宗教信仰' : '宗教信仰：'">
                        <span>{{ form.faithName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '家庭支持' : '家庭支持：'">
                        <span>{{ form.homeSupportName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '社会参与' : '社会参与：'">
                        <span>{{ form.socialActivitiesName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '就医方式' : '就医方式：'">
                        <span>{{ form.medicalTreatmentName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '需要帮助时是否得到照料' : '需要帮助时是否得到照料：'" style="width: 150px">
                        <span>{{ form.needHelpIsCareName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col
                      v-if="form.needHelpIsCare=='yse'"
                      :md="adaptiveGrid.md"
                      :lg="adaptiveGrid.lg"
                    >
                      <el-form-item :label="isEditForm ? '谁帮助照料' : '谁帮助照料：'">
                        <span>{{ form.whoHelpsCareName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col
                      v-if="form.whoHelpsCare=='other'"
                      :md="adaptiveGrid.md"
                      :lg="adaptiveGrid.lg"
                    >
                      <el-form-item :label="isEditForm ? '谁帮助照料' : '谁帮助照料：'">
                        <span>{{ form.whoHelpsCareOther }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item :label="isEditForm ? '兴趣爱好' : '兴趣爱好：'">
                        <span>
                          <span v-for="(item,key) in hobbyList" :key="key">
                            <span v-if="item.itemCode!='3014'">{{ item.itemName }}、</span>
                          </span>
                          <span>{{ form.remark }}</span>
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="baseItem_6">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />健康状况说明
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col>
                      <el-form-item :label="isEditForm ? '既往疾病说明' : '既往疾病说明：'">
                        <span>
                          <span v-for="(item,i) in historyList" :key="i">
                            <span v-if="item.itemCode=='1047'">
                              <span v-if="i!=0 && item.remark!=null">、</span>
                              {{ item.remark }}
                            </span>
                            <span v-else>
                              <span v-if="i!=0">、</span>
                              {{ item.itemName }}
                            </span>
                          </span>
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item :label="isEditForm ? '现有疾病说明' : '现有疾病说明：'">
                        <span>
                          <span v-for="(item,i) in newList" :key="i">
                            <span v-if="item.itemCode=='2047'">
                              <span v-if="i!=0 && item.remark!=null">、</span>
                              {{ item.remark }}
                            </span>
                            <span v-else>
                              <span v-if="i!=0">、</span>
                              {{ item.itemName }}
                            </span>
                          </span>
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item :label="isEditForm ? '现服药情况' : '现服药情况：'">
                        <span>{{ form.currentTakeMedicine }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="评估记录" name="assess">
            <el-table :data="dataList" border style="width: 100%;margin-top:30px;">
              <el-table-column prop="assessNo" label="评估编号" align="center" min-width="180" />
              <el-table-column prop="reportStatusName" label="报告状态" align="center" min-width="180" />
              <el-table-column prop="assessStartDate" label="评估开始时间" align="center" min-width="180" />
              <el-table-column prop="assessCompleteDate" label="评估完成时间" align="center" min-width="180" />
              <el-table-column prop="assessTypeName" label="评估类别" align="center" min-width="180" />
              <el-table-column prop="assessCareLevel" label="评估等级" align="center" min-width="180" />
              <!-- <el-table-column prop="costBearingCodeName" label="评估费用承担方" align="center" min-width="180" /> -->
              <el-table-column label="评估师" align="center" min-width="180">
                <template slot-scope="{row}">
                  <span>{{ row.orderTakingAssessName1 }}</span>
                  <span>{{ row.orderTakingAssessName2 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="orgName" label="养老机构" align="center" min-width="180" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div style="text-align:right;margin-top:40px">
          <el-button @click="returnGo">返回</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import _ from 'lodash'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { getAssessInfor } from '@/api/evaluationManagement/basicInformation'
export default {
  name: 'EsimateApplyDetails',
  data() {
    return {
      activeTabs: 'base',
      isEditForm: false,
      activeCollapse: [
        'baseItem_1',
        'baseItem_2',
        'baseItem_4',
        'baseItem_5',
        'baseItem_6',
        'baseItem_7'
      ],
      assessForm: {},
      form: {},
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      assessId: '',
      disabled: false,
      hobbyList: [],
      historyList: [],
      newList: [],
      dataList: []
    }
  },
  mounted() {
    this.assessId = this.$route.params.id || ''
    this.getData(this.assessId)
  },
  methods: {
    returnGo() {
      this.$router.push('/evaluationManagement/esimateManage/esimateReport')
    },
    async getData(id) {
      getAssessInfor(id).then(res => {
        if (res.code === 0) {
          this.form = res.data
          this.hobbyList = res.data.healthStatus.data['300'] ? res.data.healthStatus.data['300'] : []
          this.historyList = res.data.healthStatus.data['100'] ? res.data.healthStatus.data['100'] : []
          this.newList = res.data.healthStatus.data['200'] ? res.data.healthStatus.data['200'] : []
          this.dataList = res.data.lastApplyInfoList
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/form.css";
.tableContainer {
  margin-top: 20px;
}
</style>
