<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="accountForm" class="demo-form-inline">
				<el-form-item label="账号类型" v-if="isTimeShow">
					<el-select v-model="accountForm.accountType" clearable placeholder="请选择账号类型"
					           @keyup.enter.native="onSubmit">
						<el-option
								v-for="item in this.accountTypeArr"
								:key="item.value"
								:label="item.dictLabel"
								:value="item.dictValue"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号子类型" v-if="isTimeShow||data.accountType === '4'||data.accountType === '5'">
					<el-select v-model="accountForm.assistiveRentType" clearable placeholder="请选择账号子类型"
					           @keyup.enter.native="onSubmit">
						 <el-option
							v-for="item in accountfjOptions"
							:key="item.dictValue"
							:label="item.dictLabel"
							:value="item.dictValue"
							></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号状态">
					<el-select v-model="accountForm.status" clearable placeholder="请选择账号状态"
					           @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务到期日" v-if="isTimeShow">
					<el-date-picker
							v-model="servicePeriod"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
              style="width:350px"
							@keyup.enter.native="onSubmit"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="accountForm.phonenumber"
							clearable
							placeholder="请输入手机号或登录名查询"
							@keyup.enter.native="onSubmit"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
					</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header>
					<el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增
					</el-button>
				</el-header>
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							@row-dblclick="lockDetails"
							row-key="id"
							@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="50"></el-table-column>

						<el-table-column label="序号" width="80" fixed="left">
							<template slot-scope="{row,$index}">
								<span>{{$index + 1}}</span>
							</template>
						</el-table-column>

						<el-table-column label="登录账号" userId="userId" prop="loginName" min-width="160">
							<template slot-scope="{row,$index}">
								<span>{{row.loginName}}</span>
							</template>
						</el-table-column>

						<el-table-column label="账号类型" prop="accountTypeShow" width="160"></el-table-column>

						<el-table-column label="显示名称" prop="userName" min-width="160"></el-table-column>
						<el-table-column label="所属部门" prop="fullName" min-width="250"></el-table-column>
						<el-table-column label="手机号码" prop="phonenumber" min-width="160"></el-table-column>
						<el-table-column label="服务到期日" prop="servicePeriod" min-width="160"
						                 v-if="isTimeShow"></el-table-column>

						<el-table-column label="账号状态" prop="status" min-width="140" header-align="left">
							<template slot-scope="scope">
								<el-switch
										class="switchStyle"
										v-model="scope.row.status"
										active-text="启用"
										inactive-text="禁用"
										active-value="0"
										inactive-value="1"
										disabled
										@click.native="changeSwitch(scope.row)"
								>
								</el-switch>
							</template>
						</el-table-column>

						<el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>

						<el-table-column fixed="right" label="操作" width="340" header-align="center">
							<template slot-scope="{row,$index}">
				 <span @click="roleAssignment($index, row)" v-has="{class: '角色分配'}" class="table-btn">
                  角色分配
                </span>
                <span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">
                  编辑
                </span>
								<span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">
                  删除
                </span>
								<span @click="resetPassword($index, row)" v-has="{class: '重置密码'}" class="table-btn">
                  重置密码
                </span>
								<!--<el-button-->
								<!--type="primary"-->
								<!--size="mini"-->
								<!---->
								<!--&gt;编辑-->
								<!--</el-button>-->
								<!--<el-button-->
								<!--type="danger"-->
								<!--size="mini"-->
								<!--@click="handleRemove($index, row)"-->
								<!--v-has="{class: '删除'}"-->
								<!--&gt;删除-->
								<!--</el-button>-->
								<!--<el-button-->
								<!--type="primary"-->
								<!--size="mini"-->
								<!--@click="resetPassword($index, row)"-->
								<!--v-has="{class: '重置密码'}"-->
								<!--&gt;重置密码-->
								<!--</el-button>-->
							</template>
						</el-table-column>
					</el-table>
					<pagination
							v-show="accountForm.count>0"
							:total="accountForm.count"
							:page.sync="accountForm.pageNum"
							:limit.sync="accountForm.pageSize"
							@pagination="ajaxData"
					/>

					<myDialog
							@dialogHide="dialogHanderHide"
							:ajaxData="ajaxData"
							:dialogTableVisible="isShow"
							:tableRowValue="tableRowValue"
							:modelType="modelType"
					></myDialog>
					<Dialog
						:dialogTableVisible="showdialog"
						@dialogHides="dialogHanderHides"
						:tableRowValue="tableRowValue"
            :ajaxData="ajaxData"
					>
					</Dialog>
				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from "@/components/Pagination";
	import myDialog from "./components/dialog";
	import Dialog from "./components/dialogs"
	import {mapGetters} from 'vuex'
	import {
		getTableData,
		accountType,
		accountfjType,
    accountEsDataType,
		editTableRowData,
		removeTableRowData,
		addTableRowData,
		resetPass,
		getCharacters,
		getInitPassword
	} from "@/api/systemConfig/user";
	import {getDate_YMD} from "@/utils/index.js";
	import {constants} from "crypto";

	export default {
		components: {Pagination, myDialog,Dialog},
		computed: {
			...mapGetters([
				'data',
			])
		},
		data() {
			return {
				showdialog:false,
				accountTypeArr: [], //账号类型数据
				accountfjTypeArr:[],
				accountStatusArr: [{id: 0, type: "启用"}, {id: 1, type: "禁用"}], //账号状态数据
				//表单值table显示
				accountForm: {
					accountType: "", //账号类型
					assistiveRentType:"", //账号子类型
					status: "", //账号状态
					beginTime: "",
					endTime: "",
					phonenumber: "", //关键字
					count: 0, //数据总数
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				},
				servicePeriod: [], //服务到期日期
				tableData: [],
				tableRowValue: "", //表格当前行数据
				isShow: false, //弹框显示隐藏
				isShowPass: false, //弹框显示隐藏
				multipleSelection: [], //多选的行数据
				removeDisabled: true, //批量删除按钮的disabled
				modelType: "", //弹框的类型，可编辑或可新增
				loading: false, //弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				isTimeShow: true,
				accountfjOptions: [],
        accountESOptions: []
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.getTypes();
			this.getfjTypes();
			this.ajaxData();
			this.isCommon()
		},
		methods: {
			//角色分配
			roleAssignment(index,row){
				this.tableRowValue = row
				this.showdialog = true
			},
			// 判断角色权限
			isCommon() {
				getCharacters().then(response => {
					if (response === true) {
						this.isTimeShow = true
					} else {
						this.isTimeShow = false
					}
				})
			},
			getTypes() {
				// let params = { dictType: "sys_account_data_type" };
				accountType()
				.then(response => {
					this.accountTypeArr = response.rows;
				})
				.catch(() => {
					this.$message.error("获取账号类型失败！");
				});
        accountEsDataType().then(response => {
          this.accountESOptions = response.rows;
          for (let i = 0; i < this.data.sysRoles.length; i++) {
            if (this.data.sysRoles[i].roleKey === 'assess_rent_type') {
              this.accountESOptions.splice(0, 1)
              break
            }
          }
        })
			},
			getfjTypes(){
			  /// 辅具
        if (this.data.accountType === '4') {
          accountfjType()
            .then(response => {
              this.accountfjTypeArr = response.rows;
              this.accountfjOptions = response.rows;
              for (let i = 0; i < this.data.sysRoles.length; i++) {
                if (this.data.sysRoles[i].roleKey === 'assistive_rent_type') {
                  this.accountfjOptions.splice(0, 1)
                  break
                }
              }
            })
            .catch(() => {
              this.$message.error("获取账号类型失败！");
            });
        } else if (this.data.accountType === '5') {
          /// 养老评估
          accountEsDataType().then(response => {
            this.accountfjTypeArr = response.rows;
            this.accountfjOptions = response.rows;
            for (let i = 0; i < this.data.sysRoles.length; i++) {
              if (this.data.sysRoles[i].roleKey === 'assistive_rent_type') {
                this.accountfjOptions.splice(0, 1)
                break
              }
            }
          })
        }
			},
			ajaxData() {
				let params = this.accountForm;
				if (this.servicePeriod.length === 0) {
					params.beginTime = "";
					params.endTime = "";
				} else {
					params.beginTime = getDate_YMD(this.servicePeriod[0]) + "";
					params.endTime = getDate_YMD(this.servicePeriod[1]) + "";
				}
				getTableData(params).then(response => {
					if (response.code === 0) {
						this.accountForm.count = response.total;
						// 处理数据
            response.rows.map(items => {
							items.fullName = items.dept.fullName;
							// 账号类型显示0-企业，1-个人
							this.accountTypeArr.map(item => {
								if (items.accountType === item.dictValue) {
									items.accountTypeShow = item.dictLabel
								}
								if(items.accountType=='4'){
										this.accountfjTypeArr.map(itemn => {
										if (items.assistiveRentType === itemn.dictValue) {
										  if (item.dictValue === '4') {
                        items.accountTypeShow = item.dictLabel + '—' + itemn.dictLabel
                      }
										}
									});
								}
                if(items.accountType === '5'){
                  this.accountESOptions.map(itemn => {
                    if (items.assistiveRentType === itemn.dictValue) {
                      if (item.dictValue === '5') {
                        items.accountTypeShow = item.dictLabel + '—' + itemn.dictLabel
                      }
                    }
                  });
                }
							});
							items.memProjects.length === 0
								? (items.servicePeriod = "")
								: (items.servicePeriod = items.memProjects[0].servicePeriod);
						});
						this.tableData = response.rows;
					}

					// this.count = response.total;
					// this.loadingReset = false;
				})
				.catch(() => {
					this.$message.error("加载表格数据失败！");
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.accountForm.pageNum = 1;
				this.ajaxData();
			},
			//switch 开关事件监听
			changeSwitch(e) {
				let _tit = '';
				let _tips = '';
				if (e.status === '0') {
					_tit = '禁用';
					_tips = '账号一旦被' + _tit + '，该账号将无法再登录平台！';
				}
				else {
					_tit = '启用';
					_tips = '';
				}

				const STATUS = e.status;
				this.$confirm('确定要' + _tit + '【' + e.loginName + '】账号吗?' + _tips, _tit + '账号', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let status = null;
					if (STATUS === '0') {
						status = 1;
					}
					else {
						status = 0;
					}
					let params = {
						userId: e.userId,
						status: status
					};

					editTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error('操作失败！');
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作！'
					});
					this.roleForm.status = STATUS;
				});
			},

			//删除当前行
			handleRemove($index, row) {
				this.$confirm(
					"确定要删除" +
					row.loginName +
					"账号吗? 账号一旦被删除，该账号将无法再登录平台！",
					"删除账号",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
					removeTableRowData(row.userId)
					.then(response => {
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							});
							this.accountForm.pageNum = 1
							this.ajaxData();
						} else {
							this.$message.error(response.msg);
						}
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作！"
					});
				});
			},
			//编辑
			handleEdit($index, row) {
				this.isShow = true; //打开弹框
				this.tableRowValue = row; //将选中的行数据传到弹框
				this.modelType = "edit"; //将弹框设为编辑状态
			},
			//添加行
			addTableRow() {
				this.isShow = true; //打开弹框
				// this.tableRowValue = {userId: }; //行数据格式
				this.modelType = "add"; //将弹框设为新增状态
			},
			// 重置密码
			resetPassword($index, row) {
				getInitPassword().then(response => {
					this.$confirm(
						"<p>友情提示：若确定重置，请先复制一下红色标注的密码，以免重置后无法找回！</p>"+
						"<p>确定要将"+row.loginName+"账号的密码，重置为初始密码<strong style='color: #ff0000;font-size: 20px;padding: 0 5px;'>"+response+"</strong>吗？</p>",
						"重置密码",
						{
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							dangerouslyUseHTMLString: true,
							type: "warning"
						}
					)
					.then(() => {
						resetPass(row.userId)
						.then(response => {
							if (response.code === 0) {
								this.$message({
									type: "success",
									message: response.msg
								});
								this.ajaxData();
							} else {
								this.$message.error(response.msg);
							}
						})
						.catch(() => {
							this.$message.error("重置密码操作失败！");
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消重置密码！"
						});
					});

				}).catch(() => {
					this.$message.error('初始化密码接口调接失败！');
				});
			},
			// 关闭弹窗
			closeDialog(formName) {
				this.$nextTick(() => {
					this.$refs[formName].resetFields();
				});
			},
			//跟新数据json
			upData(data) {

			},
			dialogHanderHide() {
				this.isShow = false;
			},
			dialogHanderHides(){
				this.showdialog = false
			},
			//多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//表单重置按钮
			onReset() {
				this.accountForm = {
					accountType: "", //账号类型
					status: "", //账号状态
					beginTime: "",
					endTime: "",
					phonenumber: "", //关键字
					count: 0, //数据总数
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.servicePeriod = [];//服务到期日期

				this.ajaxData();
			},
			//查看详情
			lockDetails(row) {
				this.isShow = true; //打开弹框
				this.tableRowValue = row; //将选中的行数据传到弹框
				this.modelType = "look"; //将弹框设为编辑状态
			},
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";

	.demo-ruleForm {
		width: 450px;
		margin-left: 150px;
	}

</style>
