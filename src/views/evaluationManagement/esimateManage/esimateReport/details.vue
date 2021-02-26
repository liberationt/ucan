<template>
  <div>
    <el-container id="new_message">
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
                      <el-form-item :label="isEditForm ? '身份证号' : '身份证号：'">
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
                <el-collapse-item name="baseItem_4">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />本次评估信息
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估类别' : '评估类别：'">
                        <span>{{ form.assessTypeName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '养老机构' : '养老机构：'">
                        <span>{{ form.orgName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '入住情况' : '入住情况：'">
                        <span>{{ form.occupancyCodeName }}</span>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估费用承担' : '评估费用承担：'">
                        <span>{{ form.costBearingCodeName }}</span>
                      </el-form-item>
                    </el-col> -->
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '预约评估日期' : '预约评估日期：'">
                        <span>{{ form.appointmentData }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估地点' : '评估地点：'">
                        <span>{{ form.assessAddrCodeName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估师1' : '评估师1：'">
                        <span>{{ form.orderTakingAssessName1 }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'">
                        <span>{{ form.mobile1 }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估师2' : '评估师2：'">
                        <span>{{ form.orderTakingAssessName2 }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'">
                        <span>{{ form.mobile2 }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估开始时间' : '评估开始时间：'">
                        <span>{{ form.assessStartDate }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '报告完成时间' : '报告完成时间：'">
                        <span>{{ form.assessCompleteDate }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <el-form-item :label="isEditForm ? '合照' : '合照：'">
                        <!-- <span>{{ form.assessAddrCodeName }}</span> -->
                        <viewer :images="bizImageInfoList">
                          <span v-for="(item,i) in bizImageInfoList" :key="i">
                            <img :src="item" alt="" style="width:150px;height:150px;margin-right:5px">
                          </span>
                        </viewer>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '所属区划' : '所属区划：'">
                        <span>{{ form.assessAreaCodeLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估地址' : '评估地址：'">
                        <span>{{ form.assessAddr }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '评估联络人' : '评估联络人：'">
                        <span>{{ form.assessLinkman }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '联系电话' : '联系电话：'">
                        <span>{{ form.assessLinkmanPhone }}</span>
                      </el-form-item>
                    </el-col> -->
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
                        <span>{{ form.censusAreaCodeLevelName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '户籍详细地址' : '户籍详细地址：'">
                        <span>{{ form.censusAddr }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '居住行政区划' : '居住行政区划：'" prop="liveArea">
                        <span>{{ form.liveAreaCodeLevelName }}</span>
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
                        <el-radio-group v-model="form.isAgents" :disabled="modelType=='look'">
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
                    <el-col v-if="form.isAgents == '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
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
                      <el-form-item :label="isEditForm ? '住宅电话' : '住宅电话：'">
                        <span>{{ form.agentsHomePhone }}</span>
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
                      <el-form-item :label="isEditForm ? '宗教信仰' : '宗教信仰：'">
                        <span>{{ form.faithName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item v-if="form.faith === 'other_beliefs'" :label="isEditForm ? '其他信仰' : '其他信仰：'">
                        <span>{{ form.otherBeliefs }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '就医方式' : '就医方式：'">
                        <span>{{ form.medicalTreatmentName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '就诊医院' : '就诊医院：'">
                        <span>{{ form.hospitalsUsedToVisit }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                      <el-form-item :label="isEditForm ? '需要帮助时是否得到照料' : '需要帮助时是否得到照料：'">
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
                      <el-form-item :label="isEditForm ? '照料人' : '照料人：'">
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
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="baseItem_7">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />现服药情况
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col>
                      <el-form-item>
                        <span>{{ form.currentTakeMedicine }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="评估问卷" name="assess">
            <el-form
              ref="formassess"
              label-position="top"
              :model="assessForm"
              :rules="isEditForm ? rulesForm : null "
              label-width="140px"
            >
              <div v-for="(first,key) in assessForm" :key="key" class="assessContent">
                <div class="assessItem">
                  <h2>{{ key }}</h2>
                </div>
                <div v-for="(second,i) in first" :key="i">
                  <h3>{{ i }}</h3>
                  <el-collapse>
                    <el-collapse-item v-for="(third,k,f) in second" :key="k" :name="'baseItem' + f">
                      <template slot="title">
                        <div class="titleSlider">
                          <span>
                            <i class="titleTip" />
                            {{ k }}
                          </span>
                        </div>
                      </template>
                      <el-row v-if="key!='单列事项评估'" :gutter="0">
                        <el-col v-for="(fourth,z) in third" :key="z">
                          <el-form-item :label="fourth.subjectTitle">
                            <span>{{ fourth.subjectRemarks }}</span>
                            <el-radio-group :value="true">
                              <el-radio
                                v-for="(items,j) in fourth.options"
                                :key="j"
                                :disabled="!isEditForm"
                                :label="items.ifSelected"
                              >
                                <div class="numberInfor">
                                  <span>{{ items.optionDes }}</span>
                                  <span>{{ items.optionValue }}分</span>
                                </div>
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-else :gutter="0">
                        <el-col v-for="(fourth,z) in third" :key="z">
                          <el-form-item>
                            <el-checkbox
                              v-for="(itemss,p) in fourth.options"
                              :key="p"
                              v-model="itemss.ifSelected"
                              :disabled="!isEditForm"
                              :label="itemss.ifSelected"
                              @change="changeType(fourth,itemss)"
                            >
                              <div class="numberInfors">
                                <span>{{ fourth.subjectTitle }}</span>
                                <span style="text-indent:30px;margin-top:10px">{{ fourth.subjectRemarks }}</span>
                              </div>
                            </el-checkbox>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
              <div>
                <div class="assessItem">
                  <h2>其他</h2>
                </div>
                <el-row :gutter="0">
                  <el-col>
                    <el-form-item>
                      <span>{{ otherSpecialDesc }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="评估报告" name="report">
            <div style="width:80%;margin:0 auto">
              <div>
                <div style="text-align:center">
                  <h3>报告一：分值设定和照护服务分级划分</h3>
                </div>
                <div class="reportContet">
                  <div class="item">
                    <div class="reportTit">照护服务分级评分参考值</div>
                    <div class="items">
                      <div v-for="(item,i) in formReport.careService" :key="i" style="display:flex;">
                        <div class="itemList">{{ item.level }}</div>
                        <div class="itemList">{{ item.score }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="reportTit">评估分数总结</div>
                    <div class="items">
                      <div style="display:flex;height:50%;border-bottom:1px solid #e3e3e3">
                        <div v-if="length>0" class="itemList1" :style="{lineHeight:length*20 + length/2+'px'}">评估总分</div>
                        <div
                          class="itemList1"
                          :style="{lineHeight:length*20+length/2+'px',borderLeft:'1px solid #e3e3e3'}"
                        >{{ formReport.assessInfo.assessScore }}</div>
                      </div>
                      <div style="display:flex;height:50%;">
                        <div v-if="length>0" class="itemList1" :style="{lineHeight:length*20 + length/2+'px'}">照护等级</div>
                        <div
                          class="itemList1"
                          :style="{lineHeight:length*20+length/2+'px',borderLeft:'1px solid #e3e3e3'}"
                        >{{ formReport.assessInfo.assessCareLevel }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top:60px">
                <div style="text-align:center">
                  <h3>报告二：照护项目分析及服务建议</h3>
                </div>
                <el-table :data="formReport.assessObjExtendList" border style="width: 100%">
                  <el-table-column prop="itemName" label="现有疾病" align="center" min-width="180" />
                  <el-table-column prop="remark" min-width="500" label="照护建议" />
                </el-table>
                <el-table :data="formReport.abnormalOptions" border style="width: 100%;margin-top:30px;">
                  <el-table-column prop="project" label="评估项目" align="center" min-width="180" />
                  <el-table-column prop="value" min-width="250" label="项目分析（得分为4分、8分、10分的选项提示）">
                    <template scope="{row}">
                      <div v-for="(item,i) in row.value" :key="i" style="padding:20px">
                        <!-- <span>题目{{ i+1 }}：{{ item.subjectTitle }}</span> -->
                        <span>{{ i+1 }}、{{ item.subjectTitle }}：{{ item.optionDes }}</span>
                        <!-- style="text-indent:20px" -->
                        <!-- <div>异常提示：{{ item.optionDes }}</div> -->
                        <!-- <div>照护建议：{{ item.careAdvice }}</div> -->
                        <!-- <div>{{ item.careAdvice }}</div> -->
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" min-width="250" label="照护建议">
                    <template scope="{row}">
                      <div v-for="(item,i) in row.value" :key="i" style="margin-bottom:20px">
                        <!-- <span>{{ item.subjectTitle }}</span> -->
                        <!-- style="text-indent:20px" -->
                        <!-- <div>异常提示：{{ item.optionDes }}</div> -->
                        <div>{{ i+1 }}、{{ item.careAdvice }}</div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div>
              <h3>附件</h3>
              <div class="imgList">
                <viewer :images="formReport.images">
                  <div v-for="(item,i) in formReport.images" :key="i" class="imgListItem">
                    <img :src="item.imgUrl" alt="">
                  </div>
                </viewer>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="text-align:right;margin-top:40px">
          <el-button @click="returnGo">返回</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      :visible="lookVisible"
      :close-on-click-modal="false"
      @close="closelookDialog"
    >
      <div style="width:100%;height:100%">
        <img :src="itemUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import {
  getEditAssess,
  getQuestionnaire,
  getViewAssesss,
  getHobby
} from '@/api/evaluationManagement/assessmentForm'

export default {
  name: 'EsimateApplyDetails',
  data() {
    return {
      radio: 1,
      itemUrl: '',
      lookVisible: false,
      checkList: [],
      cityList: [],
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
      activeCollapses: [
        'baseItem0',
        'baseItem1',
        'baseItem2',
        'baseItem3',
        'baseItem4',
        'baseItem5',
        'baseItem6',
        'baseItem7',
        'baseItem8',
        'baseItem9',
        'baseItem10'
      ],
      assessForm: {},
      modelType: null,
      form: {
        // 基本信息+联系信息+目前生活状态
        age: '',
        assessCompleteDate: '',
        agentsHomePhone: '',
        agentsLiveAddr: '',
        agentsLiveAreaCodeLevelName: '',
        agentsMobile: '',
        agentsName: '',
        agentsPlaceResidence: '',
        agentsRelation: '',
        birthday: '',
        censusAddr: '',
        censusAreaCodeLevel: '',
        censusAreaCodeLevelName: '',
        currentTakeMedicine: '',
        economicState: [],
        economicStateName: '',
        eduLevelName: '',
        faith: '',
        faithName: '',
        fullName: '',
        homePhone: '',
        homeSupportName: '',
        hometown: '',
        id: '',
        idCard: '',
        isAgents: '',
        jobDes: '',
        liveAddr: '',
        liveAreaCodeLevelName: '',
        liveStateName: '',
        longTermLevelName: '',
        maritalStatusName: '',
        medicalTreatmentName: '',
        mobile: '',
        nationName: '',
        needHelpIsCare: '',
        needHelpIsCareName: '',
        placeResidence: '',
        remark: '',
        sex: '',
        sexName: '',
        socialActivitiesName: '',
        socialSecurityArd: '',
        status: '',
        statusName: '',
        whoHelpsCare: '',
        whoHelpsCareName: '',
        whoHelpsCareOther: '',
        // 兴趣爱好+健康状况说明
        // 本次评估结果
        assessTypeName: '',
        orgName: '',
        occupancyCodeName: '',
        costBearingCodeName: '',
        appointmentData: '', // 预约评估日期
        assessAddrCodeName: '',
        assessAreaCodeLevelName: '',
        assessAddr: '', // 评估地址
        assessLinkman: '', // 评估联络人
        assessLinkmanPhone: '', // 联系电话
        orderTakingAssessName1: '',
        orderTakingAssessName2: '',
        mobile1: '',
        mobile2: '',
        assessStartDate: '',
        taskEndDate: '',
        assessCompleteDate: '',
        // 病及爱好
        data: {
          100: [],
          200: [],
          300: []
        }
      },
      bizImageInfoList: [],
      otherSpecialDesc: '',
      rulesForm: {},
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
      areaCode: [[], []], // 区域行政的全部ID
      agentsAreaCode: [], // 代理人居住区划
      areaCodeBase: [], // 所属区划
      // 兴趣
      hobbyList: [],
      historyList: [],
      newList: [],
      hobbyOptions: [],
      historyOptions: [],
      nowOptions: [],
      // 报告
      length: 0,
      formReport: {
        careService: [],
        assessInfo: {
          assessScore: '',
          assessCareLevel: ''
        },
        tableData1: [],
        tableData2: []
      }
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    if (this.$route.query.isLoad === 'yes') {
      this.activeTabs = 'report'
    }
    this.assessId = this.$route.params.id || ''
    this.getData(this.assessId, this.modelType)
  },
  methods: {
    closelookDialog() {
      this.lookVisible = false
    },
    showBig(url) {
      this.lookVisible = true
      this.itemUrl = url
    },
    returnGo() {
      this.$router.push('/evaluationManagement/esimateManage/esimateReport')
    },
    async getData(id, type) {
      await this.getHobby()
      await this.getDataDetail(id)
      await this.getQuestionnaire()
      await this.getPreview()
    },
    saveBaseData() {
      this.activeTabs = 'assess'
    },
    // 获取基本信息
    getDataDetail(assessId) {
      getEditAssess({ assessId: assessId }).then((res) => {
        if (res.code == 0) {
          this.clearDetailData(res.data)
        }
      })
    },
    // 获取评估信息
    getQuestionnaire() {
      getQuestionnaire({ assessId: this.assessId }).then((res) => {
        if (res.code == 0) {
          this.assessForm = res.data.data
          this.otherSpecialDesc = res.data.otherSpecialDesc
        }
      })
    },
    // 获取报告
    getPreview() {
      getViewAssesss({ assessId: this.assessId }).then((res) => {
        if (res.code == 0) {
          if (res.data.images && res.data.images.length) {
            res.data.images.forEach(item => {
              item.imgUrl = `${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`
            })
          }
          this.formReport = res.data
          this.length = res.data.careService.length
          const arr = []
          this.formReport.assessObjExtendList.forEach(item => {
            if (item.propType === 200) {
              arr.push(item)
            }
          })
          this.formReport.assessObjExtendList = arr
          if (this.$route.query.isLoad === 'yes') {
            this.$nextTick(() => {
              setTimeout(() => {
                window.scrollTo(0, 2000)
              }, 100)
            })
          }
        }
      })
    },
    // 编辑查看详情整理数据
    clearDetailData(data) {
      const dataList1 = []
      const dataList2 = []
      const dataList3 = []
      if (
        data.bizHealthStatus.data['100'] &&
        data.bizHealthStatus.data['100'].length
      ) {
        data.bizHealthStatus.data['100'].forEach((item) => {
          dataList1.push(item.itemCode)
          this.historyOptions.forEach((items) => {
            if (items.itemCode == '1047') {
              return (items.remark = item.remark)
            }
          })
        })
      }
      if (
        data.bizHealthStatus.data['200'] &&
        data.bizHealthStatus.data['200'].length
      ) {
        data.bizHealthStatus.data['200'].forEach((item) => {
          this.nowOptions.forEach((items) => {
            if (items.itemCode == '2047') {
              return (items.remark = item.remark)
            }
          })
          dataList2.push(item.itemCode)
        })
      }
      if (
        data.bizHealthStatus.data['300'] &&
        data.bizHealthStatus.data['300'].length
      ) {
        data.bizHealthStatus.data['300'].forEach((item) => {
          dataList3.push(item.itemCode)
        })
      }

      if (data.bizImageInfoList && data.bizImageInfoList.length) {
        data.bizImageInfoList.forEach((item) => {
          this.bizImageInfoList.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
        })
      }
      this.form = {
        // 基本信息
        age: data.bizAssessPerson.age,
        agentsHomePhone: data.bizAssessPerson.agentsHomePhone,
        agentsLiveAddr: data.bizAssessPerson.agentsLiveAddr,
        agentsLiveAreaCodeLevelName:
        data.bizAssessPerson.agentsLiveAreaCodeLevelName,
        agentsMobile: data.bizAssessPerson.agentsMobile,
        agentsName: data.bizAssessPerson.agentsName,
        agentsPlaceResidence: data.bizAssessPerson.agentsPlaceResidence,
        agentsRelation: data.bizAssessPerson.agentsRelation,
        birthday: data.bizAssessPerson.birthday,
        censusAddr: data.bizAssessPerson.censusAddr,
        censusAreaCodeLevelName: data.bizAssessPerson.censusAreaCodeLevelName,
        currentTakeMedicine: data.bizAssessPerson.currentTakeMedicine,
        economicStateName: data.bizAssessPerson.economicStateName,
        eduLevelName: data.bizAssessPerson.eduLevelName,
        faithName: data.bizAssessPerson.faithName,
        faith: data.bizAssessPerson.faith,
        otherBeliefs: data.bizAssessPerson.otherBeliefs,
        hospitalsUsedToVisit: data.bizAssessPerson.hospitalsUsedToVisit,
        fullName: data.bizAssessPerson.fullName,
        homePhone: data.bizAssessPerson.homePhone,
        homeSupportName: data.bizAssessPerson.homeSupportName,
        hometown: data.bizAssessPerson.hometown,
        id: data.bizAssessPerson.id,
        idCard: data.bizAssessPerson.idCard,
        isAgents: data.bizAssessPerson.isAgents,
        jobDes: data.bizAssessPerson.jobDes,
        liveAddr: data.bizAssessPerson.liveAddr,
        liveAreaCodeLevelName: data.bizAssessPerson.liveAreaCodeLevelName,
        liveStateName: data.bizAssessPerson.liveStateName,
        longTermLevelName: data.bizAssessPerson.longTermLevelName,
        maritalStatusName: data.bizAssessPerson.maritalStatusName,
        medicalTreatmentName: data.bizAssessPerson.medicalTreatmentName,
        mobile: data.bizAssessPerson.mobile,
        nationName: data.bizAssessPerson.nationName,
        needHelpIsCare: data.bizAssessPerson.needHelpIsCare,
        needHelpIsCareName: data.bizAssessPerson.needHelpIsCareName,
        placeResidence: data.bizAssessPerson.placeResidence,
        remark: data.bizAssessPerson.remark,
        sex: data.bizAssessPerson.sex,
        sexName: data.bizAssessPerson.sexName,
        socialActivitiesName: data.bizAssessPerson.socialActivitiesName,
        socialSecurityArd: data.bizAssessPerson.socialSecurityArd,
        whoHelpsCare: data.bizAssessPerson.whoHelpsCare,
        whoHelpsCareName: data.bizAssessPerson.whoHelpsCareName,
        whoHelpsCareOther: data.bizAssessPerson.whoHelpsCareOther,
        // 本次评估
        assessTypeName: data.bizAssessInfo.assessTypeName,
        orgName: data.bizAssessInfo.orgName,
        occupancyCodeName: data.bizAssessInfo.occupancyCodeName,
        costBearingCodeName: data.bizAssessInfo.costBearingCodeName,
        appointmentData: data.bizAssessInfo.appointmentData, // 预约评估日期
        assessAddrCodeName: data.bizAssessInfo.assessAddrCodeName, // 评估地点
        assessAreaCodeLevelName: data.bizAssessInfo.assessAreaCodeLevelName, // 评估地点
        assessAddr: data.bizAssessInfo.assessAddr, // 评估地址
        assessLinkman: data.bizAssessInfo.assessLinkman, // 评估联络人
        assessLinkmanPhone: data.bizAssessInfo.assessLinkmanPhone, // 联系电话
        orderTakingAssessName1: data.bizAssessInfo.orderTakingAssessName1,
        orderTakingAssessName2: data.bizAssessInfo.orderTakingAssessName2,
        mobile1: data.bizAssessInfo.mobile1,
        mobile2: data.bizAssessInfo.mobile2,
        assessStartDate: data.bizAssessInfo.assessStartDate,
        taskEndDate: data.bizAssessInfo.taskEndDate,
        assessCompleteDate: data.bizAssessInfo.assessCompleteDate,
        data: {
          100: dataList1,
          200: dataList2,
          300: dataList3
        }
      }
      this.hobbyList = data.bizHealthStatus.data['300']
      this.historyList = data.bizHealthStatus.data['100']
      this.newList = data.bizHealthStatus.data['200']
    },
    getHobby() {
      getHobby().then((res) => {
        if (res.code == 0) {
          if (res.data && res.data.length) {
            res.data.forEach((item) => {
              if (item.propType == 300) {
                this.hobbyOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
              if (item.propType == 100) {
                this.historyOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
              if (item.propType == 200) {
                this.nowOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
            })
          }
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
.assessItem {
  text-align: center;
}
.reportContet {
  border: 1px solid #e3e3e3;
  display: flex;
  .reportTit {
    text-align: center;
    line-height: 60px;
    background: #f0f3f9;
    border-right: 1px solid #e3e3e3;
  }
}
.item {
  width: 50%;
  height: 50%;
}
.items {
  display: flex;
  flex-direction: column;
}
.itemList {
  width: 50%;
  text-align: center;
  border-top: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  height: 100%;
  line-height: 40px;
}
.itemList1 {
  width: 50%;
  text-align: center;
  line-height: 100%;
}
.imgList{
  display: flex;
  flex-wrap: wrap;
  .imgListItem{
    width:200px;height:200px;
    cursor: pointer;
    img{
      width:200px;height:200px;
    }
  }
}
</style>
