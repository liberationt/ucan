<!-- 绑定服务对象 dialog.vue -->
<template>
	<el-dialog
			title="绑定服务对象"
			:visible="dialogTableVisible"
			@close="closeDialog"
			@opened="opened"
			@open="open"
			width="400px"
      class="vol-dailog"
			:close-on-click-modal="false" v-dialogDrag ref="dailog"
	>
    <div class="new-daillog-body"  :style="{ height: heightChange}">
      <el-form ref="form" :model="form" label-width="100px"  >
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="min-height: auto;">
            <el-form-item label="所属区域" style="margin-bottom: 10px;">
              <Address :area-code="areaCode_FWS" :form-code="form_areaCode_FWS"
                       @getAreaCode="getAreaCode_FWS"
                       :id-edit="idEdit_FWS"
                       :width="'100%'"></Address>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="min-height: auto;">
            <el-form-item label="关键词">
              <el-input v-model.trim="keyword_FWS" @blur="changeFWSleixing" @change="keyword_FWS_change" clearable placeholder="请输入姓名或身份证查询" style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="min-height: auto;">
            <el-form-item label="志愿者" prop="facilitatorType" style="margin-bottom: 10px;">
              <!-- <el-select v-model="facilitatorType" placeholder="请选择志愿者" clearable style="width:100%;" @change="handleVolunteerChange">
                <el-option v-for="item in facilitatorTypeOptions" :key="item.id"
                           :label="item.fullName"
                           :value="item.id"></el-option>
              </el-select> -->
              <el-input v-model.trim="facilitatorTypeName" disabled placeholder="志愿者" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table
          ref="multipleTable"
          :data="tableData_FWS"
          tooltip-effect="dark"
          style="width: 100%;"
          header-align="left"
          border
          row-key="id"
          @select-all="handleSelectAll"
        >
          <el-table-column type="selection" width="40" fixed="left">
            <template slot-scope="{row,$index}">
              <el-checkbox v-model="row.checked" @change="handleChangeChecked(row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" fixed="left">
            <template slot-scope="{row,$index}">
              <span>{{$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="fullName" min-width="100"></el-table-column>
          <el-table-column label="身份证号" prop="idCard" min-width="200"></el-table-column>
          <el-table-column label="所属区域" show-overflow-tooltip prop="liveAreaName" min-width="210"></el-table-column>
          <el-table-column label="联系方式" prop="homePhone" min-width="130"></el-table-column>
        </el-table>

        <pagination
          v-show="form_FWS.total>0"
          :total="form_FWS.total"
          :page.sync="form_FWS.pageNum"
          :limit.sync="form_FWS.pageSize"
          @pagination="paginationGetTableData()"
        ></pagination>

      </el-form>

      <div>
        <el-row :gutter="0">
          <el-col :span="24" class="transferWrapTitle">已选择的服务对象：</el-col>
          <el-col :span="24" class="transferWrapDiv">
            <ul class="transferUl">
              <transition-group name="list-complete" tag="div">
                <li class="transferUl_li list-complete-item" v-for="item in this.GLOBAL" :key="item.id">
                  <p class="transferUl_p">{{item.fullName}}</p>
                  <i class="transferUl_btn el-icon-circle-close" @click="removeTransferUlItem(item.id)"></i>
                </li>
              </transition-group>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button
					type="primary"
					@click="submitDialog()"
					class="dailog-btn"
			>确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import _ from 'lodash';
	import Address from "@/components/Address";
	import Pagination from '@/components/Pagination';
	import {getBoundVolunteerData,
		getBoundVolunteerTableData,
		postVolunteerTableData,
		getVolunteerBoundObj} from '@/api/sidekickProjectConfig/volunteerManagement';
  import elementResizeDetectorMaker from "element-resize-detector"
	export default {
		name: "myDialog",
		components: {Address,Pagination},
		props: ["dialogTableVisible","selectedValue"], //接受父模板传递的自定义属性
		data() {
			return {
				form:{},
				//添加服务商弹框
				facilitatorTypeOptions:[],//服务商类型下拉框值
				areaCode_FWS: [],//所属居委全部ID
				form_areaCode_FWS: [],//服务商选择的区域
				keyword_FWS:'',//关键字
				facilitatorType: '',//服务商类型id
				facilitatorTypeName:'',//服务商类型name
				tableData_FWS: [],//服务商表格数据
				form_FWS: {
					total: 0,
					pageNum: 1,
					pageSize: 10
				},
				GLOBAL: [],//添加服务商多选行的数据-固定存值
				idEdit_FWS: true,// 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
        heightChange: '50vh',
			};
		},
		mounted() {
      const _this = this
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.dailog.$el.lastChild, function (element) {
        let height = element.offsetHeight - 48 +'px'
        _this.$nextTick(function () {
          this.heightChange = height
          // this.$refs.dailogBody.style.height = height
        })
      })
    },
		methods: {
			// 绑定服务对象--获取所属区域
			getAreaCode_FWS(val) {
				this.areaCode_FWS = val;
				this.loadFacilitatorTableDate();
			},
			//绑定服务对象---关键词
			changeFWSleixing() {
				this.loadFacilitatorTableDate();
			},
			//input框清空之后出发请求
			keyword_FWS_change(val){
				 if (val === ''){
					 this.changeFWSleixing();
				 }
			},
			//选择志愿者change事件
			handleVolunteerChange(val){
				this.getVolunteerBoundObjFun(val);
				this.loadFacilitatorTableDate();
			},
			//加载服务商名称的表格数据
			loadFacilitatorTableDate() {
				this.tableData_FWS = [];
				//服务商名称--数据字典接口
				let params = {
					liveArea: this.areaCode_FWS[this.areaCode_FWS.length - 1] || '',
					fullName: this.keyword_FWS,
					pageNum: 1,
					pageSize: 10,
					volunteerId: this.facilitatorType?this.facilitatorType:this.selectedValue[0].id,
				};
				this.asyncLoadTableData(params);
			},
			//加载服务商名称的表格数据-分页加载
			paginationGetTableData() {
				this.tableData_FWS = [];
				//服务商名称--数据字典接口
				let params = {
					liveArea: this.areaCode_FWS[this.areaCode_FWS.length - 1] || '',
					fullName: this.keyword_FWS,
					pageNum: this.form_FWS.pageNum,
					pageSize: this.form_FWS.pageSize,
					volunteerId: this.facilitatorType?this.facilitatorType:this.selectedValue[0].id,
				};
				this.asyncLoadTableData(params);
			},
			//异步加载表格数据
			async asyncLoadTableData(params) {
				await getBoundVolunteerTableData(params).then(response => {
					if(response.rows){
						response.rows.forEach(item=>{
							item.checked = false;
							this.tableData_FWS.push(item);
						});
					}
					else {
						this.tableData_FWS = [];
					}
					this.form_FWS.total = response.total;
				}).catch(() => {
					this.$message.error('‘志愿者对象’数据加载失败！');
				});
				//当勾选了志愿者，打开‘绑定服务对象’弹框后，将当前志愿者绑定的服务对象渲染到表格中
				await this.tableItemSelected();
			},
			//等表格数据渲染完毕，将已选择的‘服务对象’显示在表格中
			tableItemSelected() {
				return new Promise((resolve, reject) => {
					if(this.GLOBAL && this.GLOBAL.length !== 0){
						this.GLOBAL.forEach(item => {
							this.tableData_FWS.forEach(itemB => {
								if (item.id === itemB.id) {
									itemB.checked = true;
								}
							});
						});
					}
					resolve();
				})
			},
			//当用户手动勾选全选 Checkbox 时触发的事件
			handleSelectAll(val){
				//this.GLOBAL = [];
				if(val.length !== 0){
					this.tableData_FWS.forEach(item=>{
						item.checked = true;
						this.GLOBAL.push(item);
					});
				}
				else {
					this.tableData_FWS.forEach(item=>{
						item.checked = false;
						this.handleChangeChecked(item)
					});
				}
			},
			//给每个复选框绑定change事件
			handleChangeChecked(val){
				let objIndex = this.GLOBAL.findIndex(im => im.id === val.id);
				//如果当前选择的行数据，不在‘已选择的服务对象’中，则添加进去
				if(objIndex === -1){
					this.GLOBAL.push(val)
				}
				//否则，从中删除
				else {
					this.GLOBAL.splice(objIndex, 1);
				}
			},
			//已选择的服务对象删除事件
			removeTransferUlItem(val){
				// if(this.GLOBAL.length <= 3 ){
				// 	this.$message.error('绑定的‘服务对象’必须大于3人且少于10人！');
				// }
				// else {
					let objIndex = this.GLOBAL.findIndex(im => im.id === val);
					this.GLOBAL.splice(objIndex, 1);
					this.tableData_FWS.forEach(itemB => {
						itemB.checked = false;
					});
					//当勾选了志愿者，打开‘绑定服务对象’弹框后，将当前志愿者绑定的服务对象渲染到表格中
					this.tableItemSelected();
				// }
			},
			//弹框确定按钮
			submitDialog(){
				//志愿者和服务对象为必选，否则提示
				if(this.facilitatorType === ''){
					this.$message.error('‘志愿者’不能为空，请选择！');
				}
				else if(this.GLOBAL.length === 0){
					this.$message.error('请选择需要绑定的‘服务对象’！');
				}
				else {
					if(this.GLOBAL.length < 3 || this.GLOBAL.length > 10){
						this.$message.error('绑定的‘服务对象’必须大于3人且少于10人！');
					}
					else {
						let volunteerObjListVo = {
							volunteerObj:[]
						};
						this.GLOBAL.forEach(itemA => {
							let itemArr = {
								volunteerId: this.facilitatorType,//志愿者id
								vsoId: itemA.id,//志愿者服务对象id
							};
							volunteerObjListVo.volunteerObj.push(itemArr);
						});
						//将已选择的绑定对象提交
						postVolunteerTableData(volunteerObjListVo).then(response => {
							if(response.code === 0){
								this.$message({
									type: 'success',
									message: "‘绑定服务对象’成功！"
								});
								this.closeDialog();
								this.$emit("ajaxGetData", "");
							}
							else {
								this.$message.error('‘绑定服务对象’失败！');
							}
						}).catch(() => {
							this.$message.error('‘绑定服务对象’接口调用失败！');
						});
					}
				}
			},
			//关闭‘新增服务商’弹框
			closeDialog() {
        //关闭弹框
				this.$emit("dialogHide", "false");
				this.form_areaCode_FWS = [];
				this.areaCode_FWS = [];
				this.keyword_FWS='';//关键字
				this.facilitatorType= '';//服务商类型
				this.tableData_FWS=[];//服务商表格数据
				this.form_FWS = {
					total: 0,
					pageNum: 1,
					pageSize: 10
				};
			},
			//获取当前志愿者的绑定对象
			getVolunteerBoundObjFun(id){
				getVolunteerBoundObj(id).then(response => {
					if(response && response.data){
						this.GLOBAL = _.cloneDeep(response.data);
					}
					else {
						this.GLOBAL = [];
					}
				}).catch(() => {
					this.$message.error('获取当前‘志愿者绑定的对象’接口请求失败！');
				});
			},
			opened() {
			},
			//打开的回调
			open() {
        this.idEdit_FWS = !this.idEdit_FWS;
				this.getVolunteerBoundObjFun(this.selectedValue[0].id);
				//志愿者--数据字典接口
				/********************************************************
				getBoundVolunteerData().then(response => {
					if(response){
						this.facilitatorTypeOptions = response;
						//将表格选中的数据，在志愿者下拉框中渲染
						if(this.selectedValue.length !== 0){
							this.facilitatorType = this.selectedValue[0].id;
						}
					}
				}).catch(() => {
					this.$message.error('‘志愿者’数据字典接口请求失败！');
				});
				***********************************************************/

				this.facilitatorType = this.selectedValue[0].id;
				this.facilitatorTypeName = this.selectedValue[0].fullName;
			},
		}
	};
</script>

<style lang="scss">
  .vol-dailog {
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .new-daillog-body {
        height: 50vh;
        padding: 20px 36px 86px 36px;
        overflow: auto;
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
