<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv contract-body">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="签署日期">
          <el-date-picker
            v-model="signDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            style="width:380px"
          />
        </el-form-item>
        <el-form-item label="产品类别">
          <el-cascader
            v-model="ctyId"
            :options="ctyIdList"
            placeholder="请选择产品类别"
            :props="defaultProps"
            clearable
            style="width:300px"
          />
        </el-form-item>
        <el-form-item label="合同状态">
          <el-select v-model="form.status" placeholder="请选择合同状态" clearable style="width: 160px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in contractStatusDict"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入合同编号或承租人姓名或身份证号"
            style="width: 300px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="合同创建日期">
          <el-date-picker
            v-model="createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            style="width:380px"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer assist-s">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
            <div v-else class="totalWrap">无法找到匹配信息</div>
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
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="50" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="签署日期" show-overflow-tooltip prop="signDate" min-width="130" header-align="center" sortable="custom" />
            <el-table-column label="合同编号" prop="contractNo" min-width="250" header-align="center" />
            <el-table-column label="产品名称及型号" show-overflow-tooltip prop="productName" min-width="200" header-align="center" />
            <el-table-column label="承租人姓名" prop="fullName" min-width="130" header-align="center" />
            <el-table-column label="承租人身份证" prop="idCard" min-width="200" header-align="center" />
            <el-table-column label="租赁点" show-overflow-tooltip prop="storeName" min-width="150" header-align="center" />
            <el-table-column label="服务商" show-overflow-tooltip prop="spName" min-width="150" header-align="center" sortable="custom" />
            <el-table-column label="合同状态" prop="status" min-width="180" header-align="center" />
            <el-table-column label="合同终止日期" prop="contractEndDate" min-width="180" header-align="center" />
            <el-table-column label="合同创建日期" prop="createTime" min-width="180" header-align="center" />
            <el-table-column fixed="right" label="操作" width="400" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '查看合同'}" class="table-btn" @click="openlookDialog(row)">查看合同</span>
                <span v-if="row.status !== '已作废'" v-has="{class: '上传附件'}" class="table-btn" @click="openUploadDialog(row)">上传附件</span>
                <span v-if="row.status !== '已终止' && row.status !== '已作废'" v-has="{class: '终止'}" class="table-btn" @click="openStop(row)">终止</span>
                <span v-if="row.status !== '已终止' && row.status !== '已作废'" v-has="{class: '作废'}" class="table-btn" @click="InvalidContract(row)">作废</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData(form)"
          />
        </el-main>

      </el-container>
    </el-main>
    <el-dialog
      v-dialogDrag
      title="终止辅具租赁合同信息"
      width="200px"
      :visible="stopVisible"
      :close-on-click-modal="false"
      @close="closeTopDialog"
    >
      <div>
        <el-form
          ref="formStop"
          key="form_base"
          :model="formStop"
          :rules="rulesForm"
          label-width="130px"
        >
          <el-row :gutter="0">
            <el-col :md="24" :lg="13">
              <el-form-item label="终止日期" prop="contractEndDate">
                <el-date-picker
                  v-model="formStop.contractEndDate"
                  type="date"
                  placeholder=""
                  style="width:100%;"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="13">
              <el-form-item label="终止原因" prop="contractEndCause">
                <el-select
                  v-model="formStop.contractEndCause"
                  placeholder=""
                  clearable
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in stopCause"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="24">
              <el-form-item label="备注">
                <el-input v-model="formStop.remark" type="textarea" max-length="200" style="width:100%;" :autosize="{ minRows: 4, maxRows: 4}" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right;margin-top:20px;">
          <el-button @click="closeTopDialog">取消</el-button>
          <el-button type="primary" @click="confirmStop">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="contract-upload">
      <el-dialog
        ref="dailog"
        v-dialogDrag
        title="上传附件"
        width="200px"
        :visible="uploadVisible"
        :close-on-click-modal="false"
        class="contant-add-dailog"
        @close="closeUploadDialog"
      >
        <div ref="dailogBody" class="new-daillog-body" :style="{ height: heightChange}">
          <div>身份证</div>
          <div style="width: 100%; padding: 20px 0; border-bottom: 1px dashed #e1e1e1;">
            <Uploadpics :id="upLoadForm.contractId" :id-edit="idEdit" :form-imgs="upLoadForm.idCardImagePaths" :url="'/file/contract/image/idCard'" :is-sub="isSub" @pics="getIDPicList" />
          </div>
          <div style="margin-top:20px">补贴证明</div>
          <div style="width: 100%; padding: 20px 0; border-bottom: 1px dashed #e1e1e1;">
            <Uploadpics :id="upLoadForm.contractId" :id-edit="idEdit" :form-imgs="upLoadForm.subsidyPaths" :url="'/file/contract/image/subsidy'" :is-sub="isSub" @pics="getBtPicList" />
          </div>
          <div style="margin-top:20px">其他证明</div>
          <div style="width: 40%; padding: 20px 0;">
            <el-upload
              ref="uploadFile"
              class="upload-demo"
              :action="uploadUrlFile"
              :data="fileForm"
              :file-list="fileList"
              :limit="6"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-error="handleError"
              :on-exceed="handleExceed"
              :on-remove="handleRemoveFile"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div v-show="!btnWrap" slot="footer" class="dialog-footer">
          <el-button @click="closeUploadDialog">取消</el-button>
          <el-button type="primary" @click="confirmUpload">确认</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="contract-list">
      <el-dialog
        v-dialogDrag
        title="查看合同"
        width="200px"
        :visible="lookVisible"
        :close-on-click-modal="false"
        @close="closelookDialog"
      >
        <div class="contract-content">
          <div id="printTest" class="contract-content-body">
            <div ref="contractContent" class="contract-content-all">
              <!--           风格-->
              <div class="contract-content-list page-one" style="page-break-after:always;">
                <div class="page-style" style="text-align: right;padding: 30px 30px 0px 30px">
                  合同编号：<span class="page-input" style="width: 200px">{{ contractContent.contractNo }}</span>
                </div>
                <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 80px">上海市康复辅具社区租赁服务</div>
                <div class="page-style" style="text-align: center; font-size: 29px; font-weight: bold; margin-top: 60px">设备租赁合同</div>
                <div class="page-style t-center">
                  租赁设备：<span class="page-input" style="width: 420px;margin-top: 60px;text-align: center">{{ contractContent.productName }}</span>
                </div>
                <div class="page-style t-center">
                  出租人（甲方）：<span class="page-input" style="width: 373px;margin-top: 70px">{{ contractContent.spName }}</span>
                </div>
                <div class="page-style t-center">
                  承租人（乙方）：<span class="page-input" style="width: 373px;margin-top: 15px">{{ contractContent.fullName }}</span>
                </div>
                <div class="page-style t-center">
                  康复辅具社区租赁点：<span class="page-input" style="width: 340px;margin-top: 80px">{{ contractContent.storeName }}</span>
                </div>
                <div class="page-style t-center">
                  经办人（康复辅助技术咨询师）：<span class="page-input" style="width: 262px;margin-top: 15px">{{ contractContent.adapterName }}</span>
                </div>
                <div class="page-style t-center">
                  经办人身份证号码：<span class="page-input" style="width: 356px;margin-top: 15px">{{ contractContent.adapterIdCard }}</span>
                </div>
                <div class="page-style t-center">
                  签署日期：<span class="page-input" style="width: 420px;margin-top: 80px">{{ getDate(contractContent.signDate) }}</span>
                </div>
                <div class="page-style t-center">
                  签署地点：<span class="page-input" style="width: 420px;margin-top: 15px">{{ contractContent.storeAddr }}</span>
                </div>
                <div class="page-style t-center" style="font-size: 14px;margin-top: 120px">1 / 21</div>
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
                        <td>{{ contractContent.productName }}</td>
                        <td>/</td>
                        <td>{{ contractContent.productUnit }}</td>
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
                    {{ contractContent.liveAddr }}
                  </div>
                  <div class="page-content" style="margin-top: 30px;">
                    <span class="page-weight">
                      4. 租金、支付方式和期限
                    </span>
                  </div>
                  <div class="page-content" style="margin-top: 25px; text-indent: 35px">
                    4.1 乙方应在本合同签署的当日，向甲方全额支付租金，先付后用。甲、乙双方约
                    <div style="text-indent:68px">定，租赁设备按次租赁，且租赁设备租金按次收取，每 1 次租赁的租金为人</div>
                    <div style="text-indent:68px">民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0">{{ contractContent.oneRentPrice }}</span>元（“全额租金”）。特别的，如乙方享受上海市康复辅具社</div>
                    <div style="text-indent:68px">区租赁服务补贴价格的，每 1 次租赁补贴金额为人民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0">{{ contractContent.currentSubsidyMoney === '' || contractContent.currentSubsidyMoney === null ? '/' : contractContent.currentSubsidyMoney }}</span>元，进而</div>
                    <div style="text-indent:68px">乙方实际应自行承担的每 1 次租赁租金为人民币<span class="page-input" style="width: 80px; text-align: center;text-indent: 0;height: 30px">{{ contractContent.subsidyAfterOneRentPrice === '' || contractContent.subsidyAfterOneRentPrice === null ? '/' : contractContent.subsidyAfterOneRentPrice }}</span>元（“补贴后乙</div>
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
                    <span class="page-check" :class="[contractContent.payType === 'bank_transfer' ? 'check-it' : '']" style="margin-left: 27px" /> 银行转账：甲方的收款账户如下：
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
                    <span class="page-check " :class="[contractContent.payType === 'r_card_s' ? 'check-it' : '']" style="margin-left: 27px" /> 敬老卡结算；
                  </div>
                  <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                    <span class="page-check " :class="[contractContent.payType === 'pos_settlement' ? 'check-it' : '']" style="margin-left: 27px" /> POS 机刷卡结算；
                  </div>
                  <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                    <span class="page-check" :class="[contractContent.payType === 'cash_payment' ? 'check-it' : '']" style="margin-left: 27px" /> 现金支付：甲方应于乙方支付的同时向乙方开具等额收据；
                  </div>
                  <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                    <span class="page-check" :class="[contractContent.payType === 'pay_by_alipay' ? 'check-it' : '']" style="margin-left: 27px" /> 支付宝支付：甲方的支付宝收款账号如下：
                    <span class="page-input" style="width: 150px; text-align: center;text-indent: 0" />
                  </div>
                  <div class="page-content" style="margin-top: 12px; text-indent: 35px">
                    <span class="page-check" :class="[contractContent.payType === 'wechat_payment' ? 'check-it' : '']" style="margin-left: 27px" /> 微信支付：甲方的微信收款账号如下：
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
                    <div style="text-indent:63px"><span class="page-input" style="width: 120px; text-align: center;text-indent: 0">{{ contractContent.bondMoney }}</span>元（“保证金”），保证金不得超过上海市康复辅具社区租</div>
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
                    本人<span style="text-indent: 0px;display:inline-block;width: 80px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ contractContent.agentName }}</span> （ 身 份 证 号码： <span style="text-indent: 0px;display:inline-block;width: 150px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ contractContent.agentIdCard }}</span> ） 作 为 编 号 为
                    <span style="text-indent: 0px;display:inline-block;width: 200px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ contractContent.contractNo }}</span>的《上海市康复辅具社区租赁服务设备租赁合同》及其附件一《授权及说明书》（如有）（“<span style="font-weight: bold">《设备租赁合同》</span>”）项下承租人<span style="text-indent: 0px;display:inline-block;width: 80px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ contractContent.fullName }}</span>（身份证号码：<span style="text-indent: 0px;display:inline-block;width: 150px;border-bottom: 1px solid #333333;vertical-align: bottom">{{ contractContent.idCard }}</span>）（“<span style="font-weight: bold">承租人</span>”）的代理人，现声明并承诺如下：
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
        <div style="text-align: center; margin-top: 20px">
          <el-button type="warning" class="base-btn" @click="printsub()">打印保存</el-button>
          <div style="height: 0; width: 0; overflow: hidden"> <button ref="inputResult" v-print="'#printTest'" class="base-btn">打印</button></div>
        </div>
      </el-dialog>
    </div>
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
  </el-container>
