<template>
  <el-container>
    <el-main v-if="modelType === 'look'" class="tableContainer contract-look" style="padding: 0">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="合同信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />基本信息
                  </span>
                </div>
              </template>
              <div>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">合同编号：</span>
                    <span>{{ contractList.contractNo }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">签署日期：</span>
                    <span>{{ getDate(contractList.signDate) }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">康复辅具租赁点：</span>
                    <span>{{ contractList.storeName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">经办人（康复辅助技术咨询师）：</span>
                    <span>{{ contractList.adapterName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">经办人身份证号：</span>
                    <span>{{ contractList.adapterIdCard }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">签署地点：</span>
                    <span>{{ contractList.storeAddr }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">承租人姓名：</span>
                    <span>{{ contractList.fullName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">承租人身份证号：</span>
                    <span>{{ contractList.idCard }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">承租人详细地址：</span>
                    <span>{{ contractList.liveAddr }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">代理人姓名：</span>
                    <span>{{ contractList.agentName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">代理人身份证号：</span>
                    <span>{{ contractList.agentIdCard }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">代理人统一社会信用代码：</span>
                    <span>{{ contractList.agentOrgCode }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">补贴类型：</span>
                    <span>{{ lookSubsidyType }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">合同状态：</span>
                    <span>{{ status }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">到期日期：</span>
                    <span>{{ contractList.expireDate }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />租赁详情
                  </span>
                </div>
              </template>
              <div>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">产品类别：</span>
                    <span>{{ contractList.ctyName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">产品名称及型号：</span>
                    <span>{{ contractList.productName }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">产品数量：</span>
                    <span>{{ contractList.productQty }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">单次租赁价（元）：</span>
                    <span>{{ contractList.oneRentPrice }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">补贴租赁价（元）：</span>
                    <span>{{ contractList.subsidyAfterOneRentPrice }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">保证金（元）：</span>
                    <span>{{ contractList.bondMoney }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">支付方式（元）：</span>
                    <span>{{ lookPayType }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />其他信息
                  </span>
                </div>
              </template>
              <div>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">创建人：</span>
                    <span>{{ contractList.createBy }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">创建时间：</span>
                    <span>{{ getDate(contractList.createTime) }}</span>
                  </el-col>
                </el-row>
                <!-- 终止 -->
                <el-row v-if="statusValue === 'terminated'" :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">终止操作人：</span>
                    <span>{{ contractList.updateBy }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">终止操作时间：</span>
                    <span>{{ getDate(contractList.updateTime) }}</span>
                  </el-col>
                </el-row>
                <el-row v-if="statusValue === 'terminated'" :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">合同终止日期：</span>
                    <span>{{ getDate(contractList.contractEndDate) }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">合同终止原因：</span>
                    <span>{{ lookContractEndCause }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">备注：</span>
                    <span>{{ contractList.remark }}</span>
                  </el-col>
                </el-row>
                <!-- 作废 -->
                <el-row v-if="statusValue === 'out_of_date'" :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">作废操作人：</span>
                    <span>{{ contractList.updateBy }}</span>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <span class="contrat-title">作废操作时间：</span>
                    <span>{{ getDate(contractList.updateTime) }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="合同附件" name="file">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />附件信息
                  </span>
                </div>
              </template>
              <div>
                <el-row :gutter="0">
                  <el-col :md="24" :lg="24">
                    <span class="contrat-title">身份证：</span>
                    <el-row class="agencyImageRow" style="border:0">
                      <viewer :images="idCardPic">
                        <el-col v-for="(item, index) in idCardPic" class="agencyImageCol" :key="index" style="cursor: pointer">
                          <img :src="item" class="agencyImage">
                        </el-col>
                      </viewer>
                    </el-row>
                  </el-col>
                  <el-col :md="24" :lg="24">
                    <span class="contrat-title">补贴证明：</span>
                    <el-row class="agencyImageRow" style="border:0">
                      <viewer :images="idCardPic">
                        <el-col v-for="(item,index) in idCardPic" class="agencyImageCol" :key="index" style="cursor: pointer">
                          <img :src="item" class="agencyImage">
                        </el-col>
                      </viewer>
                    </el-row>
                  </el-col>
                  <el-col :md="24" :lg="24">
                    <span class="contrat-title">其他证明：</span>
                    <el-row class="agencyImageRow" style="border:0">
                      <el-col v-for="(item,index) in otherFile" class="agencyImageCol">
                        <a class="agencyImage" style="border: 0" target="_blank" :href="item.url" download="filename.ext">
                          {{ item.name }}
                        </a>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-if="modelType === 'add'" class="tableContainer" style="padding: 0">
      <div class="contract">
        <div class="contract-tab">
          <div v-if="step === 'one'" class="contract-tab-list">
            <span class="num-style it-num">1</span>
            <span>填写基本信息</span>
            <span class="line-style" />
            <span class="num-style">2</span>
            <span>填写租赁详情</span>
            <span class="line-style" />
            <span class="num-style">3</span>
            <span>打印租赁合同</span>
          </div>
          <div v-if="step === 'two'" class="contract-tab-list">
            <span><img src="@/assets/images/select.png" alt=""></span>
            <span>填写基本信息</span>
            <span class="line-style" />
            <span class="num-style it-num">2</span>
            <span>填写租赁详情</span>
            <span class="line-style" />
            <span class="num-style">3</span>
            <span>打印租赁合同</span>
          </div>
          <div v-if="step === 'three'" class="contract-tab-list">
            <span><img src="@/assets/images/select.png" alt=""></span>
            <span>填写基本信息</span>
            <span class="line-style" />
            <span><img src="@/assets/images/select.png" alt=""></span>
            <span>填写租赁详情</span>
            <span class="line-style" />
            <span class="num-style it-num">3</span>
            <span>打印租赁合同</span>
          </div>
        </div>
        <div class="contract-form">
          <div v-show="step === 'one'" class="contract-form-part">
            <el-form
              ref="form_one"
              key="form_base"
              :model="form"
              :rules="isEditForm?rulesForm:null"
              label-width="130px"
            >
              <div style="border-bottom: 1px dashed #e1e1e1">
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'合同编号':'合同编号：'">
                      <el-input
                        v-if="isEditForm"
                        placeholder="合同编号自动生成"
                        clearable
                        style="width:100%;"
                        :disabled="true"
                      />
                      <span v-else>{{ form.productCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'签署日期':'签署日期：'" prop="signDate">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.signDate"
                        type="date"
                        placeholder="请选择签署日期"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @change="productNameChange"
                      />
                      <span v-else>{{ form.signDate }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'康复辅具社区租赁点':'康复辅具社区租赁点：'" prop="storeId" class="long-item">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.storeId"
                        placeholder="请选择康复辅具社区租赁点"
                        clearable
                        style="width:100%;"
                        filterable
                        @keyup.enter.native="submitBtn"
                        @change="changeSroreId"
                      >
                        <el-option
                          v-for="item in storeList"
                          :key="item.orgId"
                          :label="item.orgName"
                          :value="item.orgId"
                        />
                      </el-select>
                      <div v-else>
                        <span v-for="(item, index) in storeList" :key="index">
                          <span v-if="item.orgId === form.storeId">{{ item.orgName }}</span>
                        </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'经办人（康复辅助技术咨询师）':'经办人（康复辅助技术咨询师）：'" prop="adapterId" class="long-item">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.adapterId"
                        filterable
                        placeholder="请选择经办人"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                        @change="changeAdapterId"
                      >
                        <el-option
                          v-for="item in adapterList"
                          :key="item.id"
                          :label="item.fullName"
                          :value="item.id"
                        />
                      </el-select>
                      <span v-else>{{ form.storeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'经办人身份证号':'经办人身份证号：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="idCard"
                        placeholder="请输入经办人身份证号"
                        clearable
                        style="width:100%;"
                        :disabled="true"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'签署地点':'签署地点：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="addr"
                        placeholder="请输入签署地点"
                        clearable
                        style="width:100%;"
                        :disabled="true"
                      />
                      <span v-else>{{ form.signAddress }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div style="margin: 20px 0">
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'承租人身份证号':'承租人身份证号：'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.idCard"
                        placeholder="请输入承租人身份证号"
                        clearable
                        style="width:100%;"
                        max-length="18"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        @input="idCardSearch"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'承租人姓名':'承租人姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.fullName"
                        placeholder="请输入承租人姓名"
                        clearable
                        style="width:100%;"
                        max-length="20"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'承租人家庭电话':'承租人家庭电话：'" prop="homePhone">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.homePhone"
                        placeholder="请输入承租人家庭电话"
                        clearable
                        style="width:100%;"
                        max-length="30"
                      />
                      <span v-else>{{ form.homePhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'承租人手机号码':'承租人手机号码：'" prop="mobile">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.mobile"
                        placeholder="请输入承租人手机号码"
                        clearable
                        style="width:100%;"
                        max-length="30"
                      />
                      <span v-else>{{ form. mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="承租人所属区域" style="margin-right: 0" prop="liveAree">
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="liveAree"
                        :form-code="form.liveAree"
                        :width="'100%'"
                        :scope="'All'"
                        @getAreaCode="getAreaCode"
                        @keyup.enter.native="onSubmit"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'承租人详细地址':'承租人详细地址：'" prop="liveAddr">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.liveAddr"
                        placeholder="请输入承租人详细地址"
                        clearable
                        style="width:100%;"
                        max-length="100"
                      />
                      <span v-else>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :lg="8">
                    <el-form-item :label="isEditForm?'有无代理人':'有无代理人：'" prop="hasAgent">
                      <el-radio-group v-model="form.hasAgent">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="12">
                    <el-form-item v-if="form.hasAgent === '1'" prop="isAgentNote">
                      <el-checkbox-group v-model="form.isAgentNote">
                        <el-checkbox label="代理人授权书" value="1" disabled />
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'代理人姓名':'代理人姓名：'" prop="agentName">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentName"
                        placeholder="请输入代理人姓名"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.agentName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'代理人身份证号':'代理人身份证号：'" prop="agentIdCard">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentIdCard"
                        placeholder="请输入代理人身份证号"
                        clearable
                        style="width:100%;"
                        max-length="18"
                      />
                      <span v-else>{{ form.agentIdCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'代理人统一社会信用代码':'代理人统一社会信用代码：'" prop="agentOrgCode" class="long-item">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentOrgCode"
                        placeholder="请输入代理人统一社会信用代码"
                        clearable
                        style="width:100%;"
                        max-length="20"
                      />
                      <span v-else>{{ form.agentOrgCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'代理人电话':'代理人电话：'" prop="agentPhone">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentPhone"
                        placeholder="请输入代理人电话"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.agentPhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'代理人手机号码':'代理人手机号码：'" prop="agentMobile">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentMobile"
                        placeholder="请输入代理人手机号码"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.agentMobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.hasAgent === '1'" :md="8" :lg="8" />
                  <el-col :md="8" :lg="8">
                    <el-form-item :label="isEditForm?'是否享受补贴':'是否享受补贴：'" prop="isSubsidy">
                      <el-radio-group v-model="form.isSubsidy">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.isSubsidy === '1'" :md="12" :lg="12">
                    <el-form-item prop="isSubsidyNote">
                      <el-checkbox-group v-model="form.isSubsidyNote">
                        <el-checkbox label="补贴授权书" disabled />
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.isSubsidy === '1'" :md="24" :lg="24">
                    <el-form-item :label="isEditForm?'补贴类型':'补贴类型：'" prop="subsidyType">
                      <el-radio-group v-model="form.subsidyType">
                        <el-radio v-for="(item, index) in subsidiesData" :key="index" :label="item.dictValue">{{ item.dictLabel }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <div v-show="step === 'two'" class="contract-form-part">
            <el-row :gutter="0">
              <el-form ref="form_two" key="form_base" :model="form" :rules="isEditForm?rulesForm:null" label-width="130px">
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'产品类别':'产品类别：'" prop="ctyIds">
                    <el-cascader
                      v-if="isEditForm"
                      v-model="form.ctyIds"
                      :options="ctyIdList"
                      placeholder="请选择产品类别"
                      :props="defaultProps"
                      clearable
                      style="width:100%"
                      @change="productIdChange"
                    />
                    <span v-else>{{ form.ctyName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'产品名称及型号':'产品名称及型号：'" prop="productId">
                    <el-select
                      v-if="isEditForm"
                      v-model="form.productId"
                      placeholder="请选择产品名称及型号"
                      clearable
                      style="width:100%;"
                      @keyup.enter.native="submitBtn"
                      @change="productNameChange"
                    >
                      <el-option
                        v-for="item in productList"
                        :key="item.productId"
                        :label="item.productName"
                        :value="item.productId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'产品数量':'产品数量：'" prop="productQty">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.productQty"
                      placeholder="请输入产品数量"
                      clearable
                      style="width:70%;"
                      max-length="50"
                      :disabled="true"
                      @keyup.enter.native="submitBtn"
                    />
                    <el-select
                      v-if="isEditForm"
                      v-model="form.productUnit"
                      placeholder=""
                      clearable
                      style="width:25%;"
                      @keyup.enter.native="submitBtn"
                    >
                      <el-option
                        v-for="item in unitData"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                    <span v-else>{{ form.productUnit }}</span>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'租期':'租期：'" prop="rentType">
                    <el-select
                      v-if="isEditForm"
                      v-model="form.rentType"
                      placeholder="请选择租期"
                      clearable
                      style="width:100%;"
                      :disabled="true"
                      @keyup.enter.native="submitBtn"
                    >
                      <el-option
                        v-for="item in monthData"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'单次租赁价（元）':'单次租赁价（元）：'" prop="singlePrice">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="singlePrice"
                      placeholder="请输入单次租赁价"
                      clearable
                      style="width:100%;"
                      max-length="50"
                      :disabled="true"
                      @keyup.enter.native="submitBtn"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'保证金（元）':'保证金（元）：'" prop="bondMoney">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="form.bondMoney"
                      type="number"
                      placeholder="请输入保证金"
                      clearable
                      style="width:100%;"
                      max-length="50"
                      @keyup.enter.native="submitBtn"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-if="form.isSubsidy === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'补贴后单次租赁价（元）':'补贴后单次租赁价（元）：'" prop="afterPrice" class="long-item">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="afterPrice"
                      placeholder="请输入补贴后单次租赁价"
                      clearable
                      style="width:100%;"
                      max-length="50"
                      :disabled="true"
                      @keyup.enter.native="submitBtn"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-if="form.isSubsidy === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <el-form-item :label="isEditForm?'本次补贴金额（元）':'本次补贴金额（元）：'" prop="currentPrice" class="long-item">
                    <el-input
                      v-if="isEditForm"
                      v-model.trim="currentPrice"
                      placeholder="请输入本次补贴金额"
                      clearable
                      style="width:100%;"
                      max-length="50"
                      :disabled="true"
                      @keyup.enter.native="submitBtn"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-if="form.isSubsidy === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                  <span style="color: #3367d6; line-height: 40px; cursor: pointer; margin-left: 20px" @click="openHisDialog">历史补贴记录</span>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item :label="isEditForm?'支付方式':'支付方式：'" prop="payType">
                    <el-radio-group v-model="form.payType">
                      <el-radio v-for="(item, index) in paymentData" :key="index" :label="item.dictValue">{{ item.dictLabel }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-show="step === 'three'" class="contract-form-part">
            <div class="contract-content">
              <div id="printTest" class="contract-content-body">
                <div ref="contractContent" class="contract-content-all">
                  <!--           风格-->
                  <div class="contract-content-list page-one" style="page-break-after:always">
                    <div class="page-style" style="text-align: right;padding: 30px 30px 0px 30px">
                      合同编号：<span class="page-input" style="width: 200px">{{ codeContract }}</span>
                    </div>
                    <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 80px">上海市康复辅具社区租赁服务</div>
                    <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 60px">设备租赁合同</div>
                    <div class="page-style t-center">
                      租赁设备：<span class="page-input" style="width: 420px;margin-top: 60px;text-align: center">{{ productName }}</span>
                    </div>
                    <div class="page-style t-center">
                      出租人（甲方）：<span class="page-input" style="width: 373px;margin-top: 70px">{{ ISPName }}</span>
                    </div>
                    <div class="page-style t-center">
                      承租人（乙方）：<span class="page-input" style="width: 373px;margin-top: 20px">{{ form.fullName }}</span>
                    </div>
                    <div class="page-style t-center">
                      康复辅具社区租赁点：<span class="page-input" style="width: 340px;margin-top: 80px">{{ storeName }}</span>
                    </div>
                    <div class="page-style t-center">
                      经办人（康复辅助技术咨询师）：<span class="page-input" style="width: 262px;margin-top: 20px">{{ adapterName }}</span>
                    </div>
                    <div class="page-style t-center">
                      经办人身份证号码：<span class="page-input" style="width: 356px;margin-top: 20px">{{ idCard }}</span>
                    </div>
                    <div class="page-style t-center">
                      签署日期：<span class="page-input" style="width: 420px;margin-top: 80px">{{ form.signDate }}</span>
                    </div>
                    <div class="page-style t-center">
                      签署地点：<span class="page-input" style="width: 420px;margin-top: 20px">{{ addr }}</span>
                    </div>
                    <div class="page-style t-center" style="font-size: 14px;margin-top: 100px">1 / 21</div>
                  </div>
                  <div class="contract-content-list page-two" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div style="text-align: center; font-size: 24px; font-weight: bold">上海市康复辅具社区租赁服务设备租赁合同</div>
                      <div style="text-align: center; font-size: 24px; font-weight: bold;padding-top: 20px">专用条款</div>
                      <div class="page-content" style="margin-top: 40px; text-indent: 32px">本合同当事人根据有关法律法规之规定，在平等、自愿基础上， 经协商一致，同意按下述条款签订本合同。</div>
                      <div class="page-content" style="margin-top: 40px; text-indent: 32px"><span class="page-weight">重要说明</span>：下列文件（附件如有，请在方框内勾选）共同作为本
                        合同的组成部分，彼此互为解释和说明：</div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 52px">1. 《上海市康复辅具社区租赁服务设备租赁合同专用条款》；</div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 52px">2. 《上海市康复辅具社区租赁服务设备租赁合同通用条款》；</div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" />3. 附件一：《授权及声明书》（如乙方为低保低收入人群、
                        并有意申请享受补
                        <div style="text-indent:75px">贴价格的）；</div>
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" />4. 附件二：《责任声明书》以及代理人身份证复印件（如乙
                        方有代理人的）。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        如果本合同与附件之间存在矛盾，则优先以本合同约定为准。
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          1. 定义
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        本合同中的下列术语应解释为：
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.1 “<span class="page-weight">本合同</span>”指《上海市康复辅具社区租赁服务设备租赁合同》，
                        包括专用条<div style="text-indent: 72px">款、通用条款及附件（如有）。</div>
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.2 “<span class="page-weight">专用条款</span>”指《上海市康复辅具社区租赁服务设备租赁合同通用条款》。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.3 “<span class="page-weight">通用条款</span>”指《上海市康复辅具社区租赁服务设备租赁合同
                        通用条款》。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.4 “<span class="page-weight">租赁设备</span>”具有专用条款第 2.1 条约定之含义。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.5 “<span class="page-weight">交付地点</span>”具有专用条款第 3.1 条约定之含义。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.6 “<span class="page-weight">全额租金</span>”具有专用条款第 4.1 条约定之含义。
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 58px">2 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-three" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.7 “<span class="page-weight">补贴后乙方租金</span>”具有专用条款第 4.1 条约定之含义。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.8 “<span class="page-weight">租金</span>”指全额租金及/或补贴后乙方租金（视上下文义而定）。
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        1.9 “<span class="page-weight">保证金</span>”具有专用条款第 5.1 条约定之含义。
                      </div>
                      <div class="page-content" style="margin-top: 15px; text-indent: 35px">
                        除另有明确说明外，专用条款中的词语具有与通用条款相同的含义。
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          2. 租赁设备情况
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        2.1 甲方出租给乙方的设备（“租赁设备”）如下：
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px">
                        <table>
                          <tr>
                            <th>商品名称</th>
                            <th>规格型号</th>
                            <th>计量单位</th>
                            <th>数量</th>
                          </tr>
                          <tr>
                            <td>{{ productName }}</td>
                            <td>/</td>
                            <td>{{ unitName }}</td>
                            <td>1</td>
                          </tr>
                        </table>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px">
                        2.2 租赁设备情况的其他约定以通用条款第 2 条约定为准。
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          3. 交付时间和地点
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        3.1 甲、乙双方同意，甲方应于本合同签署且乙方全额支付租金之日起 7 日内<div style="text-indent:68px">向乙方交付租赁设备至如下地点（“交付地点”）：</div>
                      </div>
                      <div class="page-content" style=" margin-left: 68px;width: 500px;border-bottom:1px solid #000000;margin-top: 10px">
                        {{ form.liveAddr }}
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          4. 租金、支付方式和期限
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        4.1 乙方应在本合同签署的当日，向甲方全额支付租金，先付后用。甲、乙双方约
                        <div style="text-indent:68px">定，租赁设备按次租赁，且租赁设备租金按次收取，每 1 次租赁的租金为人</div>
                        <div style="text-indent:68px">民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0">{{ singlePrice }}</span>元（“全额租金”）。特别的，如乙方享受上海市康复辅具社</div>
                        <div style="text-indent:68px">区租赁服务补贴价格的，每 1 次租赁补贴金额为人民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0">{{ currentPrice === '' || currentPrice === null ? '/' : currentPrice }}</span>元，进而</div>
                        <div style="text-indent:68px">乙方实际应自行承担的每 1 次租赁租金为人民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0;height: 30px">{{ afterPrice === '' || currentPrice === null ? '/' : afterPrice }}</span>元（“补贴后乙</div>
                        <div style="text-indent:68px">方租金”）</div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 58px">3 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-four" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        4.2 甲、乙双方同意并确认，每 1 次租赁的期限为自本合同签署之日起 6 个月，
                        <div style="text-indent:68px">前述期限届满的，本次租赁终止。由于租赁设备租金按次收取，乙方因任何原</div>
                        <div style="text-indent:68px">因解除本合同或提前返还租赁设备的，仍视为 1 次完整的租赁，租金仍按 1 </div>
                        <div style="text-indent:68px">次租赁计算，且租金的全部或分均不予减免或返还。进一步的，乙方提前返还</div>
                        <div style="text-indent:68px">租赁设备的，视为本次租赁终止，乙方需要继续承租租赁设备的，则由甲、乙</div>
                        <div style="text-indent:68px">双方另行协商并签署书面协议。</div>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        4.3 租金的支付方式如下：乙方有权选择如下支付方式（请在以下方框内勾选）：
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" :class="[form.payType === 'bank_transfer' ? 'check-it' : '']" style="margin-left: 27px" /> 银行转账：甲方的收款账户如下：
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 88px">
                        开户行：<span class="page-input" style="width: 350px; text-align: center;text-indent: 0" />
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 88px">
                        名&nbsp称：<span class="page-input" style="width: 350px; text-align: center;text-indent: 0" />
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 88px">
                        账&nbsp号：<span class="page-input" style="width: 350px; text-align: center;text-indent: 0" />
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check " :class="[form.payType === 'r_card_s' ? 'check-it' : '']" style="margin-left: 27px" /> 敬老卡结算；
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check " :class="[form.payType === 'pos_settlement' ? 'check-it' : '']" style="margin-left: 27px" /> POS 机刷卡结算；
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" :class="[form.payType === 'cash_payment' ? 'check-it' : '']" style="margin-left: 27px" /> 现金支付：甲方应于乙方支付的同时向乙方开具等额收据；
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" :class="[form.payType === 'pay_by_alipay' ? 'check-it' : '']" style="margin-left: 27px" /> 支付宝支付：甲方的支付宝收款账号如下：
                        <span class="page-input" style="width: 150px; text-align: center;text-indent: 0" />
                      </div>
                      <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                        <span class="page-check" :class="[form.payType === 'wechat_payment' ? 'check-it' : '']" style="margin-left: 27px" />微信支付：甲方的微信收款账号如下：
                        <span class="page-input" style="width: 188px; text-align: center;text-indent: 0" />
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        4.4 租金、支付方式和期限的其他约定以通用条款第 4 条约定为准。
                      </div>
                      <div class="page-content" style="margin-top: 20px;">
                        <span class="page-weight">
                          5. 保证金
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 15px; text-indent: 35px">
                        5.1 甲、乙双方约定，乙方应在本合同签署当日向甲方支付保证金人民币
                        <div style="text-indent:63px"><span class="page-input" style="width: 120px; text-align: center;text-indent: 0">{{ form.bondMoney }}</span>元（“保证金”），保证金不得超过上海市康复辅具社区租</div>
                        <div style="text-indent:63px">赁服务主管部门规定的建议金额（即全额租金金额）。保证金支付方式与专用</div>
                        <div style="text-indent:63px">条款第 4.3 条约定的租金支付方式相同，甲方收取保证金后应向乙方开具收</div>
                        <div style="text-indent:63px">款凭证。</div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 48px">4 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-five" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        5.2保证金的其他约定以通用条款第 5 条约定为准。
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          6. 其他约定
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                        6.1 租赁用途、租赁设备的交付与验收、租赁设备的维修、租赁设备的返还、禁止
                        <div style="text-indent:68px">转租、转让和交换、陈述与保证、解除本合同的条件、违约责任、不可抗力、</div>
                        <div style="text-indent:68px">合同的变更、税费、争议解决、通知与送达、保密条款、合同生效和其它相关</div>
                        <div style="text-indent:68px">的约定以通用条款约定为准</div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        （本页以下无正文）
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 653px">5 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-six" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content">
                        （本页为合同签章页）
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          <span class="page-weight">出 租 人（甲方）：</span>
                          <span class="page-input" style="width: 130px; text-align: center;text-indent: 0;color: #ffffff;" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          <span class="page-weight">承 租 人（乙方）：</span>
                          <span class="page-input" style="width: 130px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          盖&nbsp章：
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          签&nbsp字：
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          授权代表（签字）：
                          <span class="page-input" style="width: 135px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          身份证号码：
                          <span class="page-input" style="width: 180px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          地&nbsp址：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          <span class="page-weight">代 理 人（如有）：</span>
                          <span class="page-input" style="width: 130px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          邮政编码：
                          <span class="page-input" style="width: 200px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          代理人签字/盖章：
                        </div>
                      </div>
                      <div style="width: 100%;height: 1px; float:left;" />
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          电&nbsp话：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          代理人（自然人）身份证号码：
                        </div>
                      </div>
                      <div style="width: 100%;height: 1px; float:left;" />
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          手&nbsp机：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          <span class="page-input" style="width: 286px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div style="width: 100%;height: 1px; float:left;" />
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          统一社会信用代码：
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          地&nbsp址：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div style="width: 100%;height: 1px; float:left;" />
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          <span class="page-input" style="width: 286px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          邮政编码：
                          <span class="page-input" style="width: 200px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div style="width: 100%;height: 1px; float:left;" />
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          开户银行：
                          <span class="page-input" style="width: 200px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          电&nbsp话：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          开户行号：
                          <span class="page-input" style="width: 200px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          手&nbsp机：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-content">
                        <div style="width: 50%; float: left;margin-top: 20px">
                          账&nbsp号：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                        <div style="width: 50%; float: left;margin-top: 20px">
                          传&nbsp真：
                          <span class="page-input" style="width: 216px; text-align: center;text-indent: 0;color: #ffffff" />
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 314px; float: left">6 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-seven" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div style="text-align: center; font-size: 24px; font-weight: bold">上海市康复辅具社区租赁服务设备租赁合同</div>
                      <div style="text-align: center; font-size: 24px; font-weight: bold;padding-top: 20px">通用条款</div>
                      <div class="page-content" style="margin-top: 40px; text-indent: 32px">本合同当事人根据有关法律法规之规定，在平等、自愿基础上，
                        经协商一致，同意按下述条款签订本合同。</div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          1. 定义
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        本合同中的下列术语应解释为：
                      </div>
                      <div class="page-content" style="margin-top: 15px; text-indent: 35px">
                        1.1 “<span class="page-weight">产品说明书</span>”系指租赁设备的产品说明书、产品目录、图纸、 操作手册、
                        <div style="text-indent: 72px">使用说明、维护手册和/或服务指南等及任何相关 技术文件等配套文件之统
                        </div>
                        <div style="text-indent: 72px">
                          称。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.2 “<span class="page-weight">验收标准</span>”系指租赁设备具备产品说明书所述的标准并能够正常使用。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.3 “<span class="page-weight">验收</span>”系指甲、乙双方依据验收标准，在双方约定时间内确认合同项下的租
                        <div style="text-indent: 72px">赁设备符合达到验收标准之行为</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.4 “<span class="page-weight">验收合格日</span>”具有通用条款第 6.4 条约定的含义。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.5 “<span class="page-weight">日全额占用费标准</span>”系指每日按照“全额租金金额÷180 日”计算所得金额
                        <div style="text-indent: 72px">的标准。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.6 “<span class="page-weight">日占用费标准</span>”系指每日按照“租金金额÷180 日”计算所得金额的标准。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.7 “<span class="page-weight">第三方</span>”系指签订本合同的甲、乙双方外的任何第三人。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.8 “<span class="page-weight">不可抗力</span>”系指在本合同签署后发生的、本合同签署时不能预 见的、其发
                        <div style="text-indent: 72px">生与后果是无法避免或克服的、妨碍任何一方全部 或部分履约的所有事件。</div>
                        <div style="text-indent: 72px">上述事件包括地震、台风、水灾等自然灾害，战争，国际或国内运输中断，</div>
                        <div style="text-indent: 72px">流行病，以及根据中国法律或一般国际商业惯例认作不可抗力的其他事件。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        1.9 “<span class="page-weight">日</span>”、“<span class="page-weight">月</span>”或“<span class="page-weight">年</span>”系指日历日、日历月和日历年。
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 31px">7 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-eight" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px">
                        1.10 “<span class="page-weight">工作日</span>”系指法定工作日（即非双休日或法定节假日的日 子）。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        除另有明确说明外，通用条款中的词语具有与专用条款相同的含义。
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          2. 租赁设备情况
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        2.1 甲方承诺并保证租赁设备在租赁存续期内符合以下条件：
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (1) 甲方保证对租赁设备享有合法的所有权；
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (2) 在乙方按照租赁用途妥善使用的前提下，租赁设备完全符合产品说明书所
                        <div style="text-indent: 96px">述标准以及国家和地方技术质量规范或标 准（如有），且具备产品说明</div>
                        <div style="text-indent: 96px">书所述的性能并能够正常使用；</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (3) 甲方交付的租赁设备需具备出厂检验合格证；
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (4) 如租赁设备为医疗器械的，需按照有关法律法规、行业监管的要求进行备
                        <div style="text-indent: 96px">案或办理医疗器械注册手续；</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (5) 不侵犯第三方的合法权利，且不存在包括专利权、著作权、 商标权和工
                        <div style="text-indent: 96px">业设计权等在内的任何知识产权纠纷和商业秘密纠纷，如果任何第三方提</div>
                        <div style="text-indent: 96px">出侵权指控，甲方须负责自行或安排相关方与第三方交涉并承担由此发生</div>
                        <div style="text-indent: 96px">的一切责任、费用和经济赔偿；</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 65px">
                        (6) 甲方保证在租赁设备上不存在任何担保物权、第三人在先 权利、查封扣
                        <div style="text-indent: 96px">押等任何瑕疵，包括但不限于抵押权、质押 权等。</div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          3. 租赁用途
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; font-weight: bold">
                        3.1 <div style="border-bottom: 1px solid #333333;display: inline">乙方向甲方承诺，租赁设备仅供乙方本人作为康复辅具使用，如租赁设备为</div>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline">固定式设备的，则租赁设备仅能在交付地点使用。</span></div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 132px">8 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-night" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; font-weight: bold; line-height: 35px">
                        3.2 <div style="border-bottom: 1px solid #333333;display: inline">乙方仅能将租赁设备用于产品说明书所述的用途，并应按照产品说明书告知</div>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline">的、且符合常识的使用方式进行使用。</span></div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; font-weight: bold; line-height: 35px">
                        3.3 <div style="border-bottom: 1px solid #333333;display: inline">租赁期限内，乙方应按照产品说明书以及常识负责租赁设备的日常清洁维护</div>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline">，因此产生的费用由乙方承担。</span></div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; font-weight: bold; line-height: 35px">
                        3.4 <div style="border-bottom: 1px solid #333333;display: inline">如因乙方违反本合同约定使用租赁设备，或因乙方故意/过失，造成租赁设</div>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline">备损坏或造成乙方或第三方损失的，甲方不承担任
                          何违约或赔偿责任。</span></div>
                      </div>
                      <div class="page-content" style="margin-top: 40px;">
                        <span class="page-weight">
                          4. 租金、支付方式和期限
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px; line-height: 35px">
                        4.1 如于本合同签署之日，乙方系民政部门认定的低保低收入人 群，并有意申请
                        <div style="text-indent: 68px">从而享受上海市康复辅具社区租赁服务补贴价格的，乙方应签署格式和内容如</div>
                        <div style="text-indent: 68px">附件一的《授权及声明书》。 若经民政部门认定乙方不符合低保低收入人群</div>
                        <div style="text-indent: 68px">要求的，乙方应于收到甲方通知之日起 7 日内向甲方全额补交差额部分租金</div>
                        <div style="text-indent: 68px">（即全额租金与补贴后乙方租金之间的差额），支付方式与专用条款第4.3条</div>
                        <div style="text-indent: 68px"> 约定的租金支付方式相同。</div>
                      </div>
                      <div class="page-content" style="margin-top: 35px; text-indent: 35px; font-weight: bold;line-height: 35px">
                        <div style="text-indent: 68px">如乙方未填写附件一《授权及声明书》，视为乙方不以其作为低保低收入人</div>
                        <div style="text-indent: 68px">群申请享受上海市康复辅具社区租赁服务补贴价格，无论其是否为民政部门</div>
                        <div style="text-indent: 68px">认定的低保低收入人群。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; line-height: 35px">
                        4.2在乙方支付租金后，甲方应向乙方开具税务机关认可的、足额的纸质发票。
                      </div>
                      <div class="page-content" style="margin-top: 40px;">
                        <span class="page-weight">
                          5. 保证金
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px; line-height: 35px">
                        5.1 如乙方未履行本合同项下付款义务的，则甲方有权从保证金中扣除乙方应付款
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 82px">9 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-ten" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; ">
                        项。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        5.2 如乙方支付的保证金因被甲方按照本合同约定部分或全部扣除的，乙方应在
                        <div style="text-indent: 68px">收到甲方通知之日起 3 日内，将保证金补足。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        5.3租赁关系终止时，甲方应当在租赁关系终止之日起 3 个工作日内将剩余保证
                        <div style="text-indent: 68px">金一次性无息归还乙方。</div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          6. 租赁设备的交付与验收
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; line-height: 35px">
                        6.1 甲方在交付租赁设备时，应提前至少 3 个工作日将具体交付时 间通知乙方。
                        <div style="text-indent: 68px">如乙方收货不便的，应提前至少 1 个工作日告知甲方并与甲方协商重新确定</div>
                        <div style="text-indent: 68px">交付时间。如因乙方收货不便导致甲方未能于本合同签署之日起 1 周内交付</div>
                        <div style="text-indent: 68px">租赁设备的，甲方不承担任何违约或补偿责任。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px">
                        6.2 甲方向乙方交付租赁设备的，应同时交付租赁设备的中文产品说明书。
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; line-height: 35px">
                        6.3 甲方应自行或安排第三方将租赁设备运送至交付地点，并承担因此发生的费
                        <div style="text-indent: 68px">用。租赁设备运抵交付地点后，对于需要安装调试的租赁设备，甲方应负责自</div>
                        <div style="text-indent: 68px">行或安排第三方在交付地点进行现场安装、调试和启动监督，同时甲方应负责</div>
                        <div style="text-indent: 68px">自行或安排第三方对乙方及乙方指定的第三方进行免费培训，培训地点为租赁</div>
                        <div style="text-indent: 68px">设备安设备安装现场（即交付地点）。因本条约定所产生的费用（包括但不</div>
                        <div style="text-indent: 68px">限于：租赁设备组装的专用工具和辅助材料费用、安装调试或培训人员费用</div>
                        <div style="text-indent: 68px">等）均由甲方承担。</div>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px; line-height: 35px">
                        6.4 乙方应于租赁设备运抵交付地点并安装调试完毕后当场进行验收。<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">如租赁设</span>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">设备符合验收标准的，乙方应当场签收租赁设备
                          交接单完成验收。乙方接</span></div>
                        <div style="text-indent: 68px"><span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">收租赁设备后未签署租赁设备交接
                          单、也未在接收租赁设备之日起 5 日内</span></div>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            对租赁设备的质量提出异议的，视为租赁设备符合验收标准。
                          </span>“<span class="page-weight">验收合格</span>
                        </div>
                        <div style="text-indent: 68px">
                          <span class="page-weight">
                            日
                          </span>”为乙方签 署租赁设备交接单之日或上述视为验收合格之日。
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 31px">10 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-eleven" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; line-height: 35px">
                        6.5 如验收结果未达到验收标准的，乙方有权要求补足、更换或维修，甲方应根据
                        <div style="text-indent: 68px">乙方收到甲方通知之日起 3 日内，将保证金补足。的要求在验收不合格之日</div>
                        <div style="text-indent: 68px">起 15 日内予以补足、更换或维修并达到验收标准，因此产生的费用均由甲方</div>
                        <div style="text-indent: 68px">
                          承担。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          7. 租赁设备的维修
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        7.1 在租赁存续期内，甲方应负责对租赁设备进行维修，<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">且未经甲方书面同意，</span>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">乙方不得私自维修改装设备</span>
                          。租赁设备故障报修的响应和维修时间为 24 个
                        </div>
                        <div style="text-indent: 68px">小时。若租赁设备故障在乙方报修后 24 个小时内无法排除的，甲方应在乙方</div>
                        <div style="text-indent: 68px">报修之日起 7 日内更换符合验收标准的租赁设备，因此产生的费用均由甲方</div>
                        <div style="text-indent: 68px">承担。如甲方在乙方报修之日起 30 日内租赁设备故障仍无法排除且甲方亦未</div>
                        <div style="text-indent: 68px">为乙方更换符合验收标准的租赁设备的，乙方有权聘请其它第三方进行维修，</div>
                        <div style="text-indent: 68px">但该部分费用由甲方承担。</div>
                      </div>
                      <div class="page-content" style="margin-top: 35px;text-indent: 35px; line-height: 35px">
                        7.2 甲方同意，所有租赁设备维修服务方式均为甲方自行或指定第三方上门保修，
                        <div style="text-indent: 68px">即由甲方自行或指定第三方派员到租赁设备使用现场（即交付地点）维修，由</div>
                        <div style="text-indent: 68px">此产生的一切费用均由甲方承担。</div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          8. 租赁设备的返还
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        8.1 <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">乙方应在租赁终止的当日返还租赁设备并确保租赁设备完好且能够正常使用</span>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">（自然损耗除外），同时，乙方应于同日返还 租赁设备的中文产品说明</span>
                        </div>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            书。但如租赁设备需要拆装的，租赁设备应由甲方或其指定第三方进行拆
                          </span>
                        </div>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            装，因此产生的费用均由甲方承担。乙方应提供任何必要的配合，且乙方承
                          </span>
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 124px">11 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-twelen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; line-height: 35px">
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            诺不擅自进行拆装。
                          </span>
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        8.2 <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">如乙方未按照上条约定返还租赁设备的，每逾期返还 1 日，乙方应按照日全</span>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            额占用费标准向甲方支付租赁设备占用费，
                          </span>但如因甲方未能及时上门进行
                        </div>
                        <div style="text-indent: 68px">
                          拆装的除外。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        8.3 乙方返还租赁设备时，应经甲方验收符合本合同第 8.1 条约定，并办理相关
                        <div style="text-indent: 68px">
                          的书面移交手续。
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            如返还的租赁设备存在损坏，甲方有权要求乙方在书面移
                          </span>
                        </div>
                        <div style="text-indent: 68px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            交单证上签字确认，并有权要求乙方进行赔偿。
                          </span>
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 40px;">
                        <span class="page-weight">
                          9. 禁止转租、转让和交换
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        9.1 <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                          乙方不得将租赁设备转租、出借、调换使用或以其它方式供第三方使用。</span>
                      </div>
                      <div class="page-content" style="margin-top: 30px;text-indent: 35px; line-height: 35px">
                        9.2 未经乙方书面同意，甲方不得在租赁存续期内将租赁设备进行转让或设置任何
                        <div style="text-indent: 68px">
                          担保权利或第三人在先权利。租赁存续期内，甲方转让租赁设备时，同等条件
                        </div>
                        <div style="text-indent: 68px">
                          下乙方享有优先购买权。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 40px;">
                        <span class="page-weight">
                          10. 陈述与保证
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 35px;text-indent: 35px; line-height: 40px">
                        10.1 甲方向乙方陈述及保证：
                        <div style="text-indent: 72px">(1)甲方具有独立法人资格，有相应的经营范围及专业技术服务能力；</div>
                        <div style="text-indent: 72px">(2)甲方具有《医疗器械经营企业许可证》或《医疗器械经营备案凭</div>
                        <div style="text-indent: 94px">证》；</div>
                        <div style="text-indent: 72px">(3)甲方始终遵守法律法规、部门规章和政策性文件的相关规定；</div>
                        <div style="text-indent: 72px">(4)甲方同意主动接受上海市康复辅具社区租赁服务相关主管部门及其委</div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 50px">12 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-thirteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; line-height: 40px">
                        <div style="text-indent: 94px">
                          托单位的监管，且未受到上海市康复辅助器具社区租赁服务相关主管
                        </div>
                        <div style="text-indent: 94px">
                          部门或其委托单位关于终止或暂停营业的处罚；
                        </div>
                        <div style="text-indent: 72px">
                          (5)甲方同意接受上海市康复辅具社区租赁服务相关主管部 门及其委托单
                        </div>
                        <div style="text-indent: 94px">
                          位或指定第三方随时进行的检查（包括但不限于：上门核查、资料核
                        </div>
                        <div style="text-indent: 94px">
                          查、对支付真实性的检查等），甲方应保存设备租赁合同、支付凭证
                        </div>
                        <div style="text-indent: 94px">
                          等相应材料并配合上述检查（包括但不限于：提供相关信息或资料
                        </div>
                        <div style="text-indent: 94px">
                          等）；
                        </div>
                        <div style="text-indent: 72px">
                          (6)甲方依据本合同提交的任何材料、文件或信息均真实、准确、完整且
                        </div>
                        <div style="text-indent: 94px">
                          无误导。
                        </div>
                      </div>
                      <div class="page-content" style="text-indent: 35px; margin-top: 30px; line-height: 40px">
                        10.2 乙方向甲方陈述及保证：
                        <div style="text-indent: 98px">
                          (1)<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            如乙方享受上海市康复辅具社区租赁服务补贴的，乙方确认其符合
                          </span>
                        </div>
                        <div style="text-indent: 120px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            上海市康复辅具社区租赁服务相关主管部门规定的补贴条件；
                          </span>
                        </div>
                        <div style="text-indent: 98px">
                          (2)乙方始终遵守法律法规、部门规章和政策性文件的相关规定；
                        </div>
                        <div style="text-indent: 98px">
                          (3)<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            乙方同意配合上海市康复辅具社区租赁服务相关主管部门及其委托
                          </span>
                        </div>
                        <div style="text-indent: 120px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            单位对租赁设备及其使用情况的检查，包括但不限于：上门核查、
                          </span>
                        </div>
                        <div style="text-indent: 120px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            资料核查、对租赁设备性能或状态的检查、对租赁设备用途的检查，
                          </span>
                        </div>
                        <div style="text-indent: 120px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            乙方应给予任何必要的配合（包括但不限于：提供相关信息或资料
                          </span>
                        </div>
                        <div style="text-indent: 120px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            等）；
                          </span>
                        </div>
                        <div style="text-indent: 98px">
                          (4)乙方依据本合同提交的任何材料、文件或信息均真实、准确、完整且
                        </div>
                        <div style="text-indent: 98px">
                          无误导。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;">
                        <span class="page-weight">
                          11. 解除本合同的条件
                        </span>
                      </div>
                      <div class="page-content" style="text-indent: 35px; line-height: 30px">
                        11.1 甲、乙双方同意在租赁期内，有下列情形之一的，本合同及本次租赁终止：
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 50px">13 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-forteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; line-height: 40px">
                        <div style="text-indent: 72px">
                          (1)甲、乙双方协商一致并签订书面解除合同的；
                        </div>
                        <div style="text-indent: 72px">
                          (2)本合同履行过程中，遇国家政策变动或上海市级机关文件调整，而本
                        </div>
                        <div style="text-indent: 94px">
                          合同若继续履行将有违上述政策的；
                        </div>
                        <div style="text-indent: 72px">
                          (3)本合同继续履行将违反上海市康复辅助器具社区租赁服务相关主管部
                        </div>
                        <div style="text-indent: 94px">
                          门或其委托单位监管要求，或上海市康复辅助器具社区租赁服务相关
                        </div>
                        <div style="text-indent: 94px">
                          主管部门或其委托单位要求本合同终止的；
                        </div>
                        <div style="text-indent: 72px">
                          (4)合同继续履行将损害国家和社会公共利益，或者违反法律法规的；
                        </div>
                        <div style="text-indent: 72px">
                          (5)甲方破产或丧失清偿能力或履行本合同的能力，乙方死亡、失踪或
                        </div>
                        <div style="text-indent: 94px">
                          被宣告死亡或失踪的。
                        </div>
                      </div>
                      <div class="page-content" style="text-indent: 35px; line-height: 30px; margin-top: 30px">
                        11.2 甲、乙双方同意，有下列情形之一的，甲方可书面通知乙方解除本合同并终
                        <div style="text-indent: 72px">
                          止本次租赁：
                        </div>
                      </div>
                      <div class="page-content" style="text-indent: 35px; line-height: 40px">
                        <div style="text-indent: 72px">
                          (1)乙方未按照专用条款第 4.1 条约定在本合同签署的当日支付租金的，或
                          <div style="text-indent: 94px">
                            者乙方拖延支付本合同项下其他任何乙方应 支付款项超过 15 日的；
                          </div>
                        </div>
                        <div style="text-indent: 72px">
                          (2) 其他法律法规规定的解除事由发生。
                        </div>
                      </div>
                      <div class="page-content" style="text-indent: 35px; line-height: 30px; margin-top: 30px">
                        11.3 甲、乙双方同意，有下列情形之一的，乙方可书面通知甲方解除本合同并终
                        <div style="text-indent: 72px">
                          止本次租赁：
                        </div>
                      </div>
                      <div class="page-content" style="text-indent: 35px; line-height: 40px">
                        <div style="text-indent: 72px">
                          (1)甲方未按照本合同约定交付租赁设备超过 15 日的；
                        </div>
                        <div style="text-indent: 72px">
                          (2)甲方交付的租赁设备未通过验收且甲方自验收不合格之日起 30 日内未
                        </div>
                        <div style="text-indent: 94px">
                          能予以补足、更换或维修并达到验收标准 的；
                        </div>
                        <div style="text-indent: 72px">
                          (3)租赁期限内，租赁设备发生故障，且甲方在乙方报修之日起 30 日内未
                        </div>
                        <div style="text-indent: 94px">
                          能按照本合同约定排除故障或更换租赁设备的；
                        </div>
                        <div style="text-indent: 72px">
                          (4)甲方提供的租赁设备存在质量问题导致乙方或第三方的人身或财产遭受
                        </div>
                        <div style="text-indent: 94px">
                          损失的；
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 30px">14 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-fifteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px; line-height: 40px">
                        <div style="text-indent: 72px">
                          (5)其他法律法规规定的解除事由发生。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          12. 违约责任
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.1 甲方逾期交付租赁设备或逾期交付租赁设备的中文产品说明书的，每逾期 1
                        <div style="text-indent: 72px">
                          日，甲方应支付相当于全额租金 0.5‰的违约金。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.2 甲方交付租赁设备不能通过验收且甲方未在本合同约定的期限内进行补足、
                        <div style="text-indent: 72px">
                          更换或维修的，每逾期 1 日，甲方应支付相当于全额租金 0.5‰的违约金。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.3 租赁期限内，租赁设备发生故障，甲方在乙方报修后 24 个小时内无法排
                        <div style="text-indent: 72px">
                          除，并且在乙方报修后 7 日内未为乙方更换符合验收标准的租赁设备设备
                        </div>
                        <div style="text-indent: 72px">
                          的，每逾期 1 日，甲方应支付相当于全额租金 0.5‰的违约金。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.4 如因租赁设备存在质量问题导致乙方或第三方的人身或财产遭受损失的，甲
                        <div style="text-indent: 72px">
                          方应向乙方支付相当于全额租金 30%的违约金。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.5 乙方逾期支付租金或本合同项下任何乙方应支付款项的，每逾期 1 日，乙
                        <div style="text-indent: 72px">
                          方应支付相当于应付未付款项 0.5‰的违约金。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 38px">
                        12.6 若一方存在违约导致合同被解除的，另一方有权要求该方支付全额租金30%
                        <div style="text-indent: 72px">
                          的违约金。进一步的，若甲方存在违约导致合同被解除的，除前述全额租
                        </div>
                        <div style="text-indent: 72px">
                          金 30%的违约金外，乙方还有权要求甲方按照日占用费标准向乙方支付自
                        </div>
                        <div style="text-indent: 72px">
                          合同解除之日至本合同原定租赁期限届满之日的违约金（该等违约金在任
                        </div>
                        <div style="text-indent: 72px">
                          何情况下不应视为租金的返还或退还）。本条约定不影响甲、乙双方行使本
                        </div>
                        <div style="text-indent: 72px">
                          合同项下的其他救济权利。
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 35px">15
                        / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-sixteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="text-indent: 35px;line-height: 38px">
                        12.7 一方违约或存在任何不当行为造成另一方损失的，若本合同约定的违约金不
                        <div style="text-indent: 72px">
                          足以补偿另一方损失的，另一方有权要求违 约方赔偿全部损失。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          13. 不可抗力
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px;line-height: 35px">
                        13.1 遇有不可抗力的一方，应在 1 日内将事件的情况和有关部门出具的证明文
                        <div style="text-indent: 72px">
                          件以书面形式通知另一方。合同双方应尽可能继续履行合同义务，并积极寻
                        </div>
                        <div style="text-indent: 72px">
                          求采取合理的方案履行不受不可抗力影响的其他事项。合同各方应通过友好
                        </div>
                        <div style="text-indent: 72px">
                          协商在合理的时间内达成进一步履行合同的协议。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px;line-height: 35px">
                        13.2 不可抗力使合同的某些内容有变更必要的，双方应通过协商在 3 日内达
                        <div style="text-indent: 72px">
                          成进一步履行合同的协议，因不可抗力致使合同不能履行的，合同终止。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px;line-height: 35px">
                        13.3 任何一方对由于不可抗力造成的部分或全部不能履行本合同不承担违约责
                        <div style="text-indent: 72px">
                          任。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 25px;line-height: 40px">
                        <span class="page-weight">
                          14. 合同的变更
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px;line-height: 35px">
                        14.1 甲、乙双方都不得擅自变更本合同，但合同继续履行将损害国家和社会公
                        <div style="text-indent: 72px">
                          共利益或违反上海市康复辅助器具社区租赁服务相关主管部门或其委托单位
                        </div>
                        <div style="text-indent: 72px">
                          监管要求的除外。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 25px; text-indent: 35px;line-height: 35px">
                        14.2 如必须对合同条款进行改动时，甲、乙双方须共同签署书面文件，作为
                        <div style="text-indent: 72px">
                          合同的补充。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 25px;line-height: 40px">
                        <span class="page-weight">
                          15. 税费
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px;line-height: 35px">
                        15.1 与本合同有关的一切税费均适用中华人民共和国法律法规的相关规定，并由双方按照法律法规规定自行承担。
                        <div style="text-indent: 72px" />
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 30px">16
                        / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-seventeen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="line-height: 40px">
                        <span class="page-weight">
                          16. 争议解决
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        16.1 本合同应按照中华人民共和国的法律（仅为本合同之目的，不包括香港特别
                        <div style="text-indent: 72px">
                          行政区、澳门特别行政区和台湾地区）进行解释。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        16.2 因合同履行中发生的争议，可通过合同当事人双方友好协商解决。协商不成
                        <div style="text-indent: 72px">
                          的，任何一方可<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">提交上海国际经济贸易仲裁委员会/上海国际仲裁中心按照</span>
                        </div>
                        <div style="text-indent: 72px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            该会仲裁规则进行仲裁。
                          </span>
                          仲裁裁决是终局的，对双方当事人均有约束力。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          17. 通知与送达
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        17.1 本合同任何一方给另一方的书面通知，均应发送至本合同签章页约定的地
                        <div style="text-indent: 72px">
                          址；该地址为各方有效的送达地址，除另有证据证明实际送达日期的，如以
                        </div>
                        <div style="text-indent: 72px">
                          平信、挂号信方式送达的，在投递之日（以邮戳为准）起的第 5 日被视为已
                        </div>
                        <div style="text-indent: 72px">
                          送达至被送达方；如以快递方式送达的，在投递之日起的第 3 日被视为已送
                        </div>
                        <div style="text-indent: 72px">
                          达至被送达方；如以直接送达方式送达的，则于另一方签收时被视为已送
                        </div>
                        <div style="text-indent: 72px">
                          达；任何一方不得拒绝签收。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        17.2 若任何一方地址改变的，应在变更前 3 个工作日书面通知另一方，否则应自
                        <div style="text-indent: 72px">
                          行承担通知无法送达或迟延送达的不利后果。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          18. 保密条款
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        18.1 甲、乙双方应对在本合同签订或履行过程中所接触的对方信息，包括但不限
                        <div style="text-indent: 72px">
                          于知识产权、技术资料、技术诀窍、内部管理、客户信息及其他相关信息，
                        </div>
                        <div style="text-indent: 72px">
                          负有保密义务。<span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">但依据法律法规、相关政策、行政命令、上海市康复辅助</span>
                        </div>
                        <div style="text-indent: 72px">
                          <span style="border-bottom: 1px solid #333333;display: inline; font-weight: bold">
                            器具社区租赁服务相关主管部门或其委托单位要求必须予以披露的除外。
                          </span>
                        </div>
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 45px">17 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-eigthteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="line-height: 35px;text-indent: 35px;">
                        18.2 保密期限不受合同有效期的限制，在合同有效期结束后，信息接受方仍应承
                        <div style="text-indent: 72px">
                          担保密义务，直至该等信息成为公开信息。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        18.3 如违反保密义务，泄密方应承担相关的法律责任，包括但不限于对由此给对
                        <div style="text-indent: 72px">
                          方造成的经济损失进行赔偿。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          19. 合同生效和其它
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        19.1 本合同在双方签字盖章后生效。
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px">
                        19.2 本合同一式 2 份，具同等法律效力。甲、乙双方各执 1 份。
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        <span class="page-weight">
                          20. 提示说明
                        </span>
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px;text-decoration:underline;font-weight: bold">
                        乙方声明已阅读本合同（包括专用条款、通用条款和附件），且甲方已就本合同的所有条款，尤其是免除甲方责任和认定乙方责任的相关条款以及加粗加黑部分条款，向乙方进行了充分提示和说明，乙 方承诺已完全知悉并理解本合同所有条款之含义。
                      </div>
                      <div lass="page-content" style="margin-top: 30px;line-height: 35px;text-align: right">
                        声明人（承租人）： <span class="page-input" style="width: 200px; text-align: right;text-indent: 0;">（乙方签字）</span>
                      </div>
                      <div lass="page-content" style="margin-top: 30px;line-height: 35px;text-align: right">
                        代理人： <span class="page-input" style="width: 280px; text-align: right;text-indent: 0;">（代理人签字/盖章）</span>
                      </div>
                      <div class="page-content" style="margin-top: 30px;line-height: 40px">
                        （本页以下无正文）
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 160px">18 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-nineteen" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="line-height: 35px;font-weight: bold">
                        附件一：授权及声明书
                      </div>
                      <div class="page-content" style="line-height: 35px;font-weight: bold;margin-top: 30px; text-align: center">
                        授权及声明书
                      </div>
                      <div class="page-content" style="margin-top: 30px; text-indent: 35px;line-height: 35px;">
                        本人_________（身份证号码：___________________）作为编号为_______________的《上海市康复辅具社区租赁服务设备租赁合同》（“<span style="font-weight: bold">《设备租赁合同》</span>”）项下的承租人，现声明并承诺如下：
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 35px;">
                        在《设备租赁合同》签署之日，本人为民政部门认定的低保低收入人群，且符合民政部门规定的低保低收入人群的全部要求和条件。
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 35px;">
                        基于以上：
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 35px;font-weight: bold;text-decoration: underline">
                        本人特此授权民政部门、上海市康复辅助器具社区租赁服务相关主管部门或其委托单位调取、查询、复制本人在上海市居民经济状况核对中心的全部信息，就本人的低保低收入状况，以在上海市居民经济状况核对中心调取、查询的信息为准。
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 35px;">
                        除非另有明确约定，本《授权及声明书》项下词语具有与《设备租赁合同》约定一致的含义。
                      </div>
                      <div lass="page-content" style="margin-top: 30px;line-height: 25px;text-align: right">
                        <span style="font-weight: bold">声明人（承租人）：</span><span class="page-input" style="width: 200px; text-align: right;text-indent: 0;" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        签&nbsp字： <span class="page-input" style="width: 274px; text-align: right;text-indent: 0; border-bottom: 0" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        身份证号码： <span class="page-input" style="width: 242px; text-align: right;text-indent: 0;" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="font-weight: bold">代 理 人（如有）：</span><span class="page-input" style="width: 200px; text-align: right;text-indent: 0;" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        代理人签字/盖章： <span class="page-input" style="width: 202px; text-align: right;text-indent: 0; border-bottom: 0" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">代理人（自然人）身份证号码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">代理人（法人）统一社会信用代码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 70px">19 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-twenty" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="line-height: 35px;font-weight: bold">
                        附件二：代理人身份证复印件以及责任声明书
                      </div>
                      <div class="page-content" style="line-height: 35px;font-weight: bold;margin-top: 30px; text-align: center">
                        代理人责任声明书
                      </div>
                      <div class="page-content" style="margin-top: 20px; text-indent: 35px;line-height: 30px;">
                        本人<span style="text-indent: 0px;display:inline-block;width: 80px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ form.agentName }}</span> （ 身 份 证 号码： <span style="text-indent: 0px;display:inline-block;width: 150px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ form.agentIdCard }}</span> ） 作 为 编 号 为
                        <span style="text-indent: 0px;display:inline-block;width: 200px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ codeContract }}</span>的《上海市康复辅具社区租赁服务设备租赁合同》及其附件一《授权及说明书》（如有）（“<span style="font-weight: bold">《设备租赁合同》</span>”）项下承租人<span style="text-indent: 0px;display:inline-block;width: 80px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ form.hasAgent === '0' ? '' : form.fullName }}</span>（身份证号码：<span style="text-indent: 0px;display:inline-block;width: 150px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ form.hasAgent === '0' ? '' : form.idCard }}</span>）（“<span style="font-weight: bold">承租人</span>”）的代理人，现声明并承诺如下：
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 30px;">
                        1.本人已经取得承租人关于《设备租赁合同》签订和履行的合法有效的授 权，授
                        <div style="text-indent: 59px">权范围包括但不限于：</div>
                        <div style="text-indent: 59px">(1) 代承租人签署和订立《设备租赁合同》；</div>
                        <div style="text-indent: 59px">(2) 代承租人磋商、谈判、认可、撤回《设备租赁合同》条款及内容；</div>
                        <div style="text-indent: 59px">(3) 代承租人支付《设备租赁合同》项下相关款项；</div>
                        <div style="text-indent: 59px">(4) 其他与《设备租赁合同》相关的事项；</div>
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 30px;">
                        2.签署《租赁设备合同》并履行其项下的全部权利义务系承租人的真实意思表示；
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 30px;">
                        3.本人自行或代承租人依据《设备租赁合同》提供的任何材料或信息均真 实、准
                        <div style="text-indent: 59px">
                          确、完整且无误导。
                        </div>
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 32px;font-weight: bold;text-decoration: underline">
                        如本人上述声明与承诺存在任何虚假、不完整、不准确或者存在任何违反上述声明与承诺的，本人应全权承担相应责任，包括但不限于：立即返还租赁设备、赔偿《设备租赁合同》项下出租人的任何损失、自行承担《设备租赁合同》项下承租人应承担的相关款项等，且出租人不退还任何已收取的租金。进一步的，如果因本人未取得承租人授权导致纠纷和损失的，本人承担全部赔偿责任。
                      </div>
                      <div class="page-content" style="margin-top: 5px; text-indent: 35px;line-height: 20px;">
                        除非另有明确约定，本《代理人责任声明书》项下词语具有与《设备租赁合
                        同》约定一致的含义。
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="font-weight: bold">声明人（代理人）：</span><span class="page-input" style="width: 200px; text-align: right;text-indent: 0;" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        签字/盖章： <span class="page-input" style="width: 248px; text-align: right;text-indent: 0; border-bottom: 0" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">声明人（自然人）身份证号码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">声明人（法人）统一社会信用代码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 31px">20 / 21</div>
                    </div>
                  </div>
                  <div class="contract-content-list page-twentyOne" style="page-break-after:always">
                    <div class="page-style" style="padding: 30px 30px 0px 30px">
                      <div class="page-content" style="line-height: 35px;font-weight: bold;margin-bottom: 50px">
                        代理人身份证复印件
                      </div>
                      <div style="width: 460px;height: 250px;text-align: center; line-height: 250px; border:1px dashed #999999;margin: 40px auto">
                        身份证正面
                      </div>
                      <div style="width: 460px;height: 250px;text-align: center; line-height: 250px; border:1px dashed #999999;margin: 40px auto">
                        身份证反面
                      </div>
                      <div lass="page-content" style="margin-top: 70px;line-height: 25px;text-align: right">
                        <span style="font-weight: bold">代 理 人：</span><span class="page-input" style="width: 263px; text-align: right;text-indent: 0;" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        签字/盖章： <span class="page-input" style="width: 248px; text-align: right;text-indent: 0; border-bottom: 0" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">声明人（自然人）身份证号码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div lass="page-content" style="margin-top: 10px;line-height: 25px;text-align: right">
                        <span style="width: 346px; display: inline-block; text-align: left">声明人（法人）统一社会信用代码：</span>
                      </div>
                      <div lass="page-content" style="margin-top: 0px;line-height: 25px;text-align: right">
                        <span class="page-input" style="width:346px; text-align: right;text-indent: 0;height: 20px" />
                      </div>
                      <div class="page-style t-center" style="font-size: 14px;margin-top: 82px">21 / 21</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="turn-left" @click="turnright"><img src="@/assets/images/left.png" alt=""></div>
              <div class="turn-right" @click="turnLeft"><img src="@/assets/images/right.png" alt=""></div>
              <!--              <el-carousel height="878px" :autoplay="false" indicator-position="none" arrow="always" >-->
              <!--                <el-carousel-item v-for="(item, index) in contractContent" :key="index" style="page-break-after:always">-->
              <!--                  <div class="contract-content-list" >-->
              <!--                    <h3 class="small" v-html="item"></h3>-->
              <!--                  </div>-->
              <!--                </el-carousel-item>-->
              <!--              </el-carousel>-->
            </div>
          </div>
        </div>
      </div>
      <el-footer style="margin-bottom: 20px;margin-right: 20px">
        <div v-if="isEditForm">
          <span v-if="step === 'one'" style="float: right">
            <el-button type="warning" class="base-btn" @click="reset">重置</el-button>
            <el-button class="cancel-btn" @click="nextStep('two', 'form_one')">下一步</el-button>
          </span>
          <span v-if="step === 'two'" style="float: right">
            <el-button class="cancel-btn" @click="nextStep('one', '')">上一步</el-button>
            <el-button type="warning" class="base-btn" @click="nextStep('three', 'form_two')">生成合同</el-button>
          </span>
        </div>
        <div v-if="step === 'three'" style="float: right">
          <el-button type="warning" class="base-btn" @click="printsub()">打印保存</el-button>
          <el-button class="cancel-btn" @click="nextStep('two', '')">上一步</el-button>
          <div style="width: 0;height: 0;overflow: hidden">
            <button ref="inputResult" v-print="'#printTest'" style="visible:hidden">打印</button>
          </div>
        </div>
      </el-footer>
    </el-main>
    <div style="display:none">
      <img id="bigPriDev" width="640" height="480"></img>
      <img id="devPhoto" width="360" height="270"></img>
      <textarea id="output" style="width: 500px;height: 500px;" /><br>
      <br>
      <input id="startIDCard" type="button" value="启动二代证阅读">
      <tr>
        <input id="openHtml" type="button" value="初始化">
        <input id="closeHtml" type="button" value="反初始化">
        <br>
        设备列表：<select id="devList" style="width: 120px" />
        <select id="modelList" style="width: 120px" />
        <select id="resolutionList" style="width: 120px" />
        <input id="openPriVideo" type="button" value="打开主视频">
        <input id="closePriVideo" type="button" value="关闭主视频">
        <input id="photographPri" type="button" value="拍照">
        <br>
        <input id="setdeskew" type="checkbox" value="">纠偏裁边
        <input id="rotateLeft" type="button" value="左转">
        <input id="rotateRight" type="button" value="右转">
        <input id="showProperty" type="button" value="属性设置">
        <input id="composePDF" type="button" value="合成PDF">
        <input id="deleteFile" type="button" value="删除文件">
        <input id="getFileBase64" type="button" value="获取文件base64">
        <input id="setImageProperty" type="button" value="图片保存参数">
        <br>
        <div id="container" style="float:left;" />
      </tr>
    </div>
    <el-dialog
      v-dialogDrag
      title="历史补贴记录"
      width="1500px"
      :visible="hisVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      @close="closeHisDialog"
    >
      <div>
        <el-table
          :data="historyList"
          tooltip-effect="dark"
          style="width: 100%;"
          header-align="left"
          border
          row-key="id"
        >
          <el-table-column label="签署日期" show-overflow-tooltip prop="signDate" min-width="120" header-align="center" />
          <el-table-column label="合同编号" prop="contractNo" min-width="250" header-align="center" />
          <el-table-column label="租赁点" prop="storeName" min-width="95" header-align="center" />
          <el-table-column label="产品名称及型号" show-overflow-tooltip prop="productName" min-width="200" header-align="center" />
          <el-table-column label="单次租赁价(元)" prop="oneRentPrice" min-width="135" header-align="center" />
          <el-table-column label="补贴后单次租赁价(元)" prop="subsidyAfterOneRentPrice" min-width="150" header-align="center" />
          <el-table-column label="本次补贴金额" prop="currentSubsidyMoney" min-width="100" header-align="center" />
        </el-table>
        <div style="width: 100%;border: 1px solid #e1e1e1; line-height: 40px">
          <span style="margin-left: 40px">合计</span>
          <span style="float: right; padding-right: 40px">{{ total }}</span>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { inits } from '@/utils/qwebchannel'
import _ from 'lodash'
import {
  allSelectdictionaryData
} from '@/api/common'
import {
  getEditAuthority
} from '@/api/user'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import { validateForms, scrollToTop } from '@/utils/index'
import Address from '@/components/Address'
import { verifyIdCard, verifyHomePhoneOrMobile } from '@/utils/validate'
// my
import { getProductList, getSupplier, addProduct, getDetail, editDetail, getStoreList, lookLease, searchMes, getRentProductListAll, getProductDetail, addContract, getHisList, getFileDetail, validateID } from '@/api/assistiveDevices/assistSupplier'
export default {
  components: {
    Address
  },
  data() {
    return {
      // look
      activeTabs: 'base', // tab标签切换默认选中name参数
      contractList: {},
      // 合同状态
      status: '',
      statusValue: '',
      lookSubsidyType: '',
      lookPayType: '',
      lookContractEndCause: '',
      stopCause: [],
      contractStatus: [],
      // add
      step: 'one', // 第几步
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      modelType: '', // 查看：look  编辑：edit  新增：add
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,
      storeList: [],
      form: {
        signDate: '', // 签署地点
        storeId: '', // 租赁点
        adapterId: '', // 适配师暂无
        fullName: '', // 承租人姓名
        idCard: '', // 承租人身份证
        homePhone: '', // 承租人家庭电话
        mobile: '', // 承租人手机号
        liveAree: [], // 承租人行政区划
        liveAddr: '', // 承租人详细地址
        hasAgent: '0', // 有无代理人
        isAgentNote: [''], // 代理人授权书
        agentName: '', // 代理人姓名
        agentIdCard: '', // 代理人身份证
        agentOrgCode: '', // 代理人统一社会信用代码
        agentPhone: '', // 代理人电话
        agentMobile: '', // 代理人手机号码
        isSubsidy: '0', // 是否享受补贴
        isSubsidyNote: [''], // 补贴授权书
        subsidyType: '', // 补贴类型
        ctyIds: [], // 产品类别
        productId: '', // 产品名称及型号
        productQty: '1', // 产品数量
        productUnit: 'item', // 产品数量单位
        rentType: '6', // 租期
        bondMoney: '', // 保证金
        payType: '' // 支付方式
      },
      liveAree: [],
      rulesForm: {
        signDate: [
          { required: true, trigger: 'change', message: '签署日期不能为空，请选择' }
        ],
        storeId: [
          { required: true, trigger: 'change', message: '康复辅具租赁点不能为空，请选择' }
        ],
        adapterId: [
          { required: true, trigger: 'change', message: '适配师不能为空，请选择' }
        ],
        idCard: [
          { required: true, trigger: 'blur', message: '承租人身份证号不能为空，请输入' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          {
            trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              validateID(value).then(response => {
                if (response.code === 0) {
                  callback()
                } else {
                  callback(new Error('身份证校验码无效，不是合法的身份证号码'))
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'))
              })
            }
          }
        ],
        fullName: [
          { required: true, trigger: 'blur', message: '承租人姓名不能为空，请输入' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '承租人手机号不能为空，请输入' }
        ],
        liveAree: [
          { required: true, trigger: 'change', message: '承租人所属区域不能为空，请选择' }
        ],
        liveAddr: [
          { required: true, trigger: 'blur', message: '承租人详细地址不能为空，请输入' }
        ],
        agentName: [
          { required: true, trigger: 'blur', message: '代理人姓名不能为空，请输入' }
        ],
        agentIdCard: [
          { required: true, trigger: 'blur', message: '代理人身份证号不能为空，请输入' }
        ],
        agentOrgCode: [
        ],
        agentMobile: [
          { required: true, trigger: 'blur', message: ' 代理人手机号码不能为空，请输入' }
        ],
        subsidyType: [
          { required: true, trigger: 'change', message: '补贴类型不能为空，请选择' }
        ],
        ctyIds: [
          { required: true, trigger: 'change', message: '产品类别不能为空，请选择' }
        ],
        productId: [
          { required: true, trigger: 'change', message: '产品名称及型号不能为空，请选择' }
        ],
        payType: [
          { required: true, trigger: 'change', message: '支付方式不能为空，请选择' }
        ],
        bondMoney: [
          { required: true, trigger: 'blur', message: ' 保证金不能为空，请输入' }
        ]
      },
      // my
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // new
      signAddress: '', // 签署地点
      defaultProps: {
        label: 'ctyName',
        value: 'ctyCode'
      },
      ctyIdList: [], // 产品级联数据
      monthData: [], // 租期
      subsidiesData: [], // 补贴类型
      addr: '', // 签署地点
      adapterList: [], // 经办人
      idCard: '', // 经办人身份证号
      eduLevelOptions: [],
      productList: [],
      unitData: [], // 单位
      paymentData: [], // 支付方式
      afterPrice: '', // 补贴后单次租赁价
      currentPrice: '', // 本次补贴金额
      singlePrice: '', // 单次租赁价
      clickTimes: 0,
      productName: '', // 产品名称及型号
      storeName: '', // 租赁点名称
      ISPName: '', // 服务商名称
      unitName: '件', // 单位名称
      codeContract: '', // 合同编号
      adapterName: '', // 适配师名称
      hisVisible: false, // 历史记录
      historyList: [],
      total: '',
      idCardPic: [],
      subsidyPic: [],
      otherFile: [],
      IdCardList: []
    }
  },
  watch: {
    'form.hasAgent': function() {
      if (this.form.hasAgent === '1') {
        this.form.isAgentNote = ['代理人授权书']
      } else {
        this.form.isAgentNote = ['']
      }
    },
    'form.isSubsidy': function() {
      if (this.form.isSubsidy === '1') {
        this.form.isSubsidyNote = ['补贴授权书']
      } else {
        this.form.isSubsidyNote = ['']
        this.form.subsidyType = ''
      }
      // 调用计算产品价格方法
      this.productNameChange(null)
    },
    'form.productId': function() {
      this.productList.forEach(item => {
        if (this.form.productId === item.productId) {
          this.productName = item.productName
        }
      })
    },
    'form.storeId': function() {
      this.storeList.forEach(item => {
        if (this.form.storeId === item.orgId) {
          this.storeName = item.orgName
        }
      })
    },
    'form.adapterId': function() {
      this.adapterList.forEach(item => {
        if (this.form.adapterId === item.id) {
          this.adapterName = item.fullName
        }
      })
    },
    'form.productUnit': function() {
      this.unitData.forEach(item => {
        if (this.form.productUnit === item.dictValue) {
          this.unitName = item.dictLabel
        }
      })
    }
  },

  mounted() {
    this.modelType = this.$route.query.modelType
    const _consultantId_ = this.$route.query.id || ''

    // 提前获取 字典信息
    this.selectData()

    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      this.getData(_consultantId_)
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.editAuthority).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_consultantId_)
      inits((message) => {
        let IDcardInfo = 'IDcardInfo:'
        if (message.indexOf(IDcardInfo) >= 0) {
          IDcardInfo = message.substr(IDcardInfo.length)
          this.IdCardList = IDcardInfo.split(' ')
          this.form.fullName = this.IdCardList[0]
          this.form.idCard = this.IdCardList[7]
          this.form.liveAddr = this.IdCardList[6]
        }
      })
    }

    this.idEdit = false
    // my
    this.getProductLists()
    this.getSuppliers()
    // new  - `-
    this.getStoreLists()
  },

  methods: {
    // 获取合同服务详情
    getFileDetails(id) {
      return new Promise((resolve, reject) => {
        getFileDetail(id).then(res => {
          if (res.code === 0) {
            res.data.idCardImagePaths.forEach((item) => {
              this.idCardPic.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
            })
            res.data.subsidyImagePaths.forEach((item) => {
              this.subsidyPic.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
            })
            res.data.otherFilePaths.forEach((item) => {
              const data = {}
              data.url = `${process.env.VUE_APP_API_IMGURL}${item.fileUrl}`
              data.name = item.fileName
              this.otherFile.push(data)
            })
          }
          resolve()
        }).catch(() => {
          reject()
          this.$message.error('获取信息失败！')
        })
      })
    },
    getDate(date) {
      if (date) {
        const dates = date.split('T')
        return dates[0]
      }
    },
    openHisDialog() {
      this.hisVisible = true
      getHisList(this.form.idCard).then(res => {
        if (res.code === 0) {
          this.historyList = res.data.list
          this.total = res.data.total
        }
      })
    },
    closeHisDialog() {
      this.hisVisible = false
    },
    turnLeft() {
      if (this.clickTimes < 20) {
        this.clickTimes++
        this.$refs.contractContent.style.left = -794 * this.clickTimes + 'px'
      } else {
        this.$message.warning('已经是最后一页！')
      }
    },
    turnright() {
      if (this.clickTimes > 0) {
        this.clickTimes--
        this.$refs.contractContent.style.left = -794 * this.clickTimes + 'px'
      } else {
        this.$message.warning('已经是第一页！')
      }
    },
    printsub() {
      this.$confirm('确定要打印并保存该合同吗？合同一旦保存将无法修改。', '打印保存合同', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = JSON.parse(JSON.stringify(this.form))
        if (param.isAgentNote[0] === '') {
          param.isAgentNote = '0'
        } else {
          param.isAgentNote = '1'
        }
        if (param.isSubsidyNote[0] === '') {
          param.isSubsidyNote = '0'
        } else {
          param.isSubsidyNote = '1'
        }
        if (param.isSubsidy === '0') {
          param.subsidyType = ''
        }
        param.liveAree = param.liveAree[param.liveAree.length - 1]
        param.ctyId = param.ctyIds[param.ctyIds.length - 1]
        // /
        addContract(param).then(res => {
          if (res.code === 0) {
            this.codeContract = res.data
            setTimeout(() => {
              this.$refs.inputResult.click()
              this.closeDetailsPage()
            }, 200)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消打印！'
        })
      })
    },
    nextStep(step, form) {
      if (form === '') {
        this.step = step
      } else {
        const formRefs = [form].map(key => this.$refs[key])
        validateForms(formRefs).then(() => {
          if (step === 'three') {
            if (this.singlePrice < this.form.bondMoney) {
              this.$message.warning('保证金不能高于单次租赁价格！')
              return false
            }
            if (this.form.bondMoney < 0) {
              this.$message.warning('保证金不能是负数！')
              return false
            }
            if (this.form.hasAgent === '0') {
              this.form.agentName = ''
              this.form.agentIdCard = ''
              this.form.agentOrgCode = ''
              this.form.agentPhone = ''
              this.form.agentMobile = ''
            }
          }
          setTimeout(() => {
            this.step = step
          }, 100)
        })
      }
    },
    getAreaCode(val) {
      this.form.liveAree = val
    },
    // 获取租赁点
    getStoreLists() {
      getStoreList().then(res => {
        if (res.code === 0) {
          this.storeList = res.data
        }
      })
    },
    // 点击选择租赁点
    changeSroreId(val) {
      let obj = {}
      obj = this.storeList.find((item) => {
        return item.orgId === val
      })
      const getName = ''
      this.addr = obj.addr
      this.lookLeases(val)
    },
    // 获取适配师列表
    lookLeases(id) {
      lookLease(id).then(res => {
        if (res.code === 0) {
          this.adapterList = res.data.list
          this.ISPName = res.data.serviceName
        }
      })
    },
    // 点击选择适配师
    changeAdapterId(val) {
      let obj = {}
      obj = this.adapterList.find((item) => {
        return item.id === val
      })
      const getName = ''
      this.idCard = obj.idCard
    },
    // 根据身份证号查询
    idCardSearch(value) {
      this.$refs['form_one'].validateField('idCard', (message) => {
      // if (this.form.idCard !== '') {
        const valid = message == ''
        if (valid) {
          searchMes(this.form.idCard).then(res => {
            if (res.code === 0 && res.data) {
              this.form.fullName = res.data.fullName !== null ? res.data.fullName : ''
              this.form.homePhone = res.data.homePhone !== null ? res.data.homePhone : ''
              this.form.mobile = res.data.mobile !== null ? res.data.mobile : ''
              this.form.liveAddr = res.data.liveAddr !== null ? res.data.liveAddr : ''
              this.form.liveAree = res.data.liveAreaCodeLevel ? res.data.liveAreaCodeLevel.split(',') : ''
              this.form.agentName = res.data.agentName !== null ? res.data.agentName : ''
              this.form.agentIdCard = res.data.agentIdCard !== null ? res.data.agentIdCard : ''
              this.form.agentOrgCode = res.data.agentOrgCode !== null ? res.data.agentOrgCode : ''
              this.form.agentPhone = res.data.agentPhone !== null ? res.data.agentPhone : ''
              this.form.agentMobile = res.data.agentMobile !== null ? res.data.agentMobile : ''
              this.form.subsidyType = res.data.subsidyType !== null ? res.data.subsidyType : ''
              this.$refs['form_one'].clearValidate()
              this.idEdit = !this.idEdit
            }
          })
        }
      // }
      })
    },
    // 产品选择
    productIdChange(val) {
      getRentProductListAll({
        ctyId: val[val.length - 1]
      }).then(res => {
        if (res.code === 0) {
          this.productList = res.data
          this.form.productId = ''
        }
      })
    },
    // 产品名称选择
    productNameChange(val) {
      // 减少不必要请求 如果承租人身份证或者产品未选择 则直接跳出方法
      if (!this.form.idCard || !this.form.productId) {
        return
      }
      getProductDetail({
        amount: this.form.productQty,
        idCard: this.form.idCard,
        productId: this.form.productId,
        rentType: this.form.rentType,
        signDate: this.form.signDate,
        isSubsidy: this.form.isSubsidy === '1'
      }).then(res => {
        if (res.code === 0) {
          this.afterPrice = res.data.afterSubsidySingleRentPrice
          this.currentPrice = res.data.currentSubsidyPrice
          this.form.bondMoney = res.data.ensureGold
          this.singlePrice = res.data.singleRentPrice
        }
      })
    },
    // new
    // 字典
    // 数据字典
    selectData() {
      const dicKey = 'lease_category,subsidies,cp_unit,payment_method,stop_cause,contract_status'
      allSelectdictionaryData(dicKey).then(response => {
        if (response.code === 0) {
          for (const k in response.data) {
            switch (k) {
              // 月份
              case 'lease_category':
                this.monthData = response.data[k]
                break
              case 'subsidies':
                this.subsidiesData = response.data[k]
                break
              case 'cp_unit':
                this.unitData = response.data[k]
                break
              case 'payment_method':
                this.paymentData = response.data[k]
                break
              case 'stop_cause':
                this.stopCause = response.data[k]
                break
              // 合同状态
              case 'contract_status':
                this.contractStatus = response.data[k]
                break
            }
          }
        }
      })
    },
    // 删除价格
    delPrice(index) {
      this.form.rentProductPriceList.splice(index, 1)
    },
    addTableRow() {
      // if (this.form.contact.length >= 3) {
      //   this.$message.warning("联系人数量最多添加3条！");
      //   return false;
      // }
      // this.flag = true;//添加时的取消按钮

      const rowData = {
        bondAdvisePrice: '',
        id: '',
        oneRentPrice: '',
        productId: '',
        rentTerm: '',
        subsidyRentPrice: '',
        edit: true,
        rowIndex: Math.random() * 100000000000000000 + ''
      }
      this.form.rentProductPriceList.push(rowData)
    },
    // 获取供应商列表
    getSuppliers() {
      getSupplier().then(res => {
        if (res.code === 0) {
          this.eduLevelOptions = res.data
        }
      })
    },
    // 获取图片数据
    getPicList(val) {
      this.form.imageInfoVos = val
    },
    // 获取产品下拉列表
    getProductLists() {
      getProductList().then(res => {
        if (res) {
          this.ctyIdList = res
        }
      })
    },

    async getData(id) {
      await this.getProductLists()
      await this.getSuppliers()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'look') {
        await this.getFileDetails(id)
        await this.editGetData(id)
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        getDetail(id).then(response => {
          if (response.code === 0) {
            this.contractList = response.data
            // 合同状态
            this.statusValue = this.contractList.status
            this.contractStatus.forEach(item => {
              if (item.dictValue === this.contractList.status) {
                this.status = item.dictLabel
              }
            })
            this.subsidiesData.forEach(item => {
              if (item.dictValue === this.contractList.subsidyType) {
                this.lookSubsidyType = item.dictLabel
              }
            })
            this.paymentData.forEach(item => {
              if (item.dictValue === this.contractList.payType) {
                this.lookPayType = item.dictLabel
              }
            })
            this.stopCause.forEach(item => {
              if (item.dictValue === this.contractList.contractEndCause) {
                this.lookContractEndCause = item.dictLabel
              }
            })
            // this.unitData.forEach(item =>{
            //   if (item.dictValue === this.contractContent.productUnit) {
            //     this.contractContent.productUnit = item.dictLabel
            //   }
            // })
            // lookLease(this.contractContent.storeId).then(res =>{
            //   if (res.code === 0) {
            //     this.ISPName = res.data.serviceName
            //   }
            // })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('获取合同失败！')
        })
      })
    },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base'].map(key => this.$refs[key])
      if (this.form.rentProductPriceList.length === 0) {
        this.$message({
          type: 'error',
          message: '必须添加一条价格信息!'
        })
        return false
      }
      validateForms(formRefs).then(() => {
        const _form = _.cloneDeep(this.form)
        _form.ctyCode = _form.ctyIds[_form.ctyIds.length - 1]
        // 新增
        if (this.modelType === 'add') {
          addProduct(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增辅具产品保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增辅具产品操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增辅具产品操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          editDetail(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑辅具产品保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑辅具产品操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑辅具产品操作失败!')
          })
        }
      }).catch(objectList => {
        scrollToTop()
      })
    },
    // 取消按钮
    cancelBtn() {
      this.$confirm(
        '该页面的信息尚未保存，确定要关闭页面吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.closeDetailsPage()
      }).catch(() => {
      })
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/assistivePlatform/assistiveDevices/contract')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/productAssist/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑租赁产品` }
      })
    },
    reset() {
      this.form = {
        signDate: '', // 签署地点
        storeId: '', // 租赁点
        adapterId: '', // 适配师暂无
        fullName: '', // 承租人姓名
        idCard: '', // 承租人身份证
        homePhone: '', // 承租人家庭电话
        mobile: '', // 承租人手机号
        liveAree: [], // 承租人行政区划
        liveAddr: '', // 承租人详细地址
        hasAgent: '0', // 有无代理人
        isAgentNote: [''], // 代理人授权书
        agentName: '', // 代理人姓名
        agentIdCard: '', // 代理人身份证
        agentOrgCode: '', // 代理人统一社会信用代码
        agentPhone: '', // 代理人电话
        agentMobile: '', // 代理人手机号码
        isSubsidy: '0', // 是否享受补贴
        isSubsidyNote: [''], // 补贴授权书
        subsidyType: '', // 补贴类型
        ctyIds: [], // 产品类别
        productId: '', // 产品名称及型号
        productQty: '1', // 产品数量
        productUnit: 'item', // 产品数量单位
        rentType: '6', // 租期
        bondMoney: '', // 保证金
        payType: '' // 支付方式
      }
      this.idEdit = !this.idEdit
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }

  .el-footer {
    padding-top: 24px;
    padding-right: 0;
  }

  .el-footer > div {
    overflow: hidden;
  }

  .el-footer > div > button {
    float: right;
  }

  .base-btn {
    margin-left: 15px;
  }
  .detail-selects {
    width: 100%;
    float: left;
    .detail-selects-list {
      width: 100%;
      margin-bottom: 15px;
      float: left;
      .add-price {
        width: 100%;
        float: left;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px dashed #e1e1e1;
        border-left: 1px dashed #e1e1e1;
        border-right: 1px dashed #e1e1e1;

        text-align: center;
        line-height: 40px;
        color: #1890ff;
        float: left;
        cursor: pointer;
      }
      .detail-selects-item {
        width: 25%;
        float: left;
        .detail-selects-list-title {
          width: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          background: #f0f3f9;
          border: 1px solid #e1e1e1;
          border-right: 0;
        }
        .detail-selects-list-input {
          width: 100%;
          padding: 0 10%;
          font-size: 14px;
          text-align: center;
          height: 37px;
          line-height: 37px;
          margin: 20px 0;
        }
      }
      .detail-selects-item:nth-child(5n) {
        .detail-selects-list-title {
          border-right: 1px solid #e1e1e1 !important;
        }
      }
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .addBtnDiv {
    border: 1px dashed #E1E1E1;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .contract {
    width: 100%;
    .el-table .cell {
      text-align: center !important;
    }
    .el-dialog {
      width: 1400px !important;
      max-width: 1400px !important;
    }
    .contract-tab{
      width: 100%;
      height: 150px;
      border-bottom: 1px solid #e1e1e1;
      .contract-tab-list {
        width: 760px;
        margin: 0px auto;
        padding-top: 50px;
        span {
          display: inline-block;
          vertical-align: middle;
          margin: 0 5px;
        }
        .num-style {
          width: 40px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #e1e1e1;
          border-radius: 50%;
          text-align: center;
          font-size: 18px;
        }
        .it-num {
          background: #3367d6;
          border: 1px solid #3367d6;
          color: #ffffff;
        }
        .line-style {
          width: 120px;
          height: 1px;
          background: #e1e1e1;
        }
      }
    }
    .contract-form {
      width: 100%;
      .contract-form-part {
        margin: 20px 20px;
        .long-item {
          .el-form-item__label {
            line-height: 18px !important;
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
            left: -50px;
            cursor: pointer;
          }
          .turn-right {
            position: absolute;
            top: 50%;
            margin-top: -20px;
            right: -50px;
            cursor: pointer;
          }
        }

      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
    text-align: center;
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
    border: 6px solid #333333;
  }

  .contract-look {
    .el-tabs__nav {
      margin-left: 20px;
    }
  }
  .contrat-title {
    padding-left: 30px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
