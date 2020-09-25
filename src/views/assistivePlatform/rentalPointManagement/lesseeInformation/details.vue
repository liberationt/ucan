 <template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>基本信息
                  </span>
                </div>
              </template>
              <el-form ref="form_base" key="form_base" :model="form"
                :rules="isEditForm?rulesForm:null" label-width="120px">
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input v-if="isEditForm" v-model.trim="form.fullName"
                        :disabled="disabled" clearable ref="fullName"
                        placeholder="请输入姓名" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.fullName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证':'身份证：'" prop="idCard">
                      <el-input v-if="isEditForm" v-model.trim="form.idCard"
                        :disabled="disabled" clearable ref="idCard"
                        placeholder="请输入身份证" @input="handleIdCardInput" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.idCard}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
                      <el-select v-if="isEditForm" v-model="form.sex"
                        placeholder="请选择性别" clearable style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in sexOptions"
                          :key="item.dictValue" :label="item.dictLabel"
                          :value="item.dictValue"></el-option>
											</el-select>
                      <span v-else>{{form.sex=='0'?'男':form.sex=='1'?'女':''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
											<el-date-picker v-if="isEditForm" v-model="form.birthday" type="date"
                        @change="birthdayChange"
                        placeholder="请选择出生日期" style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @keyup.enter.native="editContent"></el-date-picker>
											<span v-else>{{form.birthday}}</span>
										</el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
                      <el-input v-if="isEditForm" v-model="form.age" disabled
                        clearable placeholder="系统自动计算" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.age}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭电话':'家庭电话：'" prop="homePhone">
                      <el-input v-if="isEditForm" v-model.trim="form.homePhone"
                        :disabled="disabled" type="phone" clearable ref="homePhone"
                        placeholder="请输入家庭电话" @blur="handleHomePhoneBlur" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.homePhone}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'手机号码':'手机号码：'" prop="mobile">
                      <el-input v-if="isEditForm" v-model.trim="form.mobile" ref="mobile"
                        :disabled="disabled" clearable placeholder="请输入手机号码" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.mobile}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>住址信息
                  </span>
                </div>
              </template>
              <el-form ref="form_address" key="form_address" :model="form" :rules="this.isEditForm?rulesForm:null"
                label-width="160px">
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item :label="isEditForm?'居住行政区划':'居住行政区划：'"
                            prop="liveArea">
                      <Address v-if="isEditForm" :id-edit="idEdit" :area-code="areaCode"
                            :form-code="form.liveArea"
                            :scope="'All'"
                            @getAreaCode="getAreaCode_reg" :width="'100%'" @keyup.enter.native="submitBtn"></Address>
                      <span v-else>{{form.liveAreaName}}</span>
                    </el-form-item>
                  </el-col>
                <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                  <el-form-item :label="isEditForm?'居住详细地址':'居住详细地址：'"
                          prop="liveAddr" :rules="rulesForm.address">
                    <el-input v-if="isEditForm" ref="liveAddr"
                          v-model.trim="form.liveAddr" :disabled="disabled" clearable
                          placeholder="请输入居住详细地址" @keyup.enter.native="submitBtn"></el-input>
                    <span v-else>{{form.liveAddr}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>标签信息
                  </span>
                </div>
              </template>
              <el-form ref="form_tag" key="form_tag" :model="form"
                :rules="isEditForm?rulesForm:null" label-width="120px">
                <el-row :gutter="0">
					        <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'补贴类别':'补贴类别：'" prop="subsidyType">
                      <el-select v-if="isEditForm"
                        v-model="form.subsidyType"
                        clearable placeholder="请选择补贴类别" style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in subsidyOptions" :key="item.dictValue"
                          :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <span v-else>{{form.subsidyTypeName}}</span>
                    </el-form-item>
                  </el-col>
				          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'救助类别':'救助类别：'" prop="helpType">
                      <el-select v-if="isEditForm"
                        v-model="form.helpType"
                        clearable placeholder="请选择救助类别" style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in helpOptions" :key="item.dictValue"
                          :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <span v-else>{{form.helpTypeName}}</span>
                    </el-form-item>
                  </el-col>
				          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'二代残疾证':'二代残疾证：'" prop="defoCode">
                      <el-input v-if="isEditForm" ref="defoCode"
										  	v-model.trim="form.defoCode" clearable
											  placeholder="请输入二代残疾证" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.defoCode}}</span>
                    </el-form-item>
                  </el-col>
				          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'残疾类别':'残疾类别：'" prop="defoType">
                      <el-select v-if="isEditForm"
                        v-model="form.defoType"
                        clearable placeholder="请选择残疾类别" style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in defoOptions" :key="item.dictValue"
                          :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <span v-else>{{form.defoTypeName}}</span>
                    </el-form-item>
                  </el-col>
				          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'残疾等级':'残疾等级：'" prop="defoLevel">
                      <el-select v-if="isEditForm"
                        v-model="form.defoLevel"
                        clearable placeholder="请选择残疾等级" style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in levelOptions" :key="item.dictValue"
                          :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                      <span v-else>{{form.defoLevelName}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
			      <el-collapse-item name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>代理人
                  </span>
                </div>
              </template>
        <el-form class="labelform" ref="form_agent" key="form_agent"  :model="form" :rules="this.isEditForm?rulesForm:null"
            label-width="120px">
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'代理人姓名':'代理人姓名：'" prop="agentName">
                <el-input v-if="isEditForm"
                  v-model.trim="form.agentName"
                  ref="agentName"
                  clearable placeholder="请输入代理人姓名" @keyup.enter.native="submitBtn"></el-input>
                <span v-else>{{form.agentName}}</span>
                </el-form-item>
                        </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'代理人身份证':'代理人身份证：'" prop="agentIdCard">
                <el-input v-if="isEditForm"
                  v-model.trim="form.agentIdCard"
                  ref="agentIdCard"
                  clearable placeholder="请输入代理人身份证" @keyup.enter.native="submitBtn"></el-input>
                <span v-else>{{form.agentIdCard}}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'代理人电话':'代理人电话：'" prop="agentPhone">
                <el-input v-if="isEditForm"
                  v-model.trim="form.agentPhone"
                  ref="agentPhone"
                  clearable placeholder="请输入代理人电话" @keyup.enter.native="submitBtn"></el-input>
                <span v-else>{{form.agentPhone}}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'代理人手机':'代理人手机：'" prop="agentMobile">
                <el-input v-if="isEditForm"
                  v-model.trim="form.agentMobile"
                  ref="agentMobile"
                  clearable placeholder="请输入代理人手机" @keyup.enter.native="submitBtn"></el-input>
                <span v-else>{{form.agentMobile}}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
              <el-form-item id="labelstyle" :label="isEditForm?'代理人统一社会信用代码':'代理人统一社会信用代码：'" prop="agentOrgCode">
              <el-input v-if="isEditForm"
                v-model.trim="form.agentOrgCode"
                ref="agentOrgCode"
                clearable placeholder="代理人统一社会信用代码" @keyup.enter.native="submitBtn"></el-input>
              <span v-else>{{form.agentOrgCode}}</span>
              </el-form-item>
              </el-col>
            </el-row>
				  </el-form>
        </el-collapse-item>
            <el-collapse-item name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>备注
                  </span>
                </div>
              </template>
                <el-form ref="form_remark" key="form_remark" :model="form" :rules="this.isEditForm?rulesForm:null"
				      	  label-width="80px">
					        <el-row :gutter="0">
						    <el-form-item v-if="this.isEditForm" prop="remark">
                    <el-input ref="remark" type="textarea" :rows="5" :disabled="disabled"
                      v-model.trim="form.remark" placeholder="请输入备注"
                      maxlength="200" show-word-limit @keyup.enter.native="submitBtn"></el-input>
                </el-form-item>
						<p v-else class="remarkSpan">{{form.remark}}</p>
					</el-row>
				</el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
    <el-tab-pane v-if="this.modelType === 'look'" label="租赁记录" name="subsidy">
			<el-form :model="form">
				<el-table :data="PreferentialList" style="width: 100%">
					<el-table-column  label="签署日期" prop="signDate"></el-table-column>
					<el-table-column  label="合同编号" prop="contractNo"></el-table-column>
					<el-table-column  label="租赁点" prop="storeName"></el-table-column>
					<el-table-column  label="产品名称及编号" prop="productName"></el-table-column>
					<el-table-column  label="单次租赁价格（元）" prop="oneRentPrice"></el-table-column>
					<el-table-column  label="补贴后单次租赁价格（元）" prop="subsidyAfterOneRentPrice"></el-table-column>
					<el-table-column  label="本次补贴金额（元）" prop="currentSubsidyMoney"></el-table-column>
				</el-table>
			</el-form>
		</el-tab-pane>
      </el-tabs>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
					<div v-if="this.activeTabs === 'base'">
						<el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="submitBtn('form_base')">确定</el-button>
					</div>
					<div v-else>
						<el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('base')">上一步</el-button>
						<el-button class="cancel-btn btnMarginLeft15" @click="cancelBtn">取消</el-button>
						<el-button type="warning" class="base-btn btnMarginLeft15" @click="submitBtn('form_base')">确定</el-button>
					</div>
				</div>
				<div v-else>
					<el-button v-if="editAuthority" type="warning" class="base-btn" @click="editContent">编辑</el-button>
					<el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
				</div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
  import _ from 'lodash';
  import {
   saveLesseeInformation,
   lookLesseeInformation,
   editLesseeInformation,
   echoLesseeInformation,
   recordList
  } from '@/api/assistiveDevices/lesseeInformation';
  import {
    validateID,
    uniqueID,
    echoPerson
  } from '@/api/userInfoConfig/index';
  import {
    echoCheckInPeople
  } from '@/api/facilitiesConfig/checkInPeople';
  import {
    allSelectdictionaryData
  } from '@/api/facilitiesConfig/pensionAgency';
  import {getEditAuthority} from "@/api/user";
  import {
    verifyFullName,
    verifyIdCard,
    verifyHomePhone,
    verifyMobile
  } from '@/utils/validate';
  import {
		computerAge,
    getBirthdayFromIdCard,
    validateForms,
    scrollToTop
	} from "@/utils/index";
  import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index';
  import Address from '@/components/Address';
  import {closeSelectedTag} from "@/utils/rooterJump";

  export default {
    components: {
      Address
    },
    data() {
      return {
        sexOptions:[],
        subsidyOptions:[],
        helpOptions:[],
        defoOptions:[],
        levelOptions:[],
        isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
        idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
        disabled: false, //表单是否可编辑
        modelType: '',//查看：look  编辑：edit  新增：add
        activeTabs: 'base',
        activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4'],
        adaptiveGrid: adaptiveGrid_max,
        adaptiveGrid_plus: adaptiveGrid_plus,
        areaCode: [],//区域行政的全部ID
        // todo 这里编辑权限没做
        editAuthority: false,
        PreferentialList:[],
        form: {
          id: '',
          fullName: '',//姓名
          idCard: '',//身份证
          sex: '',//性别
          sexName:'',
          birthday: '',//出生日期（年龄不传，只传出生日期）
          age: '',//年龄
          homePhone: '',//家庭电话
          mobile: '',//手机号码
          //住址信息
          liveAddr:'',
          liveArea:[],
          liveAreaCodeLevel:[],
          subsidyType:'', //补贴
          subsidyTypeName:'',
          helpType:'', //救助
          helpTypeName:'',
          defoCode:'',//残疾证号
          defoType:'',//残疾
          defoTypeName:'',
          defoLevel:'',//等级
          defoLevelName:'',
          agentName:'',//代理人
          agentIdCard:'', //代理人身份证
          agentPhone:'',//代理人电话
          agentMobile:'',//代理人手机
          agentOrgCode:'',//统一代码
          remark: '',//备注
        },
        rulesForm: {
          fullName: [
            {required: true, trigger: 'blur', message: '姓名不能为空，请输入！'},
            {trigger: 'blur', max: 20, message: '代理人姓名长度不得超过20个字符，请重新输入！'}

          ],
          agentName:[
            {trigger: 'blur', validator: verifyFullName},
          ],
          idCard: [
            // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
            // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
            {required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！'},
            {trigger: 'MANUAL_TRIGGER', validator: verifyIdCard},
            {trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              validateID(value).then(response => {
                if (response.code === 0) {
                  callback();
                } else {
                  if (response.msg == '该信息非当前企业拥有') {
                    callback('承租人员信息已存在，请重新输入。');
                  } else {
                    callback(response.msg);
                  }
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'));
              });
            }}
          ],
          agentIdCard:[{trigger: 'blur', validator: verifyIdCard}],
          homePhone: [
            {trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone}
          ],
          agentPhone:[{trigger: 'blur', validator: verifyHomePhone}],
          mobile: [
            {required: true, trigger: 'blur', message: '手机号不能为空，请输入！'},
            {trigger: 'blur', validator: verifyMobile}
          ],
          agentMobile:[{trigger: 'blur', validator: verifyMobile}],
          liveAddr: [
            {trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！'}
          ],
          defoCode: [
            {trigger: 'blur', max: 30, message: '二代残疾证号长度不得超过30个字符，请重新输入！'}
          ],
          agentOrgCode:[
            {trigger: 'blur', max: 50, message: '代理人统一社会信用代码长度不得超过50个字符，请重新输入！'}
          ]
        }
      }
    },
    watch: {
      'form.birthday': function (val, oldVal) {
        if (val) {
          this.form.age = computerAge(this.form.birthday) + '岁';
        } else {
          this.form.age = '';
        }
      }
    },
    //选择日期
    birthdayChange(val) {
      //新增时，根据满足条件的身份证，自动补全出生日期
      if (this.form.idCard !== '') {
        let _birthday = getBirthdayFromIdCard(this.form.idCard);
        if (_birthday !== val) {
          this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (val !== null) {
              this.form.birthday = val;
            }
            else {
              this.form.birthday = '';
            }
          }).catch(() => {
            if (_birthday) {
              this.form.birthday = _birthday;
            }
            else {
              this.form.birthday = '';
            }
            this.$message({
              type: 'info',
              message: '已取消操作！'
            });
          });
        }
      }
      else {
        if (val !== null) {
          this.form.birthday = val;
        }
        else {
          this.form.birthday = '';
        }
      }
    },
    mounted() {
      this.modelType = this.$route.query.modelType;
      let _userId_ = this.$route.params.id || '';
      if (this.modelType === 'look') {
				this.isEditForm = false;
        //请求当前用户信息
				lookLesseeInformation(_userId_).then(response => {
          this.formatData(response);
          this.getrecordList(response.data.idCard)
				}).catch(() => {
					this.$message.error("获取用户信息失败！");
        });
        /*编辑按钮的权限控制*/
        getEditAuthority(this.$route.query.editAuthority).then(response => {
          response.forEach((item)=>{
            if(item.menuName === '编辑'){
              this.editAuthority = item.visible === '0'?true:false;
            }
          });
        }).catch(() => {
          this.$message.error('获取编辑按钮的权限控制失败！');
        });
			}else {
				this.isEditForm = true;
				this.getData(_userId_)
			}
    },
    methods: {
      getrecordList(idCard){
        recordList({idCard:idCard}).then(res=>{
          if(res.code=='0'){
            this.PreferentialList = res.data
          }
        })
      },
      async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					await this.editGetData(id);
				} else if (this.modelType === 'add') {
					this.idEdit = false;
				}
      },
      tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
      // 编辑获取数据
			editGetData(id) {
				return new Promise((resolve, reject) => {
					//请求当前用户信息
					lookLesseeInformation(id).then(response => {
            if(response.code==0){
              this.formatData(response)
						  this.idEdit = false;
            }
					}).catch(() => {
						this.$message.error("获取用户信息失败！");
					});
				})
      },
      // 获取下拉字典
			getSelect() {
				let dictKey = [
					'sys_sex',//性别
          'subsidies', //补贴
          'fj_help',//救助
          'defo_type',//残疾
          'defo_level', //等级
				].join(',');
				return new Promise((resolve, reject) => {
				allSelectdictionaryData(dictKey).then(response => {
            let dict = response.data
            for (let key in dict) {
              switch (key) {
                case 'sys_sex':
                this.sexOptions = dict[key];
                break;
                case 'subsidies':
                this.subsidyOptions = dict[key];
                break;
                case 'fj_help':
                this.helpOptions = dict[key];
                break;
                case 'defo_type':
                this.defoOptions = dict[key];
                break;
                case 'defo_level':
                this.levelOptions = dict[key];
                break;
                }
              }
                resolve()
              }).catch(() => {

                reject()
              });
            })
        },
      // ====== 事件处理器 =======
      birthdayChange(val) {
			//新增时，根据满足条件的身份证，自动补全出生日期
			if (this.form.idCard !== '') {
				let _birthday = getBirthdayFromIdCard(this.form.idCard);
				if (_birthday !== val) {
					this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (val !== null) {
							this.form.birthday = val;
						}
						else {
							this.form.birthday = '';
						}
					}).catch(() => {
						if (_birthday) {
							this.form.birthday = _birthday;
						}
						else {
							this.form.birthday = '';
						}
						this.$message({
							type: 'info',
							message: '已取消操作！'
						});
					});
				}
			}
			else {
				if (val !== null) {
					this.form.birthday = val;
				}
				else {
					this.form.birthday = '';
				}
			}
		},
		// 获取区域的值----户籍
			getAreaCode_reg(val) {
        this.areaCode = val;
			},
			// 获取区域的值----居住
		// 	getAreaCode_live(val) {
		// 		this.areaCode[1] = val;
		// },
		// 家庭电话输入框失去焦点
		handleHomePhoneBlur() {
			this.$refs['form_base'].validateField('homePhone', (message) => {
			let valid = message == '';
			if (!valid) {
				this.$message.warning(
					'家庭电话格式例如:123-12345678或1234-1234567或1234-12345678');
			}
			});
		},
    //确定按钮-提交form表单
		submitBtn() {
        let formRefs = ['form_base', 'form_address', 'form_tag','form_agent'].map(key => this.$refs[key]);
        validateForms(formRefs).then(() => {
          // let _form = this.form
          // _form.liveArea = this.areaCode.length === 0 ? '':this.areaCode[this.areaCode.length - 1]+'';
          // _form.liveAreaCodeLevel = this.areaCode.join(',') || '';
          // if (_form.birthday === '') {
          //   _form.birthday = 'null';
          // }
          if(this.form.agentName||this.form.agentIdCard||this.form.agentPhone||this.form.agentMobile||this.form.agentOrgCode){
            if(this.form.agentName&&this.form.agentIdCard&&this.form.agentMobile){
              this.hanndelDate()
            }else{
              this.$message.error("请填写代理人完整信息!");
            }
          }else{
            this.hanndelDate()
          }
          //新增
          // if (this.modelType === 'add' && !this.form.id) {
          //   saveLesseeInformation(_form).then(response => {
          //     if (response.code === 0) {
          //       this.$message({
          //         type: 'success',
          //         message: "新增承租人员信息保存成功!"
          //       });
          //       //关闭页面
          //       this.closeDetailsPage();
          //     }
          //     else {
          //       this.$message.error("新增承租人员信息操作失败，失败原因是：" + response.msg);
          //     }
          //   }).catch(() => {
          //     this.$message.error("新增承租人员信息操作失败!");
          //   });
          // }
          // //编辑
          // else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          //   editLesseeInformation(_form).then(response => {
          //     if (response.code === 0) {
          //       this.$message({
          //         type: 'success',
          //         message: "编辑承租人员信息保存成功!"
          //       });
          //       //关闭页面
          //       this.closeDetailsPage();
          //     }
          //     else {
          //       this.$message.error("编辑承租人员信息操作失败，失败原因是：" + response.msg);
          //     }
          //   }).catch(() => {
          //     this.$message.error("编辑承租人员信息操作失败!");
          //   });
          // }
        }).catch(objectList => {
					this.activeTabs = 'base';
          scrollToTop();
        });
      },
      hanndelDate(){
        let _form = this.form
        _form.liveArea = this.areaCode.length === 0 ? '':this.areaCode[this.areaCode.length - 1]+'';
        _form.liveAreaCodeLevel = this.areaCode.join(',') || '';
        if (_form.birthday === '') {
          _form.birthday = 'null';
        }
        //新增
        if (this.modelType === 'add' && !this.form.id) {
          saveLesseeInformation(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: "新增承租人员信息保存成功!"
              });
              //关闭页面
              this.closeDetailsPage();
            }
            else {
              this.$message.error("新增承租人员信息操作失败，失败原因是：" + response.msg);
            }
          }).catch(() => {
            this.$message.error("新增承租人员信息操作失败!");
          });
        }
        //编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          editLesseeInformation(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: "编辑承租人员信息保存成功!"
              });
              //关闭页面
              this.closeDetailsPage();
            }
            else {
              this.$message.error("编辑承租人员信息操作失败，失败原因是：" + response.msg);
            }
          }).catch(() => {
            this.$message.error("编辑承租人员信息操作失败!");
          });
        }
      },
      //取消按钮
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
          this.closeDetailsPage();
        }).catch(() => {});
      },
    //返回按钮，关闭详情页
    closeDetailsPage() {
      //关闭页面
      closeSelectedTag(this, this.$route);
      this.$router.push('/assistivePlatform/rentalPointManagement/lesseeInformation')
    },
      //查看详情页面，点击编辑按钮
      editContent() {
        this.$router.push({
          path: `/lesseeInformation/details/${this.$route.params.id}`,
          query: {'modelType': 'edit', '_title': `编辑${this.form.fullName}`}
        });
      },
      handleIdCardInput(value) {
        this.$refs['form_base'].validateField('idCard', (message) => {
          let valid = message == '';
					if (valid) {
						if (this.modelType == 'edit') {
							this.checkIdCardUnique();
						} else if (this.modelType == 'add') {
							this.echoPersonByIdCard();
						}
					} else {
						if (this.modelType == 'edit') {
							this.form.birthday = '';
						} else if (this.modelType == 'add') {
							if (this.form.id) {
                this.idEdit = false;
								this.resetForm();
							} else {
                this.form.birthday = '';
              }
						}
					}
        });
      },
      // 重置所有表单
      resetForm() {
        this.form.id = '';
        this.$refs.form_base.resetFields();
        this.$refs.form_address.resetFields();
        this.areaCode = [];
        this.$refs.form_tag.resetFields();
        this.$refs.form_remark.resetFields();
      },
      checkIdCardUnique() {
        this.echoPersonByIdCard()
      },
      echoPersonByIdCard() {
        let idCard = this.form.idCard;
        // 身份证校验成功后，调用用户信息回显接口
        echoLesseeInformation(idCard).then(response => {
          if(response.code=='0'){
            this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
          }
        }).catch(error => {
          this.$message.error("身份证载入数据接口请求失败！");
        })
      },
      formatData(response) {
         for (let key in this.form) {
           if(!['liveAreaCodeLevel','liveArea'].includes(key)){
            this.form[key] = response.data[key];
           }
        }
        this.form.liveArea=response.data.liveAreaCodeLevel.split(',')
        this.form.liveAreaCodeLevel=response.data.liveAreaCodeLevel
        // 查看时设置 居住行政区划
        if (response.data.liveAreaName) {
          this.form.liveAreaName = response.data.liveAreaName;
        }
        // if(response.data.liveAreaCodeLevel!=""&&response.data.liveAreaCodeLevel!=null){
        // }
        // if(response.data.liveArea!=""&&response.data.liveArea!=null){
        // }
        if (!this.form.birthday) {
          this.form.birthday = getBirthdayFromIdCard(this.form.idCard);
        }
      }
    }
  }
</script>

<style scoped>
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
</style>