</template>

<script>
import { inits } from '@/utils/qwebchannel'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import ImportDialog from '@/components/importDialog/index'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import { downloadFromBlob } from '@/utils/index'
import qs from 'qs'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { validateForms } from '@/utils/index'

import { getProductList, lookLease, getRentProductList, addFile, getOrdanFaultDownload, getOrdanDownload, deleteList, listContract, contractInvalid, stopContract, getDetail, getFileDetail } from '@/api/assistiveDevices/assistSupplier'
import { allSelectdictionaryData } from '@/api/common'
import Uploadpics from '@/components/imageContract'
import elementResizeDetectorMaker from 'element-resize-detector'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
import { getAssessContractExport } from '@/api/importExportApi'

export default {
  components: {
    ImportDialog,
    Address,
    Pagination,
    Uploadpics
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      // 是否显示按钮组
      btnWrap: true,
      heightChange: '50vh',
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time)
        }
      },
      signTime: '',
      uploadUrlFile: process.env.VUE_APP_BASE_API + '/zuul/file/contract/file/other',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      fileForm: {
        contractId: ''
      },
      isSub: 1,
      fileList: [],
      // 合同状态字典
      contractStatusDict: [],
      dialogVisible: false,
      dialogVisibleImport: false,
      // 机构类型
      org_typeOptions: [],
      // 签署日期临时存储变量
      signDate: [],
      // 创建日期临时存储变量
      createDate: [],
      // 终止合同表单
      formStop: {
        contractEndCause: '', // 合同终止原因
        contractEndDate: '', // 合同终止日期
        contractId: '', // 合同ID
        remark: '' // 备注
      },
      rulesForm: {
        contractEndDate: [
          { required: true, trigger: 'change', message: '终止日期不能为空，请选择' }
        ],
        contractEndCause: [
          { required: true, trigger: 'change', message: '终止原因不能为空，请选择' }
        ],
        remark: [
          { required: true, trigger: 'blur', message: '终止原因不能为空，请选择' }
        ]
      },
      // 查询表单
      form: {
        // 排序字段
        sortBy: '',
        // 签署日期开始
        signDateStart: '',
        // 签署日期结束
        signDateEnd: '',
        // 创建日期开始
        createDateStart: '',
        // 创建日期结束
        createDateEnd: '',
        // 合同状态
        status: '',
        keyword: '', // 关键字查询
        ctyId: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      uploadUrl: process.env.VUE_APP_BASE_API + '/assistive/rent/product/import',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      getOrdanFaultDownload,
      // my
      ctyId: [], // 所选产品ID
      defaultProps: {
        label: 'ctyName',
        value: 'ctyCode'
      }, // 自定义级联属性
      ctyIdList: [], // 产品级联数据
      stopVisible: false, // 终止合同
      contractID: '', // 合同ID
      stopCause: [], // 终止原因
      lookVisible: false, // 查看合同
      contractContent: {},
      clickTimes: 0,
      ISPName: '',
      unitData: [],
      uploadVisible: false,
      upLoadForm: {
        contractId: '',
        idCardImagePaths: [],
        subsidyPaths: [],
        otherFilePaths: []
      }
    }
  },
  mounted() {
    this.idEdit = false
    /**
       * 数据字典接口
       */
    this.getDict()
    this.getData(this.form)
    // my
    this.getProductLists()
    inits((message) => {
      let IDcardInfo = 'IDcardInfo:'
      if (message.indexOf(IDcardInfo) >= 0) {
        IDcardInfo = message.substr(IDcardInfo.length)
        this.IdCardList = IDcardInfo.split(' ')
        this.form.keyword = this.IdCardList[7]
        this.getData(this.form)
      }
    })
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - 48 + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
        // this.$refs.dailogBody.style.height = height
      })
    })
  },
  methods: {
    // 列表排序回调函数
    sortChange(data) {
      const { prop, order } = data
      this.form.sortFields = prop
      if (order === 'descending') {
        this.form.sortOrder = 'DESC'
      } else {
        this.form.sortOrder = 'ASC'
      }
      this.getData(this.form)
    },
    dealDisabledDate(time) {
      return time.getTime() < new Date(this.signTime).getTime()
    },

    getFileDetails(id) {
      getFileDetail(id).then(res => {
        if (res.code === 0) {
          if (res.data.idCardImagePaths.length !== 0 || res.data.otherFilePaths.length !== 0 || res.data.subsidyImagePaths.length !== 0) {
            this.idEdit = !this.idEdit
          }
          //
          if (res.data.idCardImagePaths.length !== 0) {
            this.upLoadForm.idCardImagePaths = res.data.idCardImagePaths
          } else {
            this.upLoadForm.idCardImagePaths = []
          }
          //
          if (res.data.idCardImagePaths.length !== 0) {
            this.upLoadForm.subsidyPaths = res.data.subsidyImagePaths
          } else {
            this.upLoadForm.subsidyPaths = []
          }
          //
          if (res.data.otherFilePaths.length !== 0) {
            res.data.otherFilePaths.forEach(item => {
              const data = {}
              data.url = `${process.env.VUE_APP_API_IMGURL}${item.fileUrl}`
              data.name = item.fileName
              this.fileList.push(data)
            })
            this.upLoadForm.otherFilePaths = res.data.otherFilePaths
          } else {
            this.upLoadForm.otherFilePaths = []
          }

          // res.data.otherFilePaths.forEach((item)=>{
          //   const data = {}
          //   data.url = `${process.env.VUE_APP_API_IMGURL}${item.fileUrl}`;
          //   data.name = item.fileName
          //   this.otherFile.push(data);
          // });
        }
      })
    },
    handleRemoveFile(file, fileList) {
      for (let i = 0; i < this.upLoadForm.otherFilePaths.length; i++) {
        if (this.upLoadForm.otherFilePaths[i].uid) {
          if (this.upLoadForm.otherFilePaths[i].uid === file.uid) {
            this.upLoadForm.otherFilePaths.splice(i, 1)
            break
          }
        } else {
          if (this.upLoadForm.otherFilePaths[i].fileUrl === file.url.split(process.env.VUE_APP_API_IMGURL)[1]) {
            this.upLoadForm.otherFilePaths.splice(i, 1)
          }
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件`)
    },
    handleError(res) {
      this.$message.error(res.msg)
    },
    handleAvatarSuccess(response, file, fileList) {
      if (response.code === 0) {
        const data = {}
        data.fileUrl = response.data.fullPath
        data.fileName = file.name
        data.uid = file.uid
        this.upLoadForm.otherFilePaths.push(data)
      } else {
        this.$message.error(response.msg)
        this.$refs.uploadFile.uploadFiles.pop()
      }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 200

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是jpeg,png,jpg,bmp格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 200MB!')
      }
      return isLt2M
    },
    // 获取图片数据
    getIDPicList(val) {
      this.upLoadForm.idCardImagePaths = val
    },
    getBtPicList(val) {
      this.upLoadForm.subsidyPaths = val
    },
    openUploadDialog(row) {
      this.fileForm.contractId = row.id
      this.getFileDetails(row.id)
      this.upLoadForm.contractId = row.id
      this.fileList = []
      this.uploadVisible = true
      this.btnWrap = false
    },
    closeUploadDialog() {
      this.isSub++
      this.upLoadForm = {
        contractId: '',
        idCardImagePaths: [],
        subsidyPaths: [],
        otherFilePaths: []
      },
      this.fileList = []
      this.uploadVisible = false
    },
    confirmUpload() {
      addFile(this.upLoadForm).then(res => {
        if (res.code === 0) {
          this.$message.success('上传附件成功')
          this.fileList = []
          this.closeUploadDialog()
        } else {
          this.$message.success('上传附件失败')
        }
      })
    },
    printsub() {
      this.$refs.inputResult.click()
    },
    getDate(date) {
      if (date) {
        const dates = date.split('T')
        return dates[0]
      }
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
    openlookDialog(row) {
      getDetail(row.id).then(res => {
        if (res.code === 0) {
          this.contractContent = res.data
          this.unitData.forEach(item => {
            if (item.dictValue === this.contractContent.productUnit) {
              this.contractContent.productUnit = item.dictLabel
            }
          })
          lookLease(this.contractContent.storeId).then(res => {
            if (res.code === 0) {
              this.ISPName = res.data.serviceName
            }
          })
        }
      })
      this.lookVisible = true
      setTimeout(() => {
        this.$refs.contractContent.style.left = 0 + 'px'
        this.clickTimes = 0
      }, 100)
    },
    closelookDialog() {
      this.lookVisible = false
    },
    // 终止合同
    openStop(row) {
      this.formStop.contractId = row.id
      this.signTime = row.signDate
      this.stopVisible = true
    },
    closeTopDialog() {
      // this.formStop.contractEndCause=''
      // this.formStop.contractEndDate=''
      this.formStop.remark = ''
      this.$refs['formStop'].resetFields()
      this.stopVisible = false
    },
    // 确认终止
    confirmStop() {
      const formRefs = ['formStop'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        stopContract(this.formStop).then(res => {
          if (res.code === 0) {
            this.$message.success('终止合同成功')
            this.closeTopDialog()
            this.getData(this.form)
          } else {
            this.$message.error('终止合同失败')
          }
        })
      })
    },
    // 作废合同
    InvalidContract(contract) {
      const id = contract.id
      this.$confirm('确定要作废合同编号为【' + contract.contractNo + '】的合同吗？', '作废合同', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        contractInvalid(id).then(res => {
          if (res.code === 0 || res.code === '0') {
            this.$message({
              type: 'success',
              message: '作废成功'
            })
            this.getData(this.form)
          } else {
            this.$message.error('作废失败！')
          }
        }).catch(() => {
          this.$message.error('作废失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消作废！'
        })
      })
    },
    // 获取字典
    getDict() {
      // 合同状态字典key
      const dictKey = 'contract_status,stop_cause,cp_unit'
      allSelectdictionaryData([dictKey]).then(response => {
        if (response.code === 0) {
          for (const k in response.data) {
            switch (k) {
              // 月份
              case 'contract_status':
                this.contractStatusDict = response.data[k]
                break
              case 'stop_cause':
                this.stopCause = response.data[k]
                break
              case 'cp_unit':
                this.unitData = response.data[k]
                break
            }
          }
        }
      }).catch(() => {

      })
    },
    // 获取产品下拉列表
    getProductLists() {
      getProductList().then(res => {
        if (res) {
          this.ctyIdList = res
        }
      })
    },
    // not my
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      const parmas = _.cloneDeep(form)
      if (this.ctyId.length > 0) {
        parmas.ctyId = this.ctyId[this.ctyId.length - 1]
      }
      if (this.signDate && this.signDate[0] && this.signDate[1]) {
        parmas.signDateStart = this.signDate[0]
        parmas.signDateEnd = this.signDate[1]
      }
      if (this.createDate && this.createDate[0] && this.createDate[1]) {
        parmas.createDateStart = this.createDate[0]
        parmas.createDateEnd = this.createDate[1]
      }

      // 获取合同列表数据
      listContract(parmas).then(res => {
        if (res.code === 0 || res.code === '0') {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
            this.exportData = JSON.parse(JSON.stringify(parmas))
            delete this.exportData.pageNum
            delete this.exportData.pageSize
          }
        } else {
          this.$message.error('获取合同列表失败！')
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.ctyId = []
      this.signDate = []
      this.createDate = []
      this.form = {
        // 签署日期开始
        signDateStart: '',
        // 签署日期结束
        signDateEnd: '',
        // 创建日期开始
        createDateStart: '',
        // 创建日期结束
        createDateEnd: '',
        // 合同状态
        status: '',
        keyword: '', // 关键字查询
        ctyId: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.jumpPensionAgency()
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/contract/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'look', '_title': `查看租赁服务合同`, 'editAuthority': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    // handleEdit(row) {
    //   this.$router.push({
    //     path: `/productAssist/details/${row.productId}`,
    //     query: {'id': row.productId, 'modelType': 'edit', '_title': `编辑租赁产品`}
    //   });
    // },
    // 删除按钮
    // handleRemove($index, row) {
    //   this.$confirm('确定要删除【' + row.productName + '】的信息吗？一旦被删除，将无法查看【' + row.productName + '】的信息', '删除养老机构信息', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteList(row.productId).then(response => {
    //       if (response.code === 0 || response.code === '0') {
    //         this.$message({
    //           type: 'success',
    //           message: response.msg
    //         });
    //         this.form.pageNum = 1;
    //         this.getData(this.form);
    //       }
    //       else {
    //         this.$message.error(response.msg);
    //       }
    //     }).catch(() => {
    //       this.$message.error('操作失败！');
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除！'
    //     });
    //   });
    // },
    // 跳转到新增
    jumpPensionAgency() {
      this.$router.push({
        path: `/contract/details/0`,
        query: { 'modelType': 'add', '_title': `新增租赁服务合同` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },
    importFun() {
      this.dialogVisibleImport = true
    },
    // 导出功能
    async exportFun() {
      await this.onSubmit()
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出残疾人信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getAssessContractExport(this.exportData).then(response => {
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
        // let confirmTitle = '';
        // if(this.exportData.ctyId === '' && this.exportData.keyword === ''){
        //   confirmTitle = '确认导出全部辅具产品信息吗？';
        // }
        // else {
        //   confirmTitle = '确认导出筛选的辅具产品信息吗？';
        // }
        // this.$confirm(
        //   confirmTitle,
        //   "导出辅具产品信息",
        //   {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning",
        //     closeOnClickModal:false
        //   }
        // )
        //   .then(() => {
        //     const data = qs.stringify(this.exportData);
        //     getOrdanDownload(data).then(response => {
        //       if (response instanceof ArrayBuffer) {
        //         const datas = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;'});
        //         downloadFromBlob(datas, '辅具产品列表.xlsx')
        //       } else {
        //         if (response.code != 0 || response.code != '0') {
        //           this.$message.error("导出辅具产品信息操作失败，失败原因是：" + response.msg);
        //         }
        //       }
        //     }).catch(() => {
        //       if (error && error.message) {
        //         if (error.message.indexOf('timeout') > -1) {
        //           error.message = '网络连接超时';
        //         }
        //         this.$message.error("导出辅具产品信息操作失败，失败原因是：" + error.message);
        //       } else {
        //         this.$message.error("导出辅具产品信息操作失败！");
        //       }
        //     })
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: "info",
        //       message: "已取消操作！"
        //     });
        //   });
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisibleImport = value
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .instituWrap {
    padding: 20px 20px 40px 20px;
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
</style>
