<!--政策资讯信息-->
<template>
	<el-container>
		<el-main class="tableContainer">
      <el-form ref="form_base" key="form_base" :model="form"
               :rules="this.isEditForm?rulesForm:null" label-width="140px">
			<el-tabs v-model="activeTabs">
				<!--基本信息tabs start-->
				<el-tab-pane label="基本信息" name="base">
					<el-collapse v-model="activeCollapse">
						<!--基本信息item start-->
						<el-collapse-item name="baseItem_1">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>基本信息
									</span>
								</div>
							</template>

								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'一级分类':'一级分类：'" prop="classify1">
											<el-select v-if="this.isEditForm" v-model="form.classify1" ref="classify1"
											           placeholder="请选择一级分类" clearable style="width:100%;">
												<el-option v-if="classify1Options.length !== 0"
												           v-for="item in classify1Options" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.classify1Name}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'二级分类':'二级分类：'" prop="classify2">
											<el-select v-if="this.isEditForm" v-model="form.classify2" ref="classify2"
											           placeholder="请选择二级分类" clearable style="width:100%;">
												<el-option v-if="classify2Options.length !== 0"
												           v-for="item in classify2Options" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.classify2Name}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发布单位':'发布单位：'" prop="deptName">
											<el-input v-if="this.isEditForm" ref="deptName" v-model="form.deptName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入发布单位"></el-input>
											<span v-else>{{form.deptName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发布日期':'发布日期：'" prop="pubDate">
											<el-date-picker v-if="this.isEditForm" v-model="form.pubDate"
											                @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择发布日期" style="width:100%;"
											                format="yyyy-MM-dd"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.pubDate}}</span>
										</el-form-item>
									</el-col>

									<el-col :md="24" :lg="16">
										<el-form-item :label="this.isEditForm?'同步发布':'同步发布：'" prop="synRelease"
										              class="synReleaseTip">
											<el-checkbox-group v-if="this.isEditForm" v-model="synRelease">
												<el-checkbox label="同步发布到网站"></el-checkbox>
												<el-checkbox label="同步发布到微信"></el-checkbox>
												<el-checkbox label="仅发布到后台"></el-checkbox>
											</el-checkbox-group>
											<span v-else><span v-for="(item,index) in synRelease">{{item}}{{index === synRelease.length-1?'':'，'}}</span></span>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item :label="this.isEditForm?'资讯标题':'资讯标题：'" prop="title">
											<el-input v-if="this.isEditForm" ref="title" v-model="form.title"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入资讯标题"></el-input>
											<span v-else>{{form.title}}</span>
										</el-form-item>
									</el-col>
									<el-col :span="24" style="height:auto;">
										<el-form-item :label="this.isEditForm?'资讯内容':'资讯内容：'" prop="content" class="beforRequired">
											<div v-if="this.isEditForm">
												<QuillEditor ref="quillEditor" @pics="getPicList" @gethtml="getEditorHtml" :editor-content="form.bizExtendContentVo.content"></QuillEditor>
												<el-input ref="content" v-model="form.bizExtendContentVo.content" style="display: none;"></el-input>
											</div>
											<div v-else class="ql-container ql-snow">
												<div v-html="form.bizExtendContentVo.content" class="ql-editor bizExtendContentVoDiv"></div>
											</div>
										</el-form-item>
									</el-col>

								</el-row>
						</el-collapse-item>
						<!--基本信息item end-->

						<!--服务范围item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务范围
									</span>
								</div>
							</template>
