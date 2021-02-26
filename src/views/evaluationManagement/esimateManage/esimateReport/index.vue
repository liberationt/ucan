<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="报告状态">
          <el-select
            v-model="form.reportStatus"
            placeholder="请选择报告状态"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in reportStateOption"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评估类别">
          <el-select
            v-model="form.assessType"
            placeholder="请选择评估类别"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in evaluationCategoryOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="照护等级">
          <el-select
            v-model="form.assessCareLevel"
            placeholder="请选择照护等级"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in levelCareOption"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="养老机构">
          <el-autocomplete
            v-model="form.orgName"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入养老机构名称"
            :trigger-on-focus="false"
            style="width:100%"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="评估师">
          <el-input
            v-model.trim="form.assessEmpName"
            clearable
            style="width: 200px"
            placeholder="请输入评估师姓名"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            style="width: 200px"
            placeholder="请输入老人姓名或身份证号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="servicePeriod"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询</el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="addTableRow()">导入</el-button>
          <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出</el-button>
          <div style="width: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="item in tabs"
                :key="item.type"
                :label="item.name"
                :name="item.type"
              />
            </el-tabs>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估编号" prop="assessNo" width="200" />
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="年龄" prop="age" width="100" />
            <el-table-column label="性别" prop="sexName" width="80" />
            <el-table-column label="身份证号" prop="idCard" width="180" />
            <el-table-column label="手机号码" prop="phone" width="180" />
            <el-table-column label="居住地址" prop="liveAddress" width="180" />
            <el-table-column label="评估类别" prop="assessTypeName" min-width="180" />
            <el-table-column label="照护等级" prop="assessCareLevel" min-width="180" />
            <el-table-column label="到期日期" prop="expireDate" min-width="180" />
            <el-table-column label="报告状态" prop="reportStatusName" min-width="180" />
            <el-table-column label="养老机构" prop="orgName" min-width="250" />
            <el-table-column label="评估师1" prop="assessor1" width="180">
              <template slot-scope="{row}">
                <span>{{ row.assessor1 }}_{{ row.mobile1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估师2" prop="assessor2" width="180">
              <template slot-scope="{row}">
                <span>{{ row.assessor2 }}_{{ row.mobile2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="完成时间" prop="assessCompleteDate" min-width="180" />
            <el-table-column label="操作" align="center" fixed="right" width="320">
              <template slot-scope="{row}">
                <span v-if="row.reportStatus==='normal'||row.reportStatus==='coming_soon_expiring'||row.reportStatus==='review_review_ing'||row.reportStatus==='ongoing_evaluation_ing'" class="table-btn" style="display: inline-block;" @click="beginAssess(row.id,row.fullName)">
                  <el-upload
                    class="uploadUrl"
                    :headers="headers"
                    :action="uploadUrl"
                    :on-success="handleAvatarSuccess"
                    :before-upload="(params) =>beforeAvatarUpload(params,row.id, row)"
                  >
                    <span v-has="{class: '上传'}">上传</span>
                  </el-upload>
                </span>
                <span v-has="{class: '下载'}" class="table-btn" @click="modifyData(row.id)">机构版</span>
                <span v-has="{class: '下载'}" class="table-btn" @click="modifyDatas(row.id)">家属版</span>
                <span v-if="row.ifCompoundAssessment && ['normal','coming_soon_expiring','review_review_ing','ongoing_evaluation_ing'].indexOf(row.reportStatus)!=-1" v-has="{class: '复核评估'}" class="table-btn" @click="handleEdit(row, 'review_assessment')">复核评估</span>
                <span v-if="row.ifContinuousEvaluation && ['normal','coming_soon_expiring','review_review_ing','ongoing_evaluation_ing'].indexOf(row.reportStatus)!=-1" v-has="{class: '持续评估'}" class="table-btn" @click="handleEdit(row, 'continuous_assessment')">持续评估</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData"
          />
        </el-main>
      </el-container>
    </el-main>
    <div class="contract-list">
      <el-dialog
        v-dialogDrag
        width="200px"
        :visible="lookVisible"
        :close-on-click-modal="false"
        @close="closelookDialog"
      >
        <div class="contract-content">
          <div id="printTest" class="contract-content-body">
            <div ref="contractContent" class="contract-content-all">
              <!--           风格-->
              <div class="contract-content-list page-one" style="page-break-after:always">
                <div class="page-style" style="text-align: right;padding: 30px 30px 0px 30px">
                  编号：<span class="page-input" style="width: 200px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.assessNo }}</span>
                </div>
                <div class="page-style" style="text-align: center; font-size: 46px; font-weight: bold; margin-top: 80px">上海市养老机构</div>
                <div class="page-style" style="text-align: center; font-size: 46px; font-weight: bold; margin-top: 60px">照护服务分级评估表</div>
                <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 60px">（2020版）</div>
                <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 480px">上海市养老服务行业协会　制定</div>
              </div>
              <div class="contract-content-list page-two" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style" style="text-align: center; font-size: 46px; font-weight: bold;">使用说明</div>
                  <div class="page-content" style="margin-top: 60px; text-indent: 32px">1.	本评估表用于评估服务对象入住养老机构时的照护分级，分为现场评估、适应性评估和单列事项评估三部分。</div>
                  <div class="page-content" style="text-indent: 32px">2.	本评估表评估结果分六个等级，由轻至重依次为：正常、轻度、中度I级、中度II级、重度I级、重度II级。</div>
                  <div class="page-content" style="text-indent: 32px">3.	本评估表所指养老机构，是指经合法登记并向民政局备案，为老年人提供集中居住和照料护理服务的机构。社区长者照护之家等老年照护服务机构可参照执行。</div>
                  <div class="page-content" style="text-indent: 32px">4.	本评估表采用线上评估方式，评估人员持手机或PAD扫取二维码，直接打开老年  照护分级评估系统，根据老人状况，填写各评估项目的评测结果。</div>
                  <div class="page-content" style="text-indent: 32px">5.	评估人员需先核实老人信息，包括查验身份证，查看相关病例及体检单据等资料。</div>
                  <div class="page-content" style="text-indent: 32px">6.	本评估表所有空栏一律用斜杆“\”填写，并妥善保存。</div>
                </div>
              </div>
              <div class="contract-content-list page-three" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;">上海市养老机构照护服务分级评估表</div>
                  <div class="page-content" style="margin-top:100px">
                    <span class="pageStyles" style="width:130px;">申请人姓名 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ baseForm.fullName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles" style="width:130px;">入住机构名称 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.orgName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">组织机构代码 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.organizationCode }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估表编号 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.assessNo }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估类别 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfoDict.assessTypeName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估次数 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 125px; text-align: right;text-indent: 0;">第</span>
                      <span class="page-input" style="width: 125px; text-align: right;text-indent: 0;">{{ reportForm.assessCount }}</span>
                      <span class="page-input" style="width: 150px; text-align: right;text-indent: 0">次</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">上次评估日期 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.lastTimeAssessDate !== '' && reportForm.lastTimeAssessDate !== null ? reportForm.lastTimeAssessDate : '\\' }}</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">本次评估日期 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 450px; text-align: center;text-indent: 0">{{ reportForm.thisTimeAssessDate }}</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估师姓名 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.orderTakingAssessName1 + ' ' + reportForm.assessInfo.orderTakingAssessName2 }}</span>
                  </div>
                </div>
              </div>
              <div class="contract-content-list page-four" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px;">
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;">服务申请表资料</div>
                  <div class="page-style fontWeight" style="margin-bottom:20px">一、个人资料</div>
                  <div class="inforStyles">
                    <div class="nameInfor">姓名<i /></div>
                    <div class="nameValue">{{ baseForm.fullName }}<i /></div>
                    <div class="idCardInfor">身份证号码<i /></div>
                    <div class="idCardValue">{{ baseForm.idCard }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">性别<i /></div>
                    <div class="nameValue">{{ baseForm.sexName }}</div>
                    <div class="idCardInfor">社保卡号<i /></div>
                    <div class="idCardValue">{{ baseForm.socialSecurityArd }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">民族<i /></div>
                    <div class="nameValue">{{ baseForm.nationName }}</div>
                    <div class="idCardInfor">文化程度<i /></div>
                    <div class="idCardValue">{{ baseForm.eduLevelName }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">出生年月<i /></div>
                    <div class="nameValue">{{ baseForm.birthday }}</div>
                    <div class="idCardInfor">曾从事职业<i /></div>
                    <div class="idCardValue">{{ baseForm.jobDes }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">籍贯<i /></div>
                    <div class="nameValue">{{ baseForm.hometown }}</div>
                    <div class="idCardInfor">婚姻状况<i /></div>
                    <div class="idCardValue">{{ baseForm.maritalStatusName }}</div>
                  </div>
                  <!-- <div class="inforStyles" style="height:100%">
                    <div class="nameInfor" style="width:128px;">兴趣爱好<i /></div>
                    <div class="nameValue" style="width:480px;border:none;overflow:hidden;">
                      <span v-for="(item,i) in hobbyList" :key="i">{{ item.itemName }}、</span>
                      <span>{{ form.remark }}</span>
                    </div>
                  </div> -->
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">户籍所在地<i /></div>
                    <div style="width:490px;">
                      {{ baseForm.censusAreaCodeLevelName }}\{{ baseForm.censusAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">居住地址<i /></div>
                    <div style="width:490px;">
                      {{ baseForm.liveAreaCodeLevelName }}\{{ baseForm.liveAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="height:70px;overflow: hidden;">
                    <div class="nameInfor" style="line-height:70px;">邮编<i /></div>
                    <div class="nameValue" style="line-height:70px">{{ baseForm.placeResidence }}</div>
                    <div class="idCardInfor" style="height:70px;padding:0">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;padding:0 5px">住宅电话<i /></div>
                      <div style="height:34px;line-height:30px;padding:0 5px">移动电话<i /></div>
                    </div>
                    <div class="idCardValue" style="height:70px;padding:0;">
                      <div style="height:34px;line-height:100%;border-bottom:1px solid #333;width: 250px">{{ baseForm.homePhone }}</div>
                      <div style="height:34px;line-height:30px">{{ baseForm.mobile }}</div>
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">代理人姓名<i /></div>
                    <div class="nameValue">{{ baseForm.agentsName }}</div>
                    <div class="idCardInfor">与申请人关系<i /></div>
                    <div class="idCardValue">{{ baseForm.agentsRelation }}</div>
                  </div>
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">代理人地址<i /></div>
                    <div style="width:490px;">
                      {{ baseForm.agentsLiveAreaCodeLevelName }} {{ baseForm.agentsLiveAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="height:70px;border-bottom:1px solid #333;overflow: hidden;">
                    <div class="nameInfor" style="line-height:70px;">邮编<i /></div>
                    <div class="nameValue">{{ baseForm.agentsPlaceResidence }}</div>
                    <div class="idCardInfor" style="height:70px;padding:0">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;padding:0 5px">住宅电话<i /></div>
                      <div style="height:34px;line-height:30px;padding:0 5px">移动电话<i /></div>
                    </div>
                    <div class="idCardValue" style="height:70px;padding:0;">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;width: 250px">{{ baseForm.agentsHomePhone }}</div>
                      <div style="height:34px;line-height:30px">{{ baseForm.agentsMobile }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contract-content-list page-five" style="page-break-after:always">
                <div class="page-style" style="padding: 5px 30px 0px 30px">
                  <!-- <div class="page-style" style="padding: 30px 30px 0px 30px"> -->
                  <div class="page-style fontWeight" style="margin-bottom:20px;">二、目前生活状况</div>
                  <div class="inforStyles">
                    <div class="nameInfor">经济状况<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.economicStateName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">居住状况<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.liveStateName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor" style="font-size:14px">长护险评估等级<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.longTermLevelName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">宗教信仰<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.faithName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor" style="width:130px;">兴趣爱好<i /></div>
                    <div class="nameValue" style="width:490px;border:none;overflow:hidden; padding-left: 5px">
                      <span v-for="(item,i) in hobbyList" :key="i">{{ item.itemName }}、</span>
                      <span>{{ form.remark }}</span>
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">家庭支持<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.homeSupportName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">社会参与<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.socialActivitiesName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">帮助照料<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.whoHelpsCareName }}
                    </div>
                  </div>
                  <div class="inforStyles" style="border-bottom:1px solid #333">
                    <div class="nameInfor">就医方式<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.medicalTreatmentName }}
                    </div>
                  </div>
                  <!-- </div> -->
                  <div class="page-style fontWeight" style="margin-bottom:20px;margin-top:20px">三、健康状况说明</div>
                  <div style="height:110px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">既往疾病说明</div>
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
                  </div>
                  <div style="height:110px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">现有疾病说明</div>
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
                  </div>
                  <div style="height:100px;border:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">现服药情况</div>
                    <span>{{ baseForm.currentTakeMedicine }}</span>
                  </div>
                  <div class="page-style fontWeight" style="margin:20px 0">四、其他特殊情况说明</div>
                  <div class="fontWeight" style="height:100px;border:1px solid #333;padding:10px">{{ otherSpecialDesc }}</div>
                </div>
              </div>
              <div class="contract-content-list page-six" style="page-break-after:always">
                <div class="page-style">
                  <div class="page-style fontWeight" style="text-align: center; font-size: 36px; font-weight: bold;margin-bottom:40px;">评估报告</div>
                  <div class="reportBorter fontWeight" style="height:40px;line-height:40px;padding:0px 10px;">评估报告一：分值设定和照护服务分级划分</div>
                  <div class="reportBorter" style="height:60px;line-height:60px;;display:flex">
                    <div class="fontWeight" style="width:50%;border-right:1px solid #333;text-align:center">照护服务分级评分参考值</div>
                    <div class="fontWeight" style="width:50%;text-align:center">评估分数总结</div>
                  </div>
                  <div style="display:flex">
                    <div style="width:50%">
                      <div v-for="(item,i) in reportForm.careService" :key="i" class="inforStyles">
                        <span style="width:40%;text-align:center;border-right:1px solid #333">{{ item.level }}</span>
                        <span style="width:60%;text-align:center">{{ item.score }}</span>
                      </div>
                    </div>
                    <div style="width:50%;border-top:1px solid #333;border-right:1px solid #333">
                      <div style="display:flex;border-bottom:1px solid #333">
                        <div class="fontWeight" style="width:40%;text-align:center;border-right:1px solid #333" :style="{lineHeight:length*25-1+'px'}">评估总分</div>
                        <div style="width:60%;text-align:center" :style="{lineHeight:length*25-1+'px'}">{{ reportForm.assessInfo.assessScore }}</div>
                      </div>
                      <div style="display:flex">
                        <div class="fontWeight" style="width:40%;text-align:center;border-right:1px solid #333" :style="{lineHeight:length*25-1+'px'}">照护等级</div>
                        <div style="width:60%;text-align:center" :style="{lineHeight:length*25-1+'px'}">{{ reportForm.assessInfo.assessCareLevel }}</div>
                      </div>
                    </div>
                  </div>
                  <div style="height:80px;border:1px solid #333;line-height:80px;">
                    <div class="fontWeight" style="width:20%;height:80px;border-right:1px solid #333;text-align:center">结论备注</div>
                    <span />
                  </div>
                </div>
              </div>

              <div class="contract-content-list page-six" style="page-break-after:always">
                <div class="page-style">
                  <div class="page-style fontWeight" style="text-align: center; font-size: 36px; font-weight: bold;margin-bottom:40px;">评估报告</div>
                  <div class="reportBorter fontWeight" style="height:40px;line-height:40px;padding:0px 10px;">评估报告二：照护分析与服务建议</div>
                  <div style="border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333">
                    <div style="height:60px;line-height:60px;;display:flex;border-bottom:1px solid #333">
                      <div class="fontWeight" style="width:20%;text-align:center">现有疾病</div>
                      <div class="fontWeight" style="width:80%;border-left:1px solid #333;text-align:center">照护建议</div>
                    </div>
                    <div v-for="(item,i) in reportForm.assessObjExtendList" :key="i">
                      <template>
                        <div v-if="item.propType===200" style="border-bottom:1px solid #333;display:flex;align-items: center;">
                          <div class="fontWeight" style="width:20%;text-align:center;">{{ item.itemName }}</div>
                          <div style="width:80%;border-left:1px solid #333;padding:10px;line-height:25px">{{ item.remark }}</div>
                        </div>
                      </template>
                    </div>
                    <div style="height:60px;line-height:60px;;display:flex;border-bottom:1px solid #333">
                      <div class="fontWeight" style="width:20%;text-align:center">评估项目</div>
                      <div class="fontWeight" style="width:40%;border-left:1px solid #333;text-align:center;line-height:30px">项目分析（得分为4分、8分、10分的选项提示）</div>
                      <div class="fontWeight" style="width:40%;border-left:1px solid #333;text-align:center">照护建议</div>
                    </div>
                    <div v-for="(item) in reportForm.abnormalOptions" :key="item.project" style="border-bottom:1px solid #333;display:flex;height:100%;position:relative">
                      <div style="width:20%;position:relative">
                        <span class="fontWeight" style="width:100%;text-align:center;yellow;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">{{ item.project }}</span>
                      </div>
                      <div style="width:40%;border-left:1px solid #333;padding:10px;line-height:25px;text-align:center;display:flex;flex-direction: column;align-content: space-between;justify-items: center;">
                        <div v-for="(items,k) in item.value" :key="k" style="padding:20px;">
                          <span>{{ k+1 }}、{{ items.subjectTitle }}：{{ items.optionDes }}</span>
                          <!-- <span>{{ k+1 }}、{{ items.subjectTitle }}</span> -->
                          <!-- <div>{{ items.optionDes }}</div>
                          <div>{{ items.careAdvice }}</div> -->
                        </div>
                      </div>
                      <div style="width:40%;border-left:1px solid #333;padding:10px;line-height:25px;">
                        <div v-for="(items,k) in item.value" :key="k" style="margin-bottom:20px">
                          <!-- <span>{{ items.subjectTitle }}</span> -->
                          <!-- <div>{{ items.optionDes }}</div> -->
                          <!-- <div>{{ items.careAdvice }}</div> -->
                          <div>{{ k+1 }}、{{ items.careAdvice }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contract-content-list page-seven" style="page-break-after:always">
                <div class="page-style">
                  <div class="page-style" style="width: 717px;text-align: center; font-size: 36px; font-weight: bold;margin-bottom:40px;">评估报告</div>
                  <div class="reportBorter fontWeight" style="width: 717px;height:40px;line-height:40px;padding:0px 10px;">评估报告三：评估报告的确认</div>
                  <div class="reportBorter fontWeight" style="width: 717px;height:60px;line-height:60px;text-align:center">评估表基本信息</div>
                  <div class="inforStyles" style="width: 717px">
                    <div class="nameInfor">评估表号码<i /></div>
                    <div class="nameValue">{{ reportForm.assessInfo.assessNo }}</div>
                    <div class="idCardInfor">完成日期<i /></div>
                    <div class="idCardValue" style="padding:0;width:220px;">
                      <!-- <span style="width:70px;text-align:right">年</span>
                      <span style="width:60px;text-align:right">月</span>
                      <span style="width:60px;text-align:right;margin-left:10px;">日</span> -->
                      <span style="text-indent:6px">{{ bizAssessInfo.assessCompleteDate }}</span>
                    </div>
                  </div>
                  <div class="inforStyles" style="width: 717px">
                    <div class="nameInfor">区／街镇<i /></div>
                    <div class="nameValue" style="padding:0 5px">
                      <span style="width:55%">区:{{ bizAssessInfo.orgArea }}</span>
                      <span style="width:40%">编号:{{ bizAssessInfo.orgAreaCode }}</span>
                    </div>
                    <div class="idCardValue" style="padding:0 5px">
                      <span style="width:65%">街镇：</span>
                      <span>编号：</span>
                    </div>
                  </div>
                  <div style="display:flex;">
                    <div class="fontWeight" style="width:40px;padding:10px 0;text-align:center;line-height:30px;border-top:1px solid #333;border-left:1px solid #333;">
                      (一)
                      <div style="padding: 0 10px">
                        评 估 师 确 认 完 成
                      </div>
                    </div>
                    <div>
                      <div style="display: flex">
                        <div>
                          <div class="inforStyles">
                            <div class="idCardInfor" style="width:120px;">评估师姓名<i /></div>
                            <div class="idCardValue" style="width:159px;overflow:hidden;line-height:23px;">
                              {{ bizAssessInfo.orderTakingAssessName1 }}
                              <div>{{ bizAssessInfo.orderTakingAssessName2 }}</div>
                            </div>
                          </div>
                          <div class="inforStyles">
                            <div class="idCardInfor" style="width:120px;">联络电话<i /></div>
                            <div class="idCardValue" style="width:159px;line-height:22px">
                              {{ bizAssessInfo.mobile1 }}
                              <div>{{ bizAssessInfo.mobile2 }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="inforStyles" style="border:none;">
                          <div class="idCardInfor" style="height:100px;line-height:100px;text-align:center;border-top:1px solid #333">确认完成</div>
                          <div class="idCardValue" style="width:266px;border-top:1px solid #333;border-right:1px solid #333;height:100px;line-height:100px">{{ reportForm.assessInfoDict.assessTypeName }}</div>
                        </div>
                      </div>
                      <div class="inforStyles">
                        <div class="idCardInfor" style="width:120px">所属单位<i /></div>
                        <div style="padding-left:6px">{{ reportForm.assessInfo.orgName }}</div>
                      </div>
                      <div class="reportBorter" style="height:160px;padding:80px 0 0 20px;display:flex">
                        <div style="width:300px;">
                          <span>评估师签名</span>
                          <span class="page-input" style="width:180px;text-align:center"> {{ bizAssessInfo.orderTakingAssessName1 }}&nbsp;&nbsp;
                              {{ bizAssessInfo.orderTakingAssessName2 }}</span>
                        </div>
                        <div>
                          <span>日期</span>
                          <span class="page-input" style="width:70px;text-align: center" >{{ bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(0, 4) : '' }}</span>年
                          <span class="page-input" style="width:70px;text-align: center" >{{ bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(5, 7) : '' }}</span>月
                          <span class="page-input" style="width:70px;text-align: center" >{{ bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(8, 10) : '' }}</span>日
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div class="fontWeight" style="width:40px;padding:10px 0;text-align:center;line-height:30px;border-top:1px solid #333;border-left:1px solid #333;border-bottom:1px solid #333">
                      (二)
                      <div style="padding: 0 10px">督导员抽查</div>
                    </div>
                    <div>
                      <div style="display:flex">
                        <div>
                          <div class="inforStyles">
                            <div class="idCardInfor" style="width:120px;">督导员姓名<i /></div>
                            <div class="idCardValue" style="width:159px;" />
                          </div>
                          <div class="inforStyles">
                            <div class="idCardInfor" style="width:120px;">联络电话<i /></div>
                            <div class="idCardValue" style="width:159px;" />
                          </div>
                        </div>
                        <div class="inforStyles" style="border:none">
                          <div class="idCardInfor" style="height:100px;line-height:100px;text-align:center;border-top:1px solid #333">抽查结论</div>
                          <div class="idCardValue" style="width:266px;border-top:1px solid #333;border-right:1px solid #333;height:100px;" />
                        </div>
                      </div>
                      <div class="inforStyles">
                        <div class="idCardInfor" style="width:120px">所属单位<i /></div>
                        <div />
                      </div>
                      <div class="reportBorter" style="height:160px;padding:80px 0 0 20px;display:flex;border-bottom:1px solid #333">
                        <div style="width:300px;">
                          <span>督导员姓名</span>
                          <span class="page-input" style="width:180px;text-align:right">（盖章）</span>
                        </div>
                        <div>
                          <span>日期</span>
                          <span class="page-input" style="width:70px;" />年
                          <span class="page-input" style="width:70px;" />月
                          <span class="page-input" style="width:70px;" />日
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="turn-left" @click="turnright"><img src="@/assets/images/left.png" alt=""></div>
          <div class="turn-right" @click="turnLeft"><img src="@/assets/images/right.png" alt=""></div>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="warning" class="base-btn" @click="printsub()">打印保存</el-button>
          <div style="height: 0; width: 0; overflow: hidden"> <button ref="inputResult" v-print="printTest" class="base-btn">打印</button></div>
        </div>
      </el-dialog>
    </div>
    <div class="contract-list">
      <el-dialog
        v-dialogDrag
        width="200px"
        :visible="lookVisibles"
        :close-on-click-modal="false"
        @close="closelookDialogs"
      >
        <div class="contract-content">
          <div id="printTests" class="contract-content-body">
            <div ref="contractContents" class="contract-content-all">
              <!--           风格-->
              <div class="contract-content-list page-three" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;">上海市养老机构照护服务分级评估</div>
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;margin-top:30px">结果告知书</div>

                  <div class="page-content" style="margin-top:100px">
                    <span class="pageStyles" style="width:130px;">申请人姓名 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ baseForm.fullName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles" style="width:130px;">入住机构名称 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.orgName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">组织机构代码 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.organizationCode }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估表编号 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.assessNo }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估类别 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfoDict.assessTypeName }}</span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估次数 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 125px; text-align: right;text-indent: 0;">第</span>
                      <span class="page-input" style="width: 125px; text-align: right;text-indent: 0;">{{ reportForm.assessCount }}</span>
                      <span class="page-input" style="width: 150px; text-align: right;text-indent: 0">次</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">上次评估日期 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.lastTimeAssessDate !== '' && reportForm.lastTimeAssessDate !== null ? reportForm.lastTimeAssessDate : '\\' }}</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">本次评估日期 ：</span>
                    <span class="page-input" style="width: 420px;">
                      <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.thisTimeAssessDate }}</span>
                    </span>
                  </div>
                  <div class="page-content" style="margin-top:30px">
                    <span class="pageStyles">评估师姓名 ：</span>
                    <span class="page-input" style="width: 420px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.orderTakingAssessName1 + ' ' + reportForm.assessInfo.orderTakingAssessName2 }}</span>
                  </div>
                </div>
              </div>

              <div class="contract-content-list page-three" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;">评估结论</div>
                  <div class="page-content" style="margin-top:40px;text-indent:40px;line-height:40px">
                    <span class="page-input" style="width: 120px; text-align: center;text-indent: 0">{{ baseForm.fullName }}</span>老人（身份证号：<span class="page-input" style="width: 240px; text-align: center;text-indent: 0">{{ baseForm.idCard }}</span>），经
                    <span class="page-input" style="width: 250px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.orgName }}</span>（联系电话：
                    <span class="page-input" style="width: 150px; text-align: center;text-indent: 0">{{ orgPhone }}</span>）开展的养老机构照护服务分级评估, 确认您的照护服务分级评估结果为：
                    <!-- <span class="page-input" style="width: 120px; text-align: center;text-indent: 0" />。评估结果有效期为 <span class="page-input" style="width: 160px; text-align: center;text-indent: 0" />至 -->
                    <span class="page-input" style="width: 120px; text-align: center;text-indent: 0">{{ reportForm.assessInfo.assessCareLevel }}</span>。评估结果有效期为 <span class="page-input" style="width: 180px; text-align: center;text-indent: 0">{{ bizAssessInfo.assessCompleteDate }}</span>至
                    <span class="page-input" style="width: 180px; text-align: center;text-indent: 0">{{ bizAssessInfo.expireDate }}</span>。
                  </div>
                  <div class="page-content" style="margin-top:30px;text-indent:40px">
                    <span>根据评估结果,您可以与养老机构协商签订养老服务合同。</span>
                  </div>
                  <div class="page-content" style="margin-top:10px;text-indent:40px">
                    <span>如您对评估结果有异议，可在接到此评估结果告知书后<span class="page-input" style="width: 60px; text-align: center;text-indent: 0">{{ timerData }}</span>个工作日内，通过原申请平台，提出复核申请。</span>
                  </div>
                  <div style="height:80px;padding:30px 0 0 0px;display:flex">
                    <div style="width:280px;margin-right:30px">
                      <span>评估师签名</span>
                      <span class="page-input" style="width:160px; text-align:center">{{ bizAssessInfo.orderTakingAssessName1 }}&nbsp;&nbsp;
                              {{ bizAssessInfo.orderTakingAssessName2 }}</span>
                    </div>
                    <div>
                      <span>日期</span>
                      <span class="page-input" style="width:60px; text-align:center" >{{bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(0, 4) : '' }}</span>年
                      <span class="page-input" style="width:60px; text-align:center" >{{bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(5, 7) : '' }}</span>月
                      <span class="page-input" style="width:60px; text-align:center" >{{bizAssessInfo.assessCompleteDate ? bizAssessInfo.assessCompleteDate.substring(8, 10) : '' }}</span>日
                    </div>
                  </div>
                  <div class="page-content" style="margin-top:30px;">
                    <span> 被评估者或其代理人签字</span>
                  </div>
                  <div class="page-content" style="margin-top:10px;text-indent:40px">
                    <span> 请仔细阅读并了解此次评估结论后，抄录划线黑体字内容并签名。我<span style="font-weight:900">已阅读</span>全部<span style="font-weight:900">评估结论内容</span>，充分<span style="font-weight:900">了解</span>并清楚<span style="font-weight:900">知晓</span>该结论的相关<span style="font-weight:900">信息</span>，<span style="font-weight:900">(认可/不认可)</span>此次评估结论。</span>
                  </div>
                  <div class="page-content" style="margin-top:10px;text-indent:40px;line-height:40px">
                    <span>我<span class="page-input" style="width:120px;" />全部<span class="page-input" style="width:150px;" />，充分<span class="page-input" style="width:120px;" />并清楚<span class="page-input" style="width:100px;" />该结论的相关<span class="page-input" style="width:100px;" />，<span class="page-input" style="width:180px;" />此次评估结论。</span>
                  </div>
                  <div class="page-content" style="margin-top:30px;text-align:right">
                    <span>被评估者签名：</span>
                    <span class="page-input" style="width:160px;text-align:right" />（盖章）
                  </div>
                  <div class="page-content" style="margin-top:30px;text-align:right">
                    <span>代理人签名：</span>
                    <span class="page-input" style="width:160px;text-align:right" />（盖章）
                  </div>
                  <div style="text-align:right;margin-top:30px;">
                    <span class="page-input" style="width:60px;" />年
                    <span class="page-input" style="width:60px;" />月
                    <span class="page-input" style="width:60px;" />日
                  </div>
                </div>
              </div>

              <div class="contract-content-list page-four" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <!-- <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;">服务申请表资料</div> -->
                  <div class="page-style fontWeight" style="margin-bottom:20px">一、个人资料</div>
                  <div class="inforStyles">
                    <div class="nameInfor">姓名<i /></div>
                    <div class="nameValue">{{ baseForm.fullName }}<i /></div>
                    <div class="idCardInfor">身份证号码<i /></div>
                    <div class="idCardValue">{{ baseForm.idCard }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">性别<i /></div>
                    <div class="nameValue">{{ baseForm.sexName }}</div>
                    <div class="idCardInfor">社保卡号<i /></div>
                    <div class="idCardValue">{{ baseForm.socialSecurityArd }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">民族<i /></div>
                    <div class="nameValue">{{ baseForm.nationName }}</div>
                    <div class="idCardInfor">文化程度<i /></div>
                    <div class="idCardValue">{{ baseForm.eduLevelName }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">出生年月<i /></div>
                    <div class="nameValue">{{ baseForm.birthday }}</div>
                    <div class="idCardInfor">曾从事职业<i /></div>
                    <div class="idCardValue">{{ baseForm.jobDes }}</div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">籍贯<i /></div>
                    <div class="nameValue">{{ baseForm.hometown }}</div>
                    <div class="idCardInfor">婚姻状况<i /></div>
                    <div class="idCardValue">{{ baseForm.maritalStatusName }}</div>
                  </div>
                  <!-- <div class="inforStyles" style="height:100%">
                    <div class="nameInfor" style="width:128px;">兴趣爱好<i /></div>
                    <div class="nameValue" style="width:480px;border:none;overflow:hidden;">
                      <span v-for="(item,i) in hobbyList" :key="i">{{ item.itemName }}、</span>
                      <span>{{ form.remark }}</span>
                    </div>
                  </div> -->
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">户籍所在地<i /></div>
                    <div style="width:490px">
                      {{ baseForm.censusAreaCodeLevelName }}\{{ baseForm.censusAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">居住地址<i /></div>
                    <div style="width:490px">
                      {{ baseForm.liveAreaCodeLevelName }}\{{ baseForm.liveAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="height:70px;overflow: hidden;">
                    <div class="nameInfor" style="line-height:70px;">邮编<i /></div>
                    <div class="nameValue" style="line-height:70px">{{ baseForm.placeResidence }}</div>
                    <div class="idCardInfor" style="height:70px;padding:0">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;padding:0 5px">住宅电话<i /></div>
                      <div style="height:34px;line-height:30px;padding:0 5px">移动电话<i /></div>
                    </div>
                    <div class="idCardValue" style="height:70px;padding:0">
                      <div style="height:34px;line-height:100%;border-bottom:1px solid #333;width: 250px">{{ baseForm.homePhone }}</div>
                      <div style="height:34px;line-height:30px">{{ baseForm.mobile }}</div>
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">代理人姓名<i /></div>
                    <div class="nameValue">{{ baseForm.agentsName }}</div>
                    <div class="idCardInfor">与申请人关系<i /></div>
                    <div class="idCardValue">{{ baseForm.agentsRelation }}</div>
                  </div>
                  <div class="inforStyles" style="min-height: 50px;height: auto">
                    <div class="nameInfor">代理人地址<i /></div>
                    <div style="width:480px">
                      {{ baseForm.agentsLiveAreaCodeLevelName }} {{ baseForm.agentsLiveAddr }}
                    </div>
                  </div>
                  <div class="inforStyles" style="height:70px;border-bottom:1px solid #333;overflow: hidden;">
                    <div class="nameInfor" style="line-height:70px;">邮编<i /></div>
                    <div class="nameValue">{{ baseForm.agentsPlaceResidence }}</div>
                    <div class="idCardInfor" style="height:70px;padding:0">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;padding:0 5px">住宅电话<i /></div>
                      <div style="height:34px;line-height:30px;padding:0 5px">移动电话<i /></div>
                    </div>
                    <div class="idCardValue" style="height:70px;padding:0">
                      <div style="height:34px;line-height:30px;border-bottom:1px solid #333;width: 250px">{{ baseForm.agentsHomePhone }}</div>
                      <div style="height:34px;line-height:30px">{{ baseForm.agentsMobile }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contract-content-list page-five" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style fontWeight" style="margin-bottom:20px;">二、目前生活状况</div>
                  <div class="inforStyles">
                    <div class="nameInfor">经济状况<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.economicStateName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">居住状况<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.liveStateName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">长护险评估等级<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.longTermLevelName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">宗教信仰<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.faithName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor" style="width:130px;">兴趣爱好<i /></div>
                    <div class="nameValue" style="width:480px;border:none;overflow:hidden; padding-left: 5px">
                      <span v-for="(item,i) in hobbyList" :key="i">{{ item.itemName }}、</span>
                      <span>{{ form.remark }}</span>
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">家庭支持<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.homeSupportName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">社会参与<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.socialActivitiesName }}
                    </div>
                  </div>
                  <div class="inforStyles">
                    <div class="nameInfor">帮助照料<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.whoHelpsCareName }}
                    </div>
                  </div>
                  <div class="inforStyles" style="border-bottom:1px solid #333">
                    <div class="nameInfor">就医方式<i /></div>
                    <div style="width:490px; padding-left: 5px">
                      {{ baseForm.medicalTreatmentName }}
                    </div>
                  </div>
                </div>
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style fontWeight" style="margin-bottom:20px;">三、健康状况说明</div>
                  <div style="height:120px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">既往疾病说明</div>
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
                  </div>
                  <div style="height:120px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">现有疾病说明</div>
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
                  </div>
                  <div style="height:120px;border:1px solid #333;padding:10px">
                    <div class="fontWeight" style="margin-bottom:10px;">现服药情况</div>
                    <span>{{ baseForm.currentTakeMedicine }}</span>
                  </div>
                  <!-- <div class="page-style" style="margin:20px 0">三、其他特殊情况说明</div>
                  <div style="height:180px;border:1px solid #333;padding:10px">{{ otherSpecialDesc }}</div> -->
                </div>
              </div>
              <!-- <div class="contract-content-list page-five" style="page-break-after:always">
                <div class="page-style" style="padding: 30px 30px 0px 30px">
                  <div class="page-style" style="margin-bottom:20px;">二、健康状况说明</div>
                  <div style="height:180px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div style="margin-bottom:10px;">既往疾病说明</div>
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
                  </div>
                  <div style="height:180px;border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333;padding:10px">
                    <div style="margin-bottom:10px;">现有疾病说明</div>
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
                  </div>
                  <div style="height:150px;border:1px solid #333;padding:10px">
                    <div style="margin-bottom:10px;">现服药情况</div>
                    <span>{{ baseForm.currentTakeMedicine }}</span>
                  </div>
                  <div class="page-style" style="margin:20px 0">三、其他特殊情况说明</div>
                  <div style="height:180px;border:1px solid #333;padding:10px">{{ otherSpecialDesc }}</div>
                </div>
              </div> -->
              <!-- <div class="contract-content-list page-six" style="page-break-after:always">
                <div class="page-style">
                  <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;margin-bottom:40px;">评估报告</div>
                  <div class="reportBorter" style="height:40px;line-height:40px;padding:0px 10px;">评估报告一：分值设定和照护服务分级划分</div>
                  <div class="reportBorter" style="height:60px;line-height:60px;;display:flex">
                    <div style="width:50%;border-right:1px solid #333;text-align:center">照护服务分级评分参考值</div>
                    <div style="width:50%;text-align:center">评估分数总结</div>
                  </div>
                  <div style="display:flex">
                    <div style="width:50%">
                      <div v-for="(item,i) in reportForm.careService" :key="i" class="inforStyles">
                        <span style="width:40%;text-align:center;border-right:1px solid #333">{{ item.level }}</span>
                        <span style="width:60%;text-align:center">{{ item.score }}</span>
                      </div>
                    </div>
                    <div style="width:50%;border-top:1px solid #333;border-right:1px solid #333">
                      <div style="display:flex;border-bottom:1px solid #333">
                        <div style="width:40%;text-align:center;border-right:1px solid #333" :style="{lineHeight:length*25-1+'px'}">评估总分</div>
                        <div style="width:60%;text-align:center" :style="{lineHeight:length*25-1+'px'}">{{ reportForm.assessInfo.assessScore }}</div>
                      </div>
                      <div style="display:flex">
                        <div style="width:40%;text-align:center;border-right:1px solid #333" :style="{lineHeight:length*25-1+'px'}">照护等级</div>
                        <div style="width:60%;text-align:center" :style="{lineHeight:length*25-1+'px'}">{{ reportForm.assessInfo.assessCareLevel }}</div>
                      </div>
                    </div>
                  </div>
                  <div style="height:80px;border:1px solid #333;line-height:80px;">
                    <div style="width:20%;height:80px;border-right:1px solid #333;text-align:center">结论备注</div>
                    <span />
                  </div>
                </div>
              </div> -->

              <div class="contract-content-list page-six" style="page-break-after:always">
                <div class="page-style">
                  <!-- <div class="page-style" style="text-align: center; font-size: 36px; font-weight: bold;margin-bottom:40px;">评估报告</div> -->
                  <!-- <div class="reportBorter" style="height:40px;line-height:40px;padding:0px 10px;">评估报告二：分值设定和照护服务分级划分</div> -->
                  <div style="border-top:1px solid #333;border-left:1px solid #333;border-right:1px solid #333">
                    <!-- <div style="height:60px;line-height:60px;;display:flex;border-bottom:1px solid #333">
                      <div style="width:20%;text-align:center">现有疾病</div>
                      <div style="width:80%;border-left:1px solid #333;text-align:center">照护建议</div>
                    </div>
                    <div v-for="(item,i) in reportForm.assessObjExtendList" :key="i" style="border-bottom:1px solid #333;display:flex;align-items: center;">
                      <div style="width:20%;text-align:center;">{{ item.itemName }}</div>
                      <div style="width:80%;border-left:1px solid #333;padding:10px;line-height:25px">{{ item.remark }}</div>
                    </div> -->
                    <div style="height:60px;line-height:60px;;display:flex;border-bottom:1px solid #333">
                      <div class="fontWeight" style="width:20%;text-align:center">评估项目</div>
                      <div class="fontWeight" style="width:40%;border-left:1px solid #333;text-align:center;">项目指标</div>
                      <div class="fontWeight" style="width:40%;border-left:1px solid #333;text-align:center;line-height:30px">评估说明
                        <div>(得分为4、8、10的选项提示)</div>
                      </div>
                    </div>
                    <div v-for="(item) in reportForm.abnormalOptions" :key="item.project" style="border-bottom:1px solid #333;display:flex;height:100%;position:relative">
                      <div style="width:20%;position:relative" class="fontWeight">
                        <span style="width:100%;text-align:center;yellow;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">{{ item.project }}</span>
                      </div>
                      <div style="width:40%;border-left:1px solid #333;padding:10px;line-height:25px;text-align:center;display:flex;flex-direction: column;align-content: space-between;justify-items: center;">
                        <div v-for="(items,k) in item.value" :key="k" style="margin-bottom:15px">
                          <span>{{ k+1 }}、{{ items.subjectTitle }}</span>
                          <!-- <div style="width:100%;text-align:left;">{{ items.optionDes }}</div> -->
                          <!-- <div>{{ items.careAdvice }}</div> -->
                        </div>
                      </div>
                      <div style="width:40%;border-left:1px solid #333;padding:10px;line-height:25px;">
                        <div v-for="(items,k) in item.value" :key="k" style="margin-bottom:20px">
                          <!-- <span>{{ items.subjectTitle }}</span> -->
                          <div>{{ k+1 }}、{{ items.optionDes }}</div>
                          <!-- <div>{{ k+1 }}、{{ items.careAdvice }}</div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="turn-left" @click="turnrights"><img src="@/assets/images/left.png" alt=""></div>
          <div class="turn-right" @click="turnLefts"><img src="@/assets/images/right.png" alt=""></div>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="warning" class="base-btn" @click="printsubs()">打印保存</el-button>
          <div style="height: 0; width: 0; overflow: hidden"> <button ref="inputResults" v-print="'printTests'" class="base-btn">打印</button></div>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { getToken } from '@/utils/auth'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getEsimateReportList } from '@/api/evaluationManagement/esimateReport'
import { getParameterSet } from '@/api/evaluationManagement/basicInformation'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getOrgList } from '@/api/evaluationManagement/basicInformation'
import { exportAssessmentReport } from '@/api/importExportApi'
import {
  getEditAssess,
  getQuestionnaire,
  getViewAssesss,
  getHobby
} from '@/api/evaluationManagement/assessmentForm'
import { canExport, exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant } from '@/common/constant'
export default {
  name: 'AssessmentForm',
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      clickTime: 0,
      clickTimes: 0,
      contractContent: {},
      uploadUrl: '',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      printTest: {
        id: 'printTest',
        popTitle: ''
      },
      printTests: {
        id: 'printTests',
        popTitle: ''
      },
      fileList: [],
      lookVisible: false,
      lookVisibles: false,
      // 修改评估日期对象
      form: {
        areaCode: '', // 区域表单ID
        reportStatus: '', // 报告状态
        assessEmpName: '', // 评估师
        assessType: '', // 评估类别
        assessCareLevel: '', // 照护等级
        reportStatusTab: 'normal,coming_soon_expiring,review_review_ing,ongoing_evaluation_ing,to_be_reviewed,be_expired,ongoing_evaluation_completed,review_review_completed', // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      tableData: [],
      reportStateOption: [], // 报告状态
      evaluationCategoryOptions: [], // 评估类别
      levelCareOption: [],
      restaurants: [],
      servicePeriod: [],
      areaCode: [],
      idEdit: true,
      total: 0,
      tabs: [
        {
          name: '全部',
          type: 'normal,coming_soon_expiring,review_review_ing,ongoing_evaluation_ing,to_be_reviewed,be_expired,ongoing_evaluation_completed,review_review_completed'
        },
        // {
        //   name: '未生效',
        //   type: 'to_be_reviewed'
        // },
        // {
        //   name: '有效中',
        //   type: 'normal,expiring,review_review_ing,ongoing_evaluation_ing,coming_soon_expiring'
        // },
        // {
        //   name: '已失效',
        //   type: 'be_expired,review_review_completed,ongoing_evaluation_completed'
        // }
        {
          name: '有效中',
          type: 'normal,coming_soon_expiring,review_review_ing,ongoing_evaluation_ing'
        },
        {
          name: '待终评',
          type: 'to_be_reviewed'
        },
        {
          name: '已失效',
          type: 'be_expired,ongoing_evaluation_completed,review_review_completed'
        }
      ],
      activeName: 'normal,coming_soon_expiring,review_review_ing,ongoing_evaluation_ing,to_be_reviewed,be_expired,ongoing_evaluation_completed,review_review_completed',
      baseForm: {},
      reportForm: {
        assessInfo: {
          assessScore: '',
          assessCareLevel: ''
        },
        assessInfoDict: {

        }
      },
      bizAssessInfo: {},
      orgPhone: '',
      length: 0,
      hobbyList: [],
      historyList: [],
      newList: [],
      otherSpecialDesc: '',
      timerData: '',
      loadRow: ''
    }
  },
  mounted() {
    this.getSelect()
    this.getOrgOption()
    this.getData()
    this.idEdit = false
  },
  methods: {
    // 下载
    modifyData(assessId) {
      this.getDatas(assessId)
      // getEditAssess({ assessId: assessId }).then(res => {
      //   if (res.code == 0) {
      //     this.baseForm = res.data.bizAssessPerson
      //     this.hobbyList = res.data.bizHealthStatus.data['300']
      //     this.historyList = res.data.bizHealthStatus.data['100']
      //     this.newList = res.data.bizHealthStatus.data['200']
      //   }
      // })
      // getViewAssesss({ assessId: assessId }).then(res => {
      //   if (res.code == 0) {
      //     this.reportForm = res.data
      //     this.length = res.data.careService.length
      //   }
      // })
      // getQuestionnaire({ assessId: assessId }).then(res => {
      //   if (res.code == 0) {
      //     this.otherSpecialDesc = res.data.otherSpecialDesc
      //   }
      // })
      this.lookVisible = true
    },
    modifyDatas(assessId) {
      this.getDatas(assessId)
      this.lookVisibles = true
    },
    getDatas(assessId) {
      getEditAssess({ assessId: assessId }).then(res => {
        if (res.code == 0) {
          this.baseForm = res.data.bizAssessPerson
          this.orgPhone = res.data.bizAssessInfo.orgPhone
          this.bizAssessInfo = res.data.bizAssessInfo
          this.hobbyList = res.data.bizHealthStatus.data['300']
          this.historyList = res.data.bizHealthStatus.data['100']
          this.newList = res.data.bizHealthStatus.data['200']
        }
      })
      getViewAssesss({ assessId: assessId }).then(res => {
        if (res.code == 0) {
          this.reportForm = res.data
          this.length = res.data.careService.length
        }
      })
      getQuestionnaire({ assessId: assessId }).then(res => {
        if (res.code == 0) {
          this.otherSpecialDesc = res.data.otherSpecialDesc
        }
      })
      getParameterSet({}).then(res => {
        const title = '评估报告生成后,'
        if (res.data && res.data.length) {
          this.timerData = res.data.filter((item) => item.title === title)[0].value1 || ''
        }
      })
    },
    closelookDialog() {
      this.lookVisible = false
      this.clickTime = 0
      this.$refs.contractContent.style.left = 0
    },
    closelookDialogs() {
      this.lookVisibles = false
      this.clickTimes = 0
      this.$refs.contractContents.style.left = 0
    },
    printsub() {
      this.$refs.inputResult.click()
    },
    printsubs() {
      this.$refs.inputResults.click()
    },
    turnLeft() {
      if (this.clickTime < 7) {
        this.clickTime++
        this.$refs.contractContent.style.left = -794 * this.clickTime + 'px'
      } else {
        this.$message.warning('已经是最后一页！')
      }
    },
    turnright() {
      if (this.clickTime > 0) {
        this.clickTime--
        this.$refs.contractContent.style.left = -794 * this.clickTime + 'px'
      } else {
        this.$message.warning('已经是第一页！')
      }
    },
    turnLefts() {
      if (this.clickTimes < 4) {
        this.clickTimes++
        this.$refs.contractContents.style.left = -794 * this.clickTimes + 'px'
      } else {
        this.$message.warning('已经是最后一页！')
      }
    },
    turnrights() {
      if (this.clickTimes > 0) {
        this.clickTimes--
        this.$refs.contractContents.style.left = -794 * this.clickTimes + 'px'
      } else {
        this.$message.warning('已经是第一页！')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件`)
    },
    handlePictureCardPreview(file) {
    },
    // 上传成功后
    handleAvatarSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.$message.success(response.data)
        this.$router.push({
          path: `/esimateReport/details/${this.loadRow.id}`,
          query: {
            modelType: 'look',
            _title: `查看${this.loadRow.fullName}`,
            isLoad: 'yes'
          }
        })
      } else {
        this.$message.error(response.data)
      }
    },
    beforeAvatarUpload(file, id, row) {
      // return new Promise((resolve, reject) => {
      //   this.$nextTick(() => {
      //     this.uploadUrl = `${process.env.VUE_APP_BASE_API}/assess/assess/report/upload/${id}`
      //     resolve()
      //   })
      // })
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传图片只能是jpeg,png,jpg,bmp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      if (isJPG && isLt2M) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.uploadUrl = `${process.env.VUE_APP_BASE_API}/assess/assess/report/upload/${id}`
            this.loadRow = row
            resolve()
          })
        })
      }
      return isJPG && isLt2M
      // return isJPG && isLt2M
    },
    uploadUrlFun(url) {
      if (url) {
        return url
      } else {
        return ''
      }
    },
    // 评估师身份验证
    beginAssess(id, fullName) {
    },
    toDetail(row) {
      this.$router.push({
        path: `/esimateReport/details/${row.id}`,
        query: {
          modelType: 'look',
          _title: `查看${row.fullName}`
        }
      })
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估报告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const params = _.cloneDeep(this.form)
          delete params.pageNum
          delete params.pageSize
          exportAssessmentReport(params).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return
                  this.$router.push('/dataManagement/exportManagement')
                }
              })
            } else {
              this.$message.warning(response.msg)
            }
          }).catch((error) => {
            this.$message.warning(error.msg)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 编辑
    handleEdit(row, type) {
      let title = ''
      if (type === 'review_assessment') {
        title = `确定为${row.fullName}老人提交复核评估申请吗？`
      } else {
        title = `确定为${row.fullName}老人提交持续评估申请吗？`
      }
      this.$confirm(title, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: `/esimateApply/details/${row.assessApplyId}?`,
          query: {
            modelType: 'edit',
            _title: `编辑${row.fullName}`,
            applyId: row.id,
            typeApply: type
          }
        })
      }).catch(() => {

      })
    },
    handleClick() {
      this.form.reportStatusTab = this.activeName
      this.getData()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    onReset() {
      this.areaCode = []
      this.servicePeriod = []
      this.form = {
        areaCode: '', // 区域表单ID
        reportStatus: '', // 报告状态
        assessEmpName: '', // 评估师
        assessType: '', // 评估类别
        assessCareLevel: '', // 照护等级
        reportStatusTab: this.activeName, // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      }
      this.idEdit = !this.idEdit
      this.getData()
    },
    async getData() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        params.areaCode = ''
      }
      if (this.servicePeriod && this.servicePeriod.length) {
        params.startTime = getDate_YMD(this.servicePeriod[0]) + ' 00:00:00'
        params.endTime = getDate_YMD(this.servicePeriod[1]) + ' 23:59:59'
      }
      await getEsimateReportList(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    getSelect() {
      const dictKey = [
        'assessment_status', // 评估状态
        'evaluation_category', // 类别
        'report_status', // 报告状态
        'level_of_care' // 等级
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
            const dict = response.data
            for (const key in dict) {
              switch (key) {
                case 'assessment_status':
                  this.assessmentStatusOptions = dict[key]
                  break
                case 'evaluation_category':
                  this.evaluationCategoryOptions = dict[key]
                  break
                case 'report_status':
                  this.reportStateOption = dict[key]
                  break
                case 'level_of_care':
                  this.levelCareOption = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    getOrgOption() {
      getOrgList().then((res) => {
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach((item) => {
              this.restaurants.push({
                value: item.orgName
              })
            })
          }
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/form.css";
  @import "~@/styles/font/font.css";
  .instituWrap {
    padding: 20px 20px 40px 20px;
  }
  .fontFamily{
    font-family:'fontFamily';
  }
  .contract-body {
    // 覆盖vue 日期组件的 默认长度样式
    .el-range-input {
      width: 150px!important;
    }
    .el-range-separator {
      width: 40px!important;
    }
  }
  .fontWeight{
    font-weight: bold;
  }
  .instituDiv {
    float: left;
    width: 140px;
    height: 140px;
    text-align: center;
    cursor: pointer;
    background-color: #DAE9F5;
    transition: all 0.5s;
  }

  .instituDiv .iconfont {
    font-size: 100px;
    display: block;
    color: #147FD9;
  }

  .instituDiv .text {
    font-size: 16px;
    color: #147FD9;
  }

  .instituDiv:first-child {
    margin-right: 40px;
  }

  .instituDiv:hover {
    background-color: #bfdcf3;
  }
  .assist-s {
    .el-table th, .el-table td {
      text-align: center;
    }
  }
  .contract-content {
    width: 794px;
    height: 1123px;
    margin: 0 auto;
    position: relative;
    border:1px solid #eeeeee;
    .contract-content-body {
      width: 794px;
      height: 1123px;
      overflow: hidden;
      position: relative;
      .contract-content-all {
        width: 16674px;
        height: 1123px;
        position: absolute;
        top:0;
        left: 0;
      }
      .contract-content-list {
        width: 794px;
        height: 1123px;
        float: left;
        font-size: 16px;
        padding: 80px 60px 40px 60px;
      }
    }
    .turn-left {
      position: absolute;
      top: 50%;
      margin-top: -20px;
      left: -70px;
      cursor: pointer;
    }
    .turn-right {
      position: absolute;
      top: 50%;
      margin-top: -20px;
      right: -70px;
      cursor: pointer;
    }
  }
  .page-style {
    width: 100%;
    font-family: '宋体';
  }
  .t-center {
    text-align: center;
  }
  .page-input {
    border-bottom: 1px solid #000000;
    display: inline-block;
    // text-align: center;
    height: 32px;
    vertical-align: bottom;
    line-height: 32px;
  }
  .page-content {
    line-height: 30px;
    table {
      border: 1px solid #000000;
      border-collapse:collapse;
      border-spacing:0;
      width:100%;
      th {
        border: 1px solid #000000;
        font-weight: bold;
        text-align: center;
        padding: 5px 5px;
        text-indent: 0;
      }
      th:nth-child(1) {
        width: 240px;
      }
      td{
        border: 1px solid #000000;
        text-align: center;
        padding: 5px 5px;
        text-indent: 0;
      }
    }
  }
  .page-weight {
    font-weight: bold;
  }
  .page-check {
    width: 12px;
    height: 12px;
    border: 1px solid #333333;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 3px;
    margin-right: 5px;
  }
  .check-it {
    background: #333333;
  }
  .contract-list {
    .el-dialog {
      margin-bottom: 50px;
      min-width: 1200px !important;
    }
    .el-dialog__body {
      height: 1300px;
      max-height: 1300px;
    }
  }
  .contract-upload {
    .el-dialog {
      max-width: 1300px;
    }
  }
  .contant-add-dailog {
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .new-daillog-body {
        height: 50vh;
        padding: 20px 36px 66px 36px;
        overflow: auto;
        .el-main {
          overflow: visible;
        }
      }
    }
    .el-dialog__footer {
      position: absolute;
      width: 100%;
      background: #ffffff;
      bottom: 0;
      z-index: 99;
    }
  }
  .pageStyles{
    display: inline-block;
    width:140px;
    font-weight: 700;
  }
  .inforStyles{
    height:50px;
    border-top:1px solid #333;
    border-left:1px solid #333;
    border-right:1px solid #333;
    display: flex;
    line-height: 48px;
    i{
      display: inline-block;
      padding-left:100%
    }
    span{
      display: inline-block;
    }
    .nameInfor{
      width:130px;
      padding:0 5px;
      text-align: justify;
      font-weight: bold;
      border-right:1px solid #333;
    }
    .nameValue{
      width:180px;
      padding-left:5px;
      border-right: 1px solid #333;
    }
    .idCardInfor{
      width:130px;
      text-align: justify;
      padding:0 5px;
      font-weight: bold;
      border-right: 1px solid #333;
    }
    .idCardValue{
      width:180px;
      padding-left:5px;
    }
  }
  .reportBorter{
    border-top:1px solid #333;
    border-right:1px solid #333;
    border-left:1px solid #333;
  }
  div {
    box-sizing: border-box;
  }
</style>
