<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="系统模块">
					<el-input v-model.trim="form.title" style="width: 240px;" clearable placeholder="请输入系统模块" @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>
				<el-form-item label="操作人员">
					<el-input v-model.trim="form.operName" style="width: 240px;" clearable placeholder="请输入操作人员" @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>
				<el-form-item  label="操作类型">
					<el-select v-model="form.businessType" style="width: 240px;" placeholder="请选择操作类型" clearable @keyup.enter.native="onSubmit">
						<el-option v-for="item in business_typeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  label="操作状态">
					<el-select v-model="form.status" style="width: 240px;" placeholder="请选择操作状态" clearable @keyup.enter.native="onSubmit">
						<el-option v-for="item in sys_common_statusOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作时间">
					<el-date-picker
							v-model="operTime"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							placeholder="请选择操作时间"
							style="width: 240px;"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
              @keyup.enter.native="onSubmit"
					></el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header>
					<el-button type="primary" size="small" @click="removeTableRow()" class="base-btn" v-has="{class: '删除'}">删除</el-button>
					<el-button type="primary" size="small" @click="removeAllTableRow()" class="base-btn" v-has="{class: '删除'}">清空</el-button>
					<el-button type="primary" size="small" @click="exportFun()" class="base-btn" v-has="{class: '导出'}">导出</el-button>
					<div v-if="this.total !== 0" class="totalWrap">已筛选到{{this.total}}条匹配信息</div>
					<div v-else class="totalWrap">无法找到匹配信息</div>
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
					>
						<el-table-column type="selection" width="50" fixed="left"></el-table-column>
						<el-table-column label="日志编号" prop="operId" width="100" ></el-table-column>
						<el-table-column label="系统模块" prop="title" width="200"></el-table-column>
						<el-table-column label="操作类型" prop="businessTypeName" width="200"></el-table-column>
						<el-table-column label="操作人员" prop="operName" width="200"></el-table-column>
						<el-table-column label="部门名称" prop="deptName" width="200"></el-table-column>
						<el-table-column label="主机" prop="operIp" width="200"></el-table-column>
						<el-table-column label="操作地点" prop="operLocation" width="200"></el-table-column>
						<el-table-column label="操作状态" prop="statusName" width="200"></el-table-column>
						<el-table-column label="操作时间" prop="operTime" width="200"></el-table-column>
						<el-table-column fixed="right" label="操作" min-width="250">
							<template slot-scope="{row,$index}">
				                <span @click="handleLook($index, row)" class="table-btn">
				                    查看详情
				                </span>
							</template>
						</el-table-column>
					</el-table>

					<pagination
							v-show="total>0"
							:total="total"
							:page.sync="form.pageNum"
							:limit.sync="form.pageSize"
							@pagination="ajaxData"
					/>

					<el-dialog title="操作日志详情" :visible="dialogTableVisible" @close='closeDialog' @open="open" class="log-dailog" width="800px" v-dialogDrag ref="dailog">
            <div class="new-daillog-body" :style="{ height: heightChange}">
              <el-form ref="form_details" :model="form_details" label-width="100px" >
                <el-row >
                  <el-col :span="12">
                    <el-form-item label="系统模块："><span>{{form_details.title}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作类型："><span>{{form_details.businessTypeName}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作人员："><span>{{form_details.operName}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门名称："><span>{{form_details.deptName}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="主机："><span>{{form_details.operIp}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作地点："><span>{{form_details.operLocation}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作状态："><span>{{form_details.statusName}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作时间："><span>{{form_details.operTime}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="路径："><span>{{form_details.operUrl}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="操作类别："><span>{{form_details.operatorTypeName}}</span></el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="方法："><span>{{form_details.method}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参数："><span style="max-height: 108px;overflow-y: auto;display: block;">{{form_details.operParam}}</span></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="错误日志："><span style="max-height: 108px;overflow-y: auto;display: block;">{{form_details.errorMsg}}</span></el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

						<div slot="footer" class="dialog-footer">
							<el-button :loading="loading" type="primary" @click="closeDialog()" class="dailog-btn" >确 定</el-button>
						</div>
					</el-dialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import {getOperateLogDownload} from "@/api/importExportApi"
	import Pagination from "@/components/Pagination";
	import {
		getTableData,
		removeTableRowData,
		emptyTableRowData,
		editDialog,
		addDialog,
		allSelectdictionaryData,
		getTableDataDetails
	} from "@/api/systemConfig/logManagement/operationLog";
	import {getDate_YMD} from "@/utils/index.js";
  import elementResizeDetectorMaker from "element-resize-detector"
	export default {
		components: {Pagination},
		data() {
			return {
				business_typeOptions:[],//操作类型下拉框数据
				sys_common_statusOptions:[],//操作状态下拉框数据

				//表单值table显示
				form: {
					title: "", //系统模块
					operName:"",//操作人员
					businessType:"",//操作类型
					status:"",//操作状态
					beginTime: "",
					endTime: "",
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				},

				//日志详情
				form_details: {},

				dialogTableVisible:false,//详情弹框
				removeRowSelectedId:[],//要删除当前选中的行id
				operTime:[],//操作时间
				total:0,//数据总数
				tableData: [],
				tableRowValue: "", //表格当前行数据
				isShow: false, //弹框显示隐藏
				isShowPass: false, //弹框显示隐藏
				removeDisabled: true, //批量删除按钮的disabled
				modelType: "", //弹框的类型，可编辑或可新增
				loading: false, //弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				exportData:"",//导出的数据
        heightChange: '50vh',
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			/**
			 * 数据字典接口
			 */
			let dicKey = 'business_type,sys_common_status';
			allSelectdictionaryData(dicKey).then(response => {
				this.business_typeOptions = response.data['business_type'];
				this.sys_common_statusOptions = response.data['sys_common_status'];
			}).catch(() => {
				this.$message.error('操作失败！');
			});
			this.onReset();
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
			ajaxData() {
				let params = this.form;
				if ( this.operTime.length === 0 ) {
					params.beginTime = "";
					params.endTime = "";
				} else {
					params.beginTime = getDate_YMD(this.operTime[0]) + "";
					params.endTime = getDate_YMD(this.operTime[1]) + "";
				}
				getTableData(params).then(response => {
					if (response.code === 0) {
						this.total = response.total;
						this.tableData = response.rows;
						this.loadingReset = false;
						this.loadingSubmit = false;
						this.exportData = JSON.parse(JSON.stringify(response.rows));
					}
				})
				.catch(error => {
					reject(error);
					this.loadingReset = false;
					this.loadingSubmit = false;
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.form.pageNum = 1;
				this.ajaxData();
			},
			//表单重置按钮
			onReset() {
				this.loadingReset = true;
				//表单值
				this.form ={
					title: "", //系统模块
					operName:"",//操作人员
					businessType:"",//操作类型
					status:"",//操作状态
					beginTime: "",
					endTime: "",
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.operTime = [];
				this.ajaxData();
			},
			//选中的行数据
			handleSelectionChange(val) {
				this.removeRowSelectedId=[];
				val.forEach((item)=>{
					this.removeRowSelectedId.push(item.operId);
				});
			},
			//删除行数据
			removeTableRow(){
				if(this.removeRowSelectedId.length === 0){
					this.$message.error("请至少勾选一行数据！");
				}
				else {
					let params = this.removeRowSelectedId.join(',');
					removeTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							});
							this.ajaxData();
							this.loading = false;
						} else {
							this.$message.error(response.msg);
							this.loading = false;
						}
					})
					.catch(error => {
						reject(error);
						this.$message.error("操作失败！");
						this.loading = false;
					});
				}
			},
			//清空全部表格数据
			removeAllTableRow(){
				emptyTableRowData().then(response => {
					if (response.code === 0) {
						this.$message({
							type: "success",
							message: response.msg
						});
						this.ajaxData();
						this.loading = false;
					} else {
						this.$message.error(response.msg);
						this.loading = false;
					}
				})
				.catch(error => {
					reject(error);
					this.$message.error("操作失败！");
					this.loading = false;
				});
			},
			//导出功能
			exportFun() {
				this.$confirm(
					"是否需要导出",
					"导出",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
					const data = qs.stringify(this.exportData);
					getOperateLogDownload(data).then(response => {
						const datas = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;'});
						const downloadElement = document.createElement('a');
						const href = window.URL.createObjectURL(datas);
						downloadElement.href = href;
						downloadElement.download = '养老机构列表.xlsx';
						document.body.appendChild(downloadElement);
						downloadElement.click();
						document.body.removeChild(downloadElement); // 下载完成移除元素
						window.URL.revokeObjectURL(href); // 释放掉blob对象
					}).catch(() => {
						this.$message.error("操作失败！");
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作！"
					});
				});
			},
			//查看详情
			handleLook(index, row){
				this.dialogTableVisible = true;
				let parmas = {'operId':row.operId};
				getTableDataDetails(parmas).then(response => {
					if (response.code === 0) {
						this.form_details = response.rows[0];
					} else {
						this.$message.error(response.msg);
					}
				})
				.catch(() => {
					this.$message.error("操作失败！");
				});
			},
			//打开弹框时的回调
			open(){

			},
			//关闭弹框时的回调
			closeDialog(){
				this.form_details = {};
				this.dialogTableVisible = false;
			}
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";

</style>
<style lang="scss">
  .log-dailog {
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