<!--              <el-form ref="form_base" key="form_base" :model="form"-->
<!--                       :rules="this.isEditForm?rulesForm:null" label-width="140px">-->
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="serviceArea" :label="this.isEditForm?'区域范围':'区域范围：'">
                      <Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="areaCode" @keyup.enter.native="editContent('form_base')"
                               :form-code="form.serviceArea" @getAreaCode="getAreaCode_reg"
                               :width="'100%'"></Address>
                      <span v-else>{{form.serviceAreaName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="serviceTarget" :label="this.isEditForm?'服务对象':'服务对象：'">
                      <el-select v-if="this.isEditForm" v-model="form.serviceTarget" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择服务对象" clearable style="width:100%;">
                        <el-option v-if="service_targetOptions.length !== 0"
                                   v-for="item in service_targetOptions" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <span v-else>{{form.serviceTargetName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="ageRange" :label="this.isEditForm?'年龄范围':'年龄范围：'">
                      <div v-if="this.isEditForm" >
                        <el-row>
                          <el-col :span="11">
                            <el-input v-if="this.isEditForm" ref="minAge" @keyup.enter.native="editContent('form_base')"
                                      v-model="form.minAge" clearable
                                      placeholder="最小年龄"
                                      @keyup.native="transformNumber(form.minAge,'minAge')"
                            ></el-input>
                          </el-col>
                          <el-col :span="2"><span
                            style="display: block;text-align: center;">-</span></el-col>
                          <el-col :span="11">
                            <el-input v-if="this.isEditForm" ref="maxAge" @keyup.enter.native="editContent('form_base')"
                                      v-model="form.maxAge" clearable
                                      placeholder="最大年龄"
                                      @keyup.native="transformNumber(form.maxAge,'maxAge')"
                            ></el-input>
                          </el-col>
                        </el-row>
                      </div>
                      <span v-else>{{form.serviceScope}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="peopleCategoryShow">
                    <el-form-item prop="peopleCategory" :label="this.isEditForm?'人口类别':'人口类别：'">
                      <el-select v-if="this.isEditForm" multiple v-model="form.peopleCategory" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择人口类别" clearable style="width:100%;">
                        <el-option v-if="peopleCategory.length !== 0"
                                   v-for="(item, index) in peopleCategory" :key="item.index"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.peopleCategory" :key="index">
                              {{item}}
                               <i v-if="index < newForm.peopleCategory.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="sexShow">
                    <el-form-item prop="serviceTarget" :label="this.isEditForm?'性别':'性别：'">
                      <el-select v-if="this.isEditForm" multiple v-model="form.sex" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择性别" clearable style="width:100%;">
                        <el-option v-if="sex.length !== 0"
                                   v-for="(item, index) in sex" :key="item.index"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.sex" :key="index">
                              {{item}}
                              <i v-if="index < newForm.sex.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="bizLiveStatusShow">
                    <el-form-item prop="bizLiveStatus" :label="this.isEditForm?'居住情况':'居住情况：'">
                      <el-select v-if="this.isEditForm" multiple v-model="form.bizLiveStatus" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择居住情况" clearable style="width:100%;">
                        <el-option v-if="bizLiveStatus.length !== 0"
                                   v-for="item in bizLiveStatus" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.bizLiveStatus" :key="index">
                              {{item}}
                              <i v-if="index < newForm.bizLiveStatus.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="bizAssessLevelShow">
                    <el-form-item prop="bizAssessType" :label="this.isEditForm?'评估类型':'评估类型：'">
                      <el-cascader
                        v-model="form.bizAssessType"
                        :options="bizAssessType"
                        placeholder="请选择评估类型"
                        :props="defaultProps"
                        clearable
                        style="width:100%;"
                        v-if="this.isEditForm"
                        @change="handleChange"
                        ></el-cascader>
<!--                      <el-select v-model="form.bizAssessType" @keyup.enter.native="editContent('form_base')"-->
<!--                                 placeholder="请选择评估类型" multiple clearable style="width:100%;">-->
<!--                        <el-option v-if="bizAssessType.length !== 0"-->
<!--                                   v-for="item in bizAssessType" :key="item.dictValue"-->
<!--                                   :label="item.dictLabel" :value="item.dictValue"></el-option>-->
<!--                      </el-select>-->
                      <div v-else>
                         <span>
                            {{bizAssessTypeLookWord}}
                         </span>/
                         <span v-for="(item, index) in newForm.bizAssessLevel" :key="index">
                            {{item}}
                         </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="hCtegoryShow">
                    <el-form-item prop="hCtegory" :label="this.isEditForm?'救助类别':'救助类别：'">
                      <el-select v-if="this.isEditForm" v-model="form.hCtegory" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择救助类别" multiple clearable style="width:100%;">
                        <el-option v-if="hCtegory.length !== 0"
                                   v-for="item in hCtegory" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.hCtegory" :key="index">
                              {{item}}
                              <i v-if="index < newForm.hCtegory.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="familyTypeShow">
                    <el-form-item prop="familyType" :label="this.isEditForm?'家庭类别':'家庭类别：'">
                      <el-select v-if="this.isEditForm" v-model="form.familyType" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择家庭类别" multiple clearable style="width:100%;">
                        <el-option v-if="familyType.length !== 0"
                                   v-for="item in familyType" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.familyType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.familyType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="monthlyCapitaShow">
                    <el-form-item prop="monthlyCapita" :label="this.isEditForm?'家庭人均月收入':'家庭人均月收入：'">
                      <el-select v-if="this.isEditForm" multiple v-model="form.monthlyCapita" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择家庭人均月收入" clearable style="width:100%;">
                        <el-option v-if="monthlyCapita.length !== 0"
                                   v-for="item in monthlyCapita" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.monthlyCapita" :key="index">
                              {{item}}
                              <i v-if="index < newForm.monthlyCapita.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
<!--                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="categoryShow">-->
<!--                    <el-form-item prop="category" :label="this.isEditForm?'残疾人类别':'残疾人类别：'">-->
<!--                      <el-select v-if="this.isEditForm" v-model="form.category" @keyup.enter.native="editContent('form_base')"-->
<!--                                 placeholder="请选择残疾人类别" multiple clearable style="width:100%;">-->
<!--                        <el-option v-if="category.length !== 0"-->
<!--                                   v-for="item in category" :key="item.dictValue"-->
<!--                                   :label="item.dictLabel" :value="item.dictValue"></el-option>-->
<!--                      </el-select>-->
<!--                      <div v-else>-->
<!--                            <span v-for="(item, index) in newForm.category" :key="index">-->
<!--                              {{item}}-->
<!--                              <i v-if="index < newForm.category.length - 1">,</i>-->
<!--                            </span>-->
<!--                      </div>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="defoTypeShow">
                    <el-form-item prop="defoType" :label="this.isEditForm?'残疾类型':'残疾类型：'">
                      <el-select v-if="this.isEditForm" v-model="form.defoType" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择残疾类型" multiple clearable style="width:100%;">
                        <el-option v-if="defoType.length !== 0"
                                   v-for="item in defoType" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.defoType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="defoLevelShow">
                    <el-form-item prop="defoLevel" :label="this.isEditForm?'残疾等级':'残疾等级：'">
                      <el-select v-if="this.isEditForm" v-model="form.defoLevel" @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择残疾等级" multiple clearable style="width:100%;">
                        <el-option v-if="defoLevel.length !== 0"
                                   v-for="item in defoLevel" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.defoLevel" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoLevel.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="entitledGroupsShow">
                    <el-form-item prop="entitledGroups" :label="this.isEditForm?'优抚类别':'优抚类别：'">
                      <el-select v-if="this.isEditForm" v-model="form.entitledGroups" multiple @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择优抚类别" clearable style="width:100%;">
                        <el-option v-if="entitledGroups.length !== 0"
                                   v-for="item in entitledGroups" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.entitledGroups" :key="index">
                              {{item}}
                              <i v-if="index < newForm.entitledGroups.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="birthControlFamilyShow">
                    <el-form-item prop="birthControlFamily" :label="this.isEditForm?'计生家庭':'计生家庭：'">
                      <el-select v-if="this.isEditForm" v-model="form.birthControlFamily" multiple @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择计生家庭" clearable style="width:100%;">
                        <el-option v-if="birthControlFamily.length !== 0"
                                   v-for="item in birthControlFamily" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.birthControlFamily" :key="index">
                              {{item}}
                              <i v-if="index < newForm.birthControlFamily.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="birthControlSubsidyShow">
                    <el-form-item prop="birthControlFamily" :label="this.isEditForm?'计生补助':'计生补助：'">
                      <el-select v-if="this.isEditForm" v-model="form.birthControlSubsidy" multiple @keyup.enter.native="editContent('form_base')"
                                 placeholder="请选择计生补助" clearable style="width:100%;">
                        <el-option v-if="birthControlSubsidy.length !== 0"
                                   v-for="item in birthControlSubsidy" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <div v-else>
                            <span v-for="(item, index) in newForm.birthControlSubsidy" :key="index">
                              {{item}}
                              <i v-if="index < newForm.birthControlSubsidy.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
<!--              </el-form>-->
						</el-collapse-item>
						<!--服务范围item end-->

					</el-collapse>
				</el-tab-pane>
				<!--基本信息tabs end-->
			</el-tabs>
      </el-form>

			<!--新增时,编辑时-->
			<el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
				<div>
					<el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定
					</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
				</div>
			</el-footer>
			<!--查看时-->
			<el-footer v-if="this.modelType === 'look'">
				<div>
					<el-button v-if="editAuthority==true&&hasEdit==true" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">
						编辑
					</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">返回</el-button>
				</div>
			</el-footer>

		</el-main>
	</el-container>
</template>

<script>
	import {
		userDetailsData,
		submitDataAdd,
		submitDataEdit
	} from "@/api/policyInfoConfig/policyInformation";
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {getEditAuthority} from "@/api/user";
	import {limitTextEllipsis,transformNumber,transformNumberLetter} from "@/utils/index";
	import QuillEditor from "@/components/QuillEditor";

	export default {
		components: {Address, QuillEditor},
		data() {
			//校验同步发布
			let verifySynRelease = (rule, value, callback) => {
				if (this.synRelease.length === 0) {
					callback(new Error('同步发布至少要选择一项！'));
				}
				else {
					callback();
				}
			};

			//资讯标题
			let verifyTitle = (rule, value, callback) => {
				if (value) {
					if(value.length > 100){
						callback(new Error('资讯标题长度不能超过200，请输入！'));
					}
					else {
						callback();
					}
				}
				else {
					callback(new Error('资讯标题不能为空，请输入！'));
				}
			};

			//资讯内容
			let verifyContent = (rule, value, callback) => {
				if(this.form.bizExtendContentVo.content){
					callback();
				}
				else {
					callback(new Error('资讯内容不能为空，请输入！'));
				}
			};

			return {
				//下拉框字典数据
				service_targetOptions: [],//服务对象
				classify1Options: [],//一级分类下拉数据
				classify2Options: [],//二级分类下拉数据

				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

				//机构类型的字段配置
				institutionField: [
					{children: []},
					{children: []},
					{children: []}
				],
        defaultProps: {
          label: "dictLabel",
          value: "dictValue"
        },
				//表单
				form: {
					//-----基本信息-------
					classify1:'',//一级分类
					classify1Name:'',//一级分类
					classify2:'',//二级分类
					classify2Name:'',//二级分类
					pubDate: '',//活动日期
					deptName: '',//发布单位
					syncWeb: 'N',//同步发布到网站
					syncWeixin: 'N',//同步发布到微信
					onlyBack: 'Y',//仅发布到后台
					title:'',//资讯标题
					//富文本内容
					bizExtendContentVo: {
						parentId: '',//父id
						content: '',//内容
						id: '',//服务项目id
						infoType: '',//内容类型
					},
					serviceArea: [],//
					serviceTarget: '',//服务对象
					maxAge: '',//最大年龄
					minAge: '',//最小年龄
          // newData
          peopleCategory: [], // 人口类别
          sex: [], // 性别
          bizLiveStatus: [], // 居中情况
          bizAssessType: [], // 评估类型
          bizAssessLevel: [], // 评估等级
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [], // 计生补助
          // bizAgeLevel: [], // 年龄类别
				},
        newForm: {
          peopleCategory: [], // 人口类别
          sex: [], // 性别
          bizLiveStatus: [], // 居中情况
          bizAssessType: [], // 评估类型
          bizAssessLevel: [], // 评估等级
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          // bizAgeLevel: [], // 年龄类别
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [] // 计生补助
        },
				synRelease: ['仅发布到后台'],//同步发布

				loading: false,
        hasEdit:false,
				editorOption: {},

				//form 表单的验证规则
				rulesForm: {
					//一级分类
					classify1:[
						{required: true, trigger: 'change', message:'请选择一级分类'},
					],
					//二级分类
					classify2:[
						{required: true, trigger: 'change', message:'请选择二级分类'},
					],
					//同步发布
					synRelease:[
						{required: true, trigger: 'change', validator: verifySynRelease},
					],
					//资讯标题
					title:[
						{required: true, trigger: 'blur', validator: verifyTitle},
					],
					//资讯内容
					content:[
						{required: true, trigger: 'change', validator: verifyContent},
					],
          serviceArea:[
            {required: true, trigger: 'change', message:'请选择区域范围'},
          ],
				},

				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse:
					['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数

				//自适应
				adaptiveGrid: {
					md: adaptiveGrid_max.md,
					lg: adaptiveGrid_max.lg
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg:
					adaptiveGrid_plus.lg
				},

				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				editAuthority: false,//编辑按钮的权限
				areaCode: [],//所属居委全部ID
				// quillEditorHtml:'',//富文本的内容
				imageInfoVos:[],//富文本图片的集合

        // new
        peopleCategory: [], // 人口分类
        sex: [], // 性别
        bizLiveStatus: [], // 居住情况
        bizAssessLevel: [], // 评估等级
        bizAssessType: [], // 评估类型
        hCtegory: [], // 救助类别
        familyType: [], // 家庭类别
        monthlyCapita: [], // 家庭人均收入
        // category: [], // 残疾人类别
        defoType: [], // 残疾类型
        defoLevel: [], // 残疾等级
        entitledGroups: [], // 优抚类别
        birthControlFamily: [], // 计生家庭
        birthControlSubsidy: [], // 计生补助
        bizAssessTypeLook: [], // 评估类型
        // bizAgeLevel: [], // 年龄类别
        bizAssessTypeLookWord: '',
        //
        peopleCategoryShow: false, // 人口分类
        sexShow: false, // 性别
        bizLiveStatusShow: false, // 居住情况
        bizAssessLevelShow: false, // 评估类型
        hCtegoryShow: false, // 救助类别
        familyTypeShow: false, // 家庭类别
        monthlyCapitaShow: false, // 家庭人均收入
        // categoryShow: false, // 残疾人类别
        defoTypeShow: false, // 残疾类型
        defoLevelShow: false, // 残疾等级
        entitledGroupsShow: false, // 优抚类别
        birthControlFamilyShow: false, // 计生家庭
        birthControlSubsidyShow: false, // 计生补助
        // bizAgeLevelShow: false // 年龄分类
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
      this.hasEdit=this.$route.query.hasEdit
			this.modelType = this.$route.query.modelType;
			//当前机构id
			let _userId_ = this.$route.query.id || '';
			this.getData(_userId_);
      if (this.modelType === 'look') {
				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.query.editAuthority).then(response => {
          response.forEach((item) => {
						if (item.menuName === '编辑') {
							this.editAuthority = item.visible === '0' ? true : false;
						}
            switch (item.perms){
              case 'policyInfoConfig:policyInformation:PopulationType':
                this.peopleCategoryShow = true;
                break;
              case 'policyInfoConfig:policyInformation:Gender':
                this.sexShow = true;
                break;
              case 'policyInfoConfig:policyInformation:LivingCondition':
                this.bizLiveStatusShow = true
                break;
              case 'policyInfoConfig:policyInformation:AssessmentType':
                this.bizAssessLevelShow = true;
                break;
              case 'policyInfoConfig:policyInformation:RescueCategory':
                this.hCtegoryShow = true;
                break;
              case 'policyInfoConfig:policyInformation:FamilyCategory':
                this.familyTypeShow = true;
                break;
              case 'policyInfoConfig:policyInformation:FamilyIncome':
                this.monthlyCapitaShow = true;
                break;
              // case 'policyInfoConfig:policyInformation:DisabilityCategories':
              //   this.categoryShow = true;
              //   break;
              case 'policyInfoConfig:policyInformation:DisabilityType':
                this.defoTypeShow = true;
                break;
              case 'policyInfoConfig:policyInformation:DisabilityLevel':
                this.defoLevelShow = true;
                break;
              case 'policyInfoConfig:policyInformation:PreferentialTreatmentCategory':
                this.entitledGroupsShow = true;
                break;
              case 'policyInfoConfig:policyInformation:birthControlFamily':
                this.birthControlFamilyShow = true;
                break;
              case 'policyInfoConfig:policyInformation:birthControlSubsidy':
                this.birthControlSubsidyShow = true;
                break;
              // case 'policyInfoConfig:policyInformation:AgeLevel':
              //   this.bizAgeLevelShow = true;
              //   break;
            }
					});
				}).catch(() => {
					this.$message.error('获取编辑按钮的权限控制失败！');
				});
			}
      // new
      this.selectData()
      this.editAuth()
		},
		methods: {
      handleChange(value) {
      },
		  // 编辑权限
      editAuth() {
        if (this.modelType !== 'look' ) {
          getEditAuthority(this.$route.query.menu).then(response => {
            response.forEach((item) => {
              switch (item.perms){
                case 'policyInfoConfig:policyInformation:PopulationType':
                  this.peopleCategoryShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:Gender':
                  this.sexShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:LivingCondition':
                  this.bizLiveStatusShow = true
                  break;
                case 'policyInfoConfig:policyInformation:AssessmentType':
                  this.bizAssessLevelShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:RescueCategory':
                  this.hCtegoryShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:FamilyCategory':
                  this.familyTypeShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:FamilyIncome':
                  this.monthlyCapitaShow = true;
                  break;
                // case 'policyInfoConfig:policyInformation:DisabilityCategories':
                //   this.categoryShow = true;
                //   break;
                case 'policyInfoConfig:policyInformation:DisabilityType':
                  this.defoTypeShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:DisabilityLevel':
                  this.defoLevelShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:PreferentialTreatmentCategory':
                  this.entitledGroupsShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:birthControlFamily':
                  this.birthControlFamilyShow = true;
                  break;
                case 'policyInfoConfig:policyInformation:birthControlSubsidy':
                  this.birthControlSubsidyShow = true;
                  break;
                // case 'policyInfoConfig:policyInformation:AgeLevel':
                //   this.bizAgeLevelShow = true;
                //   break;
              }
            });
          }).catch(() => {
            this.$message.error('获取编辑按钮的权限控制失败！');
          });
        }
      },
			// 异步事件同步化
			async getData(id) {
				await this.getSelect();
				await this.getSelectAll();
				if (this.modelType === 'edit') {
					this.isEditForm = true;
					await
						this.editGetData(id, 'edit');
				}
				else if (this.modelType === 'add') {
					this.isEditForm = true;
					this.idEdit = false;
				}
				else if (this.modelType === 'look') {
					this.isEditForm = false;
					await
						this.editGetData(id, '');
				}
			},
      // 循环遍历数据获取多选的数据
      getArrData(arr, keyName, myName) {
        arr.forEach(item =>{
          if (item.keyName === keyName) {
            this.form[myName].push(item.valueName);
          }
        })
      },
			// 编辑-查看 获取数据
			editGetData(id, st) {
				return new Promise((resolve, reject) => {
					//请求当前服务项目信息
					userDetailsData(id, st).then(response => {
						if(!response.bizExtendContentVo){
							//富文本内容
							response.bizExtendContentVo = {
								parentId: '',//父id
								content: '',//内容
								id: '',//服务项目id
								infoType: '',//内容类型
							};
						}

						//页面form表单的值
						this.form = {...this.form, ...response};
            this.getArrData(this.form.bizServiceAreaVos, 'people_category', 'peopleCategory'); // 人口分类
            this.getArrData(this.form.bizServiceAreaVos, 'sex', 'sex'); // 性别
            this.getArrData(this.form.bizServiceAreaVos, 'biz_live_status', 'bizLiveStatus'); // 居中情况
            this.getArrData(this.form.bizServiceAreaVos, 'biz_assess_level', 'bizAssessLevel'); // 评估类型
            this.getArrData(this.form.bizServiceAreaVos, 'h_category', 'hCtegory'); // 救助类比
            this.getArrData(this.form.bizServiceAreaVos, 'family_type', 'familyType');// 家庭类别
            this.getArrData(this.form.bizServiceAreaVos, 'monthly_capita', 'monthlyCapita'); // 家庭人均收入
            // this.getArrData(this.form.bizServiceAreaVos, 'category', 'category'); // 残疾人类别
            this.getArrData(this.form.bizServiceAreaVos, 'defo_type', 'defoType'); // 残疾类型
            this.getArrData(this.form.bizServiceAreaVos, 'defo_level', 'defoLevel'); // 残疾等级
            this.getArrData(this.form.bizServiceAreaVos, 'entitled_groups', 'entitledGroups'); // 优抚类别
            this.getArrData(this.form.bizServiceAreaVos, 'birthControl_family', 'birthControlFamily'); // 计生家庭
            this.getArrData(this.form.bizServiceAreaVos, 'birthControl_subsidy', 'birthControlSubsidy'); // 计生补助
            // this.getArrData(this.form.bizServiceAreaVos, 'biz_age_level', 'bizAgeLevel'); // 年龄分类
            let arrJl = []
            this.form.bizServiceAreaVos.forEach((item, index) =>{
              if (item.keyName === 'biz_assess_type') {
                arrJl[0] = item.valueName
              }
            })
            this.form.bizServiceAreaVos.forEach((item, index) =>{
              if (item.keyName === 'biz_assess_level') {
                 arrJl[1] = item.valueName
              }
            })
            this.form.bizAssessType = arrJl
            if (st === 'edit') {
              this.form.bizAssessType[1] = this.form.bizAssessType[1] + this.form.bizAssessType[0]
            }
            if (st !== 'edit') {
              let type = ''
              this.form.bizServiceAreaVos.forEach(item =>{
                if (item.keyName === "biz_assess_type") {
                  type = item.valueName
                }
              });
              this.bizAssessTypeLook.forEach(item =>{
                if (this.form.bizServiceAreaVos.length !== 0 && item.dictValue === type) {
                  this.bizAssessTypeLookWord = item.dictLabel
                }
              });
              this.getLookData(this.peopleCategory,'peopleCategory');
              this.getLookData(this.sex,'sex');
              this.getLookData(this.bizLiveStatus,'bizLiveStatus');
              this.getLookData(this.bizAssessType,'bizAssessType');
              this.getLookData(this.bizAssessLevel,'bizAssessLevel');
              this.getLookData(this.hCtegory,'hCtegory');
              this.getLookData(this.familyType,'familyType');
              this.getLookData(this.monthlyCapita,'monthlyCapita');
              // this.getLookData(this.category,'category');
              this.getLookData(this.defoType,'defoType');
              this.getLookData(this.defoLevel,'defoLevel');
              this.getLookData(this.entitledGroups,'entitledGroups');
              this.getLookData(this.birthControlFamily,'birthControlFamily');
              this.getLookData(this.birthControlSubsidy,'birthControlSubsidy');
              // this.getLookData(this.bizAgeLevel,'bizAgeLevel');
            }
            //同步发布
						this.synRelease = [];
						if (this.form.syncWeb === "Y") {
							this.synRelease.push('同步发布到网站');
						}
						if (this.form.syncWeixin === "Y") {
							this.synRelease.push('同步发布到微信');
						}
						if (this.form.onlyBack === "Y") {
							this.synRelease.push('仅发布到后台');
						}
						if (this.form.syncWeb === 'N' && this.form.syncWeixin === "N" && this.form.onlyBack === "N") {
							this.form.onlyBack = "Y";
							this.synRelease.push('仅发布到后台');
						}

						this.form.minAge = this.form.minAge === null ? '' : this.form.minAge;
						this.form.maxAge = this.form.minAge === null ? '' : this.form.maxAge;

						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							//区域范围
							this.form.serviceArea = this.form.serviceAreaLevel?this.form.serviceAreaLevel.split(','):'';
						}

						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取服务项目信息失败！");
					});
				})
			},
      // 查看时把遍历字典取值
      getLookData(arr, data) {
        this.form[data].forEach(item =>{
          for (let i = 0; i < arr.length ; i++) {
            if (item === arr[i].dictValue) {
              this.newForm[data].push(arr[i].dictLabel)
            }
          }
        })
      },
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'classify1,classify2,service_target';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//一级分类
									case 'classify1':
										this.classify1Options = response.data[k];
										break;
									//二级分类
									case 'classify2':
										this.classify2Options = response.data[k];
										break;
									//服务对象
									case 'service_target':
										this.service_targetOptions = response.data[k];
										break;
								}
							}
						}
						else {
							this.$message.error('数据字典接口请求失败！')
						}
						resolve()
					}).catch(() => {
						this.$message.error('数据字典接口请求失败！')
						reject()
					})
				})
			},
      getSelectAll() {
        return new Promise((resolve, reject) => {
          //数据字典接口
          let dicKey = 'people_category,sys_sex,biz_live_status,biz_assess_level,h_category,family_type,monthly_capita,defo_type,defo_level,entitled_groups,biz_assess_type,birthControl_family,birthControl_subsidy';
          allSelectdictionaryData(dicKey).then(response =>{
            if (response.code === 0) {
              for (let k in response.data) {
                switch (k) {
                  //人口分类
                  case 'people_category':
                    this.peopleCategory = response.data[k];
                    break;
                  //性别
                  case 'sys_sex':
                    this.sex = response.data[k];
                    break;
                  //服务对象
                  case 'biz_live_status':
                    this.bizLiveStatus = response.data[k];
                    break;
                  // 评估类型
                  case 'biz_assess_level':
                    this.bizAssessLevel = response.data[k];
                    break;
                  // 救助类别
                  case 'h_category':
                    this.hCtegory = response.data[k];
                    break;
                  // 家庭类别
                  case 'family_type':
                    this.familyType = response.data[k];
                    break;
                  // 家庭人均收入
                  case 'monthly_capita':
                    this.monthlyCapita = response.data[k];
                    break;
                  // 残疾人类别
                  // case 'category':
                  //   this.category = response.data[k];
                  //   break;
                  // 家庭人均收入
                  case 'defo_type':
                    this.defoType = response.data[k];
                    break;
                  // 家庭人均收入
                  case 'defo_level':
                    this.defoLevel = response.data[k];
                    break;
                  // 优抚类别
                  case 'entitled_groups':
                    this.entitledGroups = response.data[k];
                    break;
                  // 计生家庭
                  case 'birthControl_family':
                    this.birthControlFamily = response.data[k];
                    break;
                  // 计生补助
                  case 'birthControl_subsidy':
                    this.birthControlSubsidy = response.data[k];
                    break;
                  // 年龄类别
                  // case 'biz_age_level':
                  //   this.bizAgeLevel   = response.data[k];
                  //   break;
                }
              }
              this.bizAssessType.forEach((item, index) =>{
                const data = JSON.parse(JSON.stringify(this.bizAssessLevel));
                data.forEach((list, i) =>{
                  data[i].dictValue = list.dictValue + index
                });
                item.children = data
              })
            }
            else {
              this.$message.error('数据字典接口请求失败！')
            }
            resolve()
          }).catch(() => {
            this.$message.error('数据字典接口请求失败！')
            reject()
          })
        })
      },
			//取消按钮
			cancelDetailsPage() {
				this.$confirm("该页面的信息尚未保存，确定要关闭页面吗", "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					closeOnClickModal: false
				}).then(() => {
					this.closeDetailsPage();
				}).catch(() => {
				});
			},
			//取消，返回按钮，关闭详情页
			closeDetailsPage() {
				//关闭页面
				closeSelectedTag(this, this.$route);
				this.$router.push({path: '/streetPlatform/policyInfoConfig/policyInformation'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
      // 循环遍历多选塞入数组中
      pushArr(arr, allArr, name) {
			  arr.forEach(item =>{
			    const data = {};
			    data.keyName = name;
          data.valueName = item;
          allArr.push(data)
        })
      },
			//确定按钮-提交表单
			editContent(formName) {
				if (this.form.deptName && this.form.deptName.length > 50) {
					return this.$message.error('发布单位长度超过50，请重新输入！');
				}
				if (parseInt(this.form.minAge) > 150 || parseInt(this.form.maxAge) > 150) {
					return this.$message.error('年龄范围填写有误，请重新输入！');
				}
				if (this.form.minAge !== '' && this.form.minAge !== null && this.form.maxAge !== '' && this.form.maxAge !== null) {
					if (parseInt(this.form.minAge) >= parseInt(this.form.maxAge)) {
						return this.$message.error('年龄范围填写有误，请重新输入！');
					}
				}

				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						if(this.areaCode.length===0){
							return this.$message.error("区域范围不能为空，请选择！")
						}
						let params = this.form;
						params.serviceArea = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + '';

						params.syncWeb = params.syncWeixin = params.onlyBack = 'N';
						if (this.synRelease.length !== 0) {
							this.synRelease.forEach(function (item) {
								if (item === '同步发布到网站') {
									params.syncWeb = 'Y';
								}
								if (item === '同步发布到微信') {
									params.syncWeixin = 'Y';
								}
								if (item === '仅发布到后台') {
									params.onlyBack = 'Y';
								}
							});
						}
						else {
							params.onlyBack = 'Y';
						}
            params.bizServiceAreaVos = [];
						if (this.form.bizAssessType.length !== 0) {
						  if (this.form.bizAssessType[0] && this.form.bizAssessType[1]) {
                const bizAssessType = [];
                this.bizAssessType.forEach(item =>{
                  if (item.dictValue === this.form.bizAssessType[0]) {
                    bizAssessType.push(item.dictValue)
                  }
                });
                this.pushArr(bizAssessType, params.bizServiceAreaVos, 'biz_assess_type'); // 评估类型
                const bizAssessLevel = [];
                let s = this.form.bizAssessType[1].substring(0, this.form.bizAssessType[1].length-1);
                this.bizAssessLevel.forEach(item =>{
                  if (item.dictValue === s) {
                    bizAssessLevel.push(item.dictValue)
                  }
                });
                this.pushArr(bizAssessLevel, params.bizServiceAreaVos, 'biz_assess_level'); // 评估等级
              }
            }

            this.pushArr(this.form.peopleCategory, params.bizServiceAreaVos, 'people_category'); // 人口分类
            this.pushArr(this.form.sex, params.bizServiceAreaVos, 'sex');// 性别
            this.pushArr(this.form.bizLiveStatus, params.bizServiceAreaVos, 'biz_live_status'); // 居住情况
            this.pushArr(this.form.hCtegory, params.bizServiceAreaVos, 'h_category'); // 救助类别
            this.pushArr(this.form.familyType, params.bizServiceAreaVos, 'family_type'); // 家庭类别
            this.pushArr(this.form.monthlyCapita, params.bizServiceAreaVos, 'monthly_capita'); // 家庭人均收入
            // this.pushArr(this.form.category, params.bizServiceAreaVos, 'category'); // 残疾人类别
            this.pushArr(this.form.defoType, params.bizServiceAreaVos, 'defo_type'); // 残疾类型
            this.pushArr(this.form.defoLevel, params.bizServiceAreaVos, 'defo_level'); // 残疾等级
            this.pushArr(this.form.entitledGroups, params.bizServiceAreaVos, 'entitled_groups'); // 优抚类别
            this.pushArr(this.form.birthControlFamily, params.bizServiceAreaVos, 'birthControl_family'); // 计生家庭
            this.pushArr(this.form.birthControlSubsidy, params.bizServiceAreaVos, 'birthControl_subsidy'); // 计生补助
            // this.pushArr(this.form.bizAgeLevel, params.bizServiceAreaVos, 'biz_age_level'); // 年龄分类
						//处理富文本
            params.bizExtendContentVo.content = this.form.bizExtendContentVo.content;
						params.bizExtendContentVo.id = this.form.bizExtendContentVo.id;
						params.bizExtendContentVo.infoType = this.form.bizExtendContentVo.infoType;
						params.bizExtendContentVo.parentId = this.form.bizExtendContentVo.parentId;
						params.imageInfoVos = this.imageInfoVos;
						let _title_ = limitTextEllipsis(this.form.title,10);

						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘" + _title_ + "’政策资讯信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘" + _title_ + "’政策资讯信息失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑‘" + _title_ + "’政策资讯信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘" + _title_ + "’政策资讯信息失败!");
							});
						}
						//查看
						else if (this.modelType === 'look') {
							//关闭页面
							this.closeDetailsPage();
						}
					}
					else {
						this.activeTabs = 'base';
						window.scrollTo(0, 0);
						return false;
					}
				});
			}
			,
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _id_ = this.$route.query.id;
				let _title_ = limitTextEllipsis(this.form.title,10);
        this.$router.push({
					path: `/policyInformation/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}`,'menu': this.$route.query.editAuthority} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 获取图片数据
			getPicList(val) {
				this.imageInfoVos = val;
			},
			//获取富文本的内容
			getEditorHtml(html) {
				//this.quillEditorHtml = html;
				this.form.bizExtendContentVo.content = html;
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.areaCode = val;
        this.form.serviceArea = val;
			},
			//只能输入数字类型
			transformNumber(value,obj){
				this.form[obj] = transformNumber(value);
			},
      // new
      // 数据字典
      selectData() {
        let dicKey = 'people_category,sys_sex,biz_live_status,biz_assess_level,h_category,family_type,monthly_capita,defo_type,defo_level,entitled_groups,biz_assess_type,birthControl_family,birthControl_subsidy';
        allSelectdictionaryData(dicKey).then(response =>{
          if (response.code === 0) {
            for (let k in response.data) {
              switch (k) {
                //人口分类
                case 'people_category':
                  this.peopleCategory = response.data[k];
                  break;
                //性别
                case 'sys_sex':
                  this.sex = response.data[k];
                  break;
                //服务对象
                case 'biz_live_status':
                  this.bizLiveStatus = response.data[k];
                  break;
                // 评估等级
                case 'biz_assess_level':
                  this.bizAssessLevel = response.data[k];
                  break;
                // 评估类型
                case 'biz_assess_type':
                  this.bizAssessType = response.data[k];
                  this.bizAssessTypeLook = JSON.parse(JSON.stringify(response.data[k]));
                  break;
                // 救助类别
                case 'h_category':
                  this.hCtegory = response.data[k];
                  break;
                // 家庭类别
                case 'family_type':
                  this.familyType = response.data[k];
                  break;
                // 家庭人均收入
                case 'monthly_capita':
                  this.monthlyCapita = response.data[k];
                  break;
                // 残疾人类别
                // case 'category':
                //   this.category = response.data[k];
                //   break;
                // 家庭人均收入
                case 'defo_type':
                  this.defoType = response.data[k];
                  break;
                // 家庭人均收入
                case 'defo_level':
                  this.defoLevel = response.data[k];
                  break;
                // 优抚类别
                case 'entitled_groups':
                  this.entitledGroups = response.data[k];
                  break;
                // 计生家庭

                case 'birthControl_family':
                  this.birthControlFamily = response.data[k];
                  break;
                // 计生补助
                case 'birthControl_subsidy':
                  this.birthControlSubsidy = response.data[k];
                  break;
                // 年龄类别
                // case 'biz_age_level':
                //   this.bizAgeLevel   = response.data[k];
                //   break;
              }

            }
            this.bizAssessType.forEach((item, index) =>{
              const data = JSON.parse(JSON.stringify(this.bizAssessLevel));
              data.forEach((list, i) =>{
                data[i].dictValue = list.dictValue + index
              });
              item.children = data
            })
          }
        })
      }

		}
	}
</script>

<style scoped lang="scss">
	@import "~@/styles/form.css";

	.tableContainer {
		margin-top: 20px;
	}
  .detail-selects {
    width: 100%;
    padding: 0 20px;
    float: left;
    .detail-selects-list {
      width: 100%;
      margin-bottom: 15px;
      float: left;
      .detail-selects-item {
        width: 20%;
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
          font-size: 14px;
          text-align: center;
          height: 37px;
          line-height: 37px;
          border: 1px solid #e1e1e1;
          border-top: 0;
          border-right: 0;
        }
      }
      .detail-selects-item:last-of-type {
        .detail-selects-list-title {
          border-right: 1px solid #e1e1e1 !important;
        }
        .detail-selects-list-input {
          border-right: 1px solid #e1e1e1 !important;
        }
      }
    }
  }
</style>
<style>
	.synReleaseTip > .el-form-item__content > .el-form-item__error {
		top: 70% !important;
	}
	.beforRequired label::before{
		content: '*';
		color: #ff4949;
		display: inline-block;
		margin-right: 0px;
	}
	.bizExtendContentVoDiv > p{
		margin: 0 !important;
	}
</style>
